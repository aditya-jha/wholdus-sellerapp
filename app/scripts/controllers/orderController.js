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
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log, $timeout) {
            $log.log("order controller loaded");
            $scope.settings = {
                activePage: 0
            };

            $scope.orders = [{products:[{}]}, {products:[{}, {}]}, {products:[{}]}];
        }
    ]);
})();
