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
        'OrderService',
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log, $timeout, $window, OrderService) {
            $scope.settings = {
                activePage: 0
            };

            function fetchOrders(params) {
                OrderService.fetchOrders(params).then(function(response) {
                    $scope.orders = response.order_items;
                }, function(error) {
                    $log.log(error);
                });
            }

            $scope.track = function(url) {
                $window.open(url, '_blank');
            };

            $scope.$watch('settings.activePage', function() {
                if($scope.settings.activePage === 0) {
                    $scope.orders = [];
                    fetchOrders({status: '1'});
                } else if($scope.settings.activePage === 1) {
                    $scope.orders = [];
                    fetchOrders({status: '2,3'});
                } else {
                    $scope.orders = [];
                    fetchOrders({status: '4,5,6,7,8'});
                }
            });
        }
    ]);
})();
