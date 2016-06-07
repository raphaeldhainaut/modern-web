/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/GridController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================= */

/* ==========================================================================
    GridDirective
    ========================================================================== */
    export class GridDirective extends BaseDirective {
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || '/lib/modernWeb/templates/Grid/Grid.html';
        };

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new GridDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}