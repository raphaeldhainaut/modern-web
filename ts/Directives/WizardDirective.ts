/// <reference path="Base/BaseDirective.ts" />
///// <reference path="../Controllers/WizardController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================= */

/* ==========================================================================
    WizardDirective
    ========================================================================== */
    export class WizardDirective extends BaseDirective {
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || TEMPLATES_PATH + 'Wizard/Wizard.html';
        };
        public controller: string = "WizardController";
        public controllerAs: string = "WizardCtrl";
        public link: ng.IDirectiveLinkFn = (scope: IWizardScope, element: JQuery, attributs: ng.IAttributes) => {
        }

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new WizardDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}