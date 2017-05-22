
'use strict';

 //Load controller
  angular.module('acufuel')


      .controller('updateFuelManagerController', ['$scope','$uibModal', 'updateFuelManagerService', function($scope , $uibModal, updateFuelManagerService) {
		
        $scope.yes = function(data){
            console.log('========');
            console.log('value', data);
            $uibModal.yes({
                templateUrl: 'partials/pricingcontact/pricingcontact.html',
                backdrop: true,
                scope: $scope,
            })
        }

        $scope.userProfileId = JSON.parse(localStorage.getItem('userProfileId'));

        updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
          console.log('result', result);
          $scope.aTypeJets = result;
        })

        $scope.toggleJestAccordian = function(id){
            $('.'+id).slideDown();
            $('#'+id).addClass('customActive');
            $('#'+id+' select, #'+id+' input').prop("disabled", false);
            $('#'+id+' .btn-success, #'+id+' .btn-danger').css('display', 'inline-block');
            $('#'+id+' .btn-default').css('display', 'none');
        }

        $scope.saveJetAccordian = function(jets){
            $scope.jetsDetail = jets;
            $scope.jetsDetail.userProfileId = $scope.userProfileId;
            //console.log('jets', $scope.jetsDetail);
            $('.'+$scope.jetsDetail.id).slideUp();
            $('#'+$scope.jetsDetail.id).removeClass('customActive');
            $('#'+$scope.jetsDetail.id+' select, #'+$scope.jetsDetail.id+' input').prop("disabled", true);
            $('#'+$scope.jetsDetail.id+' .btn-success, #'+$scope.jetsDetail.id+' .btn-danger').css('display', 'none');
            $('#'+$scope.jetsDetail.id+' .btn-default').css('display', 'inline-block');

            var editJetData = 'productType='+$scope.jetsDetail.productType+'&marginName='+$scope.jetsDetail.marginName+'&pricingStructure='+$scope.jetsDetail.pricingStructure+'&marginValue='+$scope.jetsDetail.marginValue+'&userProfileId='+$scope.jetsDetail.userProfileId+'&marginId='+$scope.jetsDetail.id;

            updateFuelManagerService.editAtypeJetMargin(editJetData).then(function(result) {
                console.log('newJet', editJetData);
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
                  console.log('result', result);
                  $scope.aTypeJets = result;
                })
            })

        }

        $scope.addNewMarginBtn = function(){
            $('.addNewMargin').css('display', 'block');
        }
        $scope.closeMarginPopup = function(){
            $('.addNewMargin').css('display', 'none');
        }

        $scope.newJet = {};
        $scope.newJet.productType = '';

        $scope.addNewATypeJet = function(){
            $scope.newJet.productType = 'JET-A';
            $scope.newJet.userProfileId = $scope.userProfileId;

            var jetData = 'productType='+$scope.newJet.productType+'&marginName='+$scope.newJet.marginName+'&pricingStructure='+$scope.newJet.pricingStructure+'&marginValue='+$scope.newJet.marginValue+'&userProfileId='+$scope.newJet.userProfileId;

            updateFuelManagerService.addNewAtypeJetMargin(jetData).then(function(result) {
                console.log('newJet', jetData);
                toastr.success('Successfully Added', {
                  closeButton: true
                })
                $('.addNewMargin').css('display', 'none');
                updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
                  console.log('result', result);
                  $scope.aTypeJets = result;
                })
            })
        }

       /* $scope.addNewATypeJet = function(){
            $scope.newJet.productType = 'JET-A';
            $scope.newJet.userProfileId = $scope.userProfileId;

            var jetData = 'productType='+$scope.newJet.productType+'&marginName='+$scope.newJet.marginName+'&pricingStructure='+$scope.newJet.pricingStructure+'&marginValue='+$scope.newJet.marginValue+'&userProfileId='+$scope.newJet.userProfileId;

            updateFuelManagerService.addNewAtypeJetMargin(jetData).then(function(result) {
                console.log('newJet', jetData);
                toastr.success('Successfully Added', {
                  closeButton: true
                })
                $('.addNewMargin').css('display', 'none');
                updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
                  console.log('result', result);
                  $scope.aTypeJets = result;
                })
            })
        }*/


    }]);


