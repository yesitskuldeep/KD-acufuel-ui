'use strict';

 //Load controller
  angular.module('acufuel')
	.controller('customersController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'CustomersService', customersController]);

 	function customersController($scope, $rootScope, $uibModal, $filter, $http, CustomersService) {
		$(document).ready(function() {
		    $('#example').DataTable();
		});
		$scope.data = {};
		$scope.aircraft = {};
		$scope.data.activate = true;
		
		getAllCompanies();

		function getAllCompanies(){
			CustomersService.getAllCompanies().then(function(result) {
				console.log(result)
				$scope.companyList = result;
			})
		}

        $(function() {
	     	$('#toggle-one2').bootstrapToggle();
	     	$('#toggle-one2').change(function() {
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

	    	var companyData = "companyName=" + $scope.data.companyName + "&masterMargin=" + $scope.data.masterMargin 
	    	+ "&addressOne=" + $scope.data.addressOne + "&addressTwo=" + $scope.data.addressTwo + "&city=" + $scope.data.city + "&state=" 
	    	+ $scope.data.state + "&country=" + $scope.data.country + "&zipcode=" + $scope.data.zipcode + "&internalNote=" 
	    	+ $scope.data.internalNote + "&certificateType=" + $scope.data.certificateType + "&baseTenant=" + $scope.data.baseTenant
	    	+ "&fuelerlinxCustomer=" + $scope.data.fuelerlinxCustomer + "&contractFuelVendor=" + $scope.data.contractFuelVendor 
	    	+ "&activate=" + $scope.data.activate + "&baseIcao=" + $scope.data.baseIcao;

	    	CustomersService.addCompany(companyData).then(function(result) {
            	console.log(result)
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
	          $scope.aircraftDetails[index].aircraftSizeList = result;
	          //$scope.aircraftDetails[index].size = $scope.aircraftSizeList[0];
	          console.log($scope.aircraftDetails[index].size)
	        })
      	}

      	$scope.aircraftListData = {};
      	$scope.addData = [];
      	$scope.saveCompanyData = function(){
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
	        
	        CustomersService.addAircraft($scope.aircraftListData).then(function(result) {
	        	console.log(result)

	        	if(result != null && result.success){
	        		toastr.success(''+result.success+'', {
		            	closeButton: true
		          	})
		          	$('#demo-modal-3').modal('hide');
		          	getAllCompanies();
	        	}else{
	        		toastr.error(''+result.statusText+'', {
		            	closeButton: true
		          	})
	        	}
	        });
	        
      	}

	    // $scope.appendText = function() {
     //      getData();
	    //   var newRow =  $('<tr> <td> <input type="text" style="width:100px;" ng-model="aircraft.tail" class="form-control"> </td> <td style="width: 25%;"> <select class="form-control" ng-model="aircraft.make" ng-change="getModal()"> <option ng-repeat="make in aircraftMakeList">{{make}}</option> </select> </td> <td style="width: 20%;"> <select class="form-control" ng-model="aircraft.model" ng-change="getSize()"> <option ng-repeat="model in aircraftModalList">{{model}}</option> </select> </td> <td style="width: 25%;"> <select class="form-control" ng-model="aircraft.size"> <option ng-repeat="size in aircraftSizeList">{{size}}</option> </select> </td> <td> <select class="form-control"> <option>Margin1</option> <option>Margin2</option> </select> </td> </tr>');  
	    //   $('table.addRow').append(newRow);
	    // }


    }