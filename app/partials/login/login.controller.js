
(function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('LoginController', [ '$scope', '$filter', '$rootScope', '$state', LoginController]);
        
    function LoginController($scope, $filter, $rootScope, $state) {
    	$scope.data = {};
        $scope.submitLogin = function() {

        	$scope.data.username;
        	$scope.data.password;
            $state.go('app.dashboard');
        	// if($scope.data.username == "acufuel" && $scope.data.password == "Acufuelelite123") {
        	// 	localStorage.setItem('loginStatus', true);
         //    	$state.go('#/main/dashboard');
        	// } else {
        	// 	alert('Invalid credentials');
        	// }
        	
        }
    }
})();

