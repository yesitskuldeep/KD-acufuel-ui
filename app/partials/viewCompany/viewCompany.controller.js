
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('viewCompanyController', ['$scope','$uibModal', '$stateParams', 'ViewCompanyService', function($scope , $uibModal, $stateParams, ViewCompanyService) {
        $scope.data = {};
        $scope.data.priceEmail = true;

        $scope.open = function(){
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

        $(function() {
          $('#price-one2').bootstrapToggle();
          $('#price-one2').change(function() {
            $('#console-event').html('Toggle: ' + $(this).prop('checked'));
            $scope.data.priceEmail = $(this).prop('checked');
          })
        })

        var companyId = $stateParams.id;
        console.log(companyId)
        ViewCompanyService.getCompany(companyId).then(function(result) {
          $scope.aircraftMakeList = result;
        })

        ViewCompanyService.getContact(companyId).then(function(result) {
          $scope.aircraftMakeList = result;
        })

        $scope.contactData = {};
        $scope.contactData.contactList = [];
        $scope.addContact = function(){
          $scope.data.companyId = companyId;
          $scope.contactData.contactList.push($scope.data);
          console.log($scope.contactData)
          ViewCompanyService.addContact($scope.contactData).then(function(result) {
            if(result.success){
              toastr.success(''+result.success+'', {
                  closeButton: true
                })
                $('#contact-modal-3').modal('hide');
            }else{
              toastr.error(''+result.statusText+'', {
                  closeButton: true
                })
            }
          })
        }

  }]);