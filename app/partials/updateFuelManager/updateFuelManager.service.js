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

        this.getVTypeJets = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/margin/getAVGASType/'+id,
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

        this.addNewVtypeJet = function(data){
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

        this.editVtypeJetMargin = function(data){
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

        this.getJetTiers = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/margin/getCustomMargins/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.addNewTier = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/margin/custom',
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

        this.editTier = function(data){
          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/margin/custom',
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

        this.deleteTier = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'DELETE',
              url : BASE_URL.url +'/margin/customMargins/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.getFuelPricing = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/fuelPricing/getPriceManagerProducts/'+id,
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

        this.getFutureFuelPricing = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/fuelPricing/getFuturePriceManagerProducts/'+id,
              headers : {'Content-Type': 'application/json'},
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