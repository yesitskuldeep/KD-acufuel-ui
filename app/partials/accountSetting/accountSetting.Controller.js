
(function() {
    'use strict'
    
    angular.module('acufuel')
        .controller('AccountSettingController', [ '$scope', '$filter', '$rootScope', '$state', 'AccountSettingService', AccountSettingController]);
        
      function AccountSettingController($scope, $filter, $rootScope, $state, AccountSettingService) {
          $scope.addArray = [];
          $scope.userData = {};
          getAdditionalAccounts();
          
          function getAdditionalAccounts() {
        	  AccountSettingService.getAdditionalAccounts().then(function(result) {
        		  $scope.additionalAccounts = result;
                })
          }
          
          $scope.userid = JSON.parse(localStorage.getItem('userProfileId'));
          if($scope.userid && $scope.userid != null && $scope.userid != undefined){
          	var id = $scope.userid;
          	AccountSettingService.loginUserData(id).then(function(result) {
              	$scope.userData = result;
              	$scope.userData.status = $scope.userData.account.user.status.toLowerCase();
    		  		  $scope.userData.userType = $scope.userData.userType.type.toLowerCase();
  	      	})
          }

          AccountSettingService.getProducts().then(function(result) {
                $scope.productList = result;
                for(var i=0;i<$scope.productList.length;i++){
                  var obj = {
                    id : $scope.productList[i].id,
                    name : $scope.productList[i].name,
                    status : $scope.productList[i].status
                  }
                  $scope.addArray.push(obj);
                }
          })

          $scope.productData = {};
          $scope.productData.productList = [];
          
          $scope.checkProduct = function(productlist, product, index){
              $scope.addArray[index].id =  productlist[index].id;
              $scope.addArray[index].name =  productlist[index].name;
              $scope.addArray[index].status =  productlist[index].status;
              $scope.productData.productList = $scope.addArray;
              console.log($scope.productData)
          } 
          
          $scope.updateUser = function(){
      		
          	var updateData = "companyName=" + $scope.userData.companyName + "&username=" + $scope.userData.username + "&firstName=" + $scope.userData.firstName 
          	+ "&lastName=" + $scope.userData.lastName + "&phone=" + $scope.userData.phone + "&mobile=" + $scope.userData.mobile 
          	+ "&status=" + $scope.userData.status + "&userType=" + $scope.userData.userType + "&userTypeId=" + $scope.userData.userType.id + "&userProfileId=" + $scope.userid;

            AccountSettingService.updateUserProfile(updateData).then(function(result) {

              AccountSettingService.updateProducts($scope.productData).then(function(result) {
                toastr.success(''+result.success+'', {
                    closeButton: true
                })
              })
	            
            })
          }

            $scope.addAccount = function(){
              $('#demo-modal').css('display', 'block');
          }

          $scope.cancelAddAccount = function(){
        	  $scope.accountdata = {};
              $('#demo-modal').css('display', '');
          }
           $scope.additionalAccnObj = {};
           $scope.createAddAccount = function(){
              AccountSettingService.addAdditionalAccount($scope.accountdata).then(function(result) {
            	  getAdditionalAccounts();
            	  $scope.accountdata = {};
            	  $('#demo-modal').css('display', '');
                toastr.success(''+result.success+'', {
                    closeButton: true
                })
              })
	        
          }
           
           $scope.changeStatus = function(id, index){
               event.stopPropagation();
               var id = id;
               var statusData = "status=" + $scope.additionalAccounts[index].status + "&id=" + $scope.additionalAccounts[index].id + "&firstName=" + $scope.additionalAccounts[index].firstName 
               + "&lastName=" + $scope.additionalAccounts[index].lastName + "&username=" + $scope.additionalAccounts[index].userName + "&password=" + $scope.additionalAccounts[index].password
               + "&allowEpd=" + $scope.additionalAccounts[index].allowEpd + "&allowFma=" + $scope.additionalAccounts[index].allowFma;
               AccountSettingService.updateStatus(statusData).then(function(result) {
                   if(result.success){
                	   toastr.success('Updated Successfully', {
                           closeButton: true
                       })
                   }
               })
            }
           var deleteAccnId = "";
           $scope.deleteAdditionalAccount = function(id) {
        	   $('#delete1').css('display', 'block');
               deleteAccnId = id;
        	   
           }
           
           $scope.accnDelete = function(){
        	   AccountSettingService.deleteAccount(deleteAccnId).then(function(result) {
        		   getAdditionalAccounts();
        		   $('#delete1').css('display', 'none');
                   if(result.success){
                	   toastr.success('Deleted Successfully', {
                           closeButton: true
                       })
                   }
               })
           }
           
           $scope.cancelDelete = function(){
	           $('#delete1').css('display', 'none');
           }
          
      }
})();

