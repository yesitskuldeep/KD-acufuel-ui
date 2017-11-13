'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewcontactController', ['$scope', '$stateParams', '$state', 'ViewcontactService', 'ViewCompanyService', function($scope, $stateParams, $state, ViewcontactService, ViewCompanyService) {

        $(document).ready(function() {
            $('.animation_select').click( function(){
                $('#animation_box').removeAttr('class').attr('class', '');
                var animation = $(this).attr("data-animation");
                $('#animation_box').addClass('animated');
                $('#animation_box').addClass(animation);
                return false;
            });
        });

        $scope.showLoader = true;
        $scope.showUpdateBtn = false;
	    var contactId = $stateParams.id;
	    $scope.contactDetail = {};
        var contactCompanyId = "";
        ViewcontactService.getContact(contactId).then(function(result) {
          $scope.contactDetail = result;
          $scope.showLoader = false;
          contactCompanyId = result.owner.id;
        })

        $scope.goBack = function(){
            window.history.back();
        }

        $scope.contactIdList = {};
        var index;
        var one = 1;
        var selectedId;

        ViewcontactService.getContactsList(contactId).then(function(list){
        	$scope.contactIdList = list;
			index = $scope.contactIdList.indexOf(contactId);
			selectedId = $scope.contactIdList[index];
        })
        
        $scope.nextContact = function(){
            //$scope.showLoader = true;
        	index = index + one;
        	selectedId = $scope.contactIdList[index];
		        ViewcontactService.getContact(selectedId).then(function(result) {
			    $scope.contactDetail = result;
                //$scope.showLoader = false;
			})
        }

        $scope.prevContact = function(){
            //$scope.showLoader = true;
        	index = index - one;
        	selectedId = $scope.contactIdList[index];
		        ViewcontactService.getContact(selectedId).then(function(result) {
			       $scope.contactDetail = result;
                   //$scope.showLoader = false;
			})
        }

        $scope.changePriceEmail = function(id){
            var statusData = "status=" + $scope.contactDetail.priceEmail;
            ViewcontactService.changePriceEmail(id, statusData).then(function(result) {
                if(result.success){
                    //$('#toogleMail').css('display', 'block');
                    if($scope.contactDetail.priceEmail == true){
                    	toastr.success('You have enabled price distribution for this contact', {
    	            		closeButton: true
    	            	})
                       // $scope.messageText = 'You have enabled price distribution for this contact';
                    }else{
                    	toastr.success('You have disabled price distribution for this contact', {
    	            		closeButton: true
    	            	})
                        //$scope.messageText = 'You have disabled price distribution for this contact';
                    }
                }
            })
        }

        $scope.cancelToogle = function(){
          $('#toogleMail').css('display', 'none');
        }
        $scope.disableNext = true;
        $scope.disablePrev = true;
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
        }, 1);

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
	        ViewcontactService.updateContact($scope.contactData).then(function(result) {
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
            ViewCompanyService.checkPrimaryContact(companyId).then(function(result) {
              console.log(result)
              if(result.status == 422 || result.status == 200){
                $('#primaryContact').css('display', 'block');
              }
            })
          }else{
              var primaryContactData = "companyContactId=" + $scope.contactDetail.id + "&primary=false";

            ViewCompanyService.addPrimaryContact(primaryContactData).then(function(result) {
              console.log(result)
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
            var primaryContactData = "companyContactId=" + id + "&primary=" + $scope.contactDetail.primaryContact;

            ViewCompanyService.addPrimaryContact(primaryContactData).then(function(result) {
              console.log(result)
            })
          
        }

        var deleteContact = "";
        $scope.deleteContact = function(id){
            $('#delete2').css('display', 'block');
            deleteContact = id;
        }

        $scope.contactDelete = function(){
          ViewcontactService.deleteContact(deleteContact).then(function(result) {
            console.log(result)
            if(result.success){
                deleteContact = "";
                $('#delete2').css('display', 'none');
                toastr.success(''+result.success+'', {
                    closeButton: true
                })
                $state.go('app.viewCompany', {"id": contactCompanyId});
            }
            
          })
        }

        $scope.cancelDelete = function(){
            $('#delete2').css('display', 'none');
        }

          $scope.confirmMail = function(){
          
                $('#confirm1').css('display', 'block');
            
        }

        $scope.saveAndCloseConfirm = function(){
            $('#confirm1').css('display', 'none');
            ViewcontactService.sendMailTo(contactId).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
            })
        }
        $scope.cancelAndCloseConfirm = function(){
            $scope.sendEmail = {};
            $scope.sendEmail.pricing = '';
            $('#confirm1').css('display', 'none');
        }
  
    }]);
