(function(){
 'use strict';    
    angular.module('acufuel')
      .service('ViewCompanyService', ['$q', '$http', 'BASE_URL', ViewCompanyService]);

      function ViewCompanyService($q, $http, BASE_URL) {        
        
      	this.getCompany = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/company/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.getContact = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/company/contacts/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.addContact = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/company/contact',
              data : data,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result);
          },function (result){
              deferred.resolve(result);
          })
          return deferred.promise;
        }

        this.addCustomField = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/company/custom/contacts',
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

        this.updateCustomField = function(data){
          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/company/custom/contacts',
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

        this.addPrimaryContact = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/company/contact/createPrimaryContact',
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

        this.sendMail = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/company/mailPriceToContacts/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.changeStatus = function(companyId, data){
            var deferred = $q.defer();
            $http({
                method : 'PUT',
                url : BASE_URL.url +'/company/status/'+companyId,
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

         this.fuelerPricingChange = function(companyId, data){
            var deferred = $q.defer();
            $http({
                method : 'PUT',
                url : BASE_URL.url +'/company/contact/disablePriceEmail/'+companyId,
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

        this.updateCompany = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/company',
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

        this.checkPrimaryContact = function(id){
          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/company/contact/check/primaryContact/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result);
          },function (result){
              deferred.resolve(result);
          })
          return deferred.promise;
        }

        this.deleteAircraft = function(id){
          var deferred = $q.defer();
          $http({
              method : 'DELETE',
              url : BASE_URL.url +'/company/aircraft/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result);
          },function (result){
              deferred.resolve(result);
          })
          return deferred.promise;
        }

        this.checkJetType = function(tail) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/flightDept/getFboData/'+tail+'/aircraft',
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