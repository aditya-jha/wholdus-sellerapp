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
        'ngProgressBarService',
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log, $timeout, $window, ngProgressBarService) {
            $scope.settings = {
                activePage: 0
            };

            function fetchOrders(params) {
                $rootScope.$broadcast('showProgressbar');
                var apicall = APIService.apiCall("GET", APIService.getAPIUrl("orders"), null, params);
                apicall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    $scope.orders = response.order_items;
                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
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
