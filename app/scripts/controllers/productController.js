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
        'ConstantKeyValueService',
        function($scope, $log, ToastService, ngProgressBarService, $rootScope, APIService, $routeParams, UtilService, ConstantKeyValueService) {

            $scope.pageSettings = {
                productDetailPage: false,
                noProductsMessage: 'Upload products and start distribution',
                noProducts: false
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
                    $scope.pageSettings.productDetailPage = true;
                    return true;
                }
                return false;
            }

            function fetchProducts(params) {
                $rootScope.$broadcast('showProgressbar');
                var productApiCall = APIService.apiCall("GET", APIService.getAPIUrl("products"), null, params);
                productApiCall.then(function(response) {
                    if($scope.pageSettings.productDetailPage) {
                        if(!response.products.length) {
                            UtilService.redirectTo('/my-products');
                        } else {
                            $scope.products = response.products[0];
                        }
                    } else {
                        if(!response.products.length) {
                            $scope.pageSettings.noProducts = true;
                        } else {
                            $scope.pageSettings.noProducts = false;
                            $scope.products = response.products;
                        }
                    }
                    $rootScope.$broadcast('endProgressbar');
                }, function(error) {
                    $log.log(error);
                    $rootScope.$broadcast('endProgressbar');
                });
            }

            function updateProductDetails(product, hide) {
                $rootScope.$broadcast('showProgressbar');
                var productApiCall = APIService.apiCall("PUT", APIService.getAPIUrl("products"), product);
                productApiCall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    if(hide) {
                        ToastService.showSimpleToast(ConstantKeyValueService.hideProductMessage, 5000);
                    } else {
                        ToastService.showSimpleToast(ConstantKeyValueService.showProductMessage, 5000);
                    }

                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
                    ToastService.showSimpleToast(error, 5000);
                });
            }

            function deleteProduct(product, index) {
                $rootScope.$broadcast('showProgressbar');
                var data = {
                    productID: product.productID
                };

                var productApiCall = APIService.apiCall("DELETE", APIService.getAPIUrl("products"), data);
                productApiCall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                    ToastService.showSimpleToast(ConstantKeyValueService.deleteProductMessage, 5000);
                    UtilService.redirectTo('/my-products');
                    if(index >= 0) {
                        $scope.products.splice(index, 1);
                        if(!$scope.products.length) {
                            $scope.pageSettings.noProducts = true;
                        }
                    }
                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
                    ToastService.showSimpleToast(error, 5000);
                });
            }

            $scope.toggleProductStats = function(status, index) {
                if(status == 1) {
                    if(index>=0) {
                        $scope.products[index].show_online = true;
                        updateProductDetails($scope.products[index], false);
                    } else {
                        $scope.products.show_online = true;
                        updateProductDetails($scope.products, false);
                    }
                } else if(status === 0) {
                    if(index>=0) {
                        $scope.products[index].show_online = false;
                        updateProductDetails($scope.products[index], true);
                    } else {
                        $scope.products.show_online = false;
                        updateProductDetails($scope.products, true);
                    }
                } else if(status == -1) {
                    if(index >= 0) deleteProduct($scope.products[index], index);
                    else deleteProduct($scope.products);
                }
            };

            init();
        }
    ]);
})();
