(function(){
 'use strict';    
    angular.module('acufuel')
      .service('dashboardService', ['$q', '$http', 'BASE_URL', dashboardService]);

      function dashboardService($q, $http, BASE_URL) {
        var temp = {};

        this.getFuelPricingNew = function() {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/user/products',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

         this.getMargin = function() {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/user/margins',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

       this.updateFuelPricing = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/fuelPricing',
              headers : {'Content-Type': 'application/json'},
              data: data
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }
        
      }
      
})();