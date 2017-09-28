
    (function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('flightDepDashboardController', [ '$scope', '$filter', '$rootScope', '$state', 'flightDepDashboardService', flightDepDashboardController]);
        
    function flightDepDashboardController($scope, $filter, $rootScope, $state, flightDepDashboardService) {
        $scope.getQuote = true;
        $scope.showQuote = false;
        
        $scope.order = {};
    	$scope.dispatchOrder = {};
    	$scope.dispatchOrder.fuelOrderList = [];
    	$scope.order.upliftDate = '';
    	$scope.order.departingDate = '';
        
        $scope.fboList =[];
        getAircraftList();
        $scope.getQuote = function () {
    		$scope.getQuote = false;
            $scope.showQuote = true;
    	}

    	$scope.logout = function () {
    		localStorage.removeItem("loginStatus");
    		$rootScope.path = false;
    		$state.reload();
    	}
    	$scope.getFBOMarginList = function () {
    		console.log('111111111');
    		flightDepDashboardService.getFBOs($scope.order.airport).then(function(result) {
  	          $scope.marginList = result;
  	        })
    	}
    	
    	$scope.aircraftList = [];
    	function getAircraftList() {
    		flightDepDashboardService.getAircrafts().then(function(result) {
      		  $scope.aircraftList = result;
    		})
        }
    	
    	$scope.getTiers = function() {
    		var temp = JSON.parse($scope.order.priceQuote);
    		if(temp != null) {
    			flightDepDashboardService.getTiers(temp.owner.id).then(function(result) {
        			if(result != null){
        				$scope.tierList = result;
        			} else {
        				$scope.tierList = [];
    					$scope.tierList.push({
    	        		  	'minTierBreak': '0', 'maxTierBreak': '∞'
    					});
        			}
          		})
    		}
    	}

    	$scope.setCost = function(cost){
    		if(cost != null) {
    			var obj =JSON.parse(cost);
    			console.log('costttttt',obj.cost);
    			$scope.order.fboCost = obj.cost;
    		}
    	}
    	
    	$scope.cancelOrder = function() {
    		$scope.order = {};
    		$scope.getQuote = true;
            $scope.showQuote = false;
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
    		$scope.order.fboOwnerId = obj.owner.id;
    		$scope.dispatchOrder.fuelOrderList.push($scope.order);
    		console.log('$scope.order', $scope.dispatchOrder);
    		flightDepDashboardService.dispathFuelOrder($scope.dispatchOrder).then(function(result) {
    			console.log('result', result);
    			$scope.showLoader = false;
    			$scope.order = {};
    			toastr.success('Fuel Order Dispatched Successfully', {
                  closeButton: true
                })
    		})
    	}
    }
})();
