'use strict';

 //Load controller
  angular.module('acufuel')
	.controller('customersController', ['$scope', '$rootScope', '$uibModal', '$filter', 'CustomersService', customersController]);

 	function customersController($scope, $rootScope, $uibModal, $filter, CustomersService) {
		$(document).ready(function() {
		    $('#example').DataTable();
		});
		$scope.data = {};
		$scope.aircraft = {};
		$scope.data.activate = true;
		$scope.customerList = [{
			"companyName": "Name and inc",
		    "Fleet": 3,
		    "phone":"1010101010",
		    "contact":"jimmy",
		    "Base":"Kiad",
		    "status":'Active',
		    "source": "tenant",
		    "allIn" : "$123"
		},{
			"companyName": "Name and inc",
		    "Fleet": 3,
		    "phone":"1010101010",
		    "contact":"jimmy",
		    "Base":"Kiad",
		    "status":'Inactive',
		    "source": "tenant",
		    "allIn" : "$123"
		},{
			"companyName": "Name and inc",
		    "Fleet": 3,
		    "phone":"1010101010",
		    "contact":"jimmy",
		    "Base":"Kiad",
		    "status":'Active',
		    "source": "tenant",
		    "allIn" : "$123"
		},{
			"companyName": "Name and inc",
		    "Fleet": 3,
		    "phone":"1010101010",
		    "contact":"jimmy",
		    "Base":"Kiad",
		    "status":'Active',
		    "source": "tenant",
		    "allIn" : "$123"
		}]

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
				console.log("result", result)
			  $scope.aircraftMakeList = result;
			  $scope.aircraft.make = $scope.aircraftMakeList[0];
			  CustomersService.getModal($scope.aircraft.make).then(function(result) {
			    $scope.aircraftModalList = result;
			    $scope.aircraft.model = $scope.aircraftModalList[0];
			      CustomersService.getAircraftSize($scope.aircraft.make, $scope.aircraft.model).then(function(result) {
			        $scope.aircraftSizeList = result;
			        $scope.aircraft.size = $scope.aircraftSizeList[0];
			      })
			  })
			    
			})
		}
      

      	$scope.getModal = function(){
	        var makeId = $scope.aircraft.make;
	        CustomersService.getModal(makeId).then(function(result) {
	          $scope.aircraftModalList = result;
	          $scope.aircraft.model = $scope.aircraftModalList[0];
	            CustomersService.getAircraftSize(makeId, $scope.aircraft.model).then(function(result) {
	              $scope.aircraftSizeList = result;
	              $scope.aircraft.size = $scope.aircraftSizeList[0];
	            })
	        })
	      }

	      $scope.getSize = function(){
	        CustomersService.getAircraftSize($scope.aircraft.make, $scope.aircraft.model).then(function(result) {
	          $scope.aircraftSizeList = result;
	          $scope.aircraft.size = $scope.aircraftSizeList[0];
	        })
	      }

	    $scope.addFirstData = function(sel, step){
	    	// console.log($scope.data)

	    	// var companyData = "companyName=" + $scope.data.companyName + "&masterMargin=" + $scope.data.masterMargin 
	    	// + "&addressOne=" + $scope.data.addressOne + "&addressTwo=" + $scope.data.addressTwo + "&city=" + $scope.data.city + "&state=" 
	    	// + $scope.data.state + "&country=" + $scope.data.country + "&zipcode=" + $scope.data.zipcode + "&internalNote=" 
	    	// + $scope.data.internalNote + "&certificateType=" + $scope.data.certificateType + "&baseTenant=" + $scope.data.baseTenant
	    	// + "&fuelerlinxCustomer=" + $scope.data.fuelerlinxCustomer + "&contractFuelVendor=" + $scope.data.contractFuelVendor 
	    	// + "&activate=" + $scope.data.activate + "&baseIcao=" + $scope.data.baseIcao;

	    	// CustomersService.addCompany(companyData).then(function(result) {
      //       	console.log(result)
      //       	$scope.accountId = result;
      			//$scope.aircraft.accountId = $scope.accountId;
      //     	})
    	 	$(sel).trigger('next.m.' + step);
    	 	getData();
	    }

	    $scope.users = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ]; 

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  // filter users to show
  $scope.filterUser = function(user) {
    return user.isDeleted !== true;
  };

  // mark user as deleted
  $scope.deleteUser = function(id) {
    var filtered = $filter('filter')($scope.users, {id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // add user
  $scope.addUser = function() {
    $scope.users.push({
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null,
      isNew: true
    });
  };

  // cancel all changes
  $scope.cancel = function() {
    for (var i = $scope.users.length; i--;) {
      var user = $scope.users[i];    
      // undelete
      if (user.isDeleted) {
        delete user.isDeleted;
      }
      // remove new 
      if (user.isNew) {
        $scope.users.splice(i, 1);
      }      
    };
  };

  // save edits
  $scope.saveTable = function() {
    var results = [];
    for (var i = $scope.users.length; i--;) {
      var user = $scope.users[i];
      // actually delete user
      if (user.isDeleted) {
        $scope.users.splice(i, 1);
      }
      // mark as not new 
      if (user.isNew) {
        user.isNew = false;
      }

      // send on server
      results.push($http.post('/saveUser', user));      
    }

    return $q.all(results);
  };

	    $scope.appendText = function() {
          getData();
	      var newRow =  $('<tr> <td> <input type="text" style="width:100px;" ng-model="aircraft.tail" class="form-control"> </td> <td style="width: 25%;"> <select class="form-control" ng-model="aircraft.make" ng-change="getModal()"> <option ng-repeat="make in aircraftMakeList">{{make}}</option> </select> </td> <td style="width: 20%;"> <select class="form-control" ng-model="aircraft.model" ng-change="getSize()"> <option ng-repeat="model in aircraftModalList">{{model}}</option> </select> </td> <td style="width: 25%;"> <select class="form-control" ng-model="aircraft.size"> <option ng-repeat="size in aircraftSizeList">{{size}}</option> </select> </td> <td> <select class="form-control"> <option>Margin1</option> <option>Margin2</option> </select> </td> </tr>');  
	      $('table.addRow').append(newRow);
	    }


    }