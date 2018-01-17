(function(){
 'use strict';    
    angular.module('acufuel')
      .service('forgetPasswordService', ['$rootScope', '$q', '$http', '$state', 'BASE_URL', 'AUTH_EVENTS', 'USER_ROLES', LoginService]);

      function LoginService($rootScope, $q, $http, $state, BASE_URL, AUTH_EVENTS, USER_ROLES) {        
        var authService     = {},
            email        = '',  
            isAuthenticated = false;

      

        authService.forgetPasswordUser = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/login',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'},
              data : data
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            //console.log(result.data)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }
      }
      
})();