'use strict';


  angular.module('acufuel', ['ngCookies', 'ngResource', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'xeditable'])

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
              controller: "customersController"
            })
            .state("app.ContactView", {
              url: "/ContactView",
              templateUrl: "partials/ContactView/ContactView.html",
              controller: "ContactViewController"
            })
            .state("app.FuelVendors", {
              url: "/FuelVendors",
              templateUrl: "partials/FuelVendors/FuelVendors.html",
              controller: "FuelVendorsController"
            })

            .state("app.analytics", {
              url: "/analytics",
              templateUrl: "partials/analytics/analytics.html",
              controller: "analyticsController"
            })

            .state("app.account", {
              url: "/account",
              templateUrl: "partials/account/account.html",
              controller: "accountController"
            })
            
              .state("app.dashboard", {
              url: "/dashboard",
              templateUrl: "partials/dashboard/dashboard.html",
              controller: "dashboardController"
            })

              .state("app.AirList", {
              url: "/AirList",
              templateUrl: "partials/AirList/AirList.html",
              controller: "AirListController"
            })

            .state("app.elements", {
              url: "/elements",
              templateUrl: "partials/elements/elements.html",
              controller: "elementsController"
            })

            .state("app.charts", {
              url: "/charts",
              templateUrl: "partials/charts/charts.html",
              controller: "chartsController"
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
              controller: "formsController"
            })

            .state("app.fuelManager", {
              url: "/fuelManager",
              templateUrl: "partials/fuelManager/fuelManager.html",
              controller: "fuelManagerController"
            })

            .state("app.gallery", {
              url: "/gallery",
              templateUrl: "partials/gallery/gallery.html",
              controller: "galleryController"
            })

            .state("app.jqueryui", {
              url: "/jqueryui",
              templateUrl: "partials/jqueryui/jqueryui.html",
              controller: "jqueryuiController"
            })

            .state("app.popups", {
              url: "/popups",
              templateUrl: "partials/popups/popups.html",
              controller: "popupsController"
            })

            .state("app.pricing", {
              url: "/pricing",
              templateUrl: "partials/pricing/pricing.html",
              controller: "pricingController"
            })

            .state("app.reports", {
              url: "/reports",
              templateUrl: "partials/reports/reports.html",
              controller: "reportsController"
            })

            .state("app.scheduler", {
              url: "/scheduler",
              templateUrl: "partials/scheduler/scheduler.html",
              controller: "schedulerController"
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
              // data: {
              //     authorizedRoles: ["fbo"],
              // }
            })

             .state("app.viewCompany", {
              url: "/viewCompany/:id",
              templateUrl: "partials/viewCompany/viewCompany.html",
              controller: "viewCompanyController"
            }) 

             .state("app.widgetTemplate", {
              url: "/widgetTemplate",
              templateUrl: "partials/widgetTemplate/widgetTemplate.html",
              controller: "widgetTemplateController"
            })

             .state("app.fuelOrders", {
              url: "/fuelOrders",
              templateUrl: "partials/fuelOrders/fuelOrders.html",
              controller: "fuelOrdersController"
            })

             .state("app.DispatchFuel", {
              url: "/DispatchFuel",
              templateUrl: "partials/DispatchFuel/DispatchFuel.html",
              controller: "DispatchFuelController"
            })

             .state("app.searchDispatchFuel", {
              url: "/searchDispatchFuel",
              templateUrl: "partials/searchDispatchFuel/searchDispatchFuel.html",
              controller: "searchDispatchFuelController"
            })

             .state("app.NewCompany", {
              url: "/NewCompany",
              templateUrl: "partials/NewCompany/NewCompany.html",
              controller: "NewCompanyController"
            })

             .state("app.Accept", {
              url: "/Accept",
              templateUrl: "partials/Accept/Accept.html",
              controller: "AcceptController"
            })
             .state("app.delselected", {
              url: "/delselected",
              templateUrl: "partials/delselected/delselected.html",
              controller: "delselectedController"
            })
            
            .state("app.pricingcontact", {
              url: "/pricingcontact",
              templateUrl: "partials/pricingcontact/pricingcontact.html",
              controller: "pricingcontactController"
            })

             .state("app.AntiochFlightDepartment", {
              url: "/AntiochFlightDepartment",
              templateUrl: "partials/AntiochFlightDepartment/AntiochFlightDepartment.html",
              controller: "AntiochFlightDepartmentcontroller"
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
          }
      });
  }])



