/// <reference path="Base/BaseDirective.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================= */

/* ==========================================================================
    SlideDirective
    ========================================================================== */
    export class SlideDirective extends BaseDirective {
        public require: any = '^mwCarousel';
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || TEMPLATES_PATH + 'Carousel/Slide.html';
        };
        public scope: any = {
            slide: "="
        };
        public link: ng.IDirectiveLinkFn = (scope: ModernWeb.ISlideScope, element: JQuery, attributs: ng.IAttributes, carouselCtrl: ModernWeb.Controllers.CarouselController) => {
            carouselCtrl.AddSlide(scope);

            scope.$on('$destroy', function () {
                carouselCtrl.RemoveSlide(scope);
            });
        };
        
        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new SlideDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}