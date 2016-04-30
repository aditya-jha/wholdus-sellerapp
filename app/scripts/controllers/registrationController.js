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
                selectedIndex: 0,
                items: ConstantKeyValueService.getSellerSignupFormItems(),
            };
            $scope.sellerSingupForm = '';

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

            function validForm() {
                var invalid = false;
                for(var i=0; i<$scope.tabs.items.length; i++) {
                    var item = $scope.tabs.items[i].formItems;
                    var keys = Object.keys(item);
                    for(var j=0; j<keys.length; j++) {
                        if(item[keys[j]].required && item[keys[j]].value === '') {
                            return false;
                        }
                    }
                }
                return true;
            }

            $scope.next = function() {
                if($scope.tabs.selectedIndex == $scope.tabs.items.length-1) {
                    if(!validForm()) {
                        ToastService.showSimpleToast("please fill required items", 2000);
                        return;
                    }
                    $rootScope.$broadcast('showProgressbar');
                    postNewSeller();
                } else {
                    $scope.tabs.selectedIndex += 1;
                }
            };

            $scope.back = function() {
                if($scope.tabs.selectedIndex > 0 ) {
                    $scope.tabs.selectedIndex -= 1;
                }
            };
        }
    ]);
})();
