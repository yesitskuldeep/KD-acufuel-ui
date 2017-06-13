(function(){
  'use strict';    
  angular.module('acufuel')
  .service('fuelOrdersService', ['$q', '$http', 'BASE_URL', fuelOrdersService]);

  function fuelOrdersService($q, $http, BASE_URL) {        

    this.getAllCompanies = function() {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : BASE_URL.url +'/user/allCompanies',
        headers : {'Content-Type': 'application/json'},
      })
      .then(function (result){
        deferred.resolve(result.data);
      },function (result){
        deferred.resolve(result.data);
      })
      return deferred.promise;
    }

    
      this.getOrders = function() {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/user/orders',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

    this.dispathFuelOrder = function(data) {
      var deferred = $q.defer();
      $http({
          method : 'POST',
          url : BASE_URL.url +'/fuelOrder',
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