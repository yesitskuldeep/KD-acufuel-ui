(function(){
 'use strict';    
    angular.module('acufuel')
      .service('analyticsService', ['$q', '$http', 'BASE_URL',analyticsService]);

      function analyticsService($q, $http, BASE_URL) {        
        var temp = {};

        
        this.getMFS = function(){
            var deferred = $q.defer();
            $http({
                method : 'GET',
               // url : BASE_URL.url +'/fuelOrder/export/mfs'
                  url : BASE_URL.url + '/fuelOrder/analytics'
            })
            .then(function (result){
                deferred.resolve(result.data);
            },function (result){
              console.log(result)
                deferred.resolve(result.data);
            })
            return deferred.promise;
        }

/*---date filter for chart ---  dates are sending to the api  */
        this.getDRFChart = function(fd,td){
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : BASE_URL.url + '/fuelOrder/filterchart?fromDate='+fd+'&toDate='+td+''
            })
            .then(function (result){
                deferred.resolve(result.data);
            },function (result){
              console.log(result)
                deferred.resolve(result.data);
            })
            return deferred.promise;
        }

        this.getCS = function(){
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : BASE_URL.url +'/user/sources'
            })
            .then(function (result){
                deferred.resolve(result.data);
            },function (result){
              console.log(result)
                deferred.resolve(result.data);
            })
            return deferred.promise;
        }

      }
      
})();