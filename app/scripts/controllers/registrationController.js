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

             $scope.hit = 0;
            var newSeller;
            $scope.formSubmitError=false;
            $scope.tabs = {
                selectedIndex: 0,
                items: ConstantKeyValueService.getSellerSignupFormItems(),
            };
            $scope.sellerSingupForm = '';

            $rootScope.$broadcast('hideHam');

            function readFromUrl() {
                var params = $location.search();
                if(params && params.email) {
                    $scope.tabs.items[0].formItems.email.value = params.email;
                }
                if(params && params.mobile_number) {
                    $scope.tabs.items[0].formItems.mobile_number.value = parseInt(params.mobile_number);
                }
                if(params && params.company_name) {
                    $scope.tabs.items[1].formItems.company_name.value = params.company_name;
                }
            }
            readFromUrl();

            function postNewSeller() {
                if(newSeller) {
                    return;
                }

                var data = UtilService.formatSellerDataToPost($scope.tabs.items);
                newSeller = APIService.apiCall("POST", APIService.getAPIUrl("sellers"), data);
                newSeller.then(function(response) {
                    newSeller = null;
                    $scope.tabs.items = ConstantKeyValueService.getSellerSignupFormItems();
                    $rootScope.$broadcast('endProgressbar');
                    $scope.hit=1;

                }, function(error) {
                    newSeller = null;
                    var str= error.error;
                    $rootScope.$broadcast('endProgressbar');
                    ToastService.showActionToast((str.charAt(0).toUpperCase() + str.slice(1)),0);
                });
            }

            function validForm() {
                var invalid = false;
                for(var i=0; i<$scope.tabs.items.length; i++) {
                    var item = $scope.tabs.items[i].formItems;
                    var keys = Object.keys(item);
                    for(var j=0; j<keys.length; j++) {
                        if(item[keys[j]].required && item[keys[j]].value === '') {
                           $scope.formSubmitError=true;
                            return false;
                        }
                    }
                    // for(var k=0; k<$scope.tabs.items.length; k++)
                    // {
                    //     if(!$scope.tabs.items[k].completed)
                    //         $scope.formSubmitError=true;
                    //         return false;

                    // }
                }
                return true;
            }

            $scope.next = function() {
                if($scope.tabs.selectedIndex == $scope.tabs.items.length-1) {
                    if(!validForm()) {
                        ToastService.showSimpleToast("Please fill all required items with valid details", 2200);
                        $scope.hit=0;
                        return;
                    }

                    $rootScope.$broadcast('showProgressbar');
                    postNewSeller();
                } else {
                    $scope.tabs.items[$scope.tabs.selectedIndex].completed=true;
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
