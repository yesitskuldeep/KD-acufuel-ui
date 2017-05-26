
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
          $scope.aTypeJets = result;
        })
        updateFuelManagerService.getVTypeJets($scope.userProfileId).then(function(result) {
          $scope.vTypeJets = result;
          console.log('second jets', result);
        })
        $scope.toggleJestAccordian = function(id, index){
            $('.'+id).slideDown();
            $('#'+id).addClass('customActive');
            $('#'+id+' select, #'+id+' input').prop("disabled", false);
            $('#'+id+' .btn-success, #'+id+' .btn-danger').css('display', 'inline-block');
            $('#'+id+' .btn-default').css('display', 'none');
            
            updateFuelManagerService.getJetTiers(id).then(function(tiers) {
                $scope.aTypeJets[index].tierList = tiers;
            })
        }
        $scope.toggleVtypeJestAccordian = function(id, index){
            $('.'+id).slideDown();
            $('#'+id).addClass('customActive');
            $('#'+id+' select, #'+id+' input').prop("disabled", false);
            $('#'+id+' .btn-success, #'+id+' .btn-danger').css('display', 'inline-block');
            $('#'+id+' .btn-default').css('display', 'none');
            
            updateFuelManagerService.getJetTiers(id).then(function(tiers) {
                $scope.vTypeJets[index].tierList = tiers;
            })
        }
        //$scope.trData = {};
        $scope.addNewTier = function(id, trData, index){
            $scope.tr = {};
            $scope.tr[index] = {};
            $scope.tr[index].minTierBreak = trData[index].minTierBreak;
            $scope.tr[index].maxTierBreak = trData[index].maxTierBreak;
            $scope.tr[index].margin = trData[index].margin;
            $scope.tr[index].marginTotal = '1.00';
            $scope.tr[index].marginTemplateId = id;

            var tierData = 'minTierBreak='+$scope.tr[index].minTierBreak+'&maxTierBreak='+$scope.tr[index].maxTierBreak+'&margin='+$scope.tr[index].margin+
            '&marginTotal='+$scope.tr[index].marginTotal+'&marginTemplateId='+$scope.tr[index].marginTemplateId;
            
            updateFuelManagerService.addNewTier(tierData).then(function(result) {
                toastr.success('Successfully Added', {
                  closeButton: true
                })
                trData[index].minTierBreak = '';
                trData[index].maxTierBreak = '';
                trData[index].margin = '';
                updateFuelManagerService.getJetTiers(id).then(function(tiers) {
                  $scope.aTypeJets[index].tierList = tiers;
                })
            })
        }

        $scope.addNewVtypeTier = function(id, vtrData, index){
            $scope.tr = {};
            $scope.tr[index] = {};
            $scope.tr[index].minTierBreak = vtrData[index].minTierBreak;
            $scope.tr[index].maxTierBreak = vtrData[index].maxTierBreak;
            $scope.tr[index].margin = vtrData[index].margin;
            $scope.tr[index].marginTotal = '1.00';
            $scope.tr[index].marginTemplateId = id;

            var tierData = 'minTierBreak='+$scope.tr[index].minTierBreak+'&maxTierBreak='+$scope.tr[index].maxTierBreak+'&margin='+$scope.tr[index].margin+
            '&marginTotal='+$scope.tr[index].marginTotal+'&marginTemplateId='+$scope.tr[index].marginTemplateId;
            
            updateFuelManagerService.addNewTier(tierData).then(function(result) {
                toastr.success('Successfully Added', {
                  closeButton: true
                })
                vtrData[index].minTierBreak = '';
                vtrData[index].maxTierBreak = '';
                vtrData[index].margin = '';
                updateFuelManagerService.getJetTiers(id).then(function(tiers) {
                  $scope.vTypeJets[index].tierList = tiers;
                })
            })
        }

        $scope.editTier = function(tier){
            var editTierData = 'minTierBreak='+tier.minTierBreak+'&maxTierBreak='+tier.maxTierBreak+'&margin='+tier.margin+
            '&marginTotal='+tier.marginTotal+'&marginTemplateId='+tier.marginTemplate.id+'&marginId='+tier.id;

            updateFuelManagerService.editTier(editTierData).then(function(result) {
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getJetTiers(tier.marginTemplate.id).then(function(tiers) {
                  $scope.tierList = tiers;
                })
            })

        }

        $scope.deleteTier = function(id, jetid){
            updateFuelManagerService.deleteTier(id).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
                updateFuelManagerService.getJetTiers(jetid).then(function(tiers) {
                  $scope.tierList = tiers;
                })
            })
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

        $scope.saveVtypeJetAccordian = function(jets){
            $scope.jetsDetail = jets;
            $scope.jetsDetail.userProfileId = $scope.userProfileId;
            //console.log('jets', $scope.jetsDetail);
            $('.'+$scope.jetsDetail.id).slideUp();
            $('#'+$scope.jetsDetail.id).removeClass('customActive');
            $('#'+$scope.jetsDetail.id+' select, #'+$scope.jetsDetail.id+' input').prop("disabled", true);
            $('#'+$scope.jetsDetail.id+' .btn-success, #'+$scope.jetsDetail.id+' .btn-danger').css('display', 'none');
            $('#'+$scope.jetsDetail.id+' .btn-default').css('display', 'inline-block');

            var editVtypeJetData = 'productType='+$scope.jetsDetail.productType+'&marginName='+$scope.jetsDetail.marginName+'&pricingStructure='+$scope.jetsDetail.pricingStructure+'&marginValue='+$scope.jetsDetail.marginValue+'&userProfileId='+$scope.jetsDetail.userProfileId+'&marginId='+$scope.jetsDetail.id;

            updateFuelManagerService.editVtypeJetMargin(editVtypeJetData).then(function(result) {
                console.log('newJet', editVtypeJetData);
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getVTypeJets($scope.userProfileId).then(function(result) {
                  $scope.vTypeJets = result;
                  console.log('second jets', result);
                })
            })

        }

        $scope.newJet = {};

        $scope.addNewMarginBtn = function(){
            $('.addNewMargin').css('display', 'block');
        }
        $scope.closeMarginPopup = function(){
            $('.addNewMargin').css('display', 'none');
            $scope.newJet = {};
        }

        //$scope.newJet.productType = '';

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

        $scope.newVtypeJet = {};

        $scope.addNewVtypePop = function(){
            $('.addNewVtype').css('display', 'block');
        }
        $scope.closeNewVtypePop = function(){
            $('.addNewVtype').css('display', 'none');
            $scope.newVtypeJet = {};
        }

        $scope.addNewVTypeJet = function(){
            $scope.newVtypeJet.productType = 'AVGAS';
            $scope.newVtypeJet.userProfileId = $scope.userProfileId;

            var vJetData = 'productType='+$scope.newVtypeJet.productType+'&marginName='+$scope.newVtypeJet.marginName+'&pricingStructure='+$scope.newVtypeJet.pricingStructure+'&marginValue='+$scope.newVtypeJet.marginValue+'&userProfileId='+$scope.newVtypeJet.userProfileId;

            updateFuelManagerService.addNewVtypeJet(vJetData).then(function(result) {
                
                toastr.success('Successfully Added', {
                  closeButton: true
                })
                $('.addNewVtype').css('display', 'none');
                updateFuelManagerService.getVTypeJets($scope.userProfileId).then(function(result) {
                  $scope.vTypeJets = result;
                  
                })
            })

        }


        $scope.sendEmail = {};
        $scope.sendEmail.pricing = '';

        $scope.confirmMail = function(){
            if ($scope.sendEmail.pricing != '' && $scope.sendEmail.pricing != null) {
                $('#confirm1').css('display', 'block');
            }
        }
        $scope.saveAndCloseConfirm = function(){
            $('#confirm1').css('display', 'none');
        }
        $scope.cancelAndCloseConfirm = function(){
            $scope.sendEmail = {};
            $scope.sendEmail.pricing = '';
            $('#confirm1').css('display', 'none');
        }
        $scope.fuelPricing;
        updateFuelManagerService.getFuelPricing($scope.userProfileId).then(function(result) {
          $scope.fuelPricing = result;
          for (var i = 0; i<$scope.fuelPricing.length; i++) {
            if ($scope.fuelPricing[i].expirationDate != null) {
                $scope.fuelPricing[i].expirationDate = new Date($scope.fuelPricing[i].expirationDate)
            }
          }
        })
        $scope.updateFuelPricing = {};
        $scope.updateFuelPricing.fuelPricingList = [];
        //$scope.testingArray = [];
        $scope.updateFuelPricing.userProfileId = $scope.userProfileId;
        $scope.updateFuelPricingClick = function(){
            for (var i = 0; i<$scope.fuelPricing.length; i++) {
                if ($scope.fuelPricing[i].expirationDate != null) {
                    $scope.fuelPricing[i].expirationDate = $scope.fuelPricing[i].expirationDate.getTime();
                }
                
                $scope.updateFuelPricing.fuelPricingList.push({
                    'cost': $scope.fuelPricing[i].cost,
                    'papMargin': $scope.fuelPricing[i].papMargin,
                    'papTotal': $scope.fuelPricing[i].papTotal,
                    'productId': $scope.fuelPricing[i].product.id,
                    'expirationDate': $scope.fuelPricing[i].expirationDate
                })
            }

            updateFuelManagerService.updateFuelPricing($scope.updateFuelPricing).then(function(result) {
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getFuelPricing($scope.userProfileId).then(function(result) {
                  $scope.fuelPricing = result;
                  for (var i = 0; i<$scope.fuelPricing.length; i++) {
                    if ($scope.fuelPricing[i].expirationDate != null) {
                        $scope.fuelPricing[i].expirationDate = new Date($scope.fuelPricing[i].expirationDate)
                    }
                  }
                })
            })
            
        }

        updateFuelManagerService.getFutureFuelPricing($scope.userProfileId).then(function(result) {
          $scope.futureFuelPricing = result;
          console.log('$scope.futureFuelPricing', $scope.futureFuelPricing);
          /*for (var i = 0; i<$scope.fuelPricing.length; i++) {
            if ($scope.fuelPricing[i].expirationDate != null) {
                $scope.fuelPricing[i].expirationDate = new Date($scope.fuelPricing[i].expirationDate)
            }
          }*/
        })


    }]);


