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

    this.uploadAttachment = function (data) {
           var fd = new FormData();
           
           angular.forEach(data, function(value, key) {
             fd.append(key, value);
           })

           var deffered = $q.defer();
           $http({
             method : 'POST',
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined},
             url : BASE_URL.url+'/fuelOrder/upload/invoice',
             data : fd
           })
           .success(function (data, status, headers, config) {
             //console.log(data);
             deffered.resolve(status);
           })
           .error(function (data, status, headers, config) {
             //console.log(data);
             deffered.reject(status);
           });
           return deffered.promise;
         }

         this.deleteAttachment = function (data) {
           var fd = new FormData();
           
           angular.forEach(data, function(value, key) {
             fd.append(key, value);
           })

           var deffered = $q.defer();
           $http({
             method : 'POST',
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined},
             url : BE+'/fuelOrder/upload/invoice',
             data : fd
           })
           .success(function (data, status, headers, config) {
             //console.log(data);
             deffered.resolve(status);
           })
           .error(function (data, status, headers, config) {
             //console.log(data);
             deffered.reject(status);
           });
           return deffered.promise;
         }



  }

})();