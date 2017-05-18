(function(){
 'use strict';    
    angular.module('acufuel')
      .service('fuelManagerService', ['$q', '$http', 'BASE_URL', fuelManagerService]);

      function fuelManagerService($q, $http, BASE_URL) {

        this.getOptions = function() {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/rampFeesAndAvoidance/getCustomCategorySize',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }
        
        this.getFullList = function() {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/rampFeesAndAvoidance/getAll',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        //this.addCompany = function(data) {
        this.updateFullList = function(data){

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/rampFeesAndAvoidance',
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