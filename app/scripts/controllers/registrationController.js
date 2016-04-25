(function() {
    "use strict";
    sellerapp.controller('RegistrationController', [
        '$scope',
        '$rootScope',
        '$location',
        '$log',
        'ConstantKeyValueService',
        'APIService',
        'ToastService',
        'UtilService',
        'ngProgressBarService',
        function($scope, $rootScope, $location, $log, ConstantKeyValueService, APIService, ToastService, UtilService, ngProgressBarService) {

            $scope.tabs = {
                selected: 0,
                items: ConstantKeyValueService.getSellerSignupFormItems(),
            };

            $rootScope.$broadcast('hideHam');
            
            function postNewSeller() {
                var data = UtilService.formatSellerDataToPost($scope.tabs.items);
                var newSeller = APIService.apiCall("POST", APIService.getAPIUrl("sellers"), data);
                newSeller.then(function(response) {
                    $scope.tabs.items = ConstantKeyValueService.getSellerSignupFormItems();
                    $rootScope.$broadcast('endProgressbar');
                    ToastService.showSimpleToast(ConstantKeyValueService.sellerSuccessSignup, 5000);
                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
                    ToastService.showSimpleToast(error, 3000);
                });
            }

            $scope.next = function() {
                if($scope.tabs.selected == $scope.tabs.items.length-1) {
                    $rootScope.$broadcast('showProgressbar');
                    postNewSeller();
                } else {
                    $scope.tabs.selected += 1;
                }
            };

            $scope.back = function() {
                if($scope.tabs.selected > 0 ) {
                    $scope.tabs.selected -= 1;
                }
            };
        }
    ]);
})();
