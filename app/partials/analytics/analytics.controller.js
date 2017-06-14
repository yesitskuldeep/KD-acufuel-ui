'use strict';

 //Load controller
  angular.module('acufuel')

	.controller('analyticsController', ['$scope',function($scope) {

    $(document).ready(function(){
      $(function () {
   
          $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=us-population-density.json&callback=?', function (data) {
   
              // Make codes uppercase to match the map data
              $.each(data, function () {
                  this.code = this.code.toUpperCase();
              });
   
              // Instanciate the map
              Highcharts.mapChart('container', {
   
                  chart: {
                      borderWidth: 1
                  },
   
                  title: {
                      text: 'US population density (/km²)'
                  },
   
                  legend: {
                      layout: 'horizontal',
                      borderWidth: 0,
                      backgroundColor: 'rgba(255,255,255,0.85)',
                      floating: true,
                      verticalAlign: 'top',
                      y: 25
                  },
   
                  mapNavigation: {
                      enabled: true
                  },
   
                  colorAxis: {
                      min: 1,
                      type: 'logarithmic',
                      minColor: '#EEEEFF',
                      maxColor: '#000022',
                      stops: [
                          [0, '#EFEFFF'],
                          [0.67, '#4444FF'],
                          [1, '#000022']
                      ]
                  },
   
                  series: [{
                      animation: {
                          duration: 1000
                      },
                      data: data,
                      mapData: Highcharts.maps['countries/us/us-all'],
                      joinBy: ['postal-code', 'code'],
                      dataLabels: {
                          enabled: true,
                          color: '#FFFFFF',
                          format: '{point.code}'
                      },
                      name: 'Population density',
                      tooltip: {
                          pointFormat: '{point.code}: {point.value}/km²'
                      }
                  }]
              });
          });
      });
   })

      $scope.optionsmfs = {
                            chart: {
                                type: 'discreteBarChart',
                                height: 450,
                                margin : {
                                    top: 20,
                                    right: 20,
                                    bottom: 60,
                                    left: 55,
                                },
                                color: ["#FF7F0E"],
                                x: function(d){ return d.label; },
                                y: function(d){ return d.value; },
                                showValues: false,
                                valueFormat: function(d){
                                    return d3.format(',.4f')(d);
                                },
                                transitionDuration: 500,
                                xAxis: {
                                    axisLabel: 'X Axis'
                                },
                                yAxis: {
                                    axisLabel: 'Y Axis',
                                    axisLabelDistance: 30
                                }
                            }
                        };

           $scope.datamfs = [{
                            key: "Cumulative Return",
                            values: [
                                { "label" : "A" , "value" : 229.765957771107 },
                                { "label" : "B" , "value" : 0 },
                                { "label" : "C" , "value" : 32.807804682612 },
                                { "label" : "D" , "value" : 196.45946739256 },
                                { "label" : "E" , "value" : 0.19434030906893 },
                                { "label" : "F" , "value" : 98.079782601442 },
                                { "label" : "G" , "value" : 13.925743130903 },
                                { "label" : "H" , "value" : 5.1387322875705 },
                                { "label" : "I" , "value" : 4.1387322875705 },
                                { "label" : "J" , "value" : 23.1387322875705 },
                                { "label" : "K" , "value" : 233.1387322875705 },
                                { "label" : "L" , "value" : 22.1387322875705 },
                                ]
                            }]

           $scope.optionspc = {
                                chart: {
                                    type: 'pieChart',
                                    height: 500,
                                    minColor: ["#FEDFC3"],
                                    maxColor: ["#FF7F0E"],
                                    x: function(d){return d.key;},
                                    y: function(d){return d.y;},
                                    showLabels: false,
                                    segmentShowStroke : false,
                                    animationSteps : 20,
                                    animationEasing : "linear",
                                    animateScale : true,
                                    duration: 500,
                                    labelThreshold: 0.01,
                                    labelSunbeamLayout: true,
                                    legend: {
                                        margin: {
                                            top: 5,
                                            right: 35,
                                            bottom: 5,
                                            left: 0
                                        }
                                    }
                                }
                            };

            $scope.datapc = [
                                {
                                    key: "A",
                                    y: 3
                                },
                                {
                                    key: "B",
                                    y: 2
                                },
                                {
                                    key: "C",
                                    y: 3
                                },
                                {
                                    key: "D",
                                    y: 1
                                },
                                {
                                    key: "E",
                                    y: 5
                                }
                            ];

    }]);


