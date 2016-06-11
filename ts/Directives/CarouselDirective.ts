/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/CarouselController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================= */

/* ==========================================================================
    CarouselDirective
    ========================================================================== */
    export class CarouselDirective extends BaseDirective {
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || TEMPLATES_PATH + 'Carousel/Carousel.html';
        };
        public controller: string = "CarouselController";
        public controllerAs: string = "CarouselCtrl";
                
        public constructor() {
            super();
        }
        
        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new CarouselDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}