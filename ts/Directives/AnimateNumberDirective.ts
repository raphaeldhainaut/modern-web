/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/AnimateNumberController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */

/* ==========================================================================
    AnimateNumberDirective
    ========================================================================== */
    export class AnimateNumberDirective extends BaseDirective {
        public transclude: boolean = false;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || '/lib/modernWeb/templates/Animate/Number.html';
        };

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new AnimateNumberDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}