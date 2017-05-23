(function(){
 'use strict';    
    angular.module('acufuel')
      .service('AccountSettingService', ['$rootScope', '$q', '$http', '$state', 'BASE_URL', AccountSettingService]);

      function AccountSettingService($rootScope, $q, $http, $state, BASE_URL) {        

        this.getProducts = function(data) {

          var deferred = $q.defer();
          $http({
              method : 'GET',
              url : BASE_URL.url +'/user/products',
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
            //console.log(result.data)
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

    }
      
})();