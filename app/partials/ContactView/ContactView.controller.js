'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('ContactViewController', ['$scope', '$uibModal', 'ContactViewService', 'ViewCompanyService', 'ViewcontactService', 'NgTableParams', function($scope, $uibModal, ContactViewService, ViewCompanyService, ViewcontactService, NgTableParams) {
        
       /* $(document).ready(function() {
          $scope.showLoader = true;
           // $('#contacts').DataTable();
            $scope.showLoader = false;
        });*/
        
       /* ContactViewService.getContacts().then(function(result) {
          $scope.showLoader = true;
        	$scope.contactList = result;
          $scope.showLoader = false;
        })*/

        $scope.search = "";
        $scope.minlength = 2;
         

        $scope.searchString= function(value){
         ContactViewService.getSearchResults(value).then(function(result) {
        	$scope.contactList = result;
          console.log("result", result);
          	for (var i = 0; i < $scope.contactList.length; i++) {
                if ($scope.contactList[i].owner != null) {
                  if ($scope.contactList[i].owner.companyName != null || $scope.contactList[i].owner.companyName != undefined) {
                    $scope.contactList[i].owner = $scope.contactList[i].owner.companyName;
                  }
                }
              }
              $scope.displayContactList = new NgTableParams({
                  page: 1,
                  count: 10,
                }, {
                  data: $scope.contactList
                });
        })
        }

        $scope.reset = function(){
          $("input").val("");
        }
        
        $scope.data = {};
		    getAllContacts();

        $scope.changePriceEmail = function(id, index){
          
          event.stopPropagation();
          var contactId = id;
          var statusData = "status=" + $scope.contactList[index].priceEmail;
          ViewcontactService.changePriceEmail(contactId, statusData).then(function(result) {
              if(result.success){
                  $('#toogleMail').css('display', 'block');
                  if($scope.contactList[index].priceEmail == true){
                    $scope.messageText = 'You have enabled price distribution for this contact';
                  }else{
                    $scope.messageText = 'You have disabled price distribution for this contact';
                  }
              }
          })

        }

        $scope.cancelToogle = function(){
          $('#toogleMail').css('display', 'none');
        }
        
        
        function getAllContacts(){
          $scope.showLoader = true;
          ContactViewService.getContacts().then(function(result) {
            console.log('log', result);
            $scope.contactList = result;
            for (var i = 0; i < $scope.contactList.length; i++) {
            	if ($scope.contactList[i].owner != null) {
            		if ($scope.contactList[i].owner.companyName != null || $scope.contactList[i].owner.companyName != undefined) {
            			$scope.contactList[i].owner = $scope.contactList[i].owner.companyName;
            		}
            	}
            }
            $scope.displayContactList = new NgTableParams({
              page: 1,
              count: 10,
            }, {
              data: $scope.contactList
            });
          })
          $scope.showLoader = false;
	    }
        
        
        ContactViewService.getCompanies().then(function(result) {
          $scope.showLoader = true;
        	$scope.companies = result;
          $scope.showLoader = false;
          
        })
        
        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.addContact = function(){
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
        
		$scope.exportContacts = function() {
			$scope.showLoader = true;
	    	var fileName = "contacts.csv";
	    	var a = document.createElement("a");
	    	document.body.appendChild(a);
	    	ContactViewService.exportContacts().then(function(result) {
    	        var file = new Blob([result], {type: 'application/csv'});
    	        var fileURL = URL.createObjectURL(file);
    	        a.href = fileURL;
    	        a.download = fileName;
    	        a.click();
    	        $scope.showLoader = false;
	    	 })
	    }

    }]);