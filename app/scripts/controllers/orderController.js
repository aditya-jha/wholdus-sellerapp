(function() {
    "use strict";
    sellerapp.controller('OrderController', [
        '$scope',
        '$rootScope',
        'APIService',
        'ConstantKeyValueService',
        'UtilService',
        '$log',
        '$timeout',
        '$window',
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log, $timeout, $window) {
            $log.log("order controller loaded");
            $scope.settings = {
                activePage: 0
            };

            $scope.orders = [{products:[{tracking_url:'http://www.google.com'}]}, {products:[{}, {}, {}]}, {products:[{}]}];

            $scope.track = function(url) {
                $window.open(url, '_blank');
            };
        }
    ]);
})();
