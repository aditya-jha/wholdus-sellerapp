var sellerapp = angular.module('SellerApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngProgress',
    'LocalStorageModule'
]);

sellerapp.config([
    '$routeProvider',
    '$locationProvider',
    '$mdThemingProvider',
    '$mdIconProvider',
    'localStorageServiceProvider',
    function($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider, localStorageServiceProvider) {

        $routeProvider.when('/distribute-on-wholdus', {
            templateUrl: 'views/distributeOnWholdus.html',
            controller: 'DistributeOnWholdusController',
        }).when('/register', {
            templateUrl: "views/sellerSignup.html",
            controller: "RegistrationController"
        }).when('/my-profile', {
            templateUrl: 'views/sellerProfile.html',
            controller: "ProfileController"
        }).when('/my-orders', {
            templateUrl: 'views/sellerOrders.html',
            controller: 'OrderController'
        }).when('/my-orders/:orderID/:suborderID', {
            templateUrl: 'views/orderDetails.html',
            controller: 'OrderDetailController'
        }).when('/my-products', {
            templateUrl: 'views/sellerProducts.html',
            controller: 'ProductController'
        }).when('/my-products/:productslug', {
            templateUrl: 'views/sellerProductDetail.html',
            controller: 'ProductController',
            reloadOnSearch: false
        }).when('/my-payments', {
            templateUrl: 'views/sellerPayments.html',
            controller: 'PaymentController'
        });

        $routeProvider.otherwise('/my-profile');

        $locationProvider.html5Mode(true);
        $mdThemingProvider.theme('default')
                        .primaryPalette('deep-purple')
                        .accentPalette('deep-orange');

        //$mdIconProvider.defaultIconSet('./images/icons.svg', 128);

        localStorageServiceProvider.setPrefix('probzip-seller');
    }
]);
