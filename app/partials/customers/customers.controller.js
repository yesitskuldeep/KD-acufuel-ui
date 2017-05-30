'use strict';

 //Load controller
  angular.module('acufuel')
	.controller('customersController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'CustomersService', 'ViewCompanyService', customersController]);

 	function customersController($scope, $rootScope, $uibModal, $filter, $http, CustomersService, ViewCompanyService) {
		$(document).ready(function() {
		    $('#example').DataTable();
		});
		$scope.data = {};
		$scope.aircraft = {};
		$scope.data.activate = true;
		$scope.showLoader = false;
		getAllCompanies();

		function getAllCompanies(){
			CustomersService.getAllCompanies().then(function(result) {
				console.log(result)
				$scope.companyList = result;
				for(var i=0; i<$scope.companyList.length; i++){
					$scope.companyList[i].masterMargin = $scope.companyList[i].margin.id;
				}
			})
		}

        $scope.editMargin = function(customer){
        	event.stopPropagation();
        	console.log(customer.masterMargin)

        	var companyMargin = "companyName=" + customer.companyName + "&masterMargin=" + customer.masterMargin 
              + "&addressOne=" + customer.addressOne + "&addressTwo=" + customer.addressTwo + "&city=" + customer.city + "&state=" 
              + customer.state + "&country=" + customer.country + "&zipcode=" + customer.zipcode + "&internalNote=" 
              + customer.internalNote + "&certificateType=" + customer.certificateType + "&baseTenant=" + customer.baseTenant
              + "&fuelerlinxCustomer=" + customer.fuelerlinxCustomer + "&contractFuelVendor=" + customer.contractFuelVendor 
              + "&activate=" + customer.activate + "&baseIcao=" + customer.baseIcao + "&companyId=" + customer.id;

        	ViewCompanyService.updateContact(companyMargin).then(function(result) {
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

        

        getData();
    	function getData(){
			CustomersService.getAircraftMake().then(function(result) {
			  $scope.aircraftMakeList = result;
			})
		}
      	
		CustomersService.getMargin().then(function(result) {
		  $scope.marginList = result;
		})
		$scope.showCompanyError = false;
		$scope.showMarginError = false;

		$scope.removeValidation = function(){
			console.log('key up');
			$scope.showCompanyError = false;
	    	$('.companyNameInput').removeClass('customErrorInput');
		}

		$scope.removeMarginValidation = function(){
			$scope.showMarginError = false;
	    	$('.marginSelectBox').removeClass('customErrorInput');
		}

	    $scope.addFirstData = function(sel, step){
	    	// console.log($scope.data)
	    	if($scope.data.companyName == undefined){
	    		$scope.showCompanyError = true;
	    		$('.companyNameInput').addClass('customErrorInput');
	    	}else if($scope.data.masterMargin == undefined){
	    		$scope.showMarginError = true;
	    		$('.marginSelectBox').addClass('customErrorInput');
	    	}else{
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
	    }

	    $scope.aircraftDetails = [{ 
            'tail':'',
            'make': '',
            'model': '',
            'sizeId' : '',
            'marginId': $scope.data.masterMargin
        }];
    
        $scope.addNew = function(){
            $scope.aircraftDetails.push({ 
                'tail':'',
	            'make': '',
	            'model': '',
	            'sizeId' : '',
	            'marginId': ''
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
		            'sizeId' : $scope.aircraftDetails[i].sizeId,
		            'marginId': $scope.aircraftDetails[i].marginId
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