'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('FuelVendorsController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'FuelVendorsService', 'CustomersService', 'ViewFuelVendorService', 'NgTableParams', FuelVendorsController]);

	function FuelVendorsController($scope, $rootScope, $uibModal, $filter, $http, FuelVendorsService, CustomersService, ViewFuelVendorService, NgTableParams) {

		$(document).ready(function() {
		    $('#example').DataTable();
		});
		$scope.userProfileId = JSON.parse(localStorage.getItem('userProfileId'))
		$scope.reset = function(){
			$("input").val("");
			$scope.removeMarginValidation();
		}
		
		$scope.data = {};
		$scope.data.activate = true;
		$scope.showLoader = false;
		getAllVendor();

		function getAllVendor(){
			FuelVendorsService.getAllVendor().then(function(result) {
				console.log(result)
				$scope.companyList = result;
				for (var i = 0; i < $scope.companyList.length; i++) {
					if ($scope.companyList[i].companyContact != null) {
						if ($scope.companyList[i].companyContact.contactNumber != null || $scope.companyList[i].companyContact.contactNumber != undefined) {
							$scope.companyList[i].newContactNumber = $scope.companyList[i].companyContact.contactNumber;
						}
					}
					if ($scope.companyList[i].primaryContact != null) {
						if ($scope.companyList[i].primaryContact.firstName != null && $scope.companyList[i].primaryContact.lastName != null) {
							$scope.companyList[i].primaryContactName = $scope.companyList[i].primaryContact.firstName + ' ' + $scope.companyList[i].primaryContact.lastName;
						}
					}
					if ($scope.companyList[i].margin != null) {
						if ($scope.companyList[i].margin.marginName != null) {
							$scope.companyList[i].masterMargin = $scope.companyList[i].margin.id;
						}
					}
					$scope.companyList[i].source = "Vendor"
				}
				$scope.displayVendorList = new NgTableParams({
		        page: 1,
		        count: 10,
		      }, {
		        data: $scope.companyList
		      });
			})
		}
		
        $scope.editMargin = function(vendor){
        	console.log(vendor.masterMargin)
        	$scope.showLoader = true;
        	var companyMargin = "vendorName=" + vendor.vendorName + "&masterMargin=" + vendor.masterMargin 
              + "&addressOne=" + vendor.addressOne + "&addressTwo=" + vendor.addressTwo + "&city=" + vendor.city + "&state=" 
              + vendor.state + "&country=" + vendor.country + "&zipcode=" + vendor.zipcode + "&internalNote=" 
              + vendor.internalNote + "&certificateType=" + vendor.certificateType + "&baseTenant=" + vendor.baseTenant
              + "&fuelerlinxvendor=" + vendor.fuelerlinxvendor + "&contractFuelVendor=" + vendor.contractFuelVendor 
              + "&activate=" + vendor.activate + "&baseIcao=" + vendor.baseIcao + "&vendorId=" + vendor.id;

        	ViewFuelVendorService.updateContact(companyMargin).then(function(result) {
              if(result != null && result.success){
            	$scope.showLoader = false;
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
              }else{
            	  $scope.showLoader = false;
                toastr.error(''+result.statusText+'', {
                  closeButton: true
                })
              }
            })
        }

		// CustomersService.getMargin().then(function(result) {
		//   $scope.marginList = result;
		// })

		CustomersService.getJetMargin($scope.userProfileId).then(function(result) {
		  $scope.jetMarginList = result;
		})

		CustomersService.getAvgMargin($scope.userProfileId).then(function(result) {
		  $scope.avgsMarginList = result;
		})

		$scope.showCompanyError = false;
		$scope.showMarginError = false;

		$scope.removeValidation = function(){
			$scope.showCompanyError = false;
	    	$('.companyNameInput').removeClass('customErrorInput');
		}

		$scope.removeMarginValidation = function(){
			$scope.showMarginError = false;
	    	$('.marginSelectBox').removeClass('customErrorInput');
		}
		
		$scope.marginFilterOptions = [];
		CustomersService.getJetMargin($scope.userProfileId).then(function(result) {
		  $scope.jetMarginList = result;
		  $scope.marginFilterOptions.push({
		  	'id': '', 'title': 'Show All'
		  });
		  for (var i = 0; i < result.length; i++) {
		  	$scope.marginFilterOptions.push({
		  		'id': result[i].id,
		  		'title': result[i].marginName
		  	})
		  }
		})
		      
	    $scope.addFirstData = function(sel, step){
	    	// console.log($scope.data)
	    	if($scope.data.vendorName == undefined){
	    		$scope.showCompanyError = true;
	    		$('.companyNameInput').addClass('customErrorInput');
	    	}else if($scope.data.masterMargin == undefined){
	    		$scope.showMarginError = true;
	    		$('.marginSelectBox').addClass('customErrorInput');
	    	}else{
		    	var vendorData = "vendorName=" + $scope.data.vendorName + "&masterMargin=" + $scope.data.masterMargin 
		    	+ "&addressOne=" + $scope.data.addressOne + "&addressTwo=" + $scope.data.addressTwo + "&city=" + $scope.data.city + "&state=" 
		    	+ $scope.data.state + "&country=" + $scope.data.country + "&zipcode=" + $scope.data.zipcode + "&internalNote=" 
		    	+ $scope.data.internalNote + "&certificateType=" + $scope.data.certificateType + "&baseTenant=" + $scope.data.baseTenant
		    	+ "&fuelerlinxCustomer=" + $scope.data.fuelerlinxCustomer + "&contractFuelVendor=" + $scope.data.contractFuelVendor 
		    	+ "&activate=" + $scope.data.activate + "&baseIcao=" + $scope.data.baseIcao;

		    	FuelVendorsService.addVendor(vendorData).then(function(result) {
	            	console.log("result",result)
	            	$scope.accountId = result;
	            	$('#vendor-modal-3').modal('hide');
			    	getAllVendor();
	          	})
    	 	}
    	 	
	    }
		
		$scope.exportVendors = function() {
			$scope.showLoader = true;
	    	var fileName = "vendors.csv";
	    	var a = document.createElement("a");
	    	document.body.appendChild(a);
	    	FuelVendorsService.exportVendors().then(function(result) {
    	        var file = new Blob([result], {type: 'application/csv'});
    	        var fileURL = URL.createObjectURL(file);
    	        a.href = fileURL;
    	        a.download = fileName;
    	        a.click();
    	        $scope.showLoader = false;
	    	 })
	    }

    }