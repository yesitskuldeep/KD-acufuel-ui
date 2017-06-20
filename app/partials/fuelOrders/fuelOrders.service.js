(function(){
  'use strict';    
  angular.module('acufuel')
  .service('fuelOrdersService', ['$q', '$http', 'BASE_URL', fuelOrdersService]);

  function fuelOrdersService($q, $http, BASE_URL) {        

    this.getAllCompanies = function() {
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

    
      this.getOrders = function() {

                      var deferred = $q.defer();
                      $http({
                          method : 'GET',
                          url : BASE_URL.url +'/user/orders',
                          headers : {'Content-Type': 'application/json'},
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
                          url : BASE_URL.url +'/fuelOrder',
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

    this.updateFuelOrder = function(data) {
                      var deferred = $q.defer();
                      $http({
                          method : 'PUT',
                          url : BASE_URL.url +'/fuelOrder',
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
                         
                this.getATypeFuelPricing = function(id) {
                    var deferred = $q.defer();
                    $http({
                        method : 'GET',
                        url : BASE_URL.url +'/fuelPricing/getJetATypeFuelCost/'+id,
                        headers : {'Content-Type': 'application/json'},
                    })
                    .then(function (result){
                        deferred.resolve(result.data);
                    },function (result){
                        deferred.resolve(result.data);
                    })
                    return deferred.promise;
                }
                
                  this.getJetTiers = function(id) {
                    var deferred = $q.defer();
                    $http({
                        method : 'GET',
                        url : BASE_URL.url +'/margin/getCustomMargins/'+id,
                        headers : {'Content-Type': 'application/json'},
                    })
                    .then(function (result){
                        deferred.resolve(result.data);
                    },function (result){
                        deferred.resolve(result.data);
                    })
                    return deferred.promise;
                    }
    
                this.getVTypeFuelPricing = function(id) {
                    var deferred = $q.defer();
                    $http({
                        method : 'GET',
                        url : BASE_URL.url +'/fuelPricing/getAVGASTypeFuelCost/'+id,
                        headers : {'Content-Type': 'application/json'},
                    })
                    .then(function (result){
                        deferred.resolve(result.data);
                    },function (result){
                        deferred.resolve(result.data);
                    })
                    return deferred.promise;
                }
                
                this.getFuelCost = function(id) {
                    var deferred = $q.defer();
                    $http({
                        method : 'GET',
                        url : BASE_URL.url +'/fuelPricing/getFuelCost/'+id,
                        headers : {'Content-Type': 'application/json'},
                    })
                    .then(function (result){
                        deferred.resolve(result.data);
                    },function (result){
                        deferred.resolve(result.data);
                    })
                    return deferred.promise;
                }

            

    this.uploadAttachment = function (data) {
                    var fd = new FormData();
                    
                    angular.forEach(data, function(value, key) {
                      fd.append(key, value);
                    })
                    
                    var deffered = $q.defer();
                    $http({
                      method : 'POST',
                      transformRequest: angular.identity,
                      headers: {'Content-Type': undefined},
                      url : BASE_URL.url+'/fuelOrder/upload/invoice',
                      data : fd
                    })
                    .then(function (result){
                      deffered.resolve(result);
                    },function (result){
                      deffered.resolve(result);
                  })
                    return deffered.promise;
                  }

        this.deleteAttachment = function(id){
          var deferred = $q.defer();
          $http({
              method : 'DELETE',
              url : BASE_URL.url +'/fuelOrder/invoice/'+id,
              headers : {'Content-Type': 'application/json'},
          })
          .then(function (result){
              deferred.resolve(result.data);
          },function (result){
              deferred.resolve(result.data);
          })
          return deferred.promise;
        }

        this.exportCompany = function(){
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : BASE_URL.url +'/fuelOrder/export'
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