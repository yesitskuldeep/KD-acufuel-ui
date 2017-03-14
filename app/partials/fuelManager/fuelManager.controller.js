
'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('fuelManagerController', ['$scope',function($scope) {

      $scope.test = "Testing...";

    }]);

         $(document).ready(function(){
         	$('#jaTab1').click(function(){
         		$('#ja1').removeAttr("disabled");
           $('#ja1').removeClass('disableSelect');
           $('#ja2').removeAttr("disabled");
           $('#ja2').removeClass('disableInput');
           //$('#ja11').prop("disabled", true);
           $('#ja11').attr('disabled', 'disabled');
           $('#ja11').addClass('disableSelect');
           $('#ja22').attr('disabled', 'disabled');
           $('#ja22').addClass('disableInput');
         
           $('#ja111').attr('disabled', 'disabled');
           $('#ja111').addClass('disableSelect');
           $('#ja222').attr('disabled', 'disabled');
           $('#ja222').addClass('disableInput');
         	})
         
         $('#jaTab2').click(function(){
           $('#ja11').removeAttr("disabled");
           $('#ja11').removeClass('disableSelect');
           $('#ja22').removeAttr("disabled");
           $('#ja22').removeClass('disableInput');
         
           $('#ja1').attr('disabled', 'disabled');
           $('#ja1').addClass('disableSelect');
           $('#ja2').attr('disabled', 'disabled');
           $('#ja2').addClass('disableInput');
         
           $('#ja111').attr('disabled', 'disabled');
           $('#ja111').addClass('disableSelect');
           $('#ja222').attr('disabled', 'disabled');
           $('#ja222').addClass('disableInput');
         })
         
         $('#jaTab3').click(function(){
           $('#ja111').removeAttr("disabled");
           $('#ja111').removeClass('disableSelect');
           $('#ja222').removeAttr("disabled");
           $('#ja222').removeClass('disableInput');
         
           $('#ja11').attr('disabled', 'disabled');
           $('#ja11').addClass('disableSelect');
           $('#ja22').attr('disabled', 'disabled');
           $('#ja22').addClass('disableInput');
         
           $('#ja1').attr('disabled', 'disabled');
           $('#ja1').addClass('disableSelect');
           $('#ja2').attr('disabled', 'disabled');
           $('#ja2').addClass('disableInput');
         })
         })
