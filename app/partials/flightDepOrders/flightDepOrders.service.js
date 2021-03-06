(function(){
  'use strict';    
  angular.module('acufuel')
  .service('flightDepOrdersService', ['$q', '$http', 'BASE_URL', flightDepOrdersService]);

  function flightDepOrdersService($q, $http, BASE_URL) {        

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
              url : BASE_URL.url +'/flightDept/orders',
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
    
    this.exportOrder = function(){
        var deferred = $q.defer();
        $http({
            method : 'GET',
            url : BASE_URL.url +'/flightDept/export'
        })
        .then(function (result){
            deferred.resolve(result.data);
        },function (result){
          console.log(result)
            deferred.resolve(result.data);
        })
        return deferred.promise;
     }

  }

})();