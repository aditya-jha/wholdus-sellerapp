(function() {
    'use strict';
    sellerapp.controller('PaymentController', [
        '$scope',
        '$rootScope',
        '$log',
        'ngProgressBarService',
        'APIService',
        'ConstantKeyValueService',
        '$routeParams',
        function($scope, $rootScope, $log, ngProgressBarService, APIService, ConstantKeyValueService, $routeParams) {
            $scope.settings = {
                noPayments: false
            };

            $scope.payment = [];

            function fetchOrders(params) {
                $scope.settings.noPayments = false;
                $rootScope.$broadcast('showProgressbar');
                var apicall = APIService.apiCall("GET", APIService.getAPIUrl("sellerpayment"), null, params);
                apicall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    if(response.seller_payments.length > 0){
                    $scope.payment = response.seller_payments[0];
                    } 
                    else {
                        $scope.settings.noPayments = true;
                    }
                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
                    $log.log(error);
                });
            }

            fetchOrders();
        }

    ]);
})();


