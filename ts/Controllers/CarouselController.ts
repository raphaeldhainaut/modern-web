/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/CarouselBO.ts" />

module ModernWeb.Controllers {
    'use strict';
    
/*  Default config
    ========================================================================== */
    const carouselConfig: ModernWeb.ICarouselModel = <ModernWeb.ICarouselModel> {
        delay: 4500,
        playType: ModernWeb.PlayType.Automatic,
        playDirection: ModernWeb.PlayDirection.Ascending,
        isAnimated: true,
        isReverseAnimated: true
    };

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface ICarouselController {
        AddSlide: (slide: ISlideScope) => void;
        RemoveSlide: (slide: ISlideScope) => void;
        Play: () => void;
        Pause: () => void;
        Stop: () => void;
        Prev: () => void;
        Next: () => void;
        Select: (index: number) => void;
        IsSlideActive: (index: number) => boolean;
        IsPending: boolean;
        IsPaused: boolean;
        HasProgressBar: boolean;
        HasNavigation: boolean;
    }

/* ==========================================================================
    CarouselController
    ========================================================================== */
    export class CarouselController extends BaseController implements ICarouselController {
        protected scope: ICarouselScope;
        private carouselBO: ModernWeb.Business.CarouselBO;
        private progressBarBO: ModernWeb.Business.ProgressBarAnimatedBO;
        private hasAnimationHandlerAttached: boolean;
        
        static $inject = ['$scope', '$element', '$timeout'];

        public constructor($scope: ICarouselScope, $element: JQuery, $timeout: ng.ITimeoutService) {
            super($scope);
            
            this.progressBarBO = new ModernWeb.Business.ProgressBarAnimatedBO(<IProgressBarAnimatedBusinessModel>this.scope);
            this.carouselBO = new ModernWeb.Business.CarouselBO(this.scope, this.progressBarBO);
            this.SetDefaultValue();
            this.SetWatches($element, $timeout);
        }

        private SetDefaultValue(): void {
            if (!angular.isDefined(this.scope.delay)) {
                this.scope.delay = carouselConfig.delay;
            }

            if (!angular.isDefined(this.scope.playType)) {
                this.scope.playType = carouselConfig.playType;
            }

            if (!angular.isDefined(this.scope.playDirection)) {
                this.scope.playDirection = carouselConfig.playDirection;
            }

            if (!angular.isDefined(this.scope.isAnimated)) {
                this.scope.isAnimated = carouselConfig.isAnimated;
            }

            if (!angular.isDefined(this.scope.isReverseAnimated)) {
                this.scope.isReverseAnimated = carouselConfig.isReverseAnimated;
            }
        }

        private SetWatches(element: JQuery, timeoutService: ng.ITimeoutService): void {
            // Watch IsAnimated
            this.scope.$watch(() => this.scope.isAnimated, (newValue, oldValue) => {
                this.AttachAnimationHandler(element);
            });

            // Watch Delay (timer)
            this.scope.$watch(() => this.scope.delay, (newValue, oldValue) => {
                this.carouselBO.SetTimerManager(timeoutService);
            });

            // Watch PlayType
            this.scope.$watch(() => this.scope.playType, (newValue, oldValue) => {
                if (newValue == PlayType.Manual) {
                    this.Stop();
                }
                else if (newValue == PlayType.Automatic) {
                    // Start the carousel
                    this.Play();
                }
            });
        }

        private AttachAnimationHandler(element: JQuery): void {
            if (this.scope.isAnimated && !this.hasAnimationHandlerAttached) {
                this.hasAnimationHandlerAttached = true;
                
                // Add listener on the animation end
                element.on("animationend", (event) => {
                    this.carouselBO.HandleNgAnimationEnd(event);
                });
                element.on("webkitAnimationEnd", (event) => {
                    this.carouselBO.HandleNgAnimationEnd(event);
                });
                element.on("MSAnimationEnd", (event) => {
                    this.carouselBO.HandleNgAnimationEnd(event);
                });
            }
        }
        
        public AddSlide(slide: ISlideScope): void {
            this.carouselBO.AddSlide(slide);
        }

        public RemoveSlide(slide: ISlideScope): void {
            this.carouselBO.RemoveSlide(slide);
        }

        public IsSlideActive(index: number): boolean {
            return this.carouselBO.IsActive(index);
        }
        
        public Play(): void {
            this.carouselBO.Play();
        }

        public Pause(): void {
            this.carouselBO.Pause();
        }

        public Stop(): void {
            this.carouselBO.Stop();
        }

        public Next(): void {
            this.carouselBO.GoToNext(PlayType.Manual);
        }

        public Prev(): void {
            this.carouselBO.GoToPrev(PlayType.Manual);
        }

        public Select(index: number): void {
            this.carouselBO.GoToElementAt(index, PlayType.Manual);
        }

        public get IsPending(): boolean { return this.carouselBO.IsPending; }
        public get IsPaused(): boolean { return this.carouselBO.IsPaused; }
        public get HasProgressBar(): boolean { return this.carouselBO.IsAutomatic; }
        public get HasNavigation(): boolean { return this.carouselBO.IsSlidable; }
    }
}