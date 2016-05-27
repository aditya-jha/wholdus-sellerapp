(function() {
    "use strict";
    sellerapp.directive("psaSellerSignup", function() {
        return {
            restrict: 'AE',
            templateUrl: "views/directives/psaSellerSignup.html",
            scope: {},
            link: function(scope, element, attributes) {
            },
            controller: [
                '$scope',
                '$rootScope',
                '$log',
                function($scope, $rootScope, $log) {
                    $log.log("psaSellerSignup loaded");

                    $scope.tabs = {
                        selected: 0,
                        items: [
                            {
                                label: 'Personal Details',
                                formItems: {
                                    name: {
                                        label: 'Full Name',
                                        type: 'text',
                                        required: true,
                                        value: ''
                                    },
                                    email: {
                                        label: 'Email ID',
                                        type: 'email',
                                        required: true,
                                        value: ''
                                    },
                                    mobile_number: {
                                        label: 'Mobile No.',
                                        type: 'number',
                                        required: true,
                                        value: ''
                                    },
                                    alternate_phone_number: {
                                        label: 'Alt. Phone No.',
                                        type: 'text',
                                        required: false,
                                        value: ''
                                    },
                                    password: {
                                        label: 'Password',
                                        type: 'password',
                                        required: true,
                                        value: ''
                                    }
                                }
                            },
                            {
                                label: 'Company Details',
                                formItems: {
                                    company_name: {
                                        label: 'Store/Company Name',
                                        type: 'text',
                                        required: true,
                                        value: '',
                                    },
                                    company_profile: {
                                        label: 'Company Profile',
                                        type: 'textarea',
                                        required: true,
                                        value: '',
                                    },
                                    pan: {
                                        label: 'PAN',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    },
                                    name_on_pan: {
                                        label: 'Nam on PAN',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    },
                                    dob_on_pan: {
                                        label: 'DOB on pan',
                                        type: 'date',
                                        required: false,
                                        value: '',
                                    },
                                    vat_tin: {
                                        label: 'VAT / TINs',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    },
                                    cst: {
                                        label: 'CST',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    }
                                }
                            },
                            {
                                label: 'Pickup Address',
                                formItems: {
                                    address: {
                                        label: 'Address',
                                        type: 'textarea',
                                        required: false,
                                        value: '',
                                    },
                                    pincode: {
                                        label: 'Pincode',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    },
                                    landmark: {
                                        label: 'Landmark',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    },
                                    state: {
                                        label: 'State',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    },
                                    city: {
                                        label: 'City',
                                        type: 'text',
                                        required: false,
                                        value: '',
                                    }
                                }
                            },
                            {
                                label: 'Bank Account Details'
                            }
                        ],
                    };

                    $scope.next = function() {
                        if($scope.tabs.selected == $scope.tabs.items.length-1) {
                            // api call
                        } else {
                            $scope.tabs.selected += 1;
                        }
                        $log.log($scope.tabs);
                    };
                    $scope.back = function() {
                        if($scope.tabs.selected > 0 ) {
                            $scope.tabs.selected -= 1;
                        }
                    };
                }
            ]
        };
    });
})();
