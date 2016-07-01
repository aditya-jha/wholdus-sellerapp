(function() {
    "use strict";
    sellerapp.controller('OrderController', [
        '$scope',
        '$rootScope',
        'APIService',
        'ConstantKeyValueService',
        'UtilService',
        '$log',
        '$timeout',
        '$window',
        'ngProgressBarService',
     
        function($scope, $rootScope, APIService, ConstantKeyValueService, UtilService, $log, $timeout,
         $window, ngProgressBarService) {
            $scope.settings = {
                activePage: 0,
                noOrders: false
            };

            function setPageType() {
                $scope.page = $scope.settings.activePage == '1' ? 'acknowledge' : 'shipment';
            }
            setPageType();

            function fetchOrders(params, urlType) {
                $scope.settings.noOrders = false;
                $rootScope.$broadcast('showProgressbar');
                var apicall = APIService.apiCall("GET", APIService.getAPIUrl(urlType), null, params);
                apicall.then(function(response) {
                    $rootScope.$broadcast('endProgressbar');
                  
                        if(response.sub_orders.length === 0) {
                            $scope.settings.noOrders = true;
                        } else {
                            for(var i=0;i<response.sub_orders.length;i++){
                            angular.forEach(response.sub_orders[i].order_items, function(value, key) {
                                value.product.images = UtilService.getImages(value.product);
                                if(value.product.images.length){
                                    value.product.imageUrl = UtilService.getImageUrl(value.product.images[0], '200x200');
                                }
                                else{
                                    value.product.imageUrl = 'images/200.png';
                                }
                            });
                            }
                            $scope.orders = response.sub_orders;
                            $scope.visible = [];
                            for(var i =0; i<response.sub_orders.length;i++){
                                $scope.visible.push(true);
                            }
                    
                    }
                }, function(error) {
                    $rootScope.$broadcast('endProgressbar');
                });
            }

            $scope.track = function(url) {
                $window.open(url, '_blank');
            };

            $scope.showFullDetail = function(i){
                if($scope.visible[i] === true){
                    $scope.visible[i] = false;
                }
                else{
                    $scope.visible[i] = true;
                }
            }

            $scope.$watch('settings.activePage', function() {
                if($scope.settings.activePage === 0) {
                    $scope.orders = [];
                    fetchOrders({sub_order_status: '1,2,3'}, 'subOrders');
                } else if($scope.settings.activePage === 1) {
                    $scope.orders = [];
                    fetchOrders({sub_order_status:  '4'}, 'subOrders');
                } else {
                    $scope.orders = [];
                    fetchOrders(null, 'subOrders');
                }
                setPageType();
            });
        }
    ]);
})();
