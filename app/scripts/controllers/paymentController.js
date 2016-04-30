(function() {
    'use strict';
    sellerapp.controller('PaymentController', [
        '$scope',
        '$rootScope',
        '$log',
        'ngProgressBarService',
        'APIService',
        function($scope, $rootScope, $log, ngProgressBarService, APIService) {
            $scope.settings = {
                noPayments: false
            };

            $scope.orders = [];

            function fetchOrders(params) {
                $scope.settings.noPayments = false;
                $rootScope.$broadcast('showProgressbar');
                var apicall = APIService.apiCall("GET", APIService.getAPIUrl("orders"), null, params);
                apicall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    $scope.orders = response.order_items;
                    if(response.order_items.length === 0) {
                        $scope.settings.noPayments = true;
                    }
                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
                    $log.log(error);
                });
            }

            fetchOrders({status:"12"});
        }

    ]);
})();
