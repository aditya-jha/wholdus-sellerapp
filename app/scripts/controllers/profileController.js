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
        'ngProgressBarService',
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log, LoginService, ToastService, ngProgressBarService) {

            $scope.profileItems = ConstantKeyValueService.getSellerSignupFormItems();

            function assign() {
                $scope.seller = {
                    personal_details: $scope.profileItems[0],
                    company_details: $scope.profileItems[1],
                    pickup_address: $scope.profileItems[2],
                    bank_details: $scope.profileItems[3],
                };
            }

            function fetchSellerDetails() {
                $rootScope.$broadcast('showProgressbar');
                APIService.apiCall("GET", APIService.getAPIUrl("sellers")).then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    UtilService.assignSellerValues($scope.profileItems, response.sellers[0]);
                    assign();
                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
                });
            }
            fetchSellerDetails();

            $scope.updateProfile = function() {
                var data = UtilService.formatSellerDataToPost($scope.profileItems);
                APIService.apiCall("PUT", APIService.getAPIUrl('sellers'), data).then(function(response) {
                    ToastService.showSimpleToast('successfully updated', 3000);
                }, function(error) {
                    ToastService.showSimpleToast(error, 3000);
                });
            };
        }
    ]);
})();
