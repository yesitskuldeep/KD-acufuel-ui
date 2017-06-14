'use strict';

//Load controller
angular.module('acufuel')

   .controller('schedulerController', ['$scope','$compile', 'uiCalendarConfig', function($scope, $compile, uiCalendarConfig) {

      $scope.test = "Testing...";

      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();
      
      
      $scope.eventList=[
        {title:'Event 1'},
        {title:'Event 2'},
        {title:'Event 3'},
        {title:'Event 4'}
        ];

     $scope.eventSources=[];

       $scope.events = [
        {title: 'All Day Event', start: new Date(y, m, 1)},
        {title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false},
        {title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29)}
      ];

      $scope.uiConfig = {
        calendar:{
          height: 450,
          editable: true,
          droppable: true,
          drop: function (date, allDay, jsEvent, ui) {
            console.log('Here ,but where is the object?');
          },
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          eventResize: true,
        }
      };

      $scope.eventSources = [$scope.events];
      //$scope.eventSources = [];
      //$scope.eventSources.push($scope.events);
      
      $scope.addEvent = function(index) {
        console.log('INDEX', index);
        console.log('EVENTS', $scope.eventSources);
        //$scope.events.push($scope.eventList[index]);
      }
      
      console.log($scope.eventSources);

   }]);

