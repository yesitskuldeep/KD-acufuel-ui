'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('FuelVendorsController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'FuelVendorsService', 'CustomersService', FuelVendorsController]);

	function FuelVendorsController($scope, $rootScope, $uibModal, $filter, $http, FuelVendorsService, CustomersService) {

		$(document).ready(function() {
		    $('#example').DataTable();
		});
		$scope.data = {};
		$scope.aircraft = {};
		$scope.data.activate = true;
		
		getAllVendor();

		function getAllVendor(){
			FuelVendorsService.getAllVendor().then(function(result) {
				console.log(result)
				$scope.vendorList = result;
			})
		}
		

        $(function() {
	     	$('#vendor-toggle-one2').bootstrapToggle();
	     	$('#vendor-toggle-one2').change(function() {
		      $('#console-event').html('Toggle: ' + $(this).prop('checked'));
		      $scope.data.activate = $(this).prop('checked');
		    })
        })

        getData();
    	function getData(){
			CustomersService.getAircraftMake().then(function(result) {
			  $scope.aircraftMakeList = result;
			})
		}
      
	    $scope.addFirstData = function(sel, step){
	    	// console.log($scope.data)

	    	var vendorData = "vendorName=" + $scope.data.vendorName + "&masterMargin=" + $scope.data.masterMargin 
	    	+ "&addressOne=" + $scope.data.addressOne + "&addressTwo=" + $scope.data.addressTwo + "&city=" + $scope.data.city + "&state=" 
	    	+ $scope.data.state + "&country=" + $scope.data.country + "&zipcode=" + $scope.data.zipcode + "&internalNote=" 
	    	+ $scope.data.internalNote + "&certificateType=" + $scope.data.certificateType + "&baseTenant=" + $scope.data.baseTenant
	    	+ "&fuelerlinxCustomer=" + $scope.data.fuelerlinxCustomer + "&contractFuelVendor=" + $scope.data.contractFuelVendor 
	    	+ "&activate=" + $scope.data.activate + "&baseIcao=" + $scope.data.baseIcao;

	    	FuelVendorsService.addVendor(vendorData).then(function(result) {
            	console.log("result",result)
            	$scope.accountId = result;
      			$scope.aircraft.accountId = $scope.accountId;
          	})
    	 	$(sel).trigger('next.m.' + step);
    	 	getData();
	    }

	    $scope.aircraftDetails = [{ 
            'tail':'',
            'make': '',
            'model': '',
            'sizeId' : ''
        }];
    
        $scope.addNew = function(){
            $scope.aircraftDetails.push({ 
                'tail':'',
	            'make': '',
	            'model': '',
	            'sizeId' : ''
            });
            console.log($scope.aircraftDetails)
        };

        $scope.getModal = function(makeId, index){
	  		$scope.aircraft.make = makeId;
	        //var makeId = makeId;
	        CustomersService.getModal($scope.aircraft.make).then(function(result) {
	          $scope.aircraftDetails[index].aircraftModalList = result;
	          //$scope.aircraftDetails[index].model = $scope.aircraftModalList[0];
	        })
      	}

      	$scope.getSize = function(model, index){
	        CustomersService.getAircraftSize($scope.aircraft.make, model).then(function(result) {
	        	console.log("result",result)
	          $scope.aircraftDetails[index].aircraftSizeList = result;
	          //$scope.aircraftDetails[index].size = $scope.aircraftSizeList[0];
	          console.log($scope.aircraftDetails[index].size)
	        })
      	}

      	$scope.aircraftListData = {};
      	$scope.addData = [];
      	$scope.saveVendorData = function(){
      		for(var i=0; i<$scope.aircraftDetails.length;i++){
      			$scope.addData.push({ 
	                'tail': $scope.aircraftDetails[i].tail,
		            'make': $scope.aircraftDetails[i].make,
		            'model': $scope.aircraftDetails[i].model,
		            'sizeId' : $scope.aircraftDetails[i].sizeId
	            });
      		}
	        $scope.aircraftListData.aircraftList = $scope.addData;
	        $scope.aircraftListData.accountId = $scope.aircraft.accountId;
	        
	        FuelVendorsService.addVendorAicraft($scope.aircraftListData).then(function(result) {
	        	console.log(result)

	        	if(result != null && result.success){
	        		toastr.success(''+result.success+'', {
		            	closeButton: true
		          	})
		          	$('#vendor-modal-3').modal('hide');
		          	getAllVendor();
	        	}else{
	        		toastr.error(''+result.statusText+'', {
		            	closeButton: true
		          	})
	        	}
	        });
      	}
    }