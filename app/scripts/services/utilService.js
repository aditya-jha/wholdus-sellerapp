(function() {
    "use strict";

    sellerapp.factory('UtilService', [
        '$rootScope',
        '$log',
        '$location',
        function($rootScope, $log, $location) {
            var factory = {};

            factory.formatSellerDataToPost = function(data) {
                var seller = {
                    name: data[0].formItems.name.value,
                    mobile_number: data[0].formItems.mobile_number.value,
                    mobile_verification: false,
                    alternate_phone_number: data[0].formItems.mobile_number.value,
                    email: data[0].formItems.email.value,
                    email_verification: false,
                    password: data[0].formItems.password.value,
                    company_name: data[1].formItems.company_name.value,
                    company_profile: data[1].formItems.company_profile.value,
                    address: {
                        address: data[2].formItems.address.value,
                        pincode: data[2].formItems.pincode.value,
                        landmark: data[2].formItems.landmark.value,
                        state: data[2].formItems.state.value,
                        city: data[2].formItems.city.value,
                    },
                    details: {
                        vat_tin: data[1].formItems.vat_tin.value,
                        tin_verification: false,
                        cst: data[1].formItems.cst.value,
                        pan: data[1].formItems.pan.value,
                        pan_verification: false,
                        name_on_pan: data[1].formItems.name_on_pan.value,
                        dob_on_pan: data[1].formItems.dob_on_pan.value,
                    },
                    bank_details: {
                        account_holders_name: data[3].formItems.account_holders_name.value,
                        account_number: data[3].formItems.account_number.value,
                        bank_name: data[3].formItems.bank_name.value,
                        branch_name: data[3].formItems.branch_name.value,
                        branch_pincode: data[3].formItems.branch_pincode.value,
                        ifsc: data[3].formItems.ifsc.value,
                        branch_city: data[3].formItems.branch_city.value,
                    }
                };
                return seller;
            };

            factory.redirectTo = function(to) {
                $location.url(to);
            };

            return factory;
        }
    ]);
})();
