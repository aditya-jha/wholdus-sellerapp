(function() {
    sellerapp.controller('ProductController', [
        '$scope',
        '$log',
        'ToastService',
        'ngProgressBarService',
        '$rootScope',
        'APIService',
        '$routeParams',
        'UtilService',
        function($scope, $log, ToastService, ngProgressBarService, $rootScope, APIService, $routeParams, UtilService) {

            var pageSettings = {
                productDetailPage: false
            };

            function init() {
                if(isProductDetailPage()) {
                    fetchProducts({
                        productID: $scope.productID
                    });
                } else {
                    fetchProducts();
                }
            }

            function getIDFromSlug(slug) {
                var slugArr = slug.split('-');
                if(slugArr.length) {
                    var ret = parseInt(slugArr[slugArr.length-1]);
                    if(!isNaN(ret)) return ret;
                }
                UtilService.redirectTo('/');
            }

            function isProductDetailPage() {
                if($routeParams.productslug) {
                    $scope.productID = getIDFromSlug($routeParams.productslug);
                    pageSettings.productDetailPage = true;
                    return true;
                }
                return false;
            }

            function fetchProducts(params) {
                $rootScope.$broadcast('showProgressbar');
                var productApiCall = APIService.apiCall("GET", APIService.getAPIUrl("products"), null, params);
                productApiCall.then(function(response) {
                    $log.log(response.products);
                    if(pageSettings.productDetailPage) {
                        $scope.products = response.products[0];
                    } else {
                        $scope.products = response.products;
                    }
                    $rootScope.$broadcast('endProgressbar');
                }, function(error) {
                    $log.log(error);
                    $rootScope.$broadcast('endProgressbar');
                });
            }

            init();
        }
    ]);
})();
