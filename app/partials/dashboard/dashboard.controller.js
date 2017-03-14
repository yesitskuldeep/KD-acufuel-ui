
    (function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('dashboardController', [ '$scope', '$filter', '$rootScope', '$state', dashboardController]);
        
    function dashboardController($scope, $filter, $rootScope, $state) {
    	
    	$scope.logout = function () {
    		localStorage.removeItem("loginStatus");
    		$rootScope.path = false;
    		$state.reload();
    	}
//        $scope.submitLogin = function() {
//        	LoginService.setAuth(true);
//        	toastr.info("Login successfully");
//        	$state.go('app.dashboard');
//        	/*LoginService.login($scope.username, $scope.password).then(function(result){
//        		if(typeof result == 'object') {
//        			LoginService.setAuth(true);
//        			$rootScope.path = true;
//        			var reqPwdChng = localStorage.getItem("requiredChangePwd");
//        			if (reqPwdChng && reqPwdChng == "Y") {
//        				$state.go('resetPassword');
//        			} else {
//        				$state.go('app.upload');
//        			}
//        		} else {
//        			toastr.info("Error in login. Please check login name and password");
//        		}
//        	})*/
//        }
    }
})();
