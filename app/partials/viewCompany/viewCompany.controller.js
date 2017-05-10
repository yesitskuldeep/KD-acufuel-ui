
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewCompanyController', ['$scope','$uibModal', '$stateParams', 'ViewCompanyService', 'CustomersService', function($scope , $uibModal, $stateParams, ViewCompanyService, CustomersService) {
        $scope.data = {};
        $scope.data.priceEmail = true;
        $scope.aircraft = {};
        // $scope.open = function(){
        //     $scope.editSmsModal = $uibModal.open({
        //         templateUrl: 'partials/NewCompany/NewCompany.html',
        //         backdrop: true,
        //         scope: $scope,
        //     })
        // }

        $(function() {
         $('#toggle-one2').bootstrapToggle();
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

        var companyId = $stateParams.id;
        ViewCompanyService.getCompany(companyId).then(function(result) {
          $scope.companyData = result;
        })

        ViewCompanyService.getContact(companyId).then(function(result) {
          $scope.companyContactList = result;
        })

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
            if(result.success){
              toastr.success(''+result.success+'', {
                  closeButton: true
                })
                $('#contact-modal-3').modal('hide');
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
            'size' : ''
        }];
    
        $scope.addNew = function(){
            $scope.aircraftDetails.push({ 
              'tail':'',
              'make': '',
              'model': '',
              'size' : ''
            });
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
                'size' : $scope.aircraftDetails[i].size
              });
          }
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
        $scope.showNote = function(){
          $scope.showNoteData = false;
        }

        $scope.company = function(){
          $scope.showCompanyName = false;
        }

        $scope.editData = function(inputName) {
            if(inputName == 'showNoteData'){
              $scope.showNoteData = true;
            }else if(inputName == 'showCompanyName'){
              $scope.showCompanyName = true;
            }
            
        }

  }]);