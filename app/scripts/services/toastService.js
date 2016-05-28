(function() {
    'use strict';

    sellerapp.factory('ToastService', [
        '$rootScope',
        '$mdToast',
        function($rootScope, $mdToast) {
            var factory = {};

            factory.showSimpleToast = function(content, delay) {
                $mdToast.show($mdToast
                    .simple()
                    .textContent(content)
                    .hideDelay(delay)                   
                );
            };

            factory.showActionToast = function(content){
                $mdToast.show($mdToast
                    .simple()
                    .textContent(content)
                    .hideDelay(false)
                    .action("ok")
                    .highlightAction(false)
                    );
            };

            return factory;
        }
    ]);
})();
