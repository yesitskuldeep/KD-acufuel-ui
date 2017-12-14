
(function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('MainController', [ '$scope', '$filter','$rootScope','$state', '$window', MainController]);
        
    function MainController($scope, $filter, $rootScope,$state, $window) {
     
    	$scope.currentUserName = JSON.parse(localStorage.getItem('currentUserName'));
    	console.log("$state====",$state)

// Flight Tracking page code

    	$scope.reloadPage = function(){
    		console.log("if",$state)
            console.log("=========state name",$state.current.name);
    		// $state.go('app.flightTracking', {}, {reload: 'app.flightTracking'})
    		//$state.go($state.current, {}, {reload: true});
    		
            if($state.current.name != "app.flightTracking"){
                $window.location.href = '/flightTracking';
                setInterval(function(){
                    console.log("come")
                    $window.location.reload()
                },10);
    		}else{   
                console.log("flight tracking state found=====");
                $window.location.reload();
            }
    	}
    }

})();

