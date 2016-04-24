(function() {
    "use strict";
    sellerapp.controller('ProfileController', [
        '$scope',
        '$rootScope',
        'APIService',
        'ConstantKeyValueService',
        'UtilService',
        '$log',
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log) {
            $log.log("controller loaded");

            $scope.profileItems = ConstantKeyValueService.getSellerSignupFormItems();
            $scope.seller = {
                personal_details: $scope.profileItems[0],
                company_details: $scope.profileItems[1],
                pickup_address: $scope.profileItems[2],
                bank_details: $scope.profileItems[3],
            };
        }
    ]);
})();
