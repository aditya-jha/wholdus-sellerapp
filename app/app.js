var sellerapp = angular.module('SellerApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngProgress'
]);

sellerapp.config([
    '$routeProvider',
    '$locationProvider',
    '$mdThemingProvider',
    '$mdIconProvider',
    function($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {

        $routeProvider.when('/', {
            templateUrl: "views/sellerSignup.html",
            controller: "RegistrationController"
        }).when('/my-profile', {
            templateUrl: 'views/sellerProfile.html',
            controller: "ProfileController"
        }).when('/my-orders', {
            templateUrl: 'views/sellerOrders.html',
            controller: 'OrderController'
        });

        $locationProvider.html5Mode(true);
        $mdThemingProvider.theme('docs-dark', 'default').primaryPalette('yellow').dark();

        $mdIconProvider.defaultIconSet('./styles/icons.svg', 128);
    }
]);
