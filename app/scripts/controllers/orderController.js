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
            $scope.settings = {
                activePage: 0
            };

            $scope.orders = [{products:[{tracking_url:'http://www.google.com'}]}, {products:[{}, {}, {}]}, {products:[{}]}];

            function fetchOrders() {
                
            }
            $scope.track = function(url) {
                $window.open(url, '_blank');
            };
        }
    ]);
})();
