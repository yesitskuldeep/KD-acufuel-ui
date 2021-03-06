'use strict';
	angular.module('acufuel')
	.controller('analyticsController', ['$scope','analyticsService',function($scope, analyticsService) {

    $(document).ready(function(){
	    $(function(){
	    	new jvm.MultiMap({
	            container: $('#map'),
	            maxLevel: 1,
	            main: {
		            map: 'us_lcc',
		            backgroundColor: '#ffce99',
		        },
	            mapUrlByCode: function(code, multiMap){
	            return '/js/us-counties/jquery-jvectormap-data-'+
	                    code.toLowerCase()+'-'+
	                    multiMap.defaultProjection+'-en.js';
	            }
	        });
	    });
    })


    $scope.drf = {};
    $scope.mfsValues = [];
    $scope.msfarray=[];
    $scope.getMFS = function(){
    	//var makeId = makeId;
    	analyticsService.getMFS().then(function(result) {
		$scope.mfsValues = result;
        
		//console.log("msf length",$scope.mfsValues.length);
        //console.log("mfs data kd--- ",$scope.mfsValues)

        //console.log("==msf data key==",$scope.mfsValues[0].key);
       // console.log("==msf data values==",$scope.mfsValues[0].values);
       // console.log("==x===",$scope.mfsValues[0].values[0].x);
        //console.log("==y===",$scope.mfsValues[0].values[0].y);
       // console.log("==x===",$scope.mfsValues[0].values[1].x);
       // console.log("==y===",$scope.mfsValues[0].values[1].y);
        /* $scope.optionsmfs = {
                                    chart: {
                                        type: 'discreteBarChart',
                                        height: 450,
                                        margin : {
                                            top: 20,
                                            right: 20,
                                            bottom: 60,
                                            left: 55,
                                        },
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
                                    values: $scope.mfsValues
                                    }]  */
                    
        $scope.optionsmfs = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 45
                },
                clipEdge: true,
                //staggerLabels: true,
                duration: 500,
                stacked: true,
                color: ["#FEDFC3","#990000","#000099","#009900"],
                xAxis: {
                    axisLabel: 'Months',
                    showMaxMin: false,
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };
       
        
            //console.log("==length 1==",$scope.mfsValues);

            for (var i = 0; i < $scope.mfsValues.length; i++) {
                for(var j=0;j<$scope.mfsValues[i].values.length;j++){

                    $scope.msfarray.push({
                                            "key":$scope.mfsValues[i].key,
                                            "values": [{
                                                "x":$scope.mfsValues[i].values[j].x,
                                                "y":$scope.mfsValues[i].values[j].y 
                                            }]
                                     })
                }
              

            }
      //  console.log("new values===",$scope.msfarray);
        $scope.datamfs=$scope.msfarray;


        /*$scope.datamfs = [{
            "key": "Pending",
            "values": [{
                "x": "Jan",
                "y": 0.16284738584101344
            }, {
                "x": "Feb",
                "y": 2.370283172738109
            }, {
                "x": "Mar",
                "y": 0.1631208266452718
            }, {
                "x": "Apr",
                "y": 0.24609871793543797
            }, {
                "x": "May",
                "y": 1.5096133160633776
            },{
                "x": "Jun",
                "y": 0.16284738584101344
            }, {
                "x": "Jul",
                "y": 2.370283172738109
            }, {
                "x": "Aug",
                "y": 0.1631208266452718
            }, {
                "x": "Sep",
                "y": 0.24609871793543797
            }, {
                "x": "Oct",
                "y": 1.5096133160633776
            }, {
                "x": "Nov",
                "y": 0.24609871793543797
            }, {
                "x": "Dec",
                "y": 1.5096133160633776
            }]
        }, {
            "key": "Cancelled",
            "values": [{
                "x": "Jan",
                "y": 0.12566330679904006
            }, {
                "x": "Feb",
                "y": 0.1321859413211272
            }, {
                "x": "Mar",
                "y": 1.4798247902549135
            }, {
                "x": "Apr",
                "y": 0.10870538273358979
            }, {
                "x": "May",
                "y": 0.16155091711225184
            },{
                "x": "Jun",
                "y": 0.16284738584101344
            }, {
                "x": "Jul",
                "y": 2.370283172738109
            }, {
                "x": "Aug",
                "y": 0.1631208266452718
            }, {
                "x": "Sep",
                "y": 0.24609871793543797
            }, {
                "x": "Oct",
                "y": 1.5096133160633776
            }, {
                "x": "Nov",
                "y": 0.24609871793543797
            }, {
                "x": "Dec",
                "y": 1.5096133160633776
            }]
        },{
            "key": "Invoiced",
            "values": [{
                "x": "Jan",
                "y": 0.16284738584101344
            }, {
                "x": "Feb",
                "y": 2.370283172738109
            }, {
                "x": "Mar",
                "y": 0.1631208266452718
            }, {
                "x": "Apr",
                "y": 0.24609871793543797
            }, {
                "x": "May",
                "y": 1.5096133160633776
            },{
                "x": "Jun",
                "y": 0.16284738584101344
            }, {
                "x": "Jul",
                "y": 2.370283172738109
            }, {
                "x": "Aug",
                "y": 0.1631208266452718
            }, {
                "x": "Sep",
                "y": 0.24609871793543797
            }, {
                "x": "Oct",
                "y": 1.5096133160633776
            }, {
                "x": "Nov",
                "y": 0.24609871793543797
            }, {
                "x": "Dec",
                "y": 1.5096133160633776
            }]
        }, {
            "key": "Paid",
            "values": [{
                "x": "Jan",
                "y": 0.12566330679904006
            }, {
                "x": "Feb",
                "y": 0.1321859413211272
            }, {
                "x": "Mar",
                "y": 1.4798247902549135
            }, {
                "x": "Apr",
                "y": 0.10870538273358979
            }, {
                "x": "May",
                "y": 0.16155091711225184
            },{
                "x": "Jun",
                "y": 0.16284738584101344
            }, {
                "x": "Jul",
                "y": 2.370283172738109
            }, {
                "x": "Aug",
                "y": 0.1631208266452718
            }, {
                "x": "Sep",
                "y": 0.24609871793543797
            }, {
                "x": "Oct",
                "y": 1.5096133160633776
            }, {
                "x": "Nov",
                "y": 0.24609871793543797
            }, {
                "x": "Dec",
                "y": 1.5096133160633776
            }]
        }]
        */
     })
}


 
	
    $scope.getMFS();
	$scope.csValues = [];
    $scope.getCS = function(){
    	//var makeId = makeId;
    	analyticsService.getCS().then(function(result) {
	    	$scope.csValues = result;
	        //console.log("cs data kd --- ",$scope.csValues)
	        $scope.optionscs = {
		        chart: {
		            type: 'pieChart',
		            height: 500,
		            // color: ["#FEDFC3","#D89700","#FFE8B3","FFD980","#FF7F0E","#fff2e6","#ffcc99","#ffa64d","#ff8c1a","#B37D00","#f5f5f0","#e0e0d1","#ccccb3","#adad85","#999966","#7a7a52"],
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
	        $scope.datacs = $scope.csValues;
        })
    }

    $scope.getCS();
    $scope.optionshfp = {
		chart: {
            type: 'cumulativeLineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 65
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]/100; },
            average: function(d) { return d.mean/100; },

            color: ["#FEDFC3"],
            duration: 300,
            useInteractiveGuideline: true,
            clipVoronoi: false,

            xAxis: {
                axisLabel: 'X Axis',
                tickFormat: function(d) {
                    return d3.time.format('%m/%d/%y')(new Date(d))
                },
                showMaxMin: false,
                staggerLabels: true
            },

            yAxis: {
                axisLabel: 'Y Axis',
                tickFormat: function(d){
                    return d3.format(',.1%')(d);
                },
                axisLabelDistance: 0
            }
        }
    };

    	$scope.datahfp = 
		[{
	        key: "Long",
	        values: [ [ 1083297600000 , -2.974623048543] , [ 1085976000000 , -1.7740300785979] , [ 1088568000000 , 4.4681318138177] , [ 1091246400000 , 7.0242541001353] , [ 1093924800000 , 7.5709603667586] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194] , [ 1107147600000 , 48.917421973355] , [ 1109566800000 , 63.750936549160] , [ 1112245200000 , 59.072499126460] , [ 1114833600000 , 43.373158880492] , [ 1117512000000 , 54.490918947556] , [ 1120104000000 , 56.661178852079] , [ 1122782400000 , 73.450103545496] , [ 1125460800000 , 71.714526354907] , [ 1128052800000 , 85.221664349607] , [ 1130734800000 , 77.769261392481] , [ 1133326800000 , 95.966528716500] , [ 1136005200000 , 107.59132116397] , [ 1138683600000 , 127.25740096723] , [ 1141102800000 , 122.13917498830] , [ 1143781200000 , 126.53657279774] , [ 1146369600000 , 132.39300992970] , [ 1149048000000 , 120.11238242904] , [ 1151640000000 , 118.41408917750] , [ 1154318400000 , 107.92918924621] , [ 1156996800000 , 110.28057249569] , [ 1159588800000 , 117.20485334692] , [ 1162270800000 , 141.33556756948] , [ 1164862800000 , 159.59452727893] , [ 1167541200000 , 167.09801853304] , [ 1170219600000 , 185.46849659215] , [ 1172638800000 , 184.82474099990] , [ 1175313600000 , 195.63155213887] , [ 1177905600000 , 207.40597044171] , [ 1180584000000 , 230.55966698196] , [ 1183176000000 , 239.55649035292] , [ 1185854400000 , 241.35915085208] , [ 1188532800000 , 239.89428956243] , [ 1191124800000 , 260.47781917715] , [ 1193803200000 , 276.39457482225] , [ 1196398800000 , 258.66530682672] , [ 1199077200000 , 250.98846121893] , [ 1201755600000 , 226.89902618127] , [ 1204261200000 , 227.29009273807] , [ 1206936000000 , 218.66476654350] , [ 1209528000000 , 232.46605902918] , [ 1212206400000 , 253.25667081117] , [ 1214798400000 , 235.82505363925] , [ 1217476800000 , 229.70112774254] , [ 1220155200000 , 225.18472705952] , [ 1222747200000 , 189.13661746552] , [ 1225425600000 , 149.46533007301] , [ 1228021200000 , 131.00340772114] , [ 1230699600000 , 135.18341728866] , [ 1233378000000 , 109.15296887173] , [ 1235797200000 , 84.614772549760] , [ 1238472000000 , 100.60810015326] , [ 1241064000000 , 141.50134895610] , [ 1243742400000 , 142.50405083675] , [ 1246334400000 , 139.81192372672] , [ 1249012800000 , 177.78205544583] , [ 1251691200000 , 194.73691933074] , [ 1254283200000 , 209.00838460225] , [ 1256961600000 , 198.19855877420] , [ 1259557200000 , 222.37102417812] , [ 1262235600000 , 234.24581081250] , [ 1264914000000 , 228.26087689346] , [ 1267333200000 , 248.81895126250] , [ 1270008000000 , 270.57301075186] , [ 1272600000000 , 292.64604322550] , [ 1275278400000 , 265.94088520518] , [ 1277870400000 , 237.82887467569] , [ 1280548800000 , 265.55973314204] , [ 1283227200000 , 248.30877330928] , [ 1285819200000 , 278.14870066912] , [ 1288497600000 , 292.69260960288] , [ 1291093200000 , 300.84263809599] , [ 1293771600000 , 326.17253914628] , [ 1296450000000 , 337.69335966505] , [ 1298869200000 , 339.73260965121] , [ 1301544000000 , 346.87865120765] , [ 1304136000000 , 347.92991526628] , [ 1306814400000 , 342.04627502669] , [ 1309406400000 , 333.45386231233] , [ 1312084800000 , 323.15034181243] , [ 1314763200000 , 295.66126882331] , [ 1317355200000 , 251.48014579253] , [ 1320033600000 , 295.15424257905] , [ 1322629200000 , 294.54766764397] , [ 1325307600000 , 295.72906119051] , [ 1327986000000 , 325.73351347613] , [ 1330491600000 , 340.16106061186] , [ 1333166400000 , 345.15514071490] , [ 1335758400000 , 337.10259395679] , [ 1338436800000 , 318.68216333837] , [ 1341028800000 , 317.03683945246] , [ 1343707200000 , 318.53549659997] , [ 1346385600000 , 332.85381464104] , [ 1348977600000 , 337.36534373477] , [ 1351656000000 , 350.27872156161] , [ 1354251600000 , 349.45128876100]]
	        ,
	        mean: 250
	    }];
        //console.log("--datahfp---",$scope.datahfp);


         /*Date Range Filter*/
        $scope.submitDate = function(){
           /*if($scope.drf == undefined || $scope.drf.fromDate == undefined || $scope.drf.fromDate === '' || $scope.drf.fromDate === null){
                toastr.error('Please select from date', {
                    closeButton: true
                });*/
                       //$scope.drf === undefined || || $scope.drf.fromDate === ''
             if ($scope.drf.fromDate === undefined) {
                
                   // console.log("==frmdate====",$scope.drf.fromDate);
                    //console.log("==toDate====",$scope.drf.toDate);
                    $scope.fillForm = true;
            }  
            else if($scope.drf.fromDate != undefined && $scope.drf.toDate === undefined || $scope.drf.toDate ===''){
                    $scope.fillForm = false;
                    var today= new Date();
                    var DefaultToDate= today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
                    //from date format                  
                    $scope.dat1 = $scope.drf.fromDate;
                    $scope.fd1 = $scope.dat1.split("/").reverse();
                    $scope.tmp = $scope.fd1[2];
                    $scope.fd1[2] = $scope.fd1[1];
                    $scope.fd1[1] = $scope.tmp;
                    $scope.fd = $scope.fd1.join("-");
                   // console.log("===fd====",$scope.fd); 
                    //console.log("----td curr---",DefaultToDate);
                    analyticsService.getDRFChart($scope.fd,DefaultToDate).then(function(result) {
                         //console.log("==date received==",$scope.fd);
                         //console.log("----to date receivedcurrent---",DefaultToDate)
                         $scope.datamfs = result;
                     })


            } else if($scope.drf.fromDate != undefined  && $scope.drf.toDate != undefined ){
                    $scope.fillForm = false;
                    //from date format
                    $scope.dat1 = $scope.drf.fromDate;
                    $scope.fd1 = $scope.dat1.split("/").reverse();
                    $scope.tmp = $scope.fd1[2];
                    $scope.fd1[2] = $scope.fd1[1];
                    $scope.fd1[1] = $scope.tmp;
                    $scope.fd = $scope.fd1.join("-");
                    //to date format
                    $scope.dat2 = $scope.drf.toDate;
                    $scope.td1 = $scope.dat2.split("/").reverse();
                    $scope.tmp1 = $scope.td1[2];
                    $scope.td1[2] = $scope.td1[1];
                    $scope.td1[1] = $scope.tmp1;
                    $scope.td = $scope.td1.join("-");
                   
                    analyticsService.getDRFChart($scope.fd,$scope.td).then(function(result) {
                        // console.log("==date received==",$scope.fd);
                         //console.log("----to date received---",$scope.td)
                         $scope.datamfs = result;
                     })
                
            }else
                {
                    $scope.fillForm = true;
            }
            
           
        }

    }]);


