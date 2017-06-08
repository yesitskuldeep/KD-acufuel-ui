(function(){
 'use strict';    
    angular.module('acufuel')
      .service('ViewvendorContactService', ['$q', '$http', 'BASE_URL', ViewvendorContactService]);

      function ViewvendorContactService($q, $http, BASE_URL) {        

        this.getContact = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/vendor/contact/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.getContactsList = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/vendor/contact/idList/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.updateContact = function(data) {
          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/vendor/contact',
              data : data,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.changePriceEmail = function(contactId, data) {
          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/vendor/contact/status/'+ contactId,
              data : data,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.deleteContact = function(contactId){
          var deferred = $q.defer();
          $http({
              method : 'DELETE',
              url : BASE_URL.url +'/vendor/contact/'+ contactId,
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