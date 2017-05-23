'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('ContactViewController', ['$scope', '$uibModal', 'ContactViewService', 'ViewCompanyService', function($scope, $uibModal, ContactViewService, ViewCompanyService) {
      	$(function() {
      		$('#toggle-one120').bootstrapToggle();
      		$('#toggle-two21').bootstrapToggle();
        }) 
        
        $(document).ready(function() {
            $('#contacts').DataTable();
        });
        
        ContactViewService.getContacts().then(function(result) {
        	console.log('==========',result);
        	$scope.contactList = result;
          for(var i=0; i<$scope.contactList.length; i++){
            console.log("adadas")
            $scope.contactList[i].value = ""
            console.log($scope.contactList[i].priceEmail)
            if($scope.contactList[i].priceEmail == 'true'){
                console.log(aaya)
                $scope.contactList[i].value = 'on';
            }else{
                console.log("nai")
                $scope.contactList[i].value = 'off'
            }

            $('#toggle-one12'+ [i]).bootstrapToggle($scope.contactList[i].value)
          }
          console.log($scope.contactList)
          
        })
        
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