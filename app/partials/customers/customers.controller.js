'use strict';

 //Load controller
  angular.module('acufuel')
	.controller('customersController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', '$state', 'CustomersService', 'ViewCompanyService', 'NgTableParams', customersController]);

 	function customersController($scope, $rootScope, $uibModal, $filter, $http, $state, CustomersService, ViewCompanyService, NgTableParams) {
		$(document).ready(function() {
		    // $('#example').DataTable();
		});
		$scope.userProfileId = JSON.parse(localStorage.getItem('userProfileId'))
		$scope.reset2 = function(){
			$("input").val("");
			$scope.removeMarginValidation();
		}

		
		$scope.data = {};
		$scope.aircraft = {};
		$scope.data.activate = true;
		$scope.showLoader = true;
		getAllCompanies();

		/*function getAllCompanies(){
			CustomersService.getAllCompanies().then(function(result) {
				$scope.companyList = result;
				for(var i=0; i<$scope.companyList.length; i++){
					$scope.companyList[i].masterMargin = $scope.companyList[i].margin.id;
				}
			})

		}*/

		$scope.statusFilter = [
			{id: "", title: "Show All"},
			{id: "true", title: "Active"},
			{id: "false", title: "Inactive"}
		]

		function getAllCompanies(){
			CustomersService.getAllCompanies().then(function(result) {
				console.log('log', result);
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
				}
				$scope.displayCompanyList = new NgTableParams({
		        page: 1,
		        count: 10,
		      }, {
		        data: $scope.companyList
		      });
			  $scope.showLoader = false;
			})
		}

        $scope.editMargin = function(customer){
        	console.log('customer', customer);
        	$scope.showLoader = true;
        	event.stopPropagation();

        	var companyMargin = "companyName=" + customer.companyName + "&masterMargin=" + customer.masterMargin 
              + "&addressOne=" + customer.addressOne + "&addressTwo=" + customer.addressTwo + "&city=" + customer.city + "&state=" 
              + customer.state + "&country=" + customer.country + "&zipcode=" + customer.zipcode + "&internalNote=" 
              + customer.internalNote + "&certificateType=" + customer.certificateType + "&baseTenant=" + customer.baseTenant
              + "&fuelerlinxCustomer=" + customer.fuelerlinxCustomer + "&contractFuelVendor=" + customer.contractFuelVendor 
              + "&activate=" + customer.activate + "&baseIcao=" + customer.baseIcao + "&companyId=" + customer.id;

        	ViewCompanyService.updateCompany(companyMargin).then(function(result) {
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

        getData();
    	function getData(){
			$scope.showLoader = true;
			CustomersService.getAircraftMake().then(function(result) {
			  $scope.aircraftMakeList = result;
			  $scope.showLoader = false;
			})
		}
      	

		// CustomersService.getMargin().then(function(result) {
		//   $scope.marginList = result;
		// })
		$scope.marginFilterOptions = [];
		CustomersService.getJetMargin($scope.userProfileId).then(function(result) {
			$scope.showLoader = true;
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
		  $scope.showLoader = false;
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
		
		var companyData;
	    $scope.addFirstData = function(sel, step){
			$scope.showLoader = true;
	    	if($scope.data.companyName == undefined){
	    		$scope.showCompanyError = true;
	    		$('.companyNameInput').addClass('customErrorInput');
	    	}else if($scope.data.masterMargin == undefined){
	    		$scope.showMarginError = true;
	    		$('.marginSelectBox').addClass('customErrorInput');
	    	}else{
	    		$scope.aircraftDetails = [{ 
	                'tail':'',
	                'make': '',
	                'model': '',
	                'sizeId' : '',
	                'marginId': $scope.data.masterMargin,
	                'avgasMarginId': $scope.data.avgasMargin
	            }];
	    	    
	    	 	$(sel).trigger('next.m.' + step);
	    	 	getData();
	    	}
			$scope.showLoader = false;
	    }
        $scope.addNew = function(){
			$scope.showLoader = true;
            $scope.aircraftDetails.push({ 
                'tail':'',
	            'make': '',
	            'model': '',
	            'sizeId' : '',
	            'marginId': $scope.data.masterMargin,
            	'avgasMarginId': $scope.data.avgasMargin
            });
			$scope.showLoader = false;
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
      	$scope.addData = [];
      	$scope.saveCompanyData = function(){
      		CustomersService.addCompany($scope.data).then(function(result) {
            	$scope.accountId = result;
      			$scope.aircraft.accountId = $scope.accountId;
      			
      			for(var i=0; i<$scope.aircraftDetails.length;i++){
          			$scope.addData.push({ 
    	                'tail': $scope.aircraftDetails[i].tail,
    		            'make': $scope.aircraftDetails[i].make,
    		            'model': $scope.aircraftDetails[i].model,
    		            'sizeId' : $scope.aircraftDetails[i].sizeId,
    		            'marginId': $scope.aircraftDetails[i].marginId,
    		            'avgasMarginId': $scope.aircraftDetails[i].avgasMarginId
    	            });
          		}
    	        $scope.aircraftListData.aircraftList = $scope.addData;
    	        $scope.aircraftListData.accountId = $scope.aircraft.accountId;
    	        
    	        if($scope.aircraftListData.aircraftList[0].tail == "" || $scope.aircraftListData.aircraftList[0].make == null || $scope.aircraftListData.aircraftList[0].model == null){
    	        	$scope.aircraftListData.aircraftList = [];
    	        }
    	        
    	        CustomersService.addAircraft($scope.aircraftListData).then(function(result) {

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
    	        
          	})
      		
	        
      	}

	    // $scope.appendText = function() {
     //      getData();
	    //   var newRow =  $('<tr> <td> <input type="text" style="width:100px;" ng-model="aircraft.tail" class="form-control"> </td> <td style="width: 25%;"> <select class="form-control" ng-model="aircraft.make" ng-change="getModal()"> <option ng-repeat="make in aircraftMakeList">{{make}}</option> </select> </td> <td style="width: 20%;"> <select class="form-control" ng-model="aircraft.model" ng-change="getSize()"> <option ng-repeat="model in aircraftModalList">{{model}}</option> </select> </td> <td style="width: 25%;"> <select class="form-control" ng-model="aircraft.size"> <option ng-repeat="size in aircraftSizeList">{{size}}</option> </select> </td> <td> <select class="form-control"> <option>Margin1</option> <option>Margin2</option> </select> </td> </tr>');  
	    //   $('table.addRow').append(newRow);
	    // }

	    $scope.setFuel = function(){
	    	event.stopPropagation();
	    	$state.go('app.updateFuelManager');
	    }

	    /*  ng table  */
	    
	    $scope.exportCompany = function() {
	    	$scope.showLoader = true;
	    	var fileName = "companies.csv";
	    	var a = document.createElement("a");
	    	document.body.appendChild(a);
	    	 CustomersService.exportCompany().then(function(result) {
    	        var file = new Blob([result], {type: 'application/csv'});
    	        var fileURL = URL.createObjectURL(file);
    	        a.href = fileURL;
    	        a.download = fileName;
    	        a.click();
    	        $scope.showLoader = false;
	    	 })
	    }
	    
	    $scope.getCompanyName = function(parm){
      		$scope.showLoader = true;
	        CustomersService.getCompanyName(parm).then(function(result) {
	        	$scope.compNameList = result;
	        })
      	}


    }