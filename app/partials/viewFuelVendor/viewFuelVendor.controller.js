
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('ViewFuelVendorController', ['$scope','$uibModal', '$stateParams', 'ViewFuelVendorService', 'CustomersService', function($scope , $uibModal, $stateParams, ViewFuelVendorService, CustomersService) {
        $scope.data = {};
        $scope.data.priceEmail = true;
        $scope.aircraft = {};
        $scope.showLoader = false;
        var value = "";
        var vendorId = $stateParams.id;
        ViewFuelVendorService.getFuelOrder(vendorId).then(function(result) {
          $scope.vendorData = result;
        })

        getContactList();
        function getContactList(){
          ViewFuelVendorService.getContact(vendorId).then(function(result) {
            $scope.vendorContactList = result;
          })
        }

        getAircraftList();
        function getAircraftList(){
          ViewFuelVendorService.getAircraft(vendorId).then(function(result) {
            $scope.contactAircraftList = result;
          })
        }
        

        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.addContact = function(){
          $scope.data.vendorId = vendorId;
          $scope.contactData.contactList.push($scope.data);
          ViewFuelVendorService.addContact($scope.contactData).then(function(result) {
            if(result.success){
              toastr.success(''+result.success+'', {
                  closeButton: true
                })
                $('#contact-modal-3').modal('hide');
                getContactList();
            }else{
              toastr.error(''+result.statusText+'', {
                  closeButton: true
                })
            }
          })
        }

      getData();
      function getData(){
        CustomersService.getAircraftMake().then(function(result) {
          $scope.aircraftMakeList = result;
        })
      }
      
      $scope.clearAircrafts = function(){
        $scope.aircraftDetails = [];
        $scope.aircraftDetails = [{ 
            'tail':'',
            'make': '',
            'model': '',
            'sizeId' : '',
            'marginId': ''
        }];
      }
    
      $scope.addNew = function(){
          $scope.aircraftDetails.push({ 
            'tail':'',
            'make': '',
            'model': '',
            'sizeId' : ''
          });
          console.log($scope.aircraftDetails)
      };

      $scope.getModal = function(makeId, index){
        $scope.showLoader = true;
        $scope.aircraft.make = makeId;
        //var makeId = makeId;
        CustomersService.getModal($scope.aircraft.make).then(function(result) {
          $scope.showLoader = false;
          $scope.aircraftDetails[index].aircraftModalList = result;
          //$scope.aircraftDetails[index].model = $scope.aircraftModalList[0];
        })
      }

      $scope.getSize = function(model, index){
        $scope.showLoader = true;
        CustomersService.getAircraftSize($scope.aircraft.make, model).then(function(result) {
          $scope.showLoader = false;
          $scope.aircraftDetails[index].aircraftSizeList = result;
          //$scope.aircraftDetails[index].size = $scope.aircraftSizeList[0];
        })
      }

      $scope.aircraftListData = {};
      //$scope.addData = [];
      $scope.saveVendorData = function(){
        $scope.addData = [];
        for(var i=0; i<$scope.aircraftDetails.length;i++){
          $scope.addData.push({ 
              'tail': $scope.aircraftDetails[i].tail,
              'make': $scope.aircraftDetails[i].make,
              'model': $scope.aircraftDetails[i].model,
              'sizeId' : $scope.aircraftDetails[i].sizeId
            });
        }
        console.log($scope.addData)
        $scope.aircraftListData.aircraftList = $scope.addData;
        $scope.aircraftListData.accountId = vendorId;
        
        CustomersService.addAircraft($scope.aircraftListData).then(function(result) {
          if(result != null && result.success){
            toastr.success(''+result.success+'', {
                closeButton: true
              })
              $('#aircraft-modal-3').modal('hide');
              getAircraftList();
          }else{
            toastr.error(''+result.statusText+'', {
                closeButton: true
              })
          }
        });
        
      }
      $scope.showNoteData = true;
      $scope.showCompanyName = true;
      $scope.showAddress = true;
      $scope.showNote = function(){
        $scope.showNoteData = false;
      }

      $scope.company = function(){
        $scope.showCompanyName = false;
      }

      $scope.addressChange = function(){
        $scope.showAddress = false;
      }

      $scope.editData = function(inputName) {
          console.log($scope.vendorData)
          if(inputName == 'showNoteData'){
            $scope.showNoteData = true;
          }else if(inputName == 'showCompanyName'){
            $scope.showCompanyName = true;
          }else if(inputName == 'showAddress'){
            $scope.showAddress = true;              
          }

          var vendorData = "companyName=" + $scope.vendorData.companyName + "&masterMargin=" + $scope.vendorData.masterMargin 
            + "&addressOne=" + $scope.vendorData.addressOne + "&addressTwo=" + $scope.vendorData.addressTwo + "&city=" + $scope.vendorData.city + "&state=" 
            + $scope.vendorData.state + "&country=" + $scope.vendorData.country + "&zipcode=" + $scope.vendorData.zipcode + "&internalNote=" 
            + $scope.vendorData.internalNote + "&certificateType=" + $scope.vendorData.certificateType + "&baseTenant=" + $scope.vendorData.baseTenant
            + "&fuelerlinxCustomer=" + $scope.vendorData.fuelerlinxCustomer + "&contractFuelVendor=" + $scope.vendorData.contractFuelVendor 
            + "&activate=" + $scope.vendorData.activate + "&baseIcao=" + $scope.vendorData.baseIcao + "&vendorId=" + vendorId;

          ViewFuelVendorService.updateContact(vendorData).then(function(result) {
            if(result != null && result.success){
              toastr.success(''+result.success+'', {
                closeButton: true
              })
            }else{
              toastr.error(''+result.statusText+'', {
                closeButton: true
              })
            }
          })
          
      }

      $scope.sendMail = function(){
        ViewFuelVendorService.sendMail(vendorId).then(function(result) {
            if(result != null && result.success){
              toastr.success(''+result.success+'', {
                closeButton: true
              })
            }else{
              toastr.error(''+result.statusText+'', {
                closeButton: true
              })
            }
        })
      }


      $scope.openConfirmMail = function(){
        $('#confirm2').css('display', 'block');
      }


      $scope.cancelAndCloseConfirm = function(){
        $('#confirm2').css('display', 'none');
      }

  }]);