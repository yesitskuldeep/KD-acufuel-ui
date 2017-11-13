
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('ViewFuelVendorController', ['$scope','$uibModal', '$stateParams', 'ViewFuelVendorService', 'CustomersService', 'ViewCompanyService', 'updateFuelManagerService', function($scope , $uibModal, $stateParams, ViewFuelVendorService, CustomersService, ViewCompanyService, updateFuelManagerService) {
        $scope.data = {};
        $scope.data.priceEmail = true;
        $scope.primayData = {};
        $scope.showLoader = false;
        $scope.showUpdateBtn = false;
        $scope.userProfileId = JSON.parse(localStorage.getItem('userProfileId'));

        $(document).ready(function() {
            $("#reset").click(function() {
                $("input").val("");
            });
        });

        var vendorId = $stateParams.id;
        $scope.vendorData = {};
        getVendorDetail();

        function getVendorDetail(){
          ViewFuelVendorService.getFuelOrder(vendorId).then(function(result) {
            $scope.vendorData = result;
            if(result.margin != null){
                 $scope.vendorData.masterMargin = result.margin.id;
            }
            if(result.marginAVGAS != null){
                $scope.vendorData.avgasMargin = result.marginAVGAS.id;
            }
          })
        }
        

        $scope.changeCompanyStatus = function(){
            $('#deleteVendor').css('display', 'block');
            if($scope.vendorData.activate == true){
              $scope.statusMessage = 'Please confirm! Are you sure you want to ACTIVATE this Vendor?'
            }else{
              $scope.statusMessage = 'Please confirm! Are you sure you want to DEACTIVATE this Vendor?'
            }
        }

        $scope.companyStatus = function(){
            var statusData = "status=" + $scope.vendorData.activate;
            ViewFuelVendorService.changeStatus(vendorId, statusData).then(function(result) {
              if(result.success){
                  $('#deleteVendor').css('display', 'none');
                  toastr.success(''+result.success+'', {
                      closeButton: true
                  })
                  getContactList();
              }
            })
        }

        $scope.cancelStatus = function(){
            $('#deleteVendor').css('display', 'none');
            $scope.vendorData.activate =  !$scope.vendorData.activate;
        }

        getContactList();
        function getContactList(){
          ViewFuelVendorService.getContact(vendorId).then(function(result) {
            $scope.vendorContactList = result;
          })
        }

        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.addContact = function(){
          $scope.data.companyId = vendorId;
          $scope.contactData.contactList.push($scope.data);
          ViewFuelVendorService.addContact($scope.contactData).then(function(result) {
            if(result.status == 200){
                $('#contact-modal-3').modal('hide');
                $scope.primayData.id = result.data;
                $scope.sendPrimaryContact();
                $scope.contactData.contactList = [];
                $scope.data = {};
                getContactList();
            }else{
              toastr.error(''+result.statusText+'', {
                  closeButton: true
                })
            }
          })
        }

        $scope.showNoteData = true;
        $scope.showCompanyName = true;
        $scope.showAddress = true;
        $scope.showNote = function(){
          $scope.showNoteData = false;
          $scope.showUpdateBtn = true;
        }

        $scope.company = function(){
          $scope.showCompanyName = false;
          $scope.showUpdateBtn = true;
        }

        $scope.addressChange = function(){
          $scope.showAddress = false;
          $scope.showUpdateBtn = true;
        }

        $scope.editData = function(inputName) {
            console.log($scope.vendorData)
            $scope.showLoader = true;
            // if(inputName == 'showNoteData'){
            //   $scope.showNoteData = true;
            // }else if(inputName == 'showCompanyName'){
            //   $scope.showCompanyName = true;
            // }else if(inputName == 'showAddress'){
            //   $scope.showAddress = true;              
            // }
            $scope.showNoteData = true;
            $scope.showCompanyName = true;
            $scope.showAddress = true;

            var vendorData = "vendorName=" + $scope.vendorData.vendorName + "&masterMargin=" + $scope.vendorData.masterMargin 
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
                $scope.showUpdateBtn = false;
              }else{
                toastr.error(''+result.statusText+'', {
                  closeButton: true
                })
                $scope.showUpdateBtn = true;
              }
              $scope.showLoader = false;
            })
            
        }

        $scope.cancelData = function(){
            $scope.showNoteData = true;
            $scope.showCompanyName = true;
            $scope.showAddress = true;
            $scope.showUpdateBtn = false;
        }

        $scope.sendMail = function(){
          $('#confirm2').css('display', 'none');
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

        $scope.primaryContact = false;
        $scope.cancelPrimaryContact = function(){
          $('#primaryContact').css('display', 'none');
          $scope.primaryContact = false;
        }

        $scope.checkPrimaryContact = function(){
          if($scope.primaryContact == true){
            $scope.primaryContact = true;
            ViewFuelVendorService.checkPrimaryContact(vendorId).then(function(result) {
              console.log(result)
              if(result.status == 422){
                $('#primaryContact').css('display', 'block');
              }
            })
          }
        }

        $scope.sendPrimaryContact = function(){
          $('#primaryContact').css('display', 'none');
          if($scope.primayData.id != null || $scope.primayData.id != undefined){
            var priamryContactData = "vendorContactId=" + $scope.primayData.id + "&primary=" + $scope.primaryContact;

            ViewFuelVendorService.addPrimaryContact(priamryContactData).then(function(result) {
              console.log(result)
            })
          }
          
        }

        var newContactName = "";
        $scope.updateData = ""
        $scope.showContact = function(data, value){
          $('#updateContact').css('display', 'block');
          $scope.updateData = data;
          newContactName = value;
          console.log($scope.updateData)
          if($scope.updateData.email == null){
            $scope.updateData.content = data.contactNumber;
          }else{
            $scope.updateData.content = data.email;
          }
        }

        $scope.acceptUpdateField = function(){
          console.log($scope.updateData)
          if($scope.updateData.content == undefined){
            toastr.error('Please add some content', {
              closeButton: true
            })
          }else{
            if(newContactName == 'phone'){
              var updateCustomData = "vendorId=" + vendorId + "&contactNumber=" + $scope.updateData.content + "&contactId=" + $scope.updateData.id
                + "&title=" + $scope.updateData.title;
            }else{
              var updateCustomData = "vendorId=" + vendorId + "&email=" + $scope.updateData.content + "&contactId=" + $scope.updateData.id
                + "&title=" + $scope.updateData.title;
            }
            ViewFuelVendorService.updateCustomField(updateCustomData).then(function(result) {
              console.log(result)
              if(result != null && result.success){
                $('#updateContact').css('display', 'none');
                getVendorDetail();
              }
            })
          }
        }

        $scope.cancelUpdateField = function(){
          $('#updateContact').css('display', 'none');
        }

        $scope.showEditTier2 = function(number){
          console.log(number)
          $scope.contactNumber = number;
        }



        var contactName = '';
        $scope.addCustom = function(value){
          console.log(value)
          if(value != null){
            contactName = value;
            $('#customField').css('display', 'block');
          }
          $scope.custom = {};
        }

        $scope.cancelCustomField = function(){
          $('#customField').css('display', 'none');
        }
        
        $scope.acceptCustomField = function(){
          if($scope.custom.content == undefined){
            toastr.error('Please add some content', {
              closeButton: true
            })
          }else{
            if(contactName == 'phone'){
              var customData = "vendorId=" + vendorId + "&contactNumber=" + $scope.custom.content 
                + "&title=" + $scope.custom.title;
            }else{
              var customData = "vendorId=" + vendorId + "&email=" + $scope.custom.content 
                + "&title=" + $scope.custom.title;
            }
            ViewFuelVendorService.addCustomField(customData).then(function(result) {
              console.log(result)
              if(result.status == 200){
                $('#customField').css('display', 'none');
                getVendorDetail();
              }
            })
          }
        }

        updateFuelManagerService.getFuelPricingNew().then(function(result) {
          $scope.fuelPricing = result;
          for (var i = 0; i<$scope.fuelPricing.length; i++) {
            if ($scope.fuelPricing[i].fuelPricing.expirationDate != null) {
                $scope.fuelPricing[i].fuelPricing.expirationDate = new Date($scope.fuelPricing[i].fuelPricing.expirationDate);
                var newTime = new Date($scope.fuelPricing[i].fuelPricing.expirationDate);
                var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                var dday = newTime.getUTCDate();
                var dyear = newTime.getUTCFullYear();
                $scope.fuelPricing[i].fuelPricing.expirationDate = dmonth+'/'+dday+'/'+dyear;
            }
          }
        })

        
        CustomersService.getJetMargin($scope.userProfileId).then(function(result) {
          $scope.jetMarginList = result;
        })

        CustomersService.getAvgMargin($scope.userProfileId).then(function(result) {
          $scope.avgsMarginList = result;
        })

         $scope.changePriceEmail = function(id, index){
            event.stopPropagation();
            var contactId = id;
            var statusData = "status=" + $scope.vendorContactList[index].priceEmail;
            ViewFuelVendorService.changePriceEmail(contactId, statusData).then(function(result) {
                if(result.success){
                    $('#toogleMail').css('display', 'block');
                    if($scope.vendorContactList[index].priceEmail == true){
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
          
          $scope.updateOmit = function(fuel, omit) {
        	  $scope.fuelData = {};
        	  $scope.fuelData.expirationDate = new Date(fuel.expirationDate);
        	  $scope.fuelData.id = fuel.id;
        	  $scope.fuelData.omit = fuel.omit;
        	  $scope.fuelData.papMargin = fuel.papMargin;
        	  $scope.fuelData.papTotal = fuel.papTotal;
        	  $scope.fuelData.cost = fuel.cost;
        	  ViewFuelVendorService.omitFuelPricing($scope.fuelData).then(function(result) {
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

  }]);