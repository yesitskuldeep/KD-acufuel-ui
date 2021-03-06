(function(){
 'use strict';    
    angular.module('acufuel')
      .service('flightDepDashboardService', ['$q', '$http', 'BASE_URL', flightDepDashboardService]);

      function flightDepDashboardService($q, $http, BASE_URL) {
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
        
        this.getAircrafts = function() {

            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : BASE_URL.url +'/flightDept/aircrafts',
                headers : {'Content-Type': 'application/json'},
            })
            .then(function (result){
                deferred.resolve(result.data);
            },function (result){
                deferred.resolve(result.data);
            })
            return deferred.promise;
        }
        
        this.getTiers = function(id) {

            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : BASE_URL.url +'/flightDept/tiers/'+id,
                headers : {'Content-Type': 'application/json'},
            })
            .then(function (result){
                deferred.resolve(result.data);
            },function (result){
                deferred.resolve(result.data);
            })
            return deferred.promise;
        }
        
        this.getFBOs = function(data) {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : BASE_URL.url +'/flightDept/getFboQuote/'+data+'/aircraft',
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
       
       this.dispathFuelOrder = function(data) {
    	      var deferred = $q.defer();
    	      $http({
    	          method : 'POST',
    	          url : BASE_URL.url +'/flightDept/order',
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