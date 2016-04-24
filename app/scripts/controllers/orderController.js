(function() {
    "use strict";
    sellerapp.controller('OrderController', [
        '$scope',
        '$rootScope',
        'APIService',
        'ConstantKeyValueService',
        'UtilService',
        '$log',
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log) {
            $log.log("order controller loaded");
        }
    ]);
})();
