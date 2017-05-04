'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('AntiochFlightDepartmentcontroller', ['$scope',function($scope) {

      $scope.test = "Testing...";

      $(function() {
         $('#toggle-five').bootstrapToggle();
    console.log("hello");
    })

  
    }]);
