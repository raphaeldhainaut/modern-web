/// <reference path="../../ModernWeb.ts" />

module ModernWeb.Controllers {
    'use strict';

/* ==========================================================================
   BaseController
   ========================================================================== */
    export class BaseController {
        protected scope: ng.IScope;
        static SERVER_ERRORS: string = "errorsServer";
        
        public constructor($scope: ng.IScope) {
            this.scope = $scope;
        }

        protected HandleServerErrorsResponse(dataResponse: any, form: ng.IFormController) {
            if (dataResponse.status == 1) { // Error
                if (typeof dataResponse.errors == "undefined") {
                    return;
                }

                for (var i: number = 0; i < dataResponse.errors.length; i++) {
                    var dataResponseErrors: Utilities.IKeyValuePair<string, String[]> = dataResponse.errors[i];
                    var fieldName = dataResponseErrors.Key;
                    var errors = dataResponseErrors.Value;
                    var errorsMessage = [];

                    for (var j: number = 0; j < errors.length; j++) {
                        errorsMessage.push(errors[j]);
                    }

                    if (typeof form[fieldName] == "undefined") {
                        form[fieldName] = new Object();
                    }

                    form[fieldName].valid = false;
                    form[fieldName].invalid = !form[fieldName].valid;
                    form[fieldName][BaseController.SERVER_ERRORS] = errorsMessage;
                }

                form[BaseController.SERVER_ERRORS] = dataResponse.errors;
            }
        }
    }
}