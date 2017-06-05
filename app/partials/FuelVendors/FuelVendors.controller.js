'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('FuelVendorsController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'FuelVendorsService', 'CustomersService', 'ViewFuelVendorService', FuelVendorsController]);

	function FuelVendorsController($scope, $rootScope, $uibModal, $filter, $http, FuelVendorsService, CustomersService, ViewFuelVendorService) {

		$(document).ready(function() {
		    $('#example').DataTable();
		});
		$scope.userProfileId = JSON.parse(localStorage.getItem('userProfileId'))
		$scope.reset = function(){
			$("input").val("");
		}
		
		$scope.data = {};
		$scope.data.activate = true;
		$scope.showLoader = false;
		getAllVendor();

		function getAllVendor(){
			FuelVendorsService.getAllVendor().then(function(result) {
				console.log(result)
				$scope.vendorList = result;
				for(var i=0; i<$scope.vendorList.length; i++){
					$scope.vendorList[i].masterMargin = $scope.vendorList[i].margin.id;
				}
			})
		}
		
        $scope.editMargin = function(vendor){
        	console.log(vendor.masterMargin)

        	var companyMargin = "vendorName=" + vendor.vendorName + "&masterMargin=" + vendor.masterMargin 
              + "&addressOne=" + vendor.addressOne + "&addressTwo=" + vendor.addressTwo + "&city=" + vendor.city + "&state=" 
              + vendor.state + "&country=" + vendor.country + "&zipcode=" + vendor.zipcode + "&internalNote=" 
              + vendor.internalNote + "&certificateType=" + vendor.certificateType + "&baseTenant=" + vendor.baseTenant
              + "&fuelerlinxvendor=" + vendor.fuelerlinxvendor + "&contractFuelVendor=" + vendor.contractFuelVendor 
              + "&activate=" + vendor.activate + "&baseIcao=" + vendor.baseIcao + "&vendorId=" + vendor.id;

        	ViewFuelVendorService.updateContact(companyMargin).then(function(result) {
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
	          	})
    	 	}
    	 	$('#vendor-modal-3').modal('hide');
	    }

    }