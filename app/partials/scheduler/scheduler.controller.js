'use strict';

angular.module('acufuel')

.controller('schedulerController', ['$scope','$compile', 'uiCalendarConfig', 'schedulerService', function($scope, $compile, uiCalendarConfig, schedulerService) {

  $scope.showLoader = true;
  getEventsList();

  $scope.events = [];
  function getEventsList(){
    schedulerService.getEvents().then(function(result) {
      console.log('result', result);
      for (var i = 0; i < result.length; i++) {
        var newTime = new Date(result[i].deployDate);
        var dmonth = newTime.getUTCMonth() + 1; //months from 1-12
        var dday = newTime.getUTCDate();
        var dyear = newTime.getUTCFullYear();

        $scope.events.push({
          'id': result[i].id,
          'title': result[i].aircraft,
          'start': dyear+'-'+dmonth+'-'+dday
        })
        $scope.showLoader = false;
      }

     // $scope.newFuelPricing[i].futureFuelPricing.deployDate = dmonth+'/'+dday+'/'+dyear;
    })
  }

  $scope.newEvent = {};
  $scope.addNewEvent = function(){
    console.log('newEvent', $scope.newEvent);
    $scope.showLoader = true;
    if ($scope.newEvent.deployDate != undefined) {
      $scope.newEvent.deployDate = new Date($scope.newEvent.deployDate);
      $scope.newEvent.deployDate = $scope.newEvent.deployDate.getTime();
    }
    //var data = 'aircraft='+$scope.newEvent.aircraft+'&deployDate='+$scope.newEvent.deployDate;
    schedulerService.addNewEventService($scope.newEvent).then(function(response){
      console.log('response', response);
      $scope.newEvent = {};
      $('#addEvent').modal('hide');
      getEventsList();
    })
  }

  $scope.cancelAdd = function(){
    $scope.newEvent = {};
  }
  $scope.editData = {};
  $scope.editEvent = function(data){
    console.log('data', data);
    $scope.editData = data;
    console.log('$scope.editData', $scope.editData);
    $('#editEvent').modal('show');

  }



  /*  code for calendar  */

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.changeTo = 'Hungarian';

  $scope.eventSource = {};

  $scope.eventsF = function (start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    callback(events);
  };

  $scope.calEventsExt = {
   color: '#f00',
   textColor: 'yellow',
   events: []
 };

 $scope.alertOnEventClick = function( date, jsEvent, view){
  $scope.alertMessage = (date.title + ' was clicked ');
};

$scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
      var dmonth = event.start._d.getUTCMonth() + 1; //months from 1-12
      var dday = event.start._d.getUTCDate();
      var dyear = event.start._d.getUTCFullYear();
      console.log('date', dyear+'-'+dmonth+'-'+dday);
      for (var i = 0; i < $scope.events.length; i++) {
        if ($scope.events[i].id == event.id) {
          console.log('events', $scope.events[i]);
          $scope.events[i].start = dyear+'-'+dmonth+'-'+dday;
        }
      }
      console.log('$scope.events new', $scope.events);
      $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
     $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
   };

   $scope.addRemoveEventSource = function(sources,source) {
    var canAdd = 0;
    angular.forEach(sources,function(value, key){
      if(sources[key] === source){
        sources.splice(key,1);
        canAdd = 1;
      }
    });
    if(canAdd === 0){
      sources.push(source);
    }
  };

  $scope.addEvent = function() {
    $scope.events.push({
      title: 'Open Sesame',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      className: ['openSesame']
    });
  };

  $scope.remove = function(index) {
    $scope.events.splice(index,1);
  };

  $scope.changeView = function(view,calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
  };

  $scope.renderCalender = function(calendar) {
    if(uiCalendarConfig.calendars[calendar]){
      uiCalendarConfig.calendars[calendar].fullCalendar('render');
    }
  };

  $scope.eventRender = function( event, element, view ) { 
    element.attr({'tooltip': event.title,
     'tooltip-append-to-body': true});
    $compile(element)($scope);
  };

  $scope.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      droppable: true,
      drop: function (event, delta, revertFunc, jsEvent, ui, view) {
      },
      header:{
        right: 'month basicWeek basicDay',
        center: 'title',
        left: 'prev,next, today'
      },
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender
    }
  };

  $scope.addEvent = function(index) {
    //console.log('INDEX', index);
    //console.log('EVENTS', $scope.eventSources);
    //$scope.events.push($scope.eventList[index]);
  }

  $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
  $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

}]);

