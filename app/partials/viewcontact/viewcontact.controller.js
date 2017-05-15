'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewcontactController', ['$scope', '$stateParams', 'ViewcontactService', function($scope, $stateParams, ViewcontactService) {

	  	$(function() {
	         $('#toggle-five').bootstrapToggle();
	    })

	    var contactId = $stateParams.id;
        ViewcontactService.getContact(contactId).then(function(result) {
          $scope.contactDetail = result;
        })
  
    }]);
