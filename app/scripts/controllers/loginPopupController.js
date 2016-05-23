(function() {
    "use strict";
    sellerapp.controller('LoginPopupController', [
        '$scope',
        '$mdDialog',
        'LoginService',
        'ToastService',
        'ngProgressBarService',
        '$rootScope',
        '$log',
        function($scope, $mdDialog, LoginService, ToastService, ngProgressBarService, $rootScope, $log) {

            var loginApiCall;

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.login = function() {
                if($scope.email && $scope.password) {
                    if(loginApiCall) {
                        return;
                    }
                    loginApiCall = true;
                    $rootScope.$broadcast('showProgressbar');
                    LoginService.login($scope.email, $scope.password)
                    .then(function(response) {
                        loginApiCall = false;
                        $rootScope.$broadcast('endProgressbar');
                        ToastService.showSimpleToast("welcome", 2000);
                        $mdDialog.hide(true);
                    }, function(error) {
                        loginApiCall = false;
                        $rootScope.$broadcast('endProgressbar');
                        ToastService.showSimpleToast(error.error, 2000);
                    });
                } else {
                    ToastService.showSimpleToast("Please fill email and password", 2000);
                }
            };
        }
    ]);
})();
