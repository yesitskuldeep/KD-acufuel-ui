(function(){
  'use strict';    
  angular.module('acufuel')
  .service('enterFuelOrderService', ['$q', '$http', 'BASE_URL', enterFuelOrderService]);

  function enterFuelOrderService($q, $http, BASE_URL) {        

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

    this.getAircraft = function(id) {
      var deferred = $q.defer();
      $http({
          method : 'GET',
          url : BASE_URL.url +'/company/aircrafts/'+id,
          headers : {'Content-Type': 'application/json'},
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
    
    this.getATypeFuelPricing = function(id) {
        var deferred = $q.defer();
        $http({
            method : 'GET',
            url : BASE_URL.url +'/fuelPricing/getJetATypeFuelCost/'+id,
            headers : {'Content-Type': 'application/json'},
        })
        .then(function (result){
            deferred.resolve(result.data);
        },function (result){
            deferred.resolve(result.data);
        })
        return deferred.promise;
    }
    
    this.getVTypeFuelPricing = function(id) {
        var deferred = $q.defer();
        $http({
            method : 'GET',
            url : BASE_URL.url +'/fuelPricing/getAVGASTypeFuelCost/'+id,
            headers : {'Content-Type': 'application/json'},
        })
        .then(function (result){
            deferred.resolve(result.data);
        },function (result){
            deferred.resolve(result.data);
        })
        return deferred.promise;
    }
    
    this.getFuelCost = function(id) {
        var deferred = $q.defer();
        $http({
            method : 'GET',
            url : BASE_URL.url +'/fuelPricing/getFuelCost/'+id,
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