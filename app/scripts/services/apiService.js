(function() {
    'use strict';

    sellerapp.factory('APIService', [
        '$http',
        'ConstantKeyValueService',
        '$location',
        '$q',
        'ToastService',
        function($http, ConstantKeyValueService, $location, $q, ToastService) {
            var factory = {};

            function transform(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }

            factory.apiCall = function(method, url, data, params, headers, cache, transformRequest, timeout) {
                var deferred = $q.defer();

                if(!transformRequest) {
                    data = JSON.stringify(data);
                }
                if(!params) {
                    params = {};
                }
                params.access_token = ConstantKeyValueService.token;

                var apiPromise = $http({
                    method: method,
                    params: params,
                    url: url,
                    headers: headers ? {'Content-Type': 'application/x-www-form-urlencoded'} : undefined,
                    transformRequest: transformRequest ? transform : transformRequest,
                    data: data,
                    cache: cache ? cache : false,
                    timeout: timeout
                });
                apiPromise.then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    if (error.status == 500) {
                        ToastService.showSimpleToast("Something went wrong", 5000);
                    } else {
                        $location.url('/404');
                    }
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            factory.promiseReturnHelper = function(promiseObj, deferred) {
                promiseObj.then(function(response) {
                    if(response.data.statusCode === '2XX') {
                        deferred.resolve(response.data.body);
                    } else {
                        deferred.reject(response.data.body);
                    }
                }, function(error) {
                    $location.url('/404');
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            factory.getAPIUrl = function(type) {
                return ConstantKeyValueService.apiBaseUrl + ConstantKeyValueService.apiUrl[type] + '/';
            };

            return factory;
        }
    ]);
})();
