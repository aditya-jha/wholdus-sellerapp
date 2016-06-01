(function() {
    sellerapp.controller('OrderDetailController', [
        '$scope',
        '$rootScope',
        'ngProgressBarService',
        'APIService',
        '$log',
        '$routeParams',
        '$location',
        function($scope, $rootScope, ngProgressBarService, APIService, $log, $routeParams, $location) {
            $scope.order = [];
            $scope.suborderID = null;

            function fetchOrder() {
                if($routeParams.orderID && $routeParams.suborderID) {
                    $rootScope.$broadcast('showProgressbar');
                    var params = {
                        suborderID: $routeParams.suborderID
                    };
                    $scope.suborderID = $routeParams.suborderID;

                    APIService.apiCall("GET", APIService.getAPIUrl("subOrders"), null, params)
                        .then(function(response) {
                            if(response.sub_orders.length === 0) {
                                $location.url('my-orders');
                            } else {
                                $scope.order = response.sub_orders[0];
                            }
                            $rootScope.$broadcast('endProgressbar');
                        }, function(error) {
                            $rootScope.$broadcast('endProgressbar');
                            $log.log(error);
                            $location.url('my-orders');
                        });
                }
            }
            fetchOrder();

        }
    ]);
})();
