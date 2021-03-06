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
	$scope.dispatchOrder.fuelOrderList = [];
	$scope.order.upliftDate = '';
	$scope.order.departingDate = '';
	$scope.selectedCompanyName = '';
	$scope.selectedCompanyId = '';
	$scope.marginId = '';

	$scope.getAircraft = function(company){
		$scope.selectedCompanyName = company;
		$scope.showLoader = true;
		for (var i = 0; i < $scope.companyList.length; i++) {
			if ($scope.companyList[i].companyName == company) {
				console.log($scope.companyList[i].margin);
				console.log($scope.companyList[i].marginAVGAS);
				if($scope.companyList[i].margin != null && $scope.companyList[i].marginAVGAS != null){
					enterFuelOrderService.getFuelCost($scope.companyList[i].id).then(function(margins) {
						$scope.marginList = margins;
						//console.log('$scope.marginList', $scope.marginList);
					})
				} else if ($scope.companyList[i].margin != null && $scope.companyList[i].marginAVGAS == null) {
					console.log('--------------------',$scope.companyList[i].margin);
					console.log('--------------------',$scope.companyList[i].marginAVGAS);
					enterFuelOrderService.getATypeFuelPricing($scope.companyList[i].id).then(function(margins) {
						$scope.marginList = margins;
			        })
				} else if ($scope.companyList[i].margin == null && $scope.companyList[i].marginAVGAS != null) {
					enterFuelOrderService.getVTypeFuelPricing($scope.companyList[i].id).then(function(margins) {
			        	$scope.marginList = margins;
			        })
				} else if ($scope.companyList[i].margin == null && $scope.companyList[i].marginAVGAS == null) {
					enterFuelOrderService.getPapFuelPricing($scope.companyList[i].id).then(function(margins) {
			        	$scope.marginList = margins;
			        })
					console.log('--------------------',$scope.companyList[i].margin);
				}
				$scope.selectedCompanyId = $scope.companyList[i].id;
				
				if ($scope.selectedCompanyId != '') {
					enterFuelOrderService.getAircraft($scope.selectedCompanyId).then(function(aircraft) {
						$scope.aircraftList = aircraft;
					})
				}
				if($scope.companyList[i].margin == null) {
					$scope.tierList = [];
					$scope.tierList.push({
	        		  	'minTierBreak': '0', 'maxTierBreak': '∞'
					});
					$scope.showLoader = false;
				} else {
					$scope.marginId = $scope.companyList[i].margin.id;
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

	}

	$scope.setCost = function(cost){
		if(cost != null) {
			var obj =JSON.parse(cost);
			$scope.order.fboCost = obj.cost;
		}
	}

	$scope.cancelOrder = function() {
		$scope.order = {};
	}
	
	$scope.dispatchFuel = function(){
		$scope.showLoader = true;
		$scope.order.companyId = $scope.selectedCompanyId;
		if ($scope.order.upliftDate != '') {
			$scope.order.upliftDate = new Date($scope.order.upliftDate);
			$scope.order.upliftDate = $scope.order.upliftDate.getTime();
		}
		if ($scope.order.departingDate != '') {
			$scope.order.departingDate = new Date($scope.order.departingDate);
			$scope.order.departingDate = $scope.order.departingDate.getTime();
		}

		$scope.order.status = 'pending';
		
		console.log($scope.order.quotePrice);
		var obj =JSON.parse($scope.order.priceQuote);
		console.log('obj.papMargin',obj.papMargin);
		$scope.order.priceQuote = obj.papMargin;
		$scope.dispatchOrder.fuelOrderList.push($scope.order);
		console.log('$scope.order', $scope.dispatchOrder);
		enterFuelOrderService.dispathFuelOrder($scope.dispatchOrder).then(function(result) {
			console.log('result', result);
			$scope.showLoader = false;
			$scope.order = {};
			toastr.success('Fuel Order Dispatched Successfully', {
              closeButton: true
            })
		})
	}

}