(function(){
 'use strict';    
    angular.module('acufuel')
      .service('ViewcontactService', ['$q', '$http', 'BASE_URL', ViewcontactService]);

      function ViewcontactService($q, $http, BASE_URL) {        

        this.getContact = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/company/contact/'+id,
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
              url : BASE_URL.url +'/company/contact/idList/'+id,
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
              url : BASE_URL.url +'/company/contact',
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
        
      }
      
})();