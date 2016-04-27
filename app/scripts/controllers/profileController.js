(function() {
    "use strict";
    sellerapp.controller('ProfileController', [
        '$scope',
        '$rootScope',
        'APIService',
        'ConstantKeyValueService',
        'UtilService',
        '$log',
        'LoginService',
        'ToastService',
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log, LoginService, ToastService) {

            $scope.profileItems = ConstantKeyValueService.getSellerSignupFormItems();
            UtilService.assignSellerValues($scope.profileItems, LoginService.seller);

            $scope.seller = {
                personal_details: $scope.profileItems[0],
                company_details: $scope.profileItems[1],
                pickup_address: $scope.profileItems[2],
                bank_details: $scope.profileItems[3],
            };

            $scope.updateProfile = function() {
                var data = UtilService.formatSellerDataToPost($scope.profileItems);
                APIService.apiCall("PUT", APIService.getAPIUrl('sellers'), data).then(function(response) {
                    ToastService.showSimpleToast(response, 3000);
                }, function(error) {
                    ToastService.showSimpleToast(error, 3000);
                });
            };
        }
    ]);
})();
