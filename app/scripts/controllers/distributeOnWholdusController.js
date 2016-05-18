(function() {
    sellerapp.controller('DistributeOnWholdusController', [
        '$scope',
        '$log',
        'ToastService',
        'APIService',
        '$location',
        
        function($scope, $log, ToastService, APIService, $location) {



            $scope.register = function() {
                if($scope.email && $scope.mobile_number && $scope.name) {
                    var url = "/register?email="+$scope.email+"&mobile_number="+$scope.mobile_number+"&company_name="+$scope.name;
                    $location.url(url);
                    // var data = {
                    //     email: $scope.email,
                    //     mobile_number: $scope.mobile_number,
                    //     name: $scope.name
                    // };
                    // APIService.apiCall("POST", APIService.getAPIUrl('sellerSignup'), data)
                    // .then(function(response) {
                    //
                    // }, function(error) {});
                } else {
                    //ToastService.showSimpleToast("Please fill required details", 2000);
                }
            };
        }
    ]);
})();
