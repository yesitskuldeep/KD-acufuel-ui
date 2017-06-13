(function(){
 'use strict';    
    angular.module('acufuel')
      .service('ViewFuelVendorService', ['$q', '$http', 'BASE_URL', ViewFuelVendorService]);

      function ViewFuelVendorService($q, $http, BASE_URL) {        
        
      	this.getFuelOrder = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/vendor/'+id,
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
              url : BASE_URL.url +'/vendor/contacts/'+id,
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
              url : BASE_URL.url +'/vendor/custom/contacts',
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

        this.checkPrimaryContact = function(id){
          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/vendor/contact/check/primaryContact/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result);
          },function (result){
              deferred.resolve(result);
          })
          return deferred.promise;
        }

        this.addPrimaryContact = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/vendor/contact/createPrimaryContact',
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

        this.changeStatus = function(vendorId, data){
          var deferred = $q.defer();
          $http({
              method : 'PUT',
              url : BASE_URL.url +'/vendor/status/'+vendorId,
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

        this.addCustomField = function(data){
          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/vendor/custom/contacts',
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

        this.addContact = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/vendor/contact',
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

        this.sendMail = function(id) {

          var deferred = $q.defer();
          $http({
              method : 'POST',
              url : BASE_URL.url +'/vendor/mailPriceToContacts/'+id,
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
              url : BASE_URL.url +'/vendor',
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
              url : BASE_URL.url +'/vendor/aircrafts/'+id,
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
        
        this.omitFuelPricing = function(data) {

	        var deferred = $q.defer();
	        $http({
	        	method : 'PUT',
	        	url : BASE_URL.url +'/fuelPricing/omitFuelPricing',
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