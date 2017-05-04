
(function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('LoginController', [ '$scope', '$filter', '$rootScope', '$state', 'LoginService', LoginController]);
        
    function LoginController($scope, $filter, $rootScope, $state, LoginService) {
    	$scope.data = {};
      $scope.submitLogin = function() {
          var loginData = "username=" + $scope.data.username + "&password=" + $scope.data.password;
          LoginService.loginUser(loginData).then(function(result) {
                LoginService.authenticate();
                //LoginService.setAuth(true);
                
          })
          //$state.go('app.dashboard');
      }
    }
})();

