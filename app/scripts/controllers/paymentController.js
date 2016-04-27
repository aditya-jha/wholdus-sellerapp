(function() {
    'use strict';
    sellerapp.controller('PaymentController', [
        '$scope',
        '$rootScope',
        '$log',
        function($scope, $rootScope, $log) {
            $log.log("payment controller loaded");
            $log.log("load");
            $scope.orders = [{products:[{tracking_url:'http://www.google.com'}]}, {products:[{}, {}, {}]}, {products:[{}]}];
        }

    ]);
})();
