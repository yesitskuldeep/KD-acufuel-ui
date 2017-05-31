
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
        $scope.showLoader = false;
      })

      $scope.avoidanceList = {};
     
      $scope.updateList = function(fullJetList){
        $scope.showLoader = true;
        $scope.addData = [];
        $scope.newJetList = fullJetList;
        if ($scope.currentUserData == undefined || $scope.currentUserData == null) {

        }else{
          
          for(var i=0; i<$scope.newJetList.length;i++){
              for(var j = 0; j < $scope.newJetList[i].aircraftsSize.length; j++){
                if($scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance != null){
                  console.log('fullJetList', $scope.newJetList[i].aircraftsSize[j].rampFeesAndAvoidance);
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
              $scope.showLoader = false;
            })
          })

        }
            
      }

      $scope.dropOptions = {};

      fuelManagerService.getOptions().then(function(result) {
          $scope.dropOptions = result;
      })

      fuelManagerService.getAircrafts().then(function(result) {
          $scope.aircrafts = result;
      })

      $scope.openRampFeeModal = false;
      $scope.customRampData = {};
      $scope.customRampData.rampFeesAndAvoidanceList = {};
      $scope.customRampData.rampFeesAndAvoidanceList.aircraftType = null;

      $scope.customRampData.rampFeesAndAvoidanceList.aircraftMake = '';
      $scope.customRampData.rampFeesAndAvoidanceList.aircraftSizeId = '';
      $scope.customRampData.rampFeesAndAvoidanceList.tailNumber = '';
      $scope.customRampData.rampFeesAndAvoidanceList.wingspanMin = '';
      $scope.customRampData.rampFeesAndAvoidanceList.wingspanMax = '';
      $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMin = '';
      $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMax = '';
      $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMax = '';
      $scope.customRampData.rampFeesAndAvoidanceList.rampFees = '';
      $scope.customRampData.rampFeesAndAvoidanceList.avoidance = '';
      //$scope.customRampData.fboUserId = '';

      //$scope.rampFeeType = '';

      $scope.openRampModal = function(){
        //console.log('$scope.dropOptions', $scope.dropOptions)
        

        if ($scope.customRampData.rampFeesAndAvoidanceList.aircraftType === 'WEIGHT') {
          $scope.openRampFeeModal = true;
          $scope.showWeight = true;
          $scope.showWingspan = false;
          $scope.showTail = false;
          $scope.showAircraft = false;
          $scope.customRampData.rampFeesAndAvoidanceList.aircraftMake = '';
          $scope.customRampData.rampFeesAndAvoidanceList.tailNumber = '';
          $scope.customRampData.rampFeesAndAvoidanceList.wingspanMin = '';
          $scope.customRampData.rampFeesAndAvoidanceList.wingspanMax = '';
          $scope.customRampData.rampFeesAndAvoidanceList.rampFees = '';
          $scope.customRampData.rampFeesAndAvoidanceList.avoidance = '';
        }else if ($scope.customRampData.rampFeesAndAvoidanceList.aircraftType === 'MAKE_AND_MODEL') {
          $scope.openRampFeeModal = true;
          $scope.showWeight = false;
          $scope.showWingspan = false;
          $scope.showTail = false;
          $scope.showAircraft = true;
          $scope.customRampData.rampFeesAndAvoidanceList.tailNumber = '';
          $scope.customRampData.rampFeesAndAvoidanceList.wingspanMin = '';
          $scope.customRampData.rampFeesAndAvoidanceList.wingspanMax = '';
          $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMin = '';
          $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMax = '';
          $scope.customRampData.rampFeesAndAvoidanceList.rampFees = '';
          $scope.customRampData.rampFeesAndAvoidanceList.avoidance = '';
        }else if ($scope.customRampData.rampFeesAndAvoidanceList.aircraftType === 'WINGSPAN') {
          $scope.openRampFeeModal = true;
          $scope.showWeight = false;
          $scope.showWingspan = true;
          $scope.showTail = false;
          $scope.showAircraft = false;
          $scope.customRampData.rampFeesAndAvoidanceList.aircraftMake = '';
          $scope.customRampData.rampFeesAndAvoidanceList.tailNumber = '';
          $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMin = '';
          $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMax = '';
          $scope.customRampData.rampFeesAndAvoidanceList.rampFees = '';
          $scope.customRampData.rampFeesAndAvoidanceList.avoidance = '';
        }else if ($scope.customRampData.rampFeesAndAvoidanceList.aircraftType === 'TAIL') {
          $scope.openRampFeeModal = true;
          $scope.showWeight = false;
          $scope.showWingspan = false;
          $scope.showTail = true;
          $scope.showAircraft = false;
          $scope.customRampData.rampFeesAndAvoidanceList.aircraftMake = '';
          $scope.customRampData.rampFeesAndAvoidanceList.wingspanMin = '';
          $scope.customRampData.rampFeesAndAvoidanceList.wingspanMax = '';
          $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMin = '';
          $scope.customRampData.rampFeesAndAvoidanceList.weightRangeMax = '';
          $scope.customRampData.rampFeesAndAvoidanceList.rampFees = '';
          $scope.customRampData.rampFeesAndAvoidanceList.avoidance = '';
        }else if ($scope.customRampData.rampFeesAndAvoidanceList.aircraftType = null){
          $scope.openRampFeeModal = false;
          $scope.showWeight = false;
          $scope.showWingspan = false;
          $scope.showTail = false;
          $scope.showAircraft = false;
        }else{
          $scope.openRampFeeModal = false;
          $scope.showWeight = false;
          $scope.showWingspan = false;
          $scope.showTail = false;
          $scope.showAircraft = false;
        }
        for (var i = 0; $scope.dropOptions.length; i++) {
          if ($scope.customRampData.rampFeesAndAvoidanceList.aircraftType === $scope.dropOptions[i].size) {
            $scope.customRampData.rampFeesAndAvoidanceList.aircraftSizeId = $scope.dropOptions[i].id;
          }
        }
      }

      

      $scope.addCustomRamp = function(){
        
        $scope.newData = {};
        $scope.newData.rampFeesAndAvoidanceList = [];
        $scope.newData.rampFeesAndAvoidanceList.push($scope.customRampData.rampFeesAndAvoidanceList);
        $scope.newData.fboUserId = $scope.currentUserData;
        console.log('$scope.customRampData', $scope.newData)
        fuelManagerService.updateFullList($scope.newData).then(function(result) {
          toastr.success(''+result.success+'', {
            closeButton: true
          });
          $scope.openRampFeeModal = false;
          $scope.customRampData.rampFeesAndAvoidanceList = {};
          $scope.customRampData.rampFeesAndAvoidanceList.aircraftType = null;
          $scope.newData = {};
          $scope.newData.rampFeesAndAvoidanceList = [];
          fuelManagerService.getFullList().then(function(result) {
            $scope.fullJetList = result;
          })
        })
      }

      $scope.closeRampFeeModel = function(){
        $scope.openRampFeeModal = false;
        $scope.showWeight = false;
        $scope.showWingspan = false;
        $scope.showTail = false;
        $scope.showAircraft = false;
        $scope.customRampData.rampFeesAndAvoidanceList = {};
        $scope.customRampData.rampFeesAndAvoidanceList.aircraftType = null;
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
