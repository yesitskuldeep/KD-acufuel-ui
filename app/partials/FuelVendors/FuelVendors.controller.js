'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('FuelVendorsController', ['$scope',function($scope) {

      $scope.vendorList = [{
			"companyName": "Name and inc",
		    "phone":"1010101010",
		    "contact":"jimmy",
		    "status":'Active',
		    "source": "tenant",
		    "allIn" : "$123"
		},{
			"companyName": "Name and inc",
		    "phone":"1010101010",
		    "contact":"jimmy",
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
		    "phone":"1010101010",
		    "contact":"jimmy",
		    "status":'Active',
		    "source": "tenant",
		    "allIn" : "$123"
		}]

    }]);