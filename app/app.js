var sellerapp = angular.module('SellerApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages'
]);

sellerapp.config([
    '$routeProvider',
    '$locationProvider',
    '$mdThemingProvider',
    function($routeProvider, $locationProvider, $mdThemingProvider) {

        $routeProvider.when('/', {
            templateUrl: "views/sellerSignup.html",
            controller: "RegistrationController"
        });

        $mdThemingProvider.theme('docs-dark', 'default').primaryPalette('yellow').dark();
        $locationProvider.html5Mode(true);
    }
]);
