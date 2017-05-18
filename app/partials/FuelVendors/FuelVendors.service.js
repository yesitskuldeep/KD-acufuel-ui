(function(){
 'use strict';    
    angular.module('acufuel')
      .service('FuelVendorsService', ['$q', '$http','BASE_URL', FuelVendorsService]);

      	function FuelVendorsService($q, $http, BASE_URL) {   

      		this.getAllVendor = function() {

		      var deferred = $q.defer();
		      $http({
		          method : 'GET',
		          url : BASE_URL.url +'/user/allVendors',
		          headers : {'Content-Type': 'application/json'},
		      })
		      .then(function (result){
		          deferred.resolve(result.data);
		      },function (result){
		          deferred.resolve(result.data);
		      })
		      return deferred.promise;
		    }


	      	this.addVendor = function(data) {
	      		console.log("data",data);

	          var deferred = $q.defer();
	          $http({
	              method : 'POST',
	              url : BASE_URL.url +'/vendor/add/aircrafts',
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