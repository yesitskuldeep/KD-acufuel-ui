'use strict';

angular.module('acufuel')

.controller('flightTrackingController', ['$scope','$compile', 'uiCalendarConfig', 'flightTrackingService', function($scope, $compile, uiCalendarConfig, flightTrackingService) {
	
	var map;
	var icon = "https://en.spitogatos.gr/visualCaptcha/images/airplane.png";
	var json = "http://34.214.139.94:8080/ws/liveTracking";
	var arr = [];
	var infowindow = new google.maps.InfoWindow();

	$scope.initialise = function() {
		var mapProp = {
	        center: new google.maps.LatLng(36.778259, -98.417931), //LLANDRINDOD WELLS
	        zoom: 4,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

	    map = new google.maps.Map(document.getElementById("map"), mapProp);
	    console.log('sssssssss', json);
	    
		setInterval(function(){
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
				        
				        bindInfoWindow(marker, map, infowindow, details);
				  	  }
			      });
			});
		},5000);
	}

	 function bindInfoWindow(marker, map, infowindow, strDescription) {
         google.maps.event.addListener(marker, 'click', function() {
             infowindow.setContent(strDescription);
             infowindow.open(map, marker);
         });
     }
	 
	 google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
	 
	 
         
	
	
	
	

}]);

