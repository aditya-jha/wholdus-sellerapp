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
                if(!urlType) {
                    urlType = "orders";
                }
                $scope.settings.noOrders = false;
                $rootScope.$broadcast('showProgressbar');
                var apicall = APIService.apiCall("GET", APIService.getAPIUrl(urlType), null, params);
                apicall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    $scope.orders = response.sub_orders;
                    if(response.sub_orders.length === 0) {
                        $scope.settings.noOrders = true;
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
                    fetchOrders({status: '2,3'});
                } else {
                    $scope.orders = [];
                    fetchOrders({status: '4,5,6,7,8'});
                }
            });
        }
    ]);
})();
