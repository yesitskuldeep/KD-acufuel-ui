'use strict';

angular.module('acufuel')

.controller('fuelOrdersController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'NgTableParams','fuelOrdersService', fuelOrdersController]);

function fuelOrdersController($scope, $rootScope, $uibModal, $filter, $http, NgTableParams,fuelOrdersService) {

    $scope.showFuelOrderModal = false;
    $scope.optionSelected;

     $scope.data = {};
     
          fuelOrdersService.getOrders().then(function(result) {
            $scope.orderdata = result;
            for(var i=0;i<$scope.orderdata.length;i++){
                $scope.orderdata[i].departingDate = new Date($scope.orderdata[i].departingDate);

                 var str = ""+$scope.orderdata[i].departingDate;
                 str = str.slice(4,16)
                $scope.orderdata[i].departingDateString = str
                console.log(str);

            }
           
             $scope.displayFuelOrderList = new NgTableParams({
              page: 1,
              count: 10,
            }, {
              data: $scope.orderdata
            });
          })
         

     $scope.onDTSelect = function() {
       if($scope.optionSelected == 'dt'){
       $('#demo-modal-4').css('display', 'block');
      }
  }

   $scope.editdata = {};
  $scope.editTableRow = function(rowData){
    console.log('row data', rowData);
    $scope.editdata = rowData;
    $('#demo-modal-5').css('display', 'block');
  }

  $scope.cancelData = function() {
        $('#demo-modal-4').css('display', '');
  }
  $scope.canceleditdata = function() {
        $('#demo-modal-5').css('display', '');
  }

	$scope.companyList = {};

	fuelOrdersService.getAllCompanies().then(function(result) {
		$scope.showLoader = false;
		$scope.companyList = result;
    console.log(result)
	})

  $scope.sourceList = [{source:"Direct Jet-A"},{source:"Direct AVGAS 100LL"}];

  $scope.data = {};
  
 

   }