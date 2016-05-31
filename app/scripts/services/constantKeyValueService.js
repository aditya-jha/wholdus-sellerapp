(function() {
    "use strict";
    sellerapp.factory("ConstantKeyValueService", ['FormValidationService',
        function(FormValidationService) {
            var formValidation=FormValidationService;
            var factory = {
                token: '',
                apiBaseUrl: 'http://api.wholdus.com/',
                apiUrl: {
                    login: 'admin/login',
                    internalUsers: 'users/internal-users',
                    users: 'users',
                    buyers: 'users/buyer',
                    sellers: 'users/seller',
                    orders: 'orders',
                    subOrders: 'suborder',
                    shipments: 'shipments',
                    payments: 'payments',
                    products: 'products',
                    sellerLogin: 'users/seller/login'
                },
                accessTokenKey: 'randomData',
                sellerSuccessSignup: "Your application has been sent for approval. You will soon be contacted by our executive",
                hideProductMessage: 'This product has now been hidden from the online store',
                showProductMessage: 'The product will go live on the website once the changes have been verified',
                noProductsMessage: 'Upload products and start distribution',
                deleteProductMessage: 'This product has successfully been deleted',

                sellerSignup: [
                    {
                        label: 'Personal Details',
                        completed:false,
                        formItems: {
                            name: {
                                label: 'Full Name',
                                name:'fullName',
                                type: 'text',
                                required: true,
                                value: '',
                                pattern:'',
                            },
                            email: {
                                label: 'Email ID',
                                name:'emailID',
                                type: 'email',
                                required: true,
                                value: '',
                                pattern: formValidation.emailValidation,
                                error:formValidation.emailErrorMessage
                            },
                            mobile_number: {
                                label: 'Mobile No.',
                                name:'mobileNumber',
                                type: 'number',
                                required: true,
                                value: '',
                                pattern: formValidation.mobileNumValidation,
                                error:formValidation.mobileErrorMessage
                            },
                            alternate_phone_number: {
                                label: 'Alt. Phone No.',
                                name:'alternateMobileNumber',
                                type: 'text',
                                required: false,
                                value: '',
                                pattern:''

                            },
                            password: {

                                label: 'Password',
                                name:'password',
                                type: 'password',
                                required: true,
                                value: '',
                                pattern:''
                            }
                        }
                    },
                    {
                        label: 'Company Details',
                        completed:false,
                        formItems: {
                            company_name: {
                                label: 'Store/Company Name',
                                type: 'text',
                                required: true,
                                value: '',
                                pattern:''
                            },
                            company_profile: {
                                label: 'Company Profile',
                                type: 'textarea',
                                required: false,
                                value: '',
                                pattern:''
                            },
                            pan: {
                                label: 'PAN',
                                type: 'text',
                                required: false,
                                value: '',
                                pattern:'',
                                pattern: formValidation.panValidation,
                                error:formValidation.panErrorMessage
                            },
                            name_on_pan: {
                                label: 'Nam on PAN',
                                type: 'text',
                                required: false,
                                value: '',
                                pattern:''
                            },
                            dob_on_pan: {
                                label: 'DOB on pan',
                                type: 'date',
                                required: false,
                                value: '',
                                pattern:''
                            },
                            vat_tin: {
                                label: 'VAT / TINs',
                                type: 'text',
                                required: true,
                                value: '',
                                pattern:''
                            },
                            cst: {
                                label: 'CST',
                                type: 'text',
                                required: false,
                                value: '',
                                pattern:''
                            }
                        }
                    },
                    {
                        label: 'Pickup Address',
                        completed:false,
                        formItems: {
                            address: {
                                label: 'Address',
                                type: 'textarea',
                                required: true,
                                value: '',
                            },
                            pincode: {
                                label: 'Pincode',
                                type: 'text',
                                required: true,
                                value: '',
                                pattern: formValidation.pinCodeValidation,
                                error:formValidation.pinErrorMessage
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
                                required: true,
                                value: '',
                            },
                            city: {
                                label: 'City',
                                type: 'text',
                                required: true,
                                value: '',
                            }
                        }
                    },
                    {
                        label: 'Bank Account Details',
                        completed:false,
                        formItems: {
                            account_holders_name: {
                                label: "Account Holders Name",
                                type: 'text',
                                required: false,
                                value: ''
                            },
                            account_number: {
                                label: "Account Number",
                                type: 'text',
                                required: false,
                                value: ''
                            },
                            bank_name: {
                                label: "Bank Name",
                                type: 'text',
                                required: false,
                                value: ''
                            },
                            branch: {
                                label: "Bank Branch",
                                type: 'text',
                                required: false,
                                value: ''
                            },
                            branch_pincode: {
                                label: "branch pincode",
                                type: 'text',
                                required: false,
                                value: ''
                            },
                            ifsc: {
                                label: "IFSC",
                                type: 'text',
                                required: false,
                                value: '',
                                pattern: formValidation.ifscValidation,
                                error:formValidation.ifscErrorMessage
                            },
                            branch_city: {
                                label: "Branch City",
                                type: 'text',
                                required: false,
                                value: ''
                            }
                        }
                    }
                ]
            };

            factory.getSellerSignupFormItems = function() {
                return angular.copy(factory.sellerSignup);
            };

            return factory;
        }
    ]);
})();
