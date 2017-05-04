
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewCompanyController', ['$scope','$uibModal', function($scope , $uibModal) {
		console.log("$uibModal",$uibModal);
        $scope.open = function(){
            console.log("asndfsahdasd");
            $scope.editSmsModal = $uibModal.open({
                templateUrl: 'partials/NewCompany/NewCompany.html',
                backdrop: true,
                scope: $scope,
            })
        }
        $(function() {
         $('#toggle-one2').bootstrapToggle();
        })

        $(function() {
         $('#toggle-one1').bootstrapToggle();
        })   
        $(function() {
         $('#toggle-two').bootstrapToggle();
        })   
        $(function() {
         $('#toggle-three').bootstrapToggle();
        })   
        $(function() {
         $('#toggle-four').bootstrapToggle();
        })   
            

    }]);

