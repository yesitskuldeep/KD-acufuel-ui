'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('accountController', ['$scope',function($scope) {

      $scope.test = "Testing...";
      $(document).ready(function(){
      	$('#profileTab').click(function(){
      		$('#profile').addClass('active');
      		$('#setting').removeClass('active');
      	})
      	$('#settingsTab').click(function(){
      		$('#setting').addClass('active');
      		$('#profile').removeClass('active');
      	})
      })

    }]);