(function() {
    sellerapp.controller('ProductController', [
        '$scope',
        '$log',
        'ToastService',
        'ngProgressBarService',
        '$rootScope',
        'APIService',
        function($scope, $log, ToastService, ngProgressBarService, $rootScope, APIService) {
            $log.log("ProductController loaded");
            $scope.products = [{},{},{},{},{},{}];

            function fetchProducts(params) {
                $rootScope.$broadcast('showProgressbar');
                var productApiCall = APIService.apiCall("GET", APIService.getAPIUrl("products"), null, params);
                productApiCall.then(function(response) {
                    $log.log(response.products);
                    $scope.products = response.products;
                    $rootScope.$broadcast('endProgressbar');
                }, function(error) {
                    $log.log(error);
                    $rootScope.$broadcast('endProgressbar');
                });
            }
            fetchProducts();
        }
    ]);
})();
