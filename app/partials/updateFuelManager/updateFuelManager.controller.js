
'use strict';

 //Load controller
  angular.module('acufuel')


      .controller('updateFuelManagerController', ['$scope','$uibModal', 'updateFuelManagerService', function($scope , $uibModal, updateFuelManagerService) {
		$scope.showLoader = true;
        $scope.yes = function(data){
            console.log('========');
            console.log('value', data);
            $uibModal.yes({
                templateUrl: 'partials/pricingcontact/pricingcontact.html',
                backdrop: true,
                scope: $scope,
            })
        }

        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
          };

          // Called when the editor is completely ready.
          $scope.onReady = function () {
            // ...
          };

        $scope.userProfileId = JSON.parse(localStorage.getItem('userProfileId'));

        updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
          $scope.aTypeJets = result;
          $scope.showLoader = false;
        })
        updateFuelManagerService.getVTypeJets($scope.userProfileId).then(function(result) {
          $scope.vTypeJets = result;
          $scope.showLoader = false;
        })
        $scope.toggleJestAccordian = function(id, index){
            $scope.showLoader = true;
            $('.'+id).slideDown();
            $('#'+id).addClass('customActive');
            $('#'+id+' select, #'+id+' input').prop("disabled", false);
            $('#'+id+' .btn-success, #'+id+' .btn-danger').css('display', 'inline-block');
            $('#'+id+' .btn-default').css('display', 'none');
            
            updateFuelManagerService.getJetTiers(id).then(function(tiers) {
                $scope.aTypeJets[index].tierList = tiers;
                $scope.showLoader = false;
            })
        }
        $scope.toggleVtypeJestAccordian = function(id, index){
            $scope.showLoader = true;
            $('.'+id).slideDown();
            $('#'+id).addClass('customActive');
            $('#'+id+' select, #'+id+' input').prop("disabled", false);
            $('#'+id+' .btn-success, #'+id+' .btn-danger').css('display', 'inline-block');
            $('#'+id+' .btn-default').css('display', 'none');
            
            updateFuelManagerService.getJetTiers(id).then(function(tiers) {
                $scope.vTypeJets[index].tierList = tiers;
                $scope.showLoader = false;
            })
        }
        //$scope.trData = {};
        $scope.addNewTier = function(id, trData, index){
            $scope.showLoader = true;
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
                  $scope.showLoader = false;
                })
            })
        }

        $scope.addNewVtypeTier = function(id, vtrData, index){
            $scope.showLoader = true;
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
                  $scope.showLoader = false;
                })
            })
        }

        $scope.editTier = function(tier, index){
            $scope.showLoader = true;
            var editTierData = 'minTierBreak='+tier.minTierBreak+'&maxTierBreak='+tier.maxTierBreak+'&margin='+tier.margin+
            '&marginTotal='+tier.marginTotal+'&marginTemplateId='+tier.marginTemplate.id+'&marginId='+tier.id;

            updateFuelManagerService.editTier(editTierData).then(function(result) {
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getJetTiers(tier.marginTemplate.id).then(function(tiers) {
                  $scope.aTypeJets[index].tierList = tiers;
                  $scope.showLoader = false;
                })
            })

        }

        $scope.editVtypeTier = function(tier, index){
            $scope.showLoader = true;
            var editTierData = 'minTierBreak='+tier.minTierBreak+'&maxTierBreak='+tier.maxTierBreak+'&margin='+tier.margin+
            '&marginTotal='+tier.marginTotal+'&marginTemplateId='+tier.marginTemplate.id+'&marginId='+tier.id;

            updateFuelManagerService.editTier(editTierData).then(function(result) {
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getJetTiers(tier.marginTemplate.id).then(function(tiers) {
                  $scope.vTypeJets[index].tierList = tiers;
                  $scope.showLoader = false;
                })
            })

        }

        $scope.deleteTierObject = {};
        $scope.deleteTier = function(id, jetid, index){
            $scope.deleteTierObject.id = id;
            $scope.deleteTierObject.jetId = jetid;
            $scope.deleteTierObject.index = index;
            $('#deleteTierConfirm').css('display', 'block');
        }

        $scope.confirmDeleteTier = function(){
            $scope.showLoader = true;
            updateFuelManagerService.deleteTier($scope.deleteTierObject.id).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
                updateFuelManagerService.getJetTiers($scope.deleteTierObject.jetId).then(function(tiers) {
                  $scope.aTypeJets[$scope.deleteTierObject.index].tierList = tiers;
                  $scope.showLoader = false;
                  $scope.deleteTierObject = {};
                })
            })
            $('#deleteTierConfirm').css('display', 'none');
        }

        $scope.cancelTierDelete = function(){
            console.log('cancel');
            $('#deleteTierConfirm').css('display', 'none');
            $scope.deleteTierObject = {};
        }

        /*$scope.deleteVtypeTier = function(id, jetid, index){
            $scope.showLoader = true;
            updateFuelManagerService.deleteTier(id).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
                updateFuelManagerService.getJetTiers(jetid).then(function(tiers) {
                  $scope.vTypeJets[index].tierList = tiers;
                  $scope.showLoader = false;
                })
            })
        }*/

        $scope.deleteVtypeTierObject = {};
        $scope.deleteVtypeTier = function(id, jetid, index){
            $scope.deleteVtypeTierObject.id = id;
            $scope.deleteVtypeTierObject.jetId = jetid;
            $scope.deleteVtypeTierObject.index = index;
            $('#deleteVtypeTierConfirm').css('display', 'block');
        }

        $scope.confirmDeleteVtypeTier = function(){
            $scope.showLoader = true;
            updateFuelManagerService.deleteTier($scope.deleteVtypeTierObject.id).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
                updateFuelManagerService.getJetTiers($scope.deleteVtypeTierObject.jetId).then(function(tiers) {
                  $scope.vTypeJets[$scope.deleteVtypeTierObject.index].tierList = tiers;
                  $scope.showLoader = false;
                  $scope.deleteVtypeTierObject = {};
                })
            })
            $('#deleteVtypeTierConfirm').css('display', 'none');
        }

        $scope.cancelVtypeTierDelete = function(){
            console.log('cancel');
            $('#deleteVtypeTierConfirm').css('display', 'none');
            $scope.deleteVtypeTierObject = {};
        }

        $scope.saveJetAccordian = function(jets){
            $scope.showLoader = true;
            $scope.jetsDetail = jets;
            $scope.jetsDetail.userProfileId = $scope.userProfileId;
            //console.log('jets', $scope.jetsDetail);
            $('.'+$scope.jetsDetail.id).slideUp();
            $('#'+$scope.jetsDetail.id).removeClass('customActive');
            $('#'+$scope.jetsDetail.id+' select, #'+$scope.jetsDetail.id+' input').prop("disabled", true);
            $('#'+$scope.jetsDetail.id+' .btn-success, #'+$scope.jetsDetail.id+' .btn-danger').css('display', 'none');
            $('#'+$scope.jetsDetail.id+' .btn-default').css('display', 'inline-block');

            var editJetData = 'productType='+$scope.jetsDetail.productType+'&marginName='+$scope.jetsDetail.marginName+'&pricingStructure='+$scope.jetsDetail.pricingStructure+'&marginValue='+$scope.jetsDetail.marginValue+'&userProfileId='+$scope.jetsDetail.userProfileId+'&marginId='+$scope.jetsDetail.id+'&message='+$scope.jetsDetail.message;

            updateFuelManagerService.editAtypeJetMargin(editJetData).then(function(result) {
                console.log('newJet', editJetData);
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
                  console.log('result', result);
                  $scope.aTypeJets = result;
                  $scope.showLoader = false;
                })
            })

        }

        $scope.closeAccordian = function(jets){
            $('.'+jets.id).slideUp();
            $('#'+jets.id).removeClass('customActive');
            $('#'+jets.id+' select, #'+jets.id+' input').prop("disabled", true);
            $('#'+jets.id+' .btn-success, #'+jets.id+' .btn-danger').css('display', 'none');
            $('#'+jets.id+' .btn-default').css('display', 'inline-block');
        }

        $scope.closeAccordianVtype = function(jets){
            $('.'+jets.id).slideUp();
            $('#'+jets.id).removeClass('customActive');
            $('#'+jets.id+' select, #'+jets.id+' input').prop("disabled", true);
            $('#'+jets.id+' .btn-success, #'+jets.id+' .btn-danger').css('display', 'none');
            $('#'+jets.id+' .btn-default').css('display', 'inline-block');
        }

        $scope.saveVtypeJetAccordian = function(jets){
            $scope.showLoader = true;
            $scope.jetsDetail = jets;
            $scope.jetsDetail.userProfileId = $scope.userProfileId;
            //console.log('jets', $scope.jetsDetail);
            $('.'+$scope.jetsDetail.id).slideUp();
            $('#'+$scope.jetsDetail.id).removeClass('customActive');
            $('#'+$scope.jetsDetail.id+' select, #'+$scope.jetsDetail.id+' input').prop("disabled", true);
            $('#'+$scope.jetsDetail.id+' .btn-success, #'+$scope.jetsDetail.id+' .btn-danger').css('display', 'none');
            $('#'+$scope.jetsDetail.id+' .btn-default').css('display', 'inline-block');

            var editVtypeJetData = 'productType='+$scope.jetsDetail.productType+'&marginName='+$scope.jetsDetail.marginName+'&pricingStructure='+$scope.jetsDetail.pricingStructure+'&marginValue='+$scope.jetsDetail.marginValue+'&userProfileId='+$scope.jetsDetail.userProfileId+'&marginId='+$scope.jetsDetail.id+'&message='+$scope.jetsDetail.message;

            updateFuelManagerService.editVtypeJetMargin(editVtypeJetData).then(function(result) {
                console.log('newJet', editVtypeJetData);
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getVTypeJets($scope.userProfileId).then(function(result) {
                  $scope.vTypeJets = result;
                  console.log('second jets', result);
                  $scope.showLoader = false;
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
            $scope.showLoader = true;
            $scope.newJet.productType = 'JET-A';
            $scope.newJet.userProfileId = $scope.userProfileId;

            var jetData = 'productType='+$scope.newJet.productType+'&marginName='+$scope.newJet.marginName+'&pricingStructure='+$scope.newJet.pricingStructure+'&marginValue='+$scope.newJet.marginValue+'&userProfileId='+$scope.newJet.userProfileId+'&message='+$scope.newJet.message;

            updateFuelManagerService.addNewAtypeJetMargin(jetData).then(function(result) {
                console.log('newJet', jetData);
                toastr.success('Successfully Added', {
                  closeButton: true
                })
                $('.addNewMargin').css('display', 'none');
                updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
                  console.log('result', result);
                  $scope.aTypeJets = result;
                  $scope.showLoader = false;
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
            $scope.showLoader = true;
            $scope.newVtypeJet.productType = 'AVGAS';
            $scope.newVtypeJet.userProfileId = $scope.userProfileId;

            var vJetData = 'productType='+$scope.newVtypeJet.productType+'&marginName='+$scope.newVtypeJet.marginName+'&pricingStructure='+$scope.newVtypeJet.pricingStructure+'&marginValue='+$scope.newVtypeJet.marginValue+'&userProfileId='+$scope.newVtypeJet.userProfileId+'&message='+$scope.newVtypeJet.message;

            updateFuelManagerService.addNewVtypeJet(vJetData).then(function(result) {
                
                toastr.success('Successfully Added', {
                  closeButton: true
                })
                $('.addNewVtype').css('display', 'none');
                updateFuelManagerService.getVTypeJets($scope.userProfileId).then(function(result) {
                  $scope.vTypeJets = result;
                  $scope.showLoader = false;
                })
            })

        }


        $scope.sendEmail = {};

        $scope.confirmMail = function(){
            if ($scope.sendEmail.pricing != '' && $scope.sendEmail.pricing != null && $scope.sendEmail.pricing != undefined) {
                $('#confirm1').css('display', 'block');
            }
        }

        $scope.saveAndCloseConfirm = function(){
            $('#confirm1').css('display', 'none');
            updateFuelManagerService.sendMailToMargin($scope.sendEmail.pricing).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
            })
        }
        $scope.cancelAndCloseConfirm = function(){
            $scope.sendEmail = {};
            $scope.sendEmail.pricing = '';
            $('#confirm1').css('display', 'none');
        }

        $scope.newFuelPricing = {};
        updateFuelManagerService.getFuelPricingNew().then(function(result) {
            $scope.newFuelPricing = result;
              for (var i = 0; i<$scope.newFuelPricing.length; i++) {
                if ($scope.newFuelPricing[i].fuelPricing != null) {
                    if ($scope.newFuelPricing[i].fuelPricing.expirationDate != null && $scope.newFuelPricing[i].fuelPricing.expirationDate != '') {
                        var newTime = new Date($scope.newFuelPricing[i].fuelPricing.expirationDate);
                        var month = newTime.getUTCMonth() + 1; //months from 1-12
                        var day = newTime.getUTCDate();
                        var year = newTime.getUTCFullYear();
                        $scope.newFuelPricing[i].fuelPricing.expirationDate = month+'/'+day+'/'+year;
                    }
                }
                if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                    if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                        if ($scope.newFuelPricing[i].futureFuelPricing.nextExpiration != null && $scope.newFuelPricing[i].futureFuelPricing.nextExpiration != '') {
                            var newTime = new Date($scope.newFuelPricing[i].futureFuelPricing.nextExpiration);
                            var nextMonth = newTime.getUTCMonth() + 1; //months from 1-12
                            var nextDay = newTime.getUTCDate();
                            var nextYear = newTime.getUTCFullYear();
                            $scope.newFuelPricing[i].futureFuelPricing.nextExpiration = nextMonth+'/'+nextDay+'/'+nextYear;
                        }
                    }
                    if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                        if ($scope.newFuelPricing[i].futureFuelPricing.deployDate != null && $scope.newFuelPricing[i].futureFuelPricing.deployDate != '') {
                            var newTime = new Date($scope.newFuelPricing[i].futureFuelPricing.deployDate);
                            var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                            var dday = newTime.getUTCDate();
                            var dyear = newTime.getUTCFullYear();
                            $scope.newFuelPricing[i].futureFuelPricing.deployDate = dmonth+'/'+dday+'/'+dyear;
                        }
                    }
                }
              }
              $scope.showLoader = false;
        })
        $scope.$watch("fuelPricing.fuelPricing.expirationDate",function(old,newv){
        });
        $scope.updateFuelPricing = {};
        $scope.updateFuelPricing.fuelPricingList = [];
        $scope.updateFuelPricing.userProfileId = $scope.userProfileId;
        $scope.updateFuelPricingClick = function(){
            $scope.showLoader = true;

            for (var i = 0; i<$scope.newFuelPricing.length; i++) {
                if ($scope.newFuelPricing[i].fuelPricing != null) {
                    $scope.newFuelPricing[i].fuelPricing.papTotal = parseFloat($scope.newFuelPricing[i].fuelPricing.cost) + parseFloat($scope.newFuelPricing[i].fuelPricing.papMargin);
                    if ($scope.newFuelPricing[i].fuelPricing.cost == null) {
                        $scope.newFuelPricing[i].fuelPricing.cost = '';
                    }
                    if ($scope.newFuelPricing[i].fuelPricing.papMargin == null) {
                        $scope.newFuelPricing[i].fuelPricing.papMargin = '';
                    }
                    if ($scope.newFuelPricing[i].fuelPricing.papTotal == null) {
                        $scope.newFuelPricing[i].fuelPricing.papTotal = '';
                    }
                    if ($scope.newFuelPricing[i].fuelPricing.expirationDate == null) {
                        $scope.newFuelPricing[i].fuelPricing.expirationDate = '';
                    }else{
                        $scope.newFuelPricing[i].fuelPricing.expirationDate = new Date($scope.newFuelPricing[i].fuelPricing.expirationDate);
                        console.log('$scope.newFuelPricing[i].fuelPricing.expirationDate', $scope.newFuelPricing[i].fuelPricing.expirationDate);
                        $scope.newFuelPricing[i].fuelPricing.expirationDate = $scope.newFuelPricing[i].fuelPricing.expirationDate.getTime();
                    }

                    $scope.newFuelPricing[i].fuelPricing.papTotal = parseFloat($scope.newFuelPricing[i].fuelPricing.cost) + parseFloat($scope.newFuelPricing[i].fuelPricing.papMargin);
                    $scope.updateFuelPricing.fuelPricingList.push({
                        'cost': $scope.newFuelPricing[i].fuelPricing.cost,
                        'papMargin': $scope.newFuelPricing[i].fuelPricing.papMargin,
                        'papTotal': $scope.newFuelPricing[i].fuelPricing.papTotal,
                        'expirationDate': $scope.newFuelPricing[i].fuelPricing.expirationDate,
                        'productId': $scope.newFuelPricing[i].id,
                        'id': $scope.newFuelPricing[i].fuelPricing.id,
                    })
                    
                }else{
                    /*$scope.newFuelPricing[i].fuelPricing.cost = '';
                    $scope.newFuelPricing[i].fuelPricing.papMargin = '';
                    $scope.newFuelPricing[i].fuelPricing.papTotal = '';
                    $scope.newFuelPricing[i].fuelPricing.expirationDate = '';*/
                }
                
            }
            updateFuelManagerService.updateFuelPricing($scope.updateFuelPricing).then(function(result) {
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getFuelPricingNew().then(function(result) {
                    $scope.newFuelPricing = result;
                      for (var i = 0; i<$scope.newFuelPricing.length; i++) {
                        if ($scope.newFuelPricing[i].fuelPricing != null) {
                            if ($scope.newFuelPricing[i].fuelPricing.expirationDate != null && $scope.newFuelPricing[i].fuelPricing.expirationDate != '') {
                                var newTime = new Date($scope.newFuelPricing[i].fuelPricing.expirationDate);
                                var month = newTime.getUTCMonth() + 1; //months from 1-12
                                var day = newTime.getUTCDate();
                                var year = newTime.getUTCFullYear();
                                $scope.newFuelPricing[i].fuelPricing.expirationDate = month+'/'+day+'/'+year;
                            }
                        }
                        if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                            if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                                if ($scope.newFuelPricing[i].futureFuelPricing.nextExpiration != null && $scope.newFuelPricing[i].futureFuelPricing.nextExpiration != '') {
                                    var newTime = new Date($scope.newFuelPricing[i].futureFuelPricing.nextExpiration);
                                    var nextMonth = newTime.getUTCMonth() + 1; //months from 1-12
                                    var nextDay = newTime.getUTCDate();
                                    var nextYear = newTime.getUTCFullYear();
                                    $scope.newFuelPricing[i].futureFuelPricing.nextExpiration = nextMonth+'/'+nextDay+'/'+nextYear;
                                }
                            }
                            if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                                if ($scope.newFuelPricing[i].futureFuelPricing.deployDate != null && $scope.newFuelPricing[i].futureFuelPricing.deployDate != '') {
                                    var newTime = new Date($scope.newFuelPricing[i].futureFuelPricing.deployDate);
                                    var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                                    var dday = newTime.getUTCDate();
                                    var dyear = newTime.getUTCFullYear();
                                    $scope.newFuelPricing[i].futureFuelPricing.deployDate = dmonth+'/'+dday+'/'+dyear;
                                }
                            }
                        }
                      }
                      $scope.showLoader = false;
                })
            })
            
        }

        $scope.updateFutureFuelPricing = {};
        $scope.updateFutureFuelPricing.futureFuelPricingList = [];
        $scope.updateFutureFuelPricing.userProfileId = $scope.userProfileId;
        $scope.updateFutureFuelPricingClick = function(){
            $scope.showLoader = true;
            for (var i = 0; i<$scope.newFuelPricing.length; i++) {
                //console.log(parseFloat($scope.newFuelPricing[i].futureFuelPricing.cost) + parseFloat($scope.newFuelPricing[i].fuelPricing.papMargin));
                if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                    if ($scope.newFuelPricing[i].futureFuelPricing.cost != null || $scope.newFuelPricing[i].futureFuelPricing.cost != '' || $scope.newFuelPricing[i].futureFuelPricing.cost != undefined) {
                        $scope.newFuelPricing[i].futureFuelPricing.papTotal = parseFloat($scope.newFuelPricing[i].futureFuelPricing.cost) + parseFloat($scope.newFuelPricing[i].fuelPricing.papMargin);
                        if ($scope.newFuelPricing[i].futureFuelPricing.cost == null) {
                            $scope.newFuelPricing[i].futureFuelPricing.cost = '';
                        }
                        if ($scope.newFuelPricing[i].futureFuelPricing.papMargin == null) {
                            $scope.newFuelPricing[i].futureFuelPricing.papMargin = '';
                        }
                        if ($scope.newFuelPricing[i].futureFuelPricing.papTotal == null) {
                            $scope.newFuelPricing[i].futureFuelPricing.papTotal = '';
                        }
                        if ($scope.newFuelPricing[i].futureFuelPricing.nextExpiration == null) {
                            $scope.newFuelPricing[i].futureFuelPricing.nextExpiration = '';
                        }else{
                            $scope.newFuelPricing[i].futureFuelPricing.nextExpiration = new Date($scope.newFuelPricing[i].futureFuelPricing.nextExpiration);
                            console.log('$scope.newFuelPricing[i].futureFuelPricing.nextExpiration', $scope.newFuelPricing[i].futureFuelPricing.nextExpiration);
                            $scope.newFuelPricing[i].futureFuelPricing.nextExpiration = $scope.newFuelPricing[i].futureFuelPricing.nextExpiration.getTime();
                        }
                        if ($scope.newFuelPricing[i].futureFuelPricing.deployDate == null) {
                            $scope.newFuelPricing[i].futureFuelPricing.deployDate = '';
                        }else{
                            $scope.newFuelPricing[i].futureFuelPricing.deployDate = new Date($scope.newFuelPricing[i].futureFuelPricing.deployDate);
                            $scope.newFuelPricing[i].futureFuelPricing.deployDate = $scope.newFuelPricing[i].futureFuelPricing.deployDate.getTime();
                        }

                        $scope.newFuelPricing[i].futureFuelPricing.papTotal = parseFloat($scope.newFuelPricing[i].futureFuelPricing.cost) + parseFloat($scope.newFuelPricing[i].fuelPricing.papMargin);
                        $scope.updateFutureFuelPricing.futureFuelPricingList.push({
                            'cost': $scope.newFuelPricing[i].futureFuelPricing.cost,
                            'papMargin': $scope.newFuelPricing[i].fuelPricing.papMargin,
                            //'papTotal': $scope.newFuelPricing[i].futureFuelPricing.papTotal,
                            'papTotal': $scope.newFuelPricing[i].futureFuelPricing.papTotal,
                            'expirationDate': $scope.newFuelPricing[i].futureFuelPricing.nextExpiration,
                            'deployDate': $scope.newFuelPricing[i].futureFuelPricing.deployDate,
                            'productId': $scope.newFuelPricing[i].id,
                            'id': $scope.newFuelPricing[i].futureFuelPricing.id,
                        })
                    }
                }else{
                    /*$scope.newFuelPricing[i].futureFuelPricing.cost = '';
                    $scope.newFuelPricing[i].futureFuelPricing.papMargin = '';
                    $scope.newFuelPricing[i].futureFuelPricing.papTotal = '';
                    $scope.newFuelPricing[i].futureFuelPricing.expirationDate = '';
                    $scope.newFuelPricing[i].futureFuelPricing.deployDate = '';*/
                }
            }
            updateFuelManagerService.updateFutureFuelPricing($scope.updateFutureFuelPricing).then(function(result) {
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                updateFuelManagerService.getFuelPricingNew().then(function(result) {
                    $scope.newFuelPricing = result;
                      for (var i = 0; i<$scope.newFuelPricing.length; i++) {
                        if ($scope.newFuelPricing[i].fuelPricing != null) {
                            if ($scope.newFuelPricing[i].fuelPricing.expirationDate != null && $scope.newFuelPricing[i].fuelPricing.expirationDate != '') {
                                var newTime = new Date($scope.newFuelPricing[i].fuelPricing.expirationDate);
                                var month = newTime.getUTCMonth() + 1; //months from 1-12
                                var day = newTime.getUTCDate();
                                var year = newTime.getUTCFullYear();
                                $scope.newFuelPricing[i].fuelPricing.expirationDate = month+'/'+day+'/'+year;
                            }
                        }
                        if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                            if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                                if ($scope.newFuelPricing[i].futureFuelPricing.nextExpiration != null && $scope.newFuelPricing[i].futureFuelPricing.nextExpiration != '') {
                                    var newTime = new Date($scope.newFuelPricing[i].futureFuelPricing.nextExpiration);
                                    var nextMonth = newTime.getUTCMonth() + 1; //months from 1-12
                                    var nextDay = newTime.getUTCDate();
                                    var nextYear = newTime.getUTCFullYear();
                                    $scope.newFuelPricing[i].futureFuelPricing.nextExpiration = nextMonth+'/'+nextDay+'/'+nextYear;
                                }
                            }
                            if ($scope.newFuelPricing[i].futureFuelPricing != null) {
                                if ($scope.newFuelPricing[i].futureFuelPricing.deployDate != null && $scope.newFuelPricing[i].futureFuelPricing.deployDate != '') {
                                    var newTime = new Date($scope.newFuelPricing[i].futureFuelPricing.deployDate);
                                    var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                                    var dday = newTime.getUTCDate();
                                    var dyear = newTime.getUTCFullYear();
                                    $scope.newFuelPricing[i].futureFuelPricing.deployDate = dmonth+'/'+dday+'/'+dyear;
                                }
                            }
                      }
                  }
                      $scope.showLoader = false;
                })
            })

            
        }

        updateFuelManagerService.getMargin().then(function(result) {
          $scope.marginList = result;
        })

        $scope.marginIdDelete = '';
        $scope.deleteJetAccordian = function(id){
            $scope.marginIdDelete = id;
            $('#deleteMargin').css('display', 'block');
        }

        $scope.confirmDeleteMargin = function(){
            $('#deleteMargin').css('display', 'none');
            $scope.showLoader = true;
            updateFuelManagerService.deleteMargin($scope.marginIdDelete).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
                updateFuelManagerService.getATypeJets($scope.userProfileId).then(function(result) {
                  $scope.aTypeJets = result;
                  $scope.showLoader = false;
                })
            })
        }

        $scope.cancelMarginDelete = function(){
            $scope.marginIdDelete = '';
            $('#deleteMargin').css('display', 'none');
        }

        $scope.marginVtypeIdDelete = '';
        $scope.deleteVtypeJetAccordian = function(id){
            $scope.marginVtypeIdDelete = id;
            $('#deleteVtypeMargin').css('display', 'block');
        }

        $scope.confirmDeletVtypeMargin = function(){
            $('#deleteVtypeMargin').css('display', 'none');
            $scope.showLoader = true;
            updateFuelManagerService.deleteMargin($scope.marginVtypeIdDelete).then(function(result) {
                toastr.success(''+result.success+'', {
                  closeButton: true
                })
                updateFuelManagerService.getVTypeJets($scope.userProfileId).then(function(result) {
                  $scope.vTypeJets = result;
                  $scope.showLoader = false;
                })
            })
        }

        $scope.cancelVtypeMarginDelete = function(){
            $scope.marginVtypeIdDelete = '';
            $('#deleteVtypeMargin').css('display', 'none');
        }

    }]);


