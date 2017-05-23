
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewCompanyController', ['$scope','$uibModal', '$stateParams', 'ViewCompanyService', 'CustomersService', function($scope , $uibModal, $stateParams, ViewCompanyService, CustomersService) {
        $scope.data = {};
        $scope.data.priceEmail = true;
        $scope.aircraft = {};
        $scope.primayData = {};

        $(function() {
         $('#company-one2').bootstrapToggle();
         
        })

        $(function() {
         $('#toggle-one1').bootstrapToggle();
        })   
        $(function() {
         $('#toggle-two').bootstrapToggle();
        })   
        $(function() {
         $('#toggle-three').bootstrapToggle();
        })   
        $(function() {
         $('#toggle-four').bootstrapToggle();
        })

        $(function() {
          $('#price-one2').bootstrapToggle();
          $('#price-one2').change(function() {
            $('#console-event').html('Toggle: ' + $(this).prop('checked'));
            $scope.data.priceEmail = $(this).prop('checked');
          })
        })

        

        CustomersService.getMargin().then(function(result) {
          $scope.marginList = result;
        })

        var value = "";
        var companyId = $stateParams.id;
        ViewCompanyService.getCompany(companyId).then(function(result) {
          $scope.companyData = result;
          if(result.margin != null){
             $scope.companyData.masterMargin = result.margin.id;
          }
         
          if($scope.companyData.activate == true){
            value = 'on';
          }else{
            value = 'off'
          }
          $('#company-one2').bootstrapToggle(value)
        })

        $scope.changeStatus = function(){
          $('#company-one2').bootstrapToggle();
          $('#company-one2').change(function() {
            $('#console-event').html('Toggle: ' + $(this).prop('checked'));
            $scope.companyData.activate = $(this).prop('checked');
            console.log($scope.companyData.activate)
            var statusData = "status=" + $scope.companyData.activate;
            ViewCompanyService.changeStatus(companyId, statusData).then(function(result) {
              if(result.success){
                  toastr.success(''+result.success+'', {
                      closeButton: true
                  })
              }
            })
          })
        }

        
        getContactList();
        function getContactList(){
          ViewCompanyService.getContact(companyId).then(function(result) {
            $scope.companyContactList = result;
            for(var i=0;i<$scope.companyContactList.length; i++){
              if($scope.companyContactList[i].priceEmail == true){
                $scope.companyContactList[i].value1 = 'on';
                console.log('aya')
              }else{
                $scope.companyContactList[i].value1 = 'off';

              }
              console.log($scope.companyContactList[i])
              $('#'+$scope.companyContactList[i].id).bootstrapToggle($scope.companyContactList[i].value1)
            }
          })
        }

        getAircraftList();
        function getAircraftList(){
          ViewCompanyService.getAircraft(companyId).then(function(result) {
            $scope.contactAircraftList = result;
          })
        }
        

        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.addContact = function(){
          $scope.data.companyId = companyId;
          $scope.contactData.contactList.push($scope.data);
          ViewCompanyService.addContact($scope.contactData).then(function(result) {
            console.log(result)
            if(result.status == 200){
                // toastr.success(''+result.success+'', {
                //   closeButton: true
                // })
                $('#contact-modal-3').modal('hide');
                $scope.primayData.id = result.data;
                $scope.sendPrimaryContact();
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
      
      $scope.aircraftDetails = [{ 
            'tail':'',
            'make': '',
            'model': '',
            'sizeId' : '',
            'marginId': ''
        }];
    
        $scope.addNew = function(){
            $scope.aircraftDetails.push({ 
              'tail':'',
              'make': '',
              'model': '',
              'sizeId' : '',
              'marginId': ''
            });
            console.log($scope.aircraftDetails)
        };

        $scope.getModal = function(makeId, index){
        $scope.aircraft.make = makeId;
          //var makeId = makeId;
          CustomersService.getModal($scope.aircraft.make).then(function(result) {
            $scope.aircraftDetails[index].aircraftModalList = result;
            //$scope.aircraftDetails[index].model = $scope.aircraftModalList[0];
          })
        }

        $scope.getSize = function(model, index){
          CustomersService.getAircraftSize($scope.aircraft.make, model).then(function(result) {
            $scope.aircraftDetails[index].aircraftSizeList = result;
            //$scope.aircraftDetails[index].size = $scope.aircraftSizeList[0];
          })
        }

        $scope.aircraftListData = {};
        $scope.addData = [];
        $scope.saveCompanyData = function(){
          for(var i=0; i<$scope.aircraftDetails.length;i++){
            $scope.addData.push({ 
                'tail': $scope.aircraftDetails[i].tail,
                'make': $scope.aircraftDetails[i].make,
                'model': $scope.aircraftDetails[i].model,
                'sizeId' : $scope.aircraftDetails[i].sizeId,
                'marginId': $scope.aircraftDetails[i].marginId
              });
          }
          console.log($scope.addData)
          $scope.aircraftListData.aircraftList = $scope.addData;
          $scope.aircraftListData.accountId = companyId;
          
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
            console.log($scope.companyData)
            if(inputName == 'showNoteData'){
              $scope.showNoteData = true;
            }else if(inputName == 'showCompanyName'){
              $scope.showCompanyName = true;
            }else if(inputName == 'showAddress'){
              $scope.showAddress = true;              
            }

            var companyData = "companyName=" + $scope.companyData.companyName + "&masterMargin=" + $scope.companyData.masterMargin 
              + "&addressOne=" + $scope.companyData.addressOne + "&addressTwo=" + $scope.companyData.addressTwo + "&city=" + $scope.companyData.city + "&state=" 
              + $scope.companyData.state + "&country=" + $scope.companyData.country + "&zipcode=" + $scope.companyData.zipcode + "&internalNote=" 
              + $scope.companyData.internalNote + "&certificateType=" + $scope.companyData.certificateType + "&baseTenant=" + $scope.companyData.baseTenant
              + "&fuelerlinxCustomer=" + $scope.companyData.fuelerlinxCustomer + "&contractFuelVendor=" + $scope.companyData.contractFuelVendor 
              + "&activate=" + $scope.companyData.activate + "&baseIcao=" + $scope.companyData.baseIcao + "&companyId=" + companyId;

            ViewCompanyService.updateContact(companyData).then(function(result) {
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
          ViewCompanyService.sendMail(companyId).then(function(result) {
              if(result != null && result.success){
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
                $('#confirm1').css('display', 'none');
              }else{
                toastr.error(''+result.statusText+'', {
                  closeButton: true
                })
              }
          })
        }

        $scope.openConfirmMail = function(){
          $('#confirm1').css('display', 'block');
        }


        $scope.cancelAndCloseConfirm = function(){
          $('#confirm1').css('display', 'none');
        }

        $scope.cancelPrimaryContact = function(){
          $('#primaryContact').css('display', 'none');
        }

        $scope.checkPrimaryContact = function(){
          if($scope.primaryContact == true){
            ViewCompanyService.checkPrimaryContact(companyId).then(function(result) {
              console.log(result)
              if(result.status == 422){
                $('#primaryContact').css('display', 'block');
              }
            })
          }
        }

        $scope.sendPrimaryContact = function(){
          $scope.primaryContact = true;
          $('#primaryContact').css('display', 'none');
          if($scope.primayData.id != null || $scope.primayData.id != undefined){
            var priamryContactData = "companyContactId=" + $scope.primayData.id + "&primary=" + $scope.primaryContact;

            ViewCompanyService.addPrimaryContact(priamryContactData).then(function(result) {
              console.log(result)
            })
          }
          
        }

        var contactName = '';
        $scope.addCustom = function(value){
          console.log(value)
          if(value != null){
            contactName = value;
            $('#customField').css('display', 'block');
          }
          
        }
        $scope.acceptCustomField = function(){
          console.log(contactName)
          if(contactName == 'phone'){
            var customData = "companyId=" + companyId + "&contactNumber=" + $scope.custom.content 
              + "&title=" + $scope.custom.title;
          }else{
            var customData = "companyId=" + companyId + "&email=" + $scope.custom.content 
              + "&title=" + $scope.custom.title;
          }
          ViewCompanyService.addCustomField(customData).then(function(result) {
            console.log(result)
            if(result != null && result.success){
              $('#customField').css('display', 'none');
            }
          })

        }
        
  }]);