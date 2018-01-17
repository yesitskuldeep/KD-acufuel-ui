
(function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('forgetPasswordController', [ '$scope', '$filter', '$rootScope', '$state', 'forgetPasswordService', 'forgetPasswordController']);
        
    function forgetPasswordControllerController($scope, $filter, $rootScope, $state, forgetPasswordService) {
    	$scope.data = {};
      $scope.submitforgetPassword = function() {
          var forgetPasswordData = "email=" + $scope.data.email ;
          console.log("---kd---",$scope.data.email);
         /* forgetPasswordService.forgetPasswordUser(forgetPasswwordData).then(function(result) {
                
                console.log("result is " ,result)
               
                
          })*/
          
      }
    }
})();

