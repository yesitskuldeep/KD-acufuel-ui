'use strict';


  angular.module('acufuel', ['nvd3', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'xeditable', 'ui.toggle', 'ngTable', 'ui.select2', 'ckeditor', 'ui.calendar', 'ngDragDrop', 'ui.select'])

    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
      $httpProvider.interceptors.push('myCSRF');
      $httpProvider.interceptors.push('httpRequestInterceptor');
    }])


    .factory('httpRequestInterceptor', ['$q', '$rootScope', '$location', function($q, $rootScope, $location) {
       return {
           request: function($config) {
             return $config;
           },
           responseError: function(rejection) {
             if (rejection.status === 401) {
               if($location.path() != "/login"){
                   localStorage.clear();
                   window.location.reload();
               }  
             }
             return $q.reject(rejection);
           }
         }
     }])
     
     .directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }])
    
    .provider('myCSRF',[function(){
      var headerName = 'X-CSRFToken';
      var cookieName = 'csrftoken';
      var allowedMethods = ['GET'];

      this.setHeaderName = function(n) {
        headerName = n;
      }
      this.setCookieName = function(n) {
        cookieName = n;
      }
      this.setAllowedMethods = function(n) {
        allowedMethods = n;
      }
      this.$get = ['$cookies', function($cookies){
        return {
          'request': function(config) {
            if(allowedMethods.indexOf(config.method) === -1) {
              // do something on success
              config.headers[headerName] = $cookies[cookieName];
            }
            return config;
          }
        }
      }];
    }])

  .config(
      ['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($locationProvider, $stateProvider, $urlRouterProvider) {
          $locationProvider.hashPrefix('!');
          // routes
          $urlRouterProvider
              .otherwise('/login');

          $stateProvider

            .state("app", {
              url: "",
              templateUrl: "partials/main/main.html",
              controller: "MainController",
              abstract: true
            })

            .state("login", {
              url: "/login",
              templateUrl: "partials/login/login.html",
              controller: "LoginController"
            })
            
            .state("app.customers", {
              url: "/customers",
              templateUrl: "partials/customers/customers.html",
              controller: "customersController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.accountSetting", {
              url: "/accountSetting",
              templateUrl: "partials/accountSetting/accountSetting.html",
              controller: "AccountSettingController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.ContactView", {
              url: "/ContactView",
              templateUrl: "partials/ContactView/ContactView.html",
              controller: "ContactViewController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })
            .state("app.FuelVendors", {
              url: "/FuelVendors",
              templateUrl: "partials/FuelVendors/FuelVendors.html",
              controller: "FuelVendorsController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.analytics", {
              url: "/analytics",
              templateUrl: "partials/analytics/analytics.html",
              controller: "analyticsController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.account", {
              url: "/account",
              templateUrl: "partials/account/account.html",
              controller: "accountController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })
            
            .state("app.dashboard", {
              url: "/dashboard",
              templateUrl: "partials/dashboard/dashboard.html",
              controller: "dashboardController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.elements", {
              url: "/elements",
              templateUrl: "partials/elements/elements.html",
              controller: "elementsController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.error", {
              url: "/error",
              templateUrl: "partials/error/error.html",
              controller: "errorController"
            })

            .state("app.faq", {
              url: "/faq",
              templateUrl: "partials/faq/faq.html",
              controller: "faqController"
            })

            .state("app.forms", {
              url: "/forms",
              templateUrl: "partials/forms/forms.html",
              controller: "formsController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.fuelManager", {
              url: "/fuelManager",
              templateUrl: "partials/fuelManager/fuelManager.html",
              controller: "fuelManagerController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.pricing", {
              url: "/pricing",
              templateUrl: "partials/pricing/pricing.html",
              controller: "pricingController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.reports", {
              url: "/reports",
              templateUrl: "partials/reports/reports.html",
              controller: "reportsController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.scheduler", {
              url: "/scheduler",
              templateUrl: "partials/scheduler/scheduler.html",
              controller: "schedulerController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })
            
            .state("app.flightTracking", {
              url: "/flightTracking",
              templateUrl: "partials/flightTracking/flightTracking.html",
              controller: "flightTrackingController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })
            
            .state("app.taxes", {
              url: "/taxes",
              templateUrl: "partials/taxes/taxes.html",
              controller: "taxesController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })
            
            .state("app.signup", {
              url: "/signup",
              templateUrl: "partials/signup/signup.html",
              controller: "signupController"
            })

            .state("app.updateFuelManager", {
              url: "/updateFuelManager",
              templateUrl: "partials/updateFuelManager/updateFuelManager.html",
              controller: "updateFuelManagerController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.viewCompany", {
              url: "/viewCompany/:id",
              templateUrl: "partials/viewCompany/viewCompany.html",
              controller: "viewCompanyController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            }) 

            .state("app.viewFuelVendor", {
              url: "/viewFuelVendor/:id",
              templateUrl: "partials/viewFuelVendor/viewFuelVendor.html",
              controller: "ViewFuelVendorController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            }) 

            .state("app.fuelOrders", {
              url: "/fuelOrders",
              templateUrl: "partials/fuelOrders/fuelOrders.html",
              controller: "fuelOrdersController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

             .state("app.DispatchFuel", {
              url: "/DispatchFuel",
              templateUrl: "partials/DispatchFuel/DispatchFuel.html",
              controller: "DispatchFuelController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.searchDispatchFuel", {
              url: "/searchDispatchFuel",
              templateUrl: "partials/searchDispatchFuel/searchDispatchFuel.html",
              controller: "searchDispatchFuelController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.Accept", {
              url: "/Accept",
              templateUrl: "partials/Accept/Accept.html",
              controller: "AcceptController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.delselected", {
              url: "/delselected",
              templateUrl: "partials/delselected/delselected.html",
              controller: "delselectedController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })
            
            .state("app.pricingcontact", {
              url: "/pricingcontact",
              templateUrl: "partials/pricingcontact/pricingcontact.html",
              controller: "pricingcontactController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.viewContact", {
              url: "/viewContact/:id",
              templateUrl: "partials/viewcontact/viewcontact.html",
              controller: "viewcontactController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.viewVendorContact", {
              url: "/viewVendorContact/:id",
              templateUrl: "partials/viewVendorContact/viewVendorContact.html",
              controller: "viewVendorContactController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })
            
            .state("app.enterFuelOrder", {
              url: "/enterFuelOrder",
              templateUrl: "partials/enterFuelOrder/enterFuelOrder.html",
              controller: "enterFuelOrderController",
              data: {
                  authorizedRoles: ["FBO"],
              }
            })

            .state("app.flightDepDashboard", {
              url: "/flightDepDashboard",
              templateUrl: "partials/flightDepDashboard/flightDepDashboard.html",
              controller: "flightDepDashboardController"
            })

            .state("app.flightDepOrders", {
              url: "/flightDepOrders",
              templateUrl: "partials/flightDepOrders/flightDepOrders.html",
              controller: "flightDepOrdersController"
            })

        }
  ])

  .run(['$rootScope', '$state', 'LoginService', 'AUTH_EVENTS', function($rootScope, $state, LoginService, AUTH_EVENTS) {
      $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
          $rootScope.currentUser = JSON.parse(window.localStorage.getItem('currentUser'));

          LoginService.isAuthorized = function (authorizedRoles) {
              if (!angular.isArray(authorizedRoles)) {
                  authorizedRoles = [authorizedRoles];
              }
              var userdata = JSON.parse(window.localStorage.getItem('currentUser'));
              return (userdata? (authorizedRoles.indexOf(userdata.type) !== -1): false);
          }
          
          if ('data' in next && 'authorizedRoles' in next.data) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!LoginService.isAuthorized(authorizedRoles)) {
              event.preventDefault();
              if($state.current.name.length == 0) {
                $state.go('login')
              } else {
                $state.go($state.current, {}, {reload: true});
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized); 
              }
            }
          }

          if (LoginService.isAuthenticated()) {
            if (next.name == 'login') {
              event.preventDefault();
              $state.go('app.dashboard');
            }
          }else{
            // if (next.name == 'login') {
            //   event.preventDefault();
            //   $state.go('app.flightDepDashboard');
            // }
              
            
          }
      });
  }])

  
    .directive("datepicker",function(){
      return {
        restrict:"A",
        link:function(scope,el,attr){
          el.datepicker();
        }
      };
    })
 
  




