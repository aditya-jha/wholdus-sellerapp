(function() {
    "use strict";
    sellerapp.directive('psaSidenav', function() {
        return {
            restrict: 'AE',
            templateUrl: 'views/directives/psaSidenav.html',
            scope: {

            },
            link: function(scope, element, attributes) {
            },
            controller: [
                '$scope',
                '$rootScope',
                '$log',
                'UtilService',
                '$timeout',
                '$mdSidenav',
                function($scope, $rootScope, $log, UtilService, $timeout, $mdSidenav) {

                    $scope.sidenavOptions = [{
                        label: 'My Profile',
                        icon: 'social',
                        url: '/my-profile',
                    }, {
                        label: 'My Orders',
                        icon: 'transport',
                        url: '/my-orders',
                    }, {
                        label: 'My Products',
                        icon: 'commerce',
                        url: '/my-products',
                    }, {
                        label: 'Payments',
                        icon: 'money',
                        url: '/my-payments',
                    }];

                    $scope.goTo = function(url) {
                        $timeout(function() {
                            UtilService.redirectTo(url);
                        }, 300);
                    };

                    $rootScope.$on('toggleSidenav', function() {
                        if($mdSidenav('sidenav').isOpen()) {
                            $mdSidenav('sidenav').close();
                        }
                        $mdSidenav('sidenav').toggle();
                    });
                }
            ]
        };
    });
})();
