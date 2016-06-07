/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/ProgressBarController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    ProgressBarDirective
    ========================================================================== */
    export class ProgressBarDirective extends BaseDirective {
        public require: any = '^mwProgress';
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || '/lib/modernWeb/templates/ProgressBar/ProgressBar.html';
        };

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new ProgressBarDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}