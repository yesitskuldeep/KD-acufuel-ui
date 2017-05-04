(function(){
 'use strict';    
    angular.module('acufuel')
      .service('LoginService', ['$rootScope', '$q', '$http', '$state', 'BASE_URL', 'AUTH_EVENTS', 'USER_ROLES', LoginService]);

      function LoginService($rootScope, $q, $http, $state, BASE_URL, AUTH_EVENTS, USER_ROLES) {        
        var authService     = {},
            username        = '',
            role            = '',   
            isAuthenticated = false;

        var currentUserDetail = JSON.parse(window.localStorage.getItem("currentUser"));
        console.log(currentUserDetail)
        if (currentUserDetail) {
            console.log('aaya')
            if(currentUserDetail.type == 'ADMIN' || currentUserDetail.type == 'FBO'){
                $rootScope.isAuthenticated = true;
                role = USER_ROLES.admin;
            }else if(currentUserDetail.type == 'FLIGHT_DEPT'){
                $rootScope.isAuthenticated = false;
                role = USER_ROLES.user;
            }
        }

        authService.loginUser = function(data) {

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
            console.log(result.data)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        authService.authenticate = function() {
            var deferred = $q.defer();
            $http({
               method : 'GET',
               url : BASE_URL.url+'/user/authenticate',
               headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (result){
                if(result.data.userProfile.userType.type == 'ADMIN' || result.data.userProfile.userType.type == 'FBO' || result.data.userProfile.userType.type == 'FLIGHT_DEPT'){
                  authService.setUser(result.data);
                  $state.go('app.dashboard')
                }else{
                  localStorage.clear();
                  toastr.info("Please check username and password");
                }
                deferred.resolve(result.data);
            },function (result){
                deferred.resolve(result.data);
            });
            return deferred.promise;
        }

        // authService.setAuth = function(data) {
        //     localStorage.setItem('loginStatus', data);
        // }

        authService.logout = function(data) {

          // localStorage.clear();
          // $rootScope.isAuthenticated = false;
          // $rootScope.$broadcast(AUTH_EVENTS.updateUser);

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/user/logout',
              headers : {'Content-Type': 'application/json'},
              data : data
          })
          .success(function(result) {
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }
        
      

        authService.getUser = function () {
          return JSON.parse(window.localStorage.getItem("currentUser"));
        }
      
        authService.setUser = function (authData) {
            window.localStorage.setItem("currentUser", JSON.stringify(authData.userProfile.userType));
            if(authData.userProfile.userType.type == 'ADMIN' || authData.userProfile.userType.type == 'FBO'){
                role = USER_ROLES.admin;
                $rootScope.isAuthenticated = true;
            }else if(authData.userProfile.userType.type == 'FLIGHT_DEPT'){
                role = USER_ROLES.user;
                $rootScope.isAuthenticated = false;
            }
        }

        authService.isAuthenticated = function () {
          return isAuthenticated;
        }

        authService.role = function () {
          return role;
        }
     
        authService.isAuthorized = function (authorizedRoles) {
          if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
          }
          return (authService.isAuthenticated() && authorizedRoles.indexOf(role) !== -1);
        }
     
        return authService;
    }
      
})();