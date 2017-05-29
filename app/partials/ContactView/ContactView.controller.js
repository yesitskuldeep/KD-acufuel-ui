'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('ContactViewController', ['$scope', '$uibModal', 'ContactViewService', 'ViewCompanyService', 'ViewcontactService', function($scope, $uibModal, ContactViewService, ViewCompanyService, ViewcontactService) {
        
        $(document).ready(function() {
            $('#contacts').DataTable();
        });
        
        ContactViewService.getContacts().then(function(result) {
        	console.log('==========',result);
        	$scope.contactList = result;
          
        })

        $scope.changePriceEmail = function(id, index){
          event.stopPropagation();
          var contactId = id;
          console.log($scope.contactList[index].priceEmail)
          var statusData = "status=" + $scope.contactList[index].priceEmail;
          ViewcontactService.changePriceEmail(contactId, statusData).then(function(result) {
              if(result.success){
                  toastr.success(''+result.success+'', {
                      closeButton: true
                  })
              }
          })
        }
        
        ContactViewService.getCompanies().then(function(result) {
        	console.log('==========',result);
        	$scope.companies = result;
          
        })
        
        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.addContact = function(){
          console.log('==== $scope.data======', $scope.data);
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

    }]);