var sellerapp = angular.module('SellerApp', [
  'ngRoute',
  'ngAnimate',
  'LocalStorageModule',
  'angular-loading-bar',
  'ui.bootstrap',
  'toaster'
]);

sellerapp.config([
  '$routeProvider',
  '$locationProvider',
  'localStorageServiceProvider',
  'cfpLoadingBarProvider',
  function($routeProvider, $locationProvider, localStorageServiceProvider, cfpLoadingBarProvider) {

      
      $routeProvider.otherwise('/404');

      $locationProvider.html5Mode(true);
      localStorageServiceProvider.setPrefix('SellerApp');

      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 0;
  }
]);
