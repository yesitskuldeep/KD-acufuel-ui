
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('fuelManagerController', ['$scope',function($scope) {

      $scope.test = "Testing...";

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

  }]);
