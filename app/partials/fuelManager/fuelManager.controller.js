
'use strict';

 //Load controller
  angular.module('acufuel')

	//.controller('fuelManagerController', ['$scope', 'fuelManagerService',function($scope, fuelManagerService) {
  .controller('fuelManagerController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'fuelManagerService', fuelManagerController]);

  function fuelManagerController($scope, $rootScope, $uibModal, $filter, $http, fuelManagerService) {

      $scope.currentUserData = JSON.parse(localStorage.getItem('userProfileId'));

      fuelManagerService.getFullList().then(function(result) {
        console.log('result', result)
        $scope.fullJetList = result;
      })

      $scope.avoidanceList = {};
     
      $scope.updateList = function(fullJetList){
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
          console.log('data', $scope.avoidanceList);

          fuelManagerService.updateFullList($scope.avoidanceList).then(function(result) {
            fuelManagerService.getFullList().then(function(result) {
              $scope.fullJetList = result;
            })
          })

        }
            
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

      $(document).ready(function(){
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
