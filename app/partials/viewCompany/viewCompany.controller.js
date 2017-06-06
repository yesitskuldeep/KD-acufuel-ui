
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewCompanyController', ['$scope','$uibModal', '$stateParams', 'ViewCompanyService', 'CustomersService', 'updateFuelManagerService', 'ViewcontactService', function($scope , $uibModal, $stateParams, ViewCompanyService, CustomersService, updateFuelManagerService, ViewcontactService) {
        $scope.data = {};
        $scope.data.priceEmail = true;
        $scope.aircraft = {};
        $scope.primayData = {};
        $scope.showLoader = false;
        $scope.showLoader = true;
        $scope.showUpdateBtn = false;
        $scope.userProfileId = JSON.parse(localStorage.getItem('userProfileId'));

        $(document).ready(function() {
            $("#reset").click(function() {
                $("input").val("");
            });
        });

        CustomersService.getMargin().then(function(result) {
          $scope.marginList = result;
        })

        var value = "";
        var companyId = $stateParams.id;
        $scope.companyData = {};
        $scope.multipleMsg = false;
        $scope.companyData.masterMargin = "";
        getCompanyDetail();
        function getCompanyDetail(){
          ViewCompanyService.getCompany(companyId).then(function(result) {
            $scope.companyData = result;
            if(result.margin != null){
               $scope.companyData.masterMargin = result.margin.id;
            }
            if(result.marginAVGAS != null){
                $scope.companyData.avgasMargin = result.marginAVGAS.id;
             }
            getAircraftList();
            $scope.showLoader = false;
          })
        }
        

        $scope.changeCompanyStatus = function(){
            $('#delete3').css('display', 'block');
            if($scope.companyData.activate == true){
              $scope.statusMessage = 'Please confirm! Are you sure you want to ACTIVATE this company?'
            }else{
              $scope.statusMessage = 'Please confirm! Are you sure you want to DEACTIVATE this company?'
            }
        }

        $scope.companyStatus = function(){
            var statusData = "status=" + $scope.companyData.activate;
            ViewCompanyService.changeStatus(companyId, statusData).then(function(result) {
              if(result.success){
                  $('#delete3').css('display', 'none');
                  toastr.success(''+result.success+'', {
                      closeButton: true
                  })
              }
            })
        }

        $scope.cancelStatus = function(){
            $('#delete3').css('display', 'none');
            $scope.companyData.activate =  !$scope.companyData.activate;
        }
        
        getContactList();
        function getContactList(){
          ViewCompanyService.getContact(companyId).then(function(result) {
            $scope.companyContactList = result;
          })
        }
        $scope.aircraftmargins = [];
       
        function getAircraftList(){
          ViewCompanyService.getAircraft(companyId).then(function(result) {
            $scope.contactAircraftList = result;
            for (var i = 0; i < $scope.contactAircraftList.length; i++) {
            	if($scope.contactAircraftList[i].aircraftsMargin != null){
            		$scope.aircraftmargins.push({
            			'id': $scope.contactAircraftList[i].aircraftsMargin.id
            		})
            	}
            }
            if($scope.aircraftmargins.length > 0) {
            	for (var i = 0; i < $scope.aircraftmargins.length; i++) {
                	if($scope.aircraftmargins[i].id != $scope.companyData.masterMargin){
                		$scope.multiple = true;
                		$scope.multipleMsg = true;
                        if($scope.multiple) {
                      		$scope.companyData.masterMargin = "multiple";
                        }
                	}
                }
            }
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
      
      $scope.clearAircrafts = function(){
        $scope.aircraftDetails = [];
        $scope.aircraftDetails = [{ 
            'tail':'',
            'make': '',
            'model': '',
            'sizeId' : '',
            'marginId': '',
        	'avgasMarginId': ''
        }];
      }
    
      $scope.addNew = function(){
          $scope.aircraftDetails.push({ 
            'tail':'',
            'make': '',
            'model': '',
            'sizeId' : '',
            'marginId': '',
        	'avgasMarginId': ''
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
      $scope.saveCompanyData = function(){
        for(var i=0; i<$scope.aircraftDetails.length;i++){
          $scope.addData = [];
          $scope.addData.push({ 
              'tail': $scope.aircraftDetails[i].tail,
              'make': $scope.aircraftDetails[i].make,
              'model': $scope.aircraftDetails[i].model,
              'sizeId' : $scope.aircraftDetails[i].sizeId,
              'marginId': $scope.aircraftDetails[i].marginId,
	          'avgasMarginId': $scope.aircraftDetails[i].avgasMarginId
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
        $scope.showUpdateBtn = true;
      }

      $scope.company = function(){
        $scope.showCompanyName = false;
        $scope.showUpdateBtn = true;
      }

      $scope.base = function(){
        $scope.showUpdateBtn = true;
      }

      $scope.addressChange = function(){
        $scope.showAddress = false;
        $scope.showUpdateBtn = true;
      }

      $scope.editData = function(inputName) {
          console.log($scope.companyData)
          $scope.showLoader = true;
          /*if(inputName == 'showNoteData'){
            $scope.showNoteData = true;
          }else if(inputName == 'showCompanyName'){
            $scope.showCompanyName = true;
          }else if(inputName == 'showAddress'){
            $scope.showAddress = true;              
          }*/
          $scope.showNoteData = true;
          $scope.showCompanyName = true;
          $scope.showAddress = true;

          var companyData = "companyName=" + $scope.companyData.companyName + "&masterMargin=" + $scope.companyData.masterMargin + "&avgasMargin=" + $scope.companyData.avgasMargin
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
        $scope.primaryContact = false;
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
            var updateCustomData = "companyId=" + companyId + "&contactNumber=" + $scope.updateData.content + "&contactId=" + $scope.updateData.id
              + "&title=" + $scope.updateData.title;
          }else{
            var updateCustomData = "companyId=" + companyId + "&email=" + $scope.updateData.content + "&contactId=" + $scope.updateData.id
              + "&title=" + $scope.updateData.title;
          }
          ViewCompanyService.updateCustomField(updateCustomData).then(function(result) {
            console.log(result)
            if(result != null && result.success){
              $('#updateContact').css('display', 'none');
              getCompanyDetail();
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
            var customData = "companyId=" + companyId + "&contactNumber=" + $scope.custom.content 
              + "&title=" + $scope.custom.title;
          }else{
            var customData = "companyId=" + companyId + "&email=" + $scope.custom.content 
              + "&title=" + $scope.custom.title;
          }
          console.log(customData.email)
          ViewCompanyService.addCustomField(customData).then(function(result) {
            console.log(result)
            if(result != null && result.success){
              $('#customField').css('display', 'none');
              getCompanyDetail();
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

      var deleteAircraftId = "";
      $scope.deleteAircraft = function(id){
          $('#delete1').css('display', 'block');
          deleteAircraftId = id;
      }

      $scope.aircraftDelete = function(){
          ViewCompanyService.deleteAircraft(deleteAircraftId).then(function(result) {
            console.log(result)
            getAircraftList();
            $('#delete1').css('display', 'none');
          })
      }

      $scope.cancelDelete = function(){
        $('#delete1').css('display', 'none');
      }
      
    	CustomersService.getJetMargin($scope.userProfileId).then(function(result) {
  		  $scope.jetMarginList = result;
  		})

  		CustomersService.getAvgMargin($scope.userProfileId).then(function(result) {
  		  $scope.avgsMarginList = result;
  		})

       $scope.changePriceEmail = function(id, index){
          event.stopPropagation();
          var contactId = id;
          var statusData = "status=" + $scope.companyContactList[index].priceEmail;
          ViewcontactService.changePriceEmail(contactId, statusData).then(function(result) {
              if(result.success){
                  $('#toogleMail').css('display', 'block');
                  if($scope.companyContactList[index].priceEmail == true){
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
        
  }]);