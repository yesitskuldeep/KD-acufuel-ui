
(function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('MainController', [ '$scope', '$filter', '$rootScope', '$state', MainController]);
        
    function MainController($scope, $filter, $rootScope, $state) {
     
    	$scope.currentUserName = JSON.parse(localStorage.getItem('currentUserName'));
    }
})();

