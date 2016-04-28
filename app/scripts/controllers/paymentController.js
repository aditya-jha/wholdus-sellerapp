(function() {
    'use strict';
    sellerapp.controller('PaymentController', [
        '$scope',
        '$rootScope',
        '$log',
        'ngProgressBarService',
        'APIService',
        function($scope, $rootScope, $log, ngProgressBarService, APIService) {
            $scope.orders = [{products:[{tracking_url:'http://www.google.com'}]}, {products:[{}, {}, {}]}, {products:[{}]}];

            $scope.orders = [];
            
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

            fetchOrders({status:"12"});
        }

    ]);
})();
