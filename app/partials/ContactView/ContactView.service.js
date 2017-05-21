(function(){
 'use strict';    
    angular.module('acufuel')
      .service('ContactViewService', ['$q', '$http', 'BASE_URL', ContactViewService]);

      function ContactViewService($q, $http, BASE_URL) {        
        var temp = {};

        this.getContacts = function() {

            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : BASE_URL.url +'/user/allContacts',
                headers : {'Content-Type': 'application/json'},
            })
            .then(function (result){
                deferred.resolve(result.data);
            },function (result){
                deferred.resolve(result.data);
            })
            return deferred.promise;
          }
        
        this.getCompanies = function() {

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
      }
      
})();