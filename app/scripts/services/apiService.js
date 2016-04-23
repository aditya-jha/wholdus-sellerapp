(function() {
    'use strict';

    sellerapp.factory('APIService', [
        '$http',
        'ConstantKeyValueService',
        '$location',
        '$q',
        function($http, ConstantKeyValueService, $location, $q) {
            var factory = {};

            factory.apiCall = function(method, url, data, params, headers, cache, transformRequest) {
                var deferred = $q.defer();

                var apiPromise = $http({
                    method: method,
                    params: params,
                    url: url,
                    headers: headers,
                    transformRequest: transformRequest,
                    data: JSON.stringify(data),
                    cache: cache
                });
                apiPromise.then(function(response) {
                    if(response.data.statusCode === '2XX') {
                        deferred.resolve(response.data.body);
                    } else {
                        $location.url('/404');
                        deferred.reject(response.data.body);
                    }
                }, function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            factory.promiseReturnHelper = function(promiseObj, deferred) {
                promiseObj.then(function(response) {
                    if(response.data.statusCode === '2XX') {
                        deferred.resolve(response.data.body);
                    } else {
                        $location.url('/404');
                        deferred.reject(response.data.body);
                    }
                }, function(error) {
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
