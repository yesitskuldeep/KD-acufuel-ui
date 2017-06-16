(function(){
 'use strict';    
    angular.module('acufuel')
      .service('schedulerService', ['$q', '$http', 'BASE_URL', schedulerService]);

      function schedulerService($q, $http, BASE_URL) {        
        var temp = {};

        this.getEvents = function() {
          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/user/schedules',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.addNewEventService = function(data) {
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/scheduler',
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

        this.updateScheduledEvent = function(data) {
          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/scheduler',
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