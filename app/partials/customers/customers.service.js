(function(){
 'use strict';    
    angular.module('acufuel')
      .service('CustomersService', ['$q', '$http', 'BASE_URL', CustomersService]);

      function CustomersService($q, $http, BASE_URL) {        
        
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

      	this.addCompany = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/company',
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

        this.getAircraftMake = function(){
          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/fuelerlinx/acufuel/getAircraftMake',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            console.log(result)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.getAircraftSize = function(makeId, modelId){
          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/fuelerlinx/acufuel/getAircraftSize/' +makeId + '/' +modelId,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            console.log(result)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.getModal = function(id){
          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/fuelerlinx/acufuel/getAircraftModel/' + id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            console.log(result)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.addAircraft = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/company/add/aircrafts',
              headers : {'Content-Type': 'application/json'},
              data: data
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