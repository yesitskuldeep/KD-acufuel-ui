
    (function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('flightDepDashboardController', [ '$scope', '$filter', '$rootScope', '$state', 'flightDepDashboardService', flightDepDashboardController]);
        
    function flightDepDashboardController($scope, $filter, $rootScope, $state, flightDepDashboardService) {
        $scope.getQuote = true;
        $scope.showQuote = false;
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
    	$scope.getFBO = function () {
    		console.log('111111111');
    		flightDepDashboardService.getFBOs($scope.order.airport).then(function(result) {
  	          $scope.fboList = result;
  	        })
    	}
    	
    	$scope.aircraftList = [];
    	function getAircraftList() {
    		flightDepDashboardService.getAircrafts().then(function(result) {
      		  $scope.aircraftList = result;
    		})
        }
    	
    	$scope.getTiers = function(owner) {
    		console.log('--------owner-----',$scope.order.priceQuote);
    		/*flightDepDashboardService.getTiers(owner).then(function(result) {
        		  $scope.aircraftList = result;
      		})*/
    	}

         /* $scope.marginList = {}
             flightDepDashboardService.getMargin().then(function(result) {
                $scope.marginList = result;
                console.log("Margin result", result)
            })

        $scope.newFuelPricing = {};
        flightDepDashboardService.getFuelPricingNew().then(function(result) {
            $scope.newFuelPricing = result;
            console.log("Fuel Pricing result", result)
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
                var str =""+ $scope.newFuelPricing[i].name
               if(str.startsWith("J")){
                  $scope.newFuelPricing[i].jeta = true;
                  var str1 = str.substring(0,5)
                  var str2 = str.substring(6, str.length)
                  $scope.newFuelPricing[i].name = str1
                  $scope.newFuelPricing[i].namejetrest = str2


              }else if(str.startsWith("100")){
                  $scope.newFuelPricing[i].avgas = true;
                  var str1 = str.substring(0,5)
                  var str2 = str.substring(6, str.length)
                  $scope.newFuelPricing[i].name = str1
                  $scope.newFuelPricing[i].nameavgasrest = str2
              }
              }
              $scope.showLoader = false;
        })*/
       

        /*$scope.updateFuelPricing = {};
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
                    $scope.newFuelPricing[i].fuelPricing.cost = '';
                    $scope.newFuelPricing[i].fuelPricing.papMargin = '';
                    $scope.newFuelPricing[i].fuelPricing.papTotal = '';
                    $scope.newFuelPricing[i].fuelPricing.expirationDate = '';
                }
                
            }

          
            

            console.log('result',$scope.marginList)
            flightDepDashboardService.updateFuelPricing($scope.updateFuelPricing).then(function(result) {
                toastr.success('Successfully Updated', {
                  closeButton: true
                })
                flightDepDashboardService.getFuelPricingNew().then(function(result) {
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
            
        }*/
        


//        $scope.submitLogin = function() {
//        	LoginService.setAuth(true);
//        	toastr.info("Login successfully");
//        	$state.go('app.dashboard');
//        	/*LoginService.login($scope.username, $scope.password).then(function(result){
//        		if(typeof result == 'object') {
//        			LoginService.setAuth(true);
//        			$rootScope.path = true;
//        			var reqPwdChng = localStorage.getItem("requiredChangePwd");
//        			if (reqPwdChng && reqPwdChng == "Y") {
//        				$state.go('resetPassword');
//        			} else {
//        				$state.go('app.upload');
//        			}
//        		} else {
//        			toastr.info("Error in login. Please check login name and password");
//        		}
//        	})*/
//        }
    }
})();
