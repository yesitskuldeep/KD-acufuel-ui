(function(){
 'use strict';    
    angular.module('acufuel')
      .service('AccountSettingService', ['$rootScope', '$q', '$http', '$state', 'BASE_URL', AccountSettingService]);

      function AccountSettingService($rootScope, $q, $http, $state, BASE_URL) {        

        this.getProducts = function() {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/user/products',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            //console.log(result.data)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.updateProducts = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/fuelPricing/product',
              data : data,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            //console.log(result.data)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.loginUserData = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/account/user/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            //console.log(result.data)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.updateUserProfile = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/account/updateProfile',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'},
              data: data
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