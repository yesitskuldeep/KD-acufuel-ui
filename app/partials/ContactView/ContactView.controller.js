'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('ContactViewController', ['$scope',function($scope) {

      $scope.test = "Testing...";

      $(function() {
      $('#toggle-one12').bootstrapToggle();
      $('#toggle-two21').bootstrapToggle();
        }) 

    }]);