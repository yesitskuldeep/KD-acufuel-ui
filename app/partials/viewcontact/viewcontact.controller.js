'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewcontactController', ['$scope', '$stateParams', 'ViewcontactService', 'ViewCompanyService', function($scope, $stateParams, ViewcontactService, ViewCompanyService) {

	    var contactId = $stateParams.id;
	    $scope.contactDetail = {};
        var value = "";
        ViewcontactService.getContact(contactId).then(function(result) {
          $scope.contactDetail = result;
        })

        $scope.contactIdList = {};
        var index;
        var one = 1;
        var selectedId;

        ViewcontactService.getContactsList(contactId).then(function(list){
        	$scope.contactIdList = list;
			index = $scope.contactIdList.indexOf(contactId);
			selectedId = $scope.contactIdList[index]
        })
        
        $scope.nextContact = function(){
        	index = index + one;
        	selectedId = $scope.contactIdList[index];
		        ViewcontactService.getContact(selectedId).then(function(result) {
			    $scope.contactDetail = result;
			})
        }

        $scope.prevContact = function(){
        	index = index - one;
        	selectedId = $scope.contactIdList[index];
		        ViewcontactService.getContact(selectedId).then(function(result) {
			       $scope.contactDetail = result;
			})
        }

        $scope.changePriceEmail = function(id){
            var statusData = "status=" + $scope.contactDetail.priceEmail;
            ViewcontactService.changePriceEmail(id, statusData).then(function(result) {
                if(result.success){
                    toastr.success(''+result.success+'', {
                        closeButton: true
                    })
                }
            })
        }

        setInterval(function(){
        	var checkMaxLength = $scope.contactIdList.length - one;
        	if (index === checkMaxLength) {
        		$scope.disableNext = true;
        	}else{
        		$scope.disableNext = false;
        	}
        	if (index === 0) {
        		$scope.disablePrev = true;
        	}else{
        		$scope.disablePrev = false;
        	}
        }, 3);

        $scope.editName = true;
        $scope.editCompany = true;
        $scope.editAddress = true;
        $scope.editPhone = true;
        $scope.editMobile = true;
        $scope.editEmail = true;
        $scope.editContactNotes = true;

        $scope.nameEdit = function(){
        	$scope.editName = false;
        }
        $scope.addressEdit = function(){
        	$scope.editAddress = false;
        }
        $scope.phoneEdit = function(){
        	$scope.editPhone = false;
        }
        $scope.mobileEdit = function(){
        	$scope.editMobile = false;
        }
        $scope.emailEdit = function(){
        	$scope.editEmail = false;
        }
        $scope.notesEdit = function(){
        	$scope.editContactNotes = false;
        }

        $scope.conData = {};
        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.updateContact = function(data){
        	$scope.editName = true;
	        $scope.editCompany = true;
	        $scope.editAddress = true;
	        $scope.editPhone = true;
	        $scope.editMobile = true;
	        $scope.editEmail = true;
	        $scope.editContactNotes = true;

	        $scope.conData.address = data.address;
	        $scope.conData.email = data.email;
	        $scope.conData.firstName = data.firstName;
	        $scope.conData.id = data.id;
	        $scope.conData.lastName = data.lastName;
	        $scope.conData.mobilePhone = data.mobilePhone;
	        $scope.conData.note = data.note;
	        $scope.conData.password = data.password;
	        $scope.conData.priceEmail = data.priceEmail;
	        $scope.conData.primaryContact = data.primaryContact;
	        $scope.conData.title = data.title;
	        $scope.conData.userName = data.userName;
	        $scope.conData.workPhone = data.workPhone;
	        $scope.conData.companyId = data.owner.id;

	        $scope.contactData.contactList.push($scope.conData);
	        $scope.contactData.contactList.push();
	        ViewcontactService.updateContact($scope.contactData).then(function(result) {
	        	if(result.success){
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

        $scope.checkPrimaryContact = function(companyId){
            if($scope.contactDetail.primaryContact == true){
            ViewCompanyService.checkPrimaryContact(companyId).then(function(result) {
              console.log(result)
              if(result.status == 422){
                $('#primaryContact').css('display', 'block');
              }
            })
          }
        }

        $scope.cancelPrimaryContact = function(){
          $('#primaryContact').css('display', 'none');
        }

        $scope.sendPrimaryContact = function(id){
          $('#primaryContact').css('display', 'none');
            var priamryContactData = "companyContactId=" + id + "&primary=" + $scope.contactDetail.primaryContact;

            ViewCompanyService.addPrimaryContact(priamryContactData).then(function(result) {
              console.log(result)
            })
          
        }
  
    }]);
