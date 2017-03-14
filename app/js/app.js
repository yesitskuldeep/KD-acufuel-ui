
'use strict';


  angular.module('acufuel', ['ui.router', 'ngAnimate', 'ui.bootstrap'])

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
              controller: "updateFuelManagerController"
            })

             .state("app.viewCompany", {
              url: "/viewCompany",
              templateUrl: "partials/viewCompany/viewCompany.html",
              controller: "viewCompanyController"
            }) 

             .state("app.widgetTemplate", {
              url: "/widgetTemplate",
              templateUrl: "partials/widgetTemplate/widgetTemplate.html",
              controller: "widgetTemplateController"
            })
        }
  ]);



