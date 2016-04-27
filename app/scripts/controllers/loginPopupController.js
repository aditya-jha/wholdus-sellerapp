(function() {
    "use strict";
    sellerapp.controller('LoginPopupController', [
        '$scope',
        '$mdDialog',
        'LoginService',
        'ToastService',
        function($scope, $mdDialog, LoginService, ToastService) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.login = function() {
                if($scope.email && $scope.password) {
                    LoginService.login($scope.email, $scope.password).then(function(response) {
                        ToastService.showSimpleToast("welcome", 2000);
                        $mdDialog.hide(true);
                    }, function(error) {
                        ToastService.showSimpleToast(error.error, 2000);
                    });
                }

            };
        }
    ]);
})();
