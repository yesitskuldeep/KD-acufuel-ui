'use strict';

angular.module('acufuel')

.controller('enterFuelOrderController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'enterFuelOrderService', enterFuelOrderController]);

function enterFuelOrderController($scope, $rootScope, $uibModal, $filter, $http, enterFuelOrderService) {
	$scope.showLoader = true;

	$scope.companyList = {};

	enterFuelOrderService.getAllCompanies().then(function(result) {
		$scope.showLoader = false;
		$scope.companyList = result;
	})

	$scope.order = {};
	$scope.dispatchOrder = {};
	$scope.dispatchOrder.fuelOrderObj = [];
	$scope.order.upliftDate = '';
	$scope.order.departingDate = '';
	$scope.selectedCompanyName = '';
	$scope.selectedCompanyId = '';
	$scope.marginId = '';

	enterFuelOrderService.getFuelPricingNew().then(function(margins) {
		$scope.marginList = margins;
		//console.log('$scope.marginList', $scope.marginList);
	})

	$scope.getAircraft = function(company){
		$scope.selectedCompanyName = company;
		$scope.showLoader = true;
		for (var i = 0; i < $scope.companyList.length; i++) {
			if ($scope.companyList[i].companyName == company) {
				$scope.selectedCompanyId = $scope.companyList[i].id;
				$scope.marginId = $scope.companyList[i].margin.id;
				if ($scope.selectedCompanyId != '') {
					enterFuelOrderService.getAircraft($scope.selectedCompanyId).then(function(aircraft) {
						$scope.aircraftList = aircraft;
					})
				}
				if ($scope.marginId != '') {
					enterFuelOrderService.getJetTiers($scope.marginId).then(function(tiers) {
		                $scope.tierList = tiers;
		                $scope.showLoader = false;
		            })
				}else{
					$scope.showLoader = false;
				}
			}
		}

	}

	$scope.dispatchFuel = function(){
		$scope.order.companyId = $scope.selectedCompanyId;
		if ($scope.order.upliftDate != '') {
			$scope.order.upliftDate = new Date($scope.order.upliftDate);
			$scope.order.upliftDate = $scope.order.upliftDate.getTime();
		}
		if ($scope.order.departingDate != '') {
			$scope.order.departingDate = new Date($scope.order.departingDate);
			$scope.order.departingDate = $scope.order.departingDate.getTime();
		}
		$scope.dispatchOrder.fuelOrderObj.push($scope.order);
		console.log('$scope.order', $scope.dispatchOrder);
		enterFuelOrderService.dispathFuelOrder($scope.dispatchOrder).then(function(result) {
			console.log('result', result);
		})
	}

}