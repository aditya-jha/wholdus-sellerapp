(function() {
    "use strict";
    sellerapp.directive('psaHeader', function() {
        return {
            restrict: 'AE',
            templateUrl: 'views/directives/psaHeader.html',
            link: function(scope, element, attributes) {
            },
            controller: [
                '$scope',
                '$log',
                '$rootScope',
                function($scope, $log, $rootScope) {

                    $scope.toggleSidenav = function() {
                        $rootScope.$broadcast('toggleSidenav');
                    };

                    $rootScope.$on('hideHam', function(event, data) {
                        $scope.hideHam = true;
                    });
                }
            ]
        };
    });
})();
