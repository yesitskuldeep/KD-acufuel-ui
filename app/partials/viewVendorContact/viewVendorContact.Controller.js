'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewVendorContactController', ['$scope', '$stateParams', '$state', 'ViewvendorContactService', 'ViewFuelVendorService', function($scope, $stateParams, $state, ViewvendorContactService, ViewFuelVendorService) {
        $scope.showLoader = true;
        $scope.showUpdateBtn = false;
	    var contactId = $stateParams.id;
	    $scope.contactDetail = {};
        var contactCompanyId = "";
        ViewvendorContactService.getContact(contactId).then(function(result) {
          $scope.contactDetail = result;
          $scope.showLoader = false;
          contactCompanyId = result.owner.id;
        })

        $scope.contactIdList = {};
        var index;
        var one = 1;
        var selectedId;

        ViewvendorContactService.getContactsList(contactId).then(function(list){
        	$scope.contactIdList = list;
			index = $scope.contactIdList.indexOf(contactId);
			selectedId = $scope.contactIdList[index];
        })
        
        $scope.nextContact = function(){
            $scope.showLoader = true;
        	index = index + one;
        	selectedId = $scope.contactIdList[index];
		        ViewvendorContactService.getContact(selectedId).then(function(result) {
			    $scope.contactDetail = result;
                $scope.showLoader = false;
			})
        }

        $scope.prevContact = function(){
            $scope.showLoader = true;
        	index = index - one;
        	selectedId = $scope.contactIdList[index];
		        ViewvendorContactService.getContact(selectedId).then(function(result) {
			       $scope.contactDetail = result;
                   $scope.showLoader = false;
			})
        }

        $scope.changePriceEmail = function(id){
            var statusData = "status=" + $scope.contactDetail.priceEmail;
            ViewvendorContactService.changePriceEmail(id, statusData).then(function(result) {
                if(result.success){
                    $('#toogleMail').css('display', 'block');
                    if($scope.contactDetail.priceEmail == true){
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
            $scope.showUpdateBtn = true;
        }
        $scope.addressEdit = function(){
        	$scope.editAddress = false;
            $scope.showUpdateBtn = true;
        }
        $scope.phoneEdit = function(){
        	$scope.editPhone = false;
            $scope.showUpdateBtn = true;
        }
        $scope.mobileEdit = function(){
        	$scope.editMobile = false;
            $scope.showUpdateBtn = true;
        }
        $scope.emailEdit = function(){
        	$scope.editEmail = false;
            $scope.showUpdateBtn = true;
        }
        $scope.notesEdit = function(){
        	$scope.editContactNotes = false;
            $scope.showUpdateBtn = true;
        }

        $scope.conData = {};
        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.updateContact = function(data){
            $scope.showLoader = true;
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
	        ViewvendorContactService.updateContact($scope.contactData).then(function(result) {
	        	if(result.success){
	            	toastr.success(''+result.success+'', {
	            		closeButton: true
	            	})
                    $scope.showUpdateBtn = false;
	            }else{
	            	toastr.error(''+result.statusText+'', {
	                	closeButton: true
	                })
	            }
                $scope.showLoader = false;
	        })
        }

        $scope.cancelContact = function(){
            $scope.editName = true;
            $scope.editCompany = true;
            $scope.editAddress = true;
            $scope.editPhone = true;
            $scope.editMobile = true;
            $scope.editEmail = true;
            $scope.editContactNotes = true;
            $scope.showUpdateBtn = false;
        }

        $scope.checkPrimaryContact = function(companyId){
            if($scope.contactDetail.primaryContact == true){
            ViewFuelVendorService.checkPrimaryContact(companyId).then(function(result) {
              console.log(result)
              if(result.status == 422){
                $('#primaryContact').css('display', 'block');
              }
            })
          }
        }

        $scope.cancelPrimaryContact = function(){
          $('#primaryContact').css('display', 'none');
          $scope.contactDetail.primaryContact = false;
          console.log($scope.contactDetail.primaryContact)
        }

        $scope.sendPrimaryContact = function(id){
          $('#primaryContact').css('display', 'none');
            var priamryContactData = "vendorContactId=" + id + "&primary=" + $scope.contactDetail.primaryContact;

            ViewFuelVendorService.addPrimaryContact(priamryContactData).then(function(result) {
              console.log(result)
            })
          
        }

        var deleteContact = "";
        $scope.deleteContact = function(id){
            $('#delete2').css('display', 'block');
            deleteContact = id;
        }

        $scope.contactDelete = function(){
          ViewvendorContactService.deleteContact(deleteContact).then(function(result) {
            console.log(result)
            if(result.success){
                deleteContact = "";
                $('#delete2').css('display', 'none');
                toastr.success(''+result.success+'', {
                    closeButton: true
                })
                $state.go('app.viewFuelVendor', {"id": contactCompanyId});
            }
            
          })
        }

        $scope.cancelDelete = function(){
            $('#delete2').css('display', 'none');
        }
  
    }]);
