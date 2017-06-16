'use strict';

angular.module('acufuel')

.controller('fuelOrdersController', ['$scope', '$rootScope', '$uibModal', '$filter', '$http', 'NgTableParams','fuelOrdersService', fuelOrdersController]);

function fuelOrdersController($scope, $rootScope, $uibModal, $filter, $http, NgTableParams,fuelOrdersService) {

    $scope.showFuelOrderModal = false;
    $scope.optionSelected;
    $scope.orderdata = {}

     $scope.data = {};
     
          fuelOrdersService.getOrders().then(function(result) {
            $scope.orderdata = result;
            for(var i=0;i<$scope.orderdata.length;i++){
                $scope.orderdata[i].departingDate = new Date($scope.orderdata[i].departingDate);

                 var str = ""+$scope.orderdata[i].departingDate;
                 str = str.slice(4,16)
                $scope.orderdata[i].departingDateString = str
                console.log(str);

            }
           
             $scope.displayFuelOrderList = new NgTableParams({
              page: 1,
              count: 10,
            }, {
              data: $scope.orderdata
            });
          })
         

     $scope.onDTSelect = function() {
       if($scope.optionSelected == 'dt'){
       $('#demo-modal-4').css('display', 'block');
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
    fuelOrdersService.deleteAttachment($scope.attachmentrowid).then(function(result) {
            console.log(result, $scope.attachmentrowid)

            if(result.success){
             toastr.success(''+result.success+'', {
                      closeButton: true
                  })
            }
        })
        $('#delete1').css('display', '');
  }

   $scope.saveUploadAttachment = function(attachmentData) {
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

  $scope.cancelData = function() {
        $('#demo-modal-4').css('display', '');
  }
  $scope.canceleditdata = function() {
        $('#demo-modal-5').css('display', '');
  }

 

	$scope.companyList = {};

	fuelOrdersService.getAllCompanies().then(function(result) {
		$scope.showLoader = false;
		$scope.companyList = result;
    console.log(result)
	})

  $scope.sourceList = [{source:"Direct Jet-A"},{source:"Direct AVGAS 100LL"}];

  $scope.data = {};
  
 

   }