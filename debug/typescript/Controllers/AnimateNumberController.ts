/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/AnimateNumberBO.ts" />

module ModernWeb.Controllers {
    'use strict';

/*  DefaultConfig
    ========================================================================== */
    const animateNumberConfig: ModernWeb.IAnimateNumberModel = <ModernWeb.IAnimateNumberModel> {
        delay: 2500,
        number: 100
    };

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IAnimateNumberController {
        Animate: () => void,
        Reset: () => void
    }
   

/* ==========================================================================
    AnimateNumberController
    ========================================================================== */
    export class AnimateNumberController extends BaseController implements IAnimateNumberController {
        protected scope: IAnimateNumberScope;
        private windowService: ng.IWindowService;
        private animateNumberBO: ModernWeb.Business.AnimateNumberBO;

        static $inject = ['$scope', '$window', '$interval'];

        public constructor($scope: IAnimateNumberScope, $window: ng.IWindowService, $interval: ng.IIntervalService) {
            super($scope);
            this.windowService = $window;
            this.animateNumberBO = new ModernWeb.Business.AnimateNumberBO($scope, $interval);
            this.SetDefaultValue();
        }
        
        private SetDefaultValue(): void {
            if (!angular.isDefined(this.scope.delay)) {
                this.scope.delay = animateNumberConfig.delay;
            }

            if (!angular.isDefined(this.scope.number)) {
                this.scope.number = animateNumberConfig.number;
            }
        }
        
        public AttachEventOnWindowScroll(element: JQuery) {
            var isAnimationPlayed: boolean = false;

            this.windowService.addEventListener("scroll", (event: UIEvent) => {
                var scrollHeightWindow = jQuery(window).scrollTop();
                var heightWindow = jQuery(window).height();
                var offsetNumbers = jQuery(element).offset().top;
                var heightNumbers = jQuery(element).outerHeight();
        
                // Trigger animation
                if (!isAnimationPlayed &&
                    scrollHeightWindow >= (offsetNumbers - heightWindow + heightNumbers) &&
                    scrollHeightWindow <= offsetNumbers) {
                    this.animateNumberBO.Animate();
                    isAnimationPlayed = true;
                }

                // Reset animation
                if (isAnimationPlayed &&
                    scrollHeightWindow > (offsetNumbers + heightNumbers)) {
                    this.animateNumberBO.Reset();
                    isAnimationPlayed = false;
                }
            });
        }
    
        public Animate(): void {
            this.animateNumberBO.Animate();
        }

        public Reset(): void {
            this.animateNumberBO.Reset();
        }
    }
}