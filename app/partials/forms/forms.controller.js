'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('formsController', ['$scope',function($scope) {

      $scope.test = "Testing...";

    }]);

$(function () {
         
         	// Validate the form on load
         	//$('#validation-form').submit ();
         
         	// Block the form from submitting
         	$('form').submit (function (e) {
         		e.preventDefault ();
         	});
         
         });
