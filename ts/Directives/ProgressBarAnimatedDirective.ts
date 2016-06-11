/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/ProgressBarAnimatedController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    ProgressBarAnimatedDirective
    ========================================================================== */
    export class ProgressBarAnimatedDirective extends BaseDirective {
        public require: any = '^mwProgress';
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || '/lib/modernWeb/templates/ProgressBar/ProgressBarAnimated.html';
        };
        public scope: boolean = false;

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new ProgressBarAnimatedDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}