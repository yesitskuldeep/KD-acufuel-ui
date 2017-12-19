'use strict';

angular.module('acufuel')

.controller('flightTrackingController', ['$scope','$compile', 'uiCalendarConfig', 'flightTrackingService','$interval', function($scope, $compile, uiCalendarConfig, flightTrackingService,$interval) {
	$scope.flightInfo = {};
	var map;
	var icon = "https://en.spitogatos.gr/visualCaptcha/images/airplane.png";
	var json = "http://34.214.139.94:8080/ws/liveTracking";
	var arr = [];
	var infowindow = new google.maps.InfoWindow();

	$scope.initialise = function() {
		var mapProp = {
	        center: new google.maps.LatLng(36.778259, -98.417931), //US center
	        zoom: 4,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

	    //getting fligts one time on instant pageload 
	    getFlights();
	    map = new google.maps.Map(document.getElementById("map"), mapProp);
	    console.log('sssssssss', json);
	    
	    

		var stopflight=$interval(function(){
			console.log('====interval start=======');
			//getting flights on each interval
			getFlights();
		},4000);
		

	/*---Stop flights in case state change---*/
	 $scope.$on("$destroy",function(){
		console.log('====live data stop-=====');
	    if (angular.isDefined(stopflight)) {
	        $interval.cancel(stopflight);
    }
});	

}

	/*---Get live flight data function---- */

	var getFlights=function(){
	$.get(json, function(json1) {
	      $.each(json1, function(key, data) {
	    	  var exists = false;
		  	    $.each(arr, function (index, value) {
		   		   if(value.title === data.id) {
		   			  var latLng = new google.maps.LatLng(data.latitude, data.longitude, data.altitude);
		   			  value.link.setPosition(latLng);
		   			  exists = true;
		   		   }
		        });
		  	  if(!exists) {
		  		  var latLng = new google.maps.LatLng(data.latitude, data.longitude, data.altitude);
					
		        var marker = new google.maps.Marker({
		          position: latLng,
		          map: map,
		          icon: icon,
		          title: data.id
		        });
		        
		        var details = "Aircraft :" + " " + data.id + "<br> " +
		            "Path :" + " " + data.departurePoint + " " + "--->" + " " + data.arrivalPoint + "<br>" +
		            "Altitude :" + " " + data.altitude + " " + "ft" + "<br>" +
		            "Speed :" + " " + data.speed + " " + "Knots" + "<br>" +
		            "Departure Time :" + " " + data.departureActualTime + " " + "(Actual)" + "<br>" +
		            "Arrival Time :" + " " + data.arrivalEstimatedTime + " " + "(Estimated)" + "<br>";
		        
		        arr.push({
		            title: data.id,
		            link:  marker,
		            details : details
		        });
		        
		        bindInfoWindow(marker, map, infowindow, details, data);
		  	  }
	      });
	});
}

  

	 function bindInfoWindow(marker, map, infowindow, strDescription, data) {
         google.maps.event.addListener(marker, 'click', function() {
        	 $scope.flightInfo = data;
             //infowindow.setContent(strDescription);
             //infowindow.open(map, marker);
             $scope.flightInfo = data;
             $('#flightid').html($scope.flightInfo.id);
             $('#depid').html($scope.flightInfo.departurePoint);
             $('#arrid').html($scope.flightInfo.arrivalPoint);
             $('#altid').html($scope.flightInfo.altitude);
             $('#speedid').html($scope.flightInfo.speed);
             $('#deptimeid').html($scope.flightInfo.departureActualTime);
             $('#arrtimeid').html($scope.flightInfo.arrivalEstimatedTime);
             
             $('.left-panel').animate({width: '300px', padding: '10px'});
         });
     }
	 
	 $('.close-left-panel').click(function(){
		 $('.left-panel').animate({width: '0', padding: '0'});
	 })
	 

	
	
	google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
	 
	 
         
	
	
	
	

}]);

