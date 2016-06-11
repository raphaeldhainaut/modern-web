/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/ProgressController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    ProgressDirective
    ========================================================================== */
    export class ProgressDirective extends BaseDirective {
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || '/lib/modernWeb/templates/ProgressBar/Progress.html';
        };
        public controller: string = "ProgressController";
        public controllerAs: string = "ProgressCtrl";

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new ProgressDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}