(function(){
    'use strict';
    sellerapp.factory('FormValidationService',
        function(){
        var factory={};
        factory.formValidation=function(){
            // var reg1=new RegExp(^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$);
            // var reg2=new RegExp(^.+@.+\..+$);
            // function escapeRegExp(str) {
            //     return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            // }
            var validations={mobileNumValidation:(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/).toString().split('/').join(''),
                                emailValidation : (/^.+@.+\..+$/).toString().split('/').join(''),
                                mobileErrorMessage:'Enter a valid mobile number',
                                emailErrorMessage:'Enter a valid email address'};
            
            return validations;
        };
        return factory;
    });
})();
