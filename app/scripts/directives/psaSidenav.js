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
                function($scope, $rootScope, $log) {

                    $scope.sidenavOptions = [{
                        label: 'My Profile',
                        icon: 'svg-1'
                    }, {
                        label: 'My Orders',
                        icon: 'svg-2'
                    }, {
                        label: 'My Products',
                        icon: 'svg-3'
                    }, {
                        label: 'Payments',
                        icon: 'svg-4'
                    }];
                }
            ]
        };
    });
})();
