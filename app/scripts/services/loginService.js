(function() {
    "use strict";
    sellerapp.factory('LoginService', [
        'ConstantKeyValueService',
        '$rootScope',
        'APIService',
        '$q',
        'localStorageService',
        function(ConstantKeyValueService, $rootScope, APIService, $q, localStorageService) {
            var factory = {};

            factory.loginStatus = false;
            factory.token = null;
            factory.seller = {};

            function loginSuccess(response) {
                factory.loginStatus = true;
                factory.token = response.token;
                factory.seller = response.seller;

                localStorageService.set(ConstantKeyValueService.accessTokenKey, factory.token);
            }

            factory.checkLoggedIn = function() {
                var token = localStorageService.get(ConstantKeyValueService.accessTokenKey);
                if(token) {
                    factory.loginStatus = true;
                    factory.token = token;
                } else {
                    factory.loginStatus = false;
                }
                return factory.loginStatus;
            };

            factory.logout = function() {
                factory.loginStatus = false;
                factory.token = null;
                factory.seller = {};

                localStorageService.remove(ConstantKeyValueService.accessTokenKey);
            };

            factory.login = function(email, password) {
                var deferred = $q.defer();
                var data = {
                    email: email,
                    password: password
                };
                var apicall = APIService.apiCall("POST", APIService.getAPIUrl('sellerLogin'), data, null, true, false, true);
                apicall.then(function(response) {
                    loginSuccess(response);
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            return factory;
        }
    ]);
})();
