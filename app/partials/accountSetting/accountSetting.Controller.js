
(function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('AccountSettingController', [ '$scope', '$filter', '$rootScope', '$state', 'AccountSettingService', AccountSettingController]);
        
      function AccountSettingController($scope, $filter, $rootScope, $state, AccountSettingService) {
          
          AccountSettingService.getProducts().then(function(result) {
                
          })
      }
})();

