'use strict';

angular.module('acufuel')

.controller('flightTrackingController', ['$scope','$compile', 'uiCalendarConfig','flightTrackingService',function($scope, $compile, uiCalendarConfig,flightTrackingService) {
	/*var map = null;
	var icon = "https://en.spitogatos.gr/visualCaptcha/images/airplane.png";
	var json = "http://34.214.139.94:8080/ws/liveTracking";
	var gmarkers = [];
	var intervalNumber = 0;
	setInterval(function () {
	    $.get(json, function(json1) {
			update_map(json1);
			 //intervalNumber++;
			console.log('---------json1--------',json1);
		});
	}, 5000);
	
	function update_map(data) {
	    var bounds = new google.maps.LatLngBounds();
	    for (var i = 0; i < gmarkers.length; i++) {
	        gmarkers[i].setMap(null);
	    }
	    gmarkers = [];
	    for (var i = 0, length = data.length; i < length; i++) {
	        var latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
	        bounds.extend(latLng);
	        var marker = new google.maps.Marker({
	            position: latLng,
	            map: map,
	            icon: icon,
	            title: data[i].id
	        });
	        
	        var details = "Aircraft :" + " " + data[i].id + "<br> " +
				            "Path :" + " " + data[i].departurePoint + " " + "--->" + " " + data[i].arrivalPoint + "<br>" +
				            "Altitude :" + " " + data[i].altitude + " " + "ft" + "<br>" +
				            "Speed :" + " " + data[i].speed + " " + "Knots" + "<br>" +
				            "Departure Time :" + " " + data[i].departureActualTime + " " + "(Actual)" + "<br>" +
				            "Arrival Time :" + " " + data[i].arrivalEstimatedTime + " " + "(Estimated)" + "<br>";
	        
	        var infoWindow = new google.maps.InfoWindow();
	        google.maps.event.addListener(marker, "click", function (e) {
	            //infoWindow.setContent(details);
	        	inforWindow.setContent(data.id+"<br>"+ data.arrivalPoint);
	            infoWindow.open(map, marker);
	        });
	        (function (marker, data) {
	            google.maps.event.addListener(marker, "click", function (e) {
	                //infoWindow.setContent(data.id+"<br>"+marker.getPosition().toUrlValue(6));
	            	infoWindow.setContent(data.id+"<br>"+ data.arrivalPoint);
	                infoWindow.open(map, marker);
	            });
	        })(marker, data[i]);
	        gmarkers.push(marker);
	        //map.fitBounds(bounds);
	    }
	    
	   map.fitBounds(bounds);
	  // console.log('---------bounds show-------',bounds);
	};

	function initialize() {
	    var mapOptions = {
	        center: new google.maps.LatLng(37.4419, -120.1419),
	        zoom: 1,
	         mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    
	    map = new google.maps.Map(document.getElementById("map"),mapOptions);
	    if (gmarkers.length > 0) {
	        for (var i = 0; i < gmarkers.length; i++) {
	            gmarkers[i].setMap(map);
	        }
	    }
	}

	google.maps.event.addDomListener(window, 'load', initialize);   
	
}]);*/
	
	////--------------Shadow Code----------------------
	 
	$scope.flightInfo = {};
	var map;
	var icon = "https://en.spitogatos.gr/visualCaptcha/images/airplane.png";
	var json = "http://34.214.139.94:8080/ws/liveTracking";
	var arr = [];
	var infowindow = new google.maps.InfoWindow();
	init();
	function initialize() {
	var mapProp = {
	        center: new google.maps.LatLng(36.778259, -98.417931), //US 
	        zoom: 4,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

	    map = new google.maps.Map(document.getElementById("map"), mapProp);
	    console.log('sssssssss', map);
	    
	    
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
				        //var html = "<div id='info' style='overflow:hidden;line-height:15px;color:black;height:200px;width:225px;'><span style='font-weight:500;text-decoration:underline;font-size:13px;'>"+"Aircraft :" + " " + data.id +"</span><br><table style='color:black;font-size:12;'><tr><td>Path :</td><td>"+ data.departurePoint + " " + "--->" + " " + data.arrivalPoint + "</td></tr><tr><td>Altitude :</td><td>" + data.altitude + " " + "ft" +  "</td></tr><tr><td>Speed :</td><td>" + data.speed + " " + "Knots" + "</td></tr><tr><td>Departure Time :</td><td>"  + data.departureActualTime + " " + "(Actual)"  + "</td></tr><tr><td>Arrival Time:</td><td>" + data.arrivalEstimatedTime + " " + "(Estimated)" + "</td></tr></table></div>";			        
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
				       // bindInfoWindow(marker,map,infowindow,html);
				  	  }
			      });
			});
		},5000);
	}

	 function bindInfoWindow(marker, map, infowindow, strDescription, data) {
         google.maps.event.addListener(marker, 'click', function() {
        	 /*var effect='slide';
        	 var options= {direction: $('.left')};
        	 var duration = 500;*/
        	 
             //infowindow.setContent(strDescription);
            // infowindow.open(map, marker);
             console.log('data', data);
             $scope.flightInfo = data;
             console.log('testing', $scope.flightInfo.id);
             //values for HTML page
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
	
	 
	 function init(){
		 google.maps.event.addDomListener(window, 'load', initialize);
	 }
	 
}]);

	
	 