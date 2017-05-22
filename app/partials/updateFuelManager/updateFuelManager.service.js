(function(){
 'use strict';    
    angular.module('acufuel')
      .service('updateFuelManagerService', ['$q', '$http', 'BASE_URL', updateFuelManagerService]);

      function updateFuelManagerService($q, $http, BASE_URL) {        
        var temp = {};

        this.getATypeJets = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/margin/getJetAType/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.addNewAtypeJetMargin = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/margin',
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

        this.editAtypeJetMargin = function(data){
          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/margin',
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