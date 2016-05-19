(function() {
    sellerapp.controller('DistributeOnWholdusController', [
        '$scope',
        '$log',
        'ToastService',
        'APIService',
        '$location',
        'FormValidationService',
        
        function($scope, $log, ToastService, APIService, $location, FormValidationService) {

           // $scope.emailValidation=FormValidationService.emailValidation();
           // $scope.mobileNumValidation=FormValidationService.mobileNumValidation();

           
                $scope.formValidation=FormValidationService.formValidation();
           
                $scope.register = function() {

                if($scope.email && $scope.mobile_number && $scope.name) {
                    var MobStr=$scope.mobile_number.toString();
                    var MobNum=Number(MobStr.substr(MobStr.length-10,10)); 
                    $scope.mobile_number=MobNum;            
                    var url = "/register?email="+$scope.email+"&mobile_number="+
                    $scope.mobile_number+"&company_name="+$scope.name;
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
                // 
        }
    ]);
})();
