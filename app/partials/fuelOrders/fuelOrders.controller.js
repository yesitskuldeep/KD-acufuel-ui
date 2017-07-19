'use strict';

angular.module('acufuel')

.controller('fuelOrdersController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'NgTableParams','fuelOrdersService', fuelOrdersController]);

function fuelOrdersController($scope, $rootScope, $uibModal, $filter, $http, NgTableParams,fuelOrdersService) {

    $scope.showFuelOrderModal = false;
    $scope.optionSelected;
    $scope.orderdata = {}
    $scope.showLoader = false;

     $scope.data = {};
     $scope.order = {};
     $scope.dispatchOrder = {};
  	$scope.dispatchOrder.fuelOrderList = [];

    $scope.statusFilterOptions = [];
    $scope.statusFilterOptions.push({
		  	'id': '', 'title': 'Show All'
		  },{
		  	'id': 'pending', 'title': 'Pending'
		  },{
		  	'id': 'invoiced', 'title': 'Invoiced'
		  },{
		  	'id': 'paid', 'title': 'Paid'
		  },{
		  	'id': 'cancelled', 'title': 'Cancelled'
		  },{
		  	'id': 'archived', 'title': 'Archived'
		  }
     
      );

    function colourFunction() {
      var myselect = document.getElementById('colorfulSelectbox'),
      colour = myselect.options[myselect.selectedIndex].className;
      myselect.style.background = colour;
      console.log('colour', myselect);
      myselect.blur();
    }

    //setInterval(function(){
     // colourFunction();
    //}, 1)


      $scope.attachmentFilterOptions = [];
    $scope.attachmentFilterOptions.push({
		  	'id': '', 'title': 'Show All'
		  },{
		  	'id': '!null', 'title': 'Attachments'
		  },{
		  	'id': 'null', 'title': 'No Attachments'
		  }
     );

      //  $(document).ready(function() {
      //     $scope.showLoader = true;
      //       $('#example').DataTable();
      //       $scope.showLoader = false;
      //   });
     
     $scope.getOrders = function() {
          fuelOrdersService.getOrders().then(function(result) {
           
            $scope.orderdata = result;
            for(var i=0;i<$scope.orderdata.length;i++){
                $scope.orderdata[i].upliftDateS = new Date($scope.orderdata[i].upliftDate);

                 var str = "" + $scope.orderdata[i].upliftDateS.getDate() + "/" + ($scope.orderdata[i].upliftDateS.getMonth() + 1) + "/" + $scope.orderdata[i].upliftDateS.getFullYear()
                //  str = str.slice(4,16)
                $scope.orderdata[i].upliftDateString = str
                console.log(str);

            }
           
             $scope.displayFuelOrderList = new NgTableParams({
              page: 1,
              count: 10,
            }, {
              data: $scope.orderdata
            });
            $(document).ready(function(){
              var myselect = document.getElementsByClassName('colorfulSelectbox');

              for (var i = 0; i < myselect.length; i++) {
                var colourIndex = $(myselect[i]).prop('selectedIndex');
                colourIndex = colourIndex + 1;
                console.log(colourIndex);
                var getColor = $('.colorfulSelectbox option:nth-child('+colourIndex+')').css('color');
                $(myselect[i]).css('background-color', getColor);
                console.log('colour', getColor);
                myselect[i].blur();
              }

            })
           
          })
     }
     
     $scope.getOrders();
     
     $scope.onFWSelect = function() {
                        if($scope.optionSelected == 'dt'){
                        $('#demo-modal-4').css('display', 'block');
                      }
                      if($scope.optionSelected == 'efo'){
                        	$scope.showLoader = true;
                            var fileName = "orders.csv";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            fuelOrdersService.exportCompany().then(function(result) {
                                  var file = new Blob([result], {type: 'application/csv'});
                                  var fileURL = URL.createObjectURL(file);
                                  a.href = fileURL;
                                  a.download = fileName;
                                  a.click();
                                  $scope.showLoader = false;
                            })
                        }
                    }
   $scope.attachmentrowid = ""

   
   $scope.attachment = function(id, value, url) {
                            console.log(id, value)
                            $scope.attachmentrowid = id
                            //  $scope.attachmentdeleteid = attachdeleteid
                            if(value == 'uploadAttachment'){
                            $('#demo-modal-6').css('display', 'block');
                            }else if(value == 'viewAttachment'){
                            var win = window.open(url, '_blank');
                            win.focus();
                            }else if(value == 'deleteAttachment'){
                            $('#delete1').css('display', 'block');
                            }
                        }

  $scope.cancelDeleteAttachment = function() {
                            $('#delete1').css('display', '');
                      }

  $scope.deleteAttachment = function() {
                            $scope.showLoader = true;
                            fuelOrdersService.deleteAttachment($scope.attachmentrowid).then(function(result) {
                                    console.log(result, $scope.attachmentrowid)

                                    if(result.success){
                                    toastr.success(''+result.success+'', {
                                              closeButton: true
                                          })
                                    }
                                })
                                $scope.showLoader = false;
                                $('#delete1').css('display', '');
                          }

   $scope.saveUploadAttachment = function(attachmentData) {
     $scope.showLoader = true;
	   	$scope.data.media = attachmentData
	   	$scope.data.id = $scope.attachmentrowid
		fuelOrdersService.uploadAttachment($scope.data).then(function(result) {
                                    console.log(result)
                                    if(result){
                                      // console.log(result.success)
                                          toastr.success(''+"Upload Successful"+'', {
                                                    closeButton: true
                                                })
                                          }
                                          
                                    })
                                      $scope.showLoader = false;
                                      $('#demo-modal-6').css('display', 'none');
                                }

  $scope.cancelUploadAttachment = function() {
                                $('#demo-modal-6').css('display', 'none');
                          }

  $scope.editdata = {};
  

  $scope.editTableRow = function(rowData){
                        console.log('row data', rowData);
                        $scope.editdata = rowData;
                        $('#demo-modal-5').css('display', 'block');
                      }

  $scope.updateTotal = function(value, valueOf){
                        if(valueOf == 'v'){
                          $scope.editdata.total = value * $scope.editdata.invoiced
                        }else if(valueOf == 'i'){
                          $scope.editdata.total = $scope.editdata.requestedVolume * value 
                        }
                      }

  $scope.addTotal = function(value, valueOf){
                        if(valueOf == 'v'){
                          $scope.order.total = value * $scope.order.invoiced
                        }else if(valueOf == 'i'){
                          $scope.order.total = $scope.order.volume * value 
                        }
                      }                    

   $scope.addData = function() {
                          $scope.showLoader = true;

                         if ($scope.order.upliftDate != '') {
                              $scope.order.upliftDate = new Date($scope.order.upliftDate);
                              $scope.order.upliftDate = $scope.order.upliftDate.getTime();
                            }
                            if ($scope.order.departingDate != '') {
                              $scope.order.departingDate = new Date($scope.order.departingDate);
                              $scope.order.departingDate = $scope.order.departingDate.getTime();
                            }
                            console.log($scope.order.quotePrice);
                            var obj =JSON.parse($scope.order.priceQuote);
                            console.log('obj.papMargin',obj.papMargin);
                            $scope.order.priceQuote = obj.papMargin;

                           $scope.fuelData = {};
                          $scope.fuelData.aircraftName = $scope.order.aircraftName 
                          $scope.fuelData.companyName = $scope.order.companyName 
                          $scope.fuelData.departingDate = $scope.order.departingDate 
                          $scope.fuelData.fboCost = $scope.order.fboCost 
                          $scope.fuelData.id = $scope.order.id 
                          $scope.fuelData.invoiced = $scope.order.invoiced 
                          $scope.fuelData.priceQuote = $scope.order.priceQuote 
                          $scope.fuelData.volume = $scope.order.volume 
                          $scope.fuelData.source = $scope.order.source 
                          $scope.fuelData.status = $scope.order.status 
                          $scope.fuelData.tierBreak = $scope.order.tierBreak 
                          $scope.fuelData.total = $scope.order.total 
                          $scope.fuelData.upliftDate = $scope.order.upliftDate 
                          $scope.fuelData.companyId = $scope.selectedCompanyId;
                              
                              
                              
                              $scope.dispatchOrder.fuelOrderList.push($scope.fuelData);
                              console.log('$scope.order', $scope.dispatchOrder);
                              fuelOrdersService.dispathFuelOrder($scope.dispatchOrder).then(function(result) {
                                console.log('result', result);
                                $scope.showLoader = false;
                                $scope.order = {};
                                $('#demo-modal-4').css('display', '');
                                $scope.getOrders();
                                toastr.success('Fuel Order Dispatched Successfully', {
                                        closeButton: true
                                      })
                              })
                              
                            }
    $scope.updateStatus = function(row, status) {
      $scope.showLoader = true;
      $scope.fuelData = {};
      $scope.fuelData.aircraftName = row.aircraftName 
      $scope.fuelData.companyName = row.companyName 
      $scope.fuelData.departingDate = row.departingDate 
      $scope.fuelData.fboCost = row.fboCost 
      $scope.fuelData.id = row.id 
      $scope.fuelData.invoiced = row.invoiced 
      $scope.fuelData.priceQuote = row.priceQuote 
      $scope.fuelData.volume = row.requestedVolume 
      $scope.fuelData.source = row.source 
      $scope.fuelData.status = status 
      $scope.fuelData.tierBreak = row.tierBreak 
      $scope.fuelData.total = row.total 
      $scope.fuelData.upliftDate = row.upliftDate 

      $scope.dispatchOrder.fuelOrderList.push($scope.fuelData);
      fuelOrdersService.updateFuelOrder($scope.dispatchOrder).then(function(result) {
        console.log('result', result);
        $scope.showLoader = false;
        $scope.editdata = {};
        $('#demo-modal-5').css('display', '');
        $scope.getOrders();
        toastr.success('Fuel Order Updated Successfully', {
          closeButton: true
        });
    })

  }

      $scope.updateData = function() {
                          $scope.showLoader = true;
                          $scope.fuelData = {};
                          $scope.fuelData.aircraftName = $scope.editdata.aircraftName 
                          $scope.fuelData.companyName = $scope.editdata.companyName 
                          $scope.fuelData.departingDate = $scope.editdata.departingDate 
                          $scope.fuelData.fboCost = $scope.editdata.fboCost 
                          $scope.fuelData.id = $scope.editdata.id 
                          $scope.fuelData.invoiced = $scope.editdata.invoiced 
                          $scope.fuelData.priceQuote = $scope.editdata.priceQuote 
                          $scope.fuelData.volume = $scope.editdata.requestedVolume 
                          $scope.fuelData.source = $scope.editdata.source 
                          $scope.fuelData.status = $scope.editdata.status 
                          $scope.fuelData.tierBreak = $scope.editdata.tierBreak 
                          $scope.fuelData.total = $scope.editdata.total 
                          $scope.fuelData.upliftDate = $scope.editdata.upliftDate 
                          


                             $scope.dispatchOrder.fuelOrderList.push($scope.fuelData);
                              fuelOrdersService.updateFuelOrder($scope.dispatchOrder).then(function(result) {
                                console.log('result', result);
                                $scope.showLoader = false;
                                $scope.editdata = {};
                                $('#demo-modal-5').css('display', '');
                                $scope.getOrders();
                                toastr.success('Fuel Order Updated Successfully', {
                                        closeButton: true
                                      })
                              })
                            }

    $scope.getAircraft = function(company){
                              $scope.selectedCompanyName = company;
                              $scope.showLoader = true;
                              for (var i = 0; i < $scope.companyList.length; i++) {
                                if ($scope.companyList[i].companyName == company) {
                                  if($scope.companyList[i].margin != null && $scope.companyList[i].marginAVGAS != null){
                                    fuelOrdersService.getFuelCost($scope.companyList[i].id).then(function(margins) {
                                      $scope.marginList = margins;
                                      //console.log('$scope.marginList', $scope.marginList);
                                    })
                                  } else if ($scope.companyList[i].margin != null || $scope.companyList[i].marginAVGAS == null) {
                                    fuelOrdersService.getATypeFuelPricing($scope.companyList[i].id).then(function(margins) {
                                      $scope.marginList = margins;
                                        })
                                  } else if ($scope.companyList[i].margin == null || $scope.companyList[i].marginAVGAS != null) {
                                    fuelOrdersService.getVTypeFuelPricing($scope.companyList[i].id).then(function(margins) {
                                          $scope.marginList = margins;
                                        })
                                  }
                                  $scope.selectedCompanyId = $scope.companyList[i].id;
                                  $scope.marginId = $scope.companyList[i].margin.id;
                                  if ($scope.selectedCompanyId != '') {
                                    fuelOrdersService.getAircraft($scope.selectedCompanyId).then(function(aircraft) {
                                      $scope.aircraftList = aircraft;
                                    })
                                  }
                                  if ($scope.marginId != '') {
                                    fuelOrdersService.getJetTiers($scope.marginId).then(function(tiers) {
                                              $scope.tierList = tiers;
                                              $scope.showLoader = false;
                                          })
                                  }else{
                                    $scope.showLoader = false;
                                  }
                                }
                              }

                            }
     $scope.setCost = function(cost){
                              console.log(cost);
                              if(cost != null) {
                                var obj =JSON.parse(cost);
                                $scope.order.fboCost = obj.cost;
                              }
                                
                            }
                            

  $scope.cancelData = function() {
                            $('#demo-modal-4').css('display', '');
                      }
  $scope.canceleditdata = function() {
                              $('#demo-modal-5').css('display', '');
                        }

 

	$scope.companyList = {};

	fuelOrdersService.getAllCompanies().then(function(result) {
                                  $scope.showLoader = true;
                                  $scope.companyList = result;
                                  console.log(result)
                                  $scope.showLoader = false;
                                })

  $scope.sourceList = [{source:"Direct Jet-A"},{source:"Direct AVGAS 100LL"}];

  $scope.data = {};
  
 

   }