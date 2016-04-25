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
                function($scope, $log) {
                    $log.log("loaded");
                }
            ]
        };
    });
})();
