
'use strict';

 //Load controller
  angular.module('acufuel')

	//.controller('fuelManagerController', ['$scope', 'fuelManagerService',function($scope, fuelManagerService) {
  .controller('fuelManagerController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'fuelManagerService', fuelManagerController]);

  function fuelManagerController($scope, $rootScope, $uibModal, $filter, $http, fuelManagerService) {

      $scope.currentUserData = JSON.parse(localStorage.getItem('userProfileId'));
      $scope.showLoader = true;

      fuelManagerService.getFullList().then(function(result) {
        $scope.fullJetList = result;
        console.log('$scope.fullJetList', $scope.fullJetList);
        for (var i = 0; i<$scope.fullJetList.length; i++) {
          for (var j = 0; j<$scope.fullJetList[i].aircraftsSize.length; j++) {
            if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance != null) {
              if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != null && $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != '') {
                var newTime = new Date($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate);
                var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                var dday = newTime.getUTCDate();
                var dyear = newTime.getUTCFullYear();
                $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate = dmonth+'/'+dday+'/'+dyear;
                console.log('$scope.fullJetList.aircraftsSize.rampFeesAndAvoidance.expirationDate', $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate); 
              }
            }
          }
        }
        $scope.showLoader = false;
      })

      $scope.avoidanceList = {};
     
      $scope.updateList = function(fullJetList){
        $scope.showLoader = true;
        $scope.addData = [];
        $scope.newJetList = fullJetList;
        if ($scope.currentUserData != undefined || $scope.currentUserData != null) {
          for(var i=0; i<$scope.newJetList.length;i++){
              for(var j = 0; j < $scope.newJetList[i].aircraftsSize.length; j++){
                if($scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance != null){
                  if ($scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != null) {
                    $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate = new Date($scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate);
                    $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate = $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate.getTime();
                  }
                  $scope.addData.push({
                      //'aircraftType': $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.aircraftType,
                      'id': $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.id,
                      'aircraftSizeId': $scope.newJetList[i].aircraftsSize[j].id,
                      'rampFees': $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.rampFees,
                      'avoidance' : $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.avoidance,
                      'applicable' : $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.applicable,
                      'expirationDate' : $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate,
                      'notes' : $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance.notes
                    });

                }
              }
          }
          $scope.avoidanceList.rampFeesAndAvoidanceList = $scope.addData;
          $scope.avoidanceList.fboUserId = $scope.currentUserData;

          fuelManagerService.updateFullList($scope.avoidanceList).then(function(result) {
            toastr.success(''+result.success+'', {
              closeButton: true
            })
            fuelManagerService.getFullList().then(function(result) {
            $scope.fullJetList = result;
            console.log('$scope.fullJetList', $scope.fullJetList);
            for (var i = 0; i<$scope.fullJetList.length; i++) {
              for (var j = 0; j<$scope.fullJetList[i].aircraftsSize.length; j++) {
                if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance != null) {
                  if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != null && $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != '') {
                    var newTime = new Date($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate);
                    var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                    var dday = newTime.getUTCDate();
                    var dyear = newTime.getUTCFullYear();
                    $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate = dmonth+'/'+dday+'/'+dyear;
                    console.log('$scope.fullJetList.aircraftsSize.rampFeesAndAvoidance.expirationDate', $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate); 
                  }
                }
              }
            }
            $scope.showLoader = false;
          })
          })

        }
            
      }

      $scope.dropOptions = {};

      fuelManagerService.getOptions().then(function(result) {
          $scope.dropOptions = result;
          console.log('$scope.dropOptions', $scope.dropOptions);
      })

      fuelManagerService.getAircrafts().then(function(result) {
          $scope.aircrafts = result;
      })

      $scope.customRampData = {};
      $scope.customRampDataCraft = {};
      $scope.customRampDataCraft.aircraftType = '';
      $scope.customRampDataCraft.aircraftSizeId = '';

      $scope.openRampFeeModal = false;
      $scope.showWeightForm = false;
      $scope.showMakeModelForm = false;
      $scope.showWingspanForm = false;
      $scope.showTailForm = false;

      $scope.customRampData = {};
      $scope.customMakeData = {};
      $scope.customWingspanData = {};
      $scope.customTailData = {};

      $scope.openRampModal = function(){
        $scope.showLoader = true;
        $scope.openRampFeeModal = true;
        if ($scope.customRampDataCraft.aircraftType != null) {
          for (var i = 0; i < $scope.dropOptions.length; i++) {
            if ($scope.customRampDataCraft.aircraftType === $scope.dropOptions[i].size) {
              $scope.customRampDataCraft.aircraftSizeId = $scope.dropOptions[i].id;
            }
          }
          $scope.OldRampData = {};
          fuelManagerService.getRampFeeDetail($scope.customRampDataCraft.aircraftSizeId).then(function(result) {
            $scope.OldRampData = result;
            if ($scope.customRampDataCraft.aircraftType === 'WEIGHT') {
              $scope.showWeightForm = true;
              $scope.showMakeModelForm = false;
              $scope.showWingspanForm = false;
              $scope.showTailForm = false;
              $scope.customRampData = $scope.OldRampData;
            }else if ($scope.customRampDataCraft.aircraftType === 'MAKE_AND_MODEL') {
              $scope.showWeightForm = false;
              $scope.showMakeModelForm = true;
              $scope.showWingspanForm = false;
              $scope.showTailForm = false;
              $scope.customMakeData = $scope.OldRampData;
              console.log('$scope.customMakeData', $scope.customMakeData);
            }else if ($scope.customRampDataCraft.aircraftType === 'WINGSPAN') {
              $scope.showWeightForm = false;
              $scope.showMakeModelForm = false;
              $scope.showWingspanForm = true;
              $scope.showTailForm = false;
              $scope.customWingspanData = $scope.OldRampData;
            }else if ($scope.customRampDataCraft.aircraftType === 'TAIL') {
              $scope.showWeightForm = false;
              $scope.showMakeModelForm = false;
              $scope.showWingspanForm = false;
              $scope.showTailForm = true;
              $scope.customTailData = $scope.OldRampData;
            }else{
              $scope.openRampFeeModal = false;
              $scope.showWeightForm = false;
              $scope.showMakeModelForm = false;
              $scope.showWingspanForm = false;
              $scope.showTailForm = false;
            }
            $scope.showLoader = false;
          })
        }else{
          $scope.openRampFeeModal = false;
        }
      }

      $scope.addCustomRampNew = function(data){
        $scope.showLoader = true;
        $scope.newCustomRampData = data;
        $scope.newRampData = [];
        if ($scope.newCustomRampData != null) {
          if ($scope.newCustomRampData.id != null) {
            $scope.newRampData.push({'id': $scope.newCustomRampData.id});
          }
          $scope.newRampData.push({
            'aircraftSizeId': $scope.customRampDataCraft.aircraftSizeId,
            'rampFees': $scope.newCustomRampData.rampFees,
            'avoidance': $scope.newCustomRampData.avoidance,
            'applicable': $scope.newCustomRampData.applicable,
            'expirationDate': $scope.newCustomRampData.expirationDate,
            'notes': $scope.newCustomRampData.notes,
            'aircraftMake': $scope.newCustomRampData.aircraftMake,
            'wingspanMin': $scope.newCustomRampData.wingspanMin,
            'wingspanMax': $scope.newCustomRampData.wingspanMax,
            'weightRangeMin': $scope.newCustomRampData.weightRangeMin,
            'weightRangeMax': $scope.newCustomRampData.weightRangeMax,
            'tailNumber': $scope.newCustomRampData.tailNumber,
          });
        }
        
        $scope.avoidanceList.rampFeesAndAvoidanceList = $scope.newRampData;
        $scope.avoidanceList.fboUserId = $scope.currentUserData;
        //console.log('$scope.newRampData', $scope.avoidanceList);
        fuelManagerService.updateFullList($scope.avoidanceList).then(function(result) {
          toastr.success(''+result.success+'', {
            closeButton: true
          })
          $scope.openRampFeeModal = false;
          fuelManagerService.getFullList().then(function(result) {
          $scope.fullJetList = result;
          console.log('$scope.fullJetList', $scope.fullJetList);
          for (var i = 0; i<$scope.fullJetList.length; i++) {
            for (var j = 0; j<$scope.fullJetList[i].aircraftsSize.length; j++) {
              if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance != null) {
                if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != null && $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != '') {
                  var newTime = new Date($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate);
                  var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                  var dday = newTime.getUTCDate();
                  var dyear = newTime.getUTCFullYear();
                  $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate = dmonth+'/'+dday+'/'+dyear;
                  console.log('$scope.fullJetList.aircraftsSize.rampFeesAndAvoidance.expirationDate', $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate); 
                }
              }
            }
          }
          $scope.showLoader = false;
        })
        })
      }

      $scope.deleteTemplateId = '';

      $scope.deleteCustomJet = function(id){
        $('#confirm1').css('display', 'block');
        $scope.deleteTemplateId = id;
        console.log('$scope.deleteTemplateId', id);
      }

      $scope.saveAndCloseConfirm = function(){
        $scope.showLoader = true;
        $('#confirm1').css('display', 'none');
        fuelManagerService.deleteCustomRamp($scope.deleteTemplateId).then(function(result) {
          fuelManagerService.getFullList().then(function(result) {
            $scope.fullJetList = result;
            console.log('$scope.fullJetList', $scope.fullJetList);
            for (var i = 0; i<$scope.fullJetList.length; i++) {
              for (var j = 0; j<$scope.fullJetList[i].aircraftsSize.length; j++) {
                if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance != null) {
                  if ($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != null && $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate != '') {
                    var newTime = new Date($scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate);
                    var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
                    var dday = newTime.getUTCDate();
                    var dyear = newTime.getUTCFullYear();
                    $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate = dmonth+'/'+dday+'/'+dyear;
                    console.log('$scope.fullJetList.aircraftsSize.rampFeesAndAvoidance.expirationDate', $scope.fullJetList[i].aircraftsSize[j].rampFeesAndAvoidance.expirationDate); 
                  }
                }
              }
            }
            $scope.showLoader = false;
          })
        })
      }

      $scope.cancelAndCloseConfirm = function(){
        $('#confirm1').css('display', 'none');
        $scope.deleteTemplateId = '';
      }

      $scope.closeRampFeeModel = function(){
        $scope.openRampFeeModal = false;
        $scope.showWeight = false;
        $scope.showWingspan = false;
        $scope.showTail = false;
        $scope.showAircraft = false;
        $scope.customRampData.rampFeesAndAvoidanceList = {};
        $scope.customRampDataCraft.aircraftType = null;
      }

      $scope.parentOpen = function(index){
        $('#parentOpen'+index).css('display', 'none');
        $('#parentClose'+index).css('display', 'initial');
        $('#parentTogglebody'+index).slideDown();
      }
      $scope.parentClose = function(index){
        $('#parentOpen'+index).css('display', 'initial');
        $('#parentClose'+index).css('display', 'none');
        $('#parentTogglebody'+index).slideUp();
      }

      $scope.toggleChild = function(id){
        if ($('.'+id).hasClass('fa-plus-circle')) {
          $('.'+id).removeClass('fa-plus-circle');
          $('.'+id).addClass('fa-minus-circle');
        }else{
          $('.'+id).removeClass('fa-minus-circle');
          $('.'+id).addClass('fa-plus-circle');
        }
        $('#'+id).slideToggle();
      }

      $scope.dates = [{date:'01-05-2001'}, {date:'05-05-2014'}, {date:'10-11-2008'}]

      $scope.open = function($event, dt) {
        $event.preventDefault();
        $event.stopPropagation();

        dt.opened = true;
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };


      $scope.format = 'dd-MMMM-yyyy'
      

      $(document).ready(function(){

        setInterval(function(){ 
          var newHeight = $('.feeManagerLeft').height();
          $('.feeManagerRight').css('height', newHeight);
        }, 3);

        $('#customTabToggle1').click(function(){
          console.log('tab 1');
          $('#customTabsBody1').slideDown();
          $('#customTabsBody2').slideUp();
          $('#customTabsBody3').slideUp();
          $('#customTabsBody4').slideUp();
          $('#customTabs1').addClass('customActive');
          $('#customTabs2').removeClass('customActive');
          $('#customTabs3').removeClass('customActive');
          $('#customTabs4').removeClass('customActive');
          $('.customAccordianHeader > select, .customAccordianHeader > input').prop("disabled", true);
          $('.customAccordianHeader.customActive > select, .customAccordianHeader.customActive > input').prop("disabled", false);

          $('#customTabs1 > .pull-right > .btn-default').css('display', 'none');
          $('#customTabs1 > .pull-right > .btn-success').css('display', 'inline-block');
          $('#customTabs1 > .pull-right > .btn-danger').css('display', 'inline-block');

          $('#customTabs2 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs2 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs2 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs3 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs3 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs3 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs4 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs4 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs4 > .pull-right > .btn-danger').css('display', 'none');

        })
        $('#customTabToggle2').click(function(){
          console.log('tab 2');
          $('#customTabsBody1').slideUp();
          $('#customTabsBody2').slideDown();
          $('#customTabsBody3').slideUp();
          $('#customTabsBody4').slideUp();
          $('#customTabs1').removeClass('customActive');
          $('#customTabs2').addClass('customActive');
          $('#customTabs3').removeClass('customActive');
          $('#customTabs4').removeClass('customActive');
          $('.customAccordianHeader > select, .customAccordianHeader > input').prop("disabled", true);
          $('.customAccordianHeader.customActive > select, .customAccordianHeader.customActive > input').prop("disabled", false);

          $('#customTabs1 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs1 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs1 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs2 > .pull-right > .btn-default').css('display', 'none');
          $('#customTabs2 > .pull-right > .btn-success').css('display', 'inline-block');
          $('#customTabs2 > .pull-right > .btn-danger').css('display', 'inline-block');

          $('#customTabs3 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs3 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs3 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs4 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs4 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs4 > .pull-right > .btn-danger').css('display', 'none');

        })
        $('#customTabToggle3').click(function(){
          console.log('tab 3');
          $('#customTabsBody1').slideUp();
          $('#customTabsBody2').slideUp();
          $('#customTabsBody3').slideDown();
          $('#customTabsBody4').slideUp();
          $('#customTabs1').removeClass('customActive');
          $('#customTabs2').removeClass('customActive');
          $('#customTabs3').addClass('customActive');
          $('#customTabs4').removeClass('customActive');
          $('.customAccordianHeader > select, .customAccordianHeader > input').prop("disabled", true);
          $('.customAccordianHeader.customActive > select, .customAccordianHeader.customActive > input').prop("disabled", false);

          $('#customTabs1 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs1 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs1 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs2 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs2 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs2 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs3 > .pull-right > .btn-default').css('display', 'none');
          $('#customTabs3 > .pull-right > .btn-success').css('display', 'inline-block');
          $('#customTabs3 > .pull-right > .btn-danger').css('display', 'inline-block');

          $('#customTabs4 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs4 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs4 > .pull-right > .btn-danger').css('display', 'none');

        })
        $('#customTabToggle4').click(function(){
          console.log('tab 4');
          $('#customTabsBody1').slideUp();
          $('#customTabsBody2').slideUp();
          $('#customTabsBody3').slideUp();
          $('#customTabsBody4').slideDown();
          $('#customTabs1').removeClass('customActive');
          $('#customTabs2').removeClass('customActive');
          $('#customTabs3').removeClass('customActive');
          $('#customTabs4').addClass('customActive');
          $('.customAccordianHeader > select, .customAccordianHeader > input').prop("disabled", true);
          $('.customAccordianHeader.customActive > select, .customAccordianHeader.customActive > input').prop("disabled", false);

          $('#customTabs1 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs1 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs1 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs2 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs2 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs2 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs3 > .pull-right > .btn-default').css('display', 'inline-block');
          $('#customTabs3 > .pull-right > .btn-success').css('display', 'none');
          $('#customTabs3 > .pull-right > .btn-danger').css('display', 'none');

          $('#customTabs4 > .pull-right > .btn-default').css('display', 'none');
          $('#customTabs4 > .pull-right > .btn-success').css('display', 'inline-block');
          $('#customTabs4 > .pull-right > .btn-danger').css('display', 'inline-block');

        })

      })

  }
