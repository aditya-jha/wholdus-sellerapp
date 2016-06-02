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
                activePage: 0,
                noOrders: false
            };

            function fetchOrders(params, urlType) {
                $scope.settings.noOrders = false;
                $rootScope.$broadcast('showProgressbar');
                var apicall = APIService.apiCall("GET", APIService.getAPIUrl(urlType), null, params);
                apicall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    if($scope.settings.activePage === 0) {
                        if(response.sub_orders.length === 0) {
                            $scope.settings.noOrders = true;
                        } else {
                            $scope.orders = response.sub_orders;
                        }
                    } else if($scope.settings.activePage === 1 || $scope.settings.activePage === 2) {
                        if(response.order_shipments.length === 0) {
                            $scope.settings.noOrders = true;
                        } else {
                            $scope.orders = response.order_shipments;
                        }
                    }
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
                    fetchOrders({status: '1'}, 'subOrders');
                } else if($scope.settings.activePage === 1) {
                    $scope.orders = [];
                    fetchOrders({status: '3'}, 'shipments');
                } else {
                    $scope.orders = [];
                    fetchOrders({status: '4,5,6,7,8,9'}, 'shipments');
                }
            });
        }
    ]);
})();
