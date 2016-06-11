/// <reference path="Base/BaseBO.ts" />
/// <reference path="TimerBO.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface ICarousel {
        AddSlide(slide): void;
        RemoveSlide(slide): void;
        Play(): void;
        Pause(): void;
        Stop(): void;
        GoToNext(trigerredType: PlayType): void;
        GoToPrev(trigerredType: PlayType): void;
        GoToElementAt(index: number, trigerredType: PlayType): void;
        IsActive(index: number): boolean;
    }

/* ==========================================================================
    CarouselBO
    ========================================================================== */
    export class CarouselBO extends BaseBO implements ICarousel {
        private model: ModernWeb.ICarouselBusinessModel;
        private timerManager: TimerBO;
        private timerModel: ModernWeb.ITimerModel;
        private progressBarManager: ModernWeb.Business.ProgressBarAnimatedBO;
        public static counter: number = 0;

        public get IsAutomatic(): boolean { return this.model.playType == PlayType.Automatic; }
        public get IsAnimating(): boolean { return this.model.isAnimating; }
        public get IsPending(): boolean { return this.model.isPending; }
        public get IsPaused(): boolean { return this.model.playState == PlayState.Pause; }
        public get IsSlidable(): boolean { return this.model.slides.length >= 1; }
                
        public constructor(model: ModernWeb.ICarouselModel, progressBarManager: ModernWeb.Business.ProgressBarAnimatedBO) {
            super(model);
            this.model = <ModernWeb.ICarouselBusinessModel>model;
            this.model.slides = new Array<ModernWeb.ISlideBusinessModel>();
            this.model.currentIndex = 0;
            this.model.nextIndex = 0;
            this.model.currentPlayType = this.model.playType;
            this.model.playState = PlayState.Stop;
            this.model.isAnimating = false;
            this.model.isReverseAnimating = false;
            this.model.isPending = true;
            this.model.isTransitionFinished = false;

            // Initialize
            this.progressBarManager = progressBarManager;
        }
        
        private IncrementIndex(index: number): number {
            return (index + 1) % this.model.slides.length;
        }

        private DecrementIndex(index: number): number {
            return ((index - 1) >= 0) ? index - 1 : this.model.slides.length - 1;
        }

        private IsCurrent(index: number): boolean {
            return this.model.currentIndex === index;
        }

        private IsNext(index: number): boolean {
            return this.model.nextIndex === index;
        }

        public IsActive(index: number): boolean {
            return this.IsCurrent(index);
        }

        private IsShowed(index: number): boolean {
            return (this.IsActive(index) || (this.model.isAnimating && this.IsNext(index)));
        }

        private IsIn(index: number): boolean {
            return (this.model.isAnimating && this.IsNext(index));
        }

        private IsOut(index: number): boolean {
            return (this.model.isAnimating && this.IsCurrent(index));
        }

        private GoTo(index: number, trigerredType: PlayType): void {
            // Break
            // if index is lower than 0
            // if index is greater than number of slides
            // if an animation is running 
            // if the next slide is the same than previously
            if (index < 0 ||
                index > this.model.slides.length ||
                this.model.isAnimating ||
                this.model.nextIndex == index) {
                return;
            }
            
            this.model.currentPlayType = trigerredType;
            // Set the mode to manual if previous/next/goTo is trigerred
            if (this.model.currentPlayType == PlayType.Manual) {
                this.Stop();
            }

            this.StartTransition(index);

            // Handle transition manually 
            // WARNING: the transition is handled automatically via handleAnimationEnd
            if (!this.model.isAnimated) {
                this.HandleTransition();
            }
        }

        private SetReverseAnimating(): void {
            if (!this.model.isReverseAnimated) {
                return;
            }

            var currentIsFirst: boolean = this.model.currentIndex == 0;
            var currentIsLast: boolean = this.model.currentIndex == this.model.slides.length - 1;
            var nextIsFirst: boolean = this.model.nextIndex == 0;
            var nextIsLast: boolean = this.model.nextIndex == this.model.slides.length - 1;
            
            if ((this.model.nextIndex > this.model.currentIndex && !(currentIsFirst && nextIsLast)) || // Prev special case => first to last
                (currentIsLast && nextIsFirst)) { // Next special case => last to first
                this.model.isReverseAnimating = false;
            }
            else {
                this.model.isReverseAnimating = true;
            }
        }

        private StartTimer(): void {
            // Break
            // if the mode is not automatic
            // if the current state is not play
            // if is not pending state
            if (this.model.playType != PlayType.Automatic ||
                this.model.playState != PlayState.Play ||
                !this.model.isPending) {
                return;
            }
            
            this.timerManager.Start();
            this.progressBarManager.Play();
        }

        private StartTransition(index: number): void {
            // Clear timer
            this.timerManager.Clear();
            this.progressBarManager.Stop();
                        
            // Set state
            this.model.isAnimating = true;
            this.model.isPending = false;
            this.model.isTransitionFinished = false;
            
            // Update next index
            this.model.nextIndex = index;
            // Update direction
            this.SetReverseAnimating();
            // Update slides states
            this.UpdateSlides();
        }

        private UpdateSlides(): void {
            for (var i: number = 0, count: number = this.model.slides.length; i < count; i++) {
                var slide = this.model.slides[i];

                // update active state
                slide.isActive = this.IsActive(i);
                // update showed state
                slide.isShowed = this.IsShowed(i);
                // update in state
                slide.isIn = this.IsIn(i);
                // update out state
                slide.isOut = this.IsOut(i);
            }
        }

        private HandleTransition(): void {
            // Prevent to start parallele transition 
            if (!this.model.isTransitionFinished) {
                this.model.isTransitionFinished = true;
                // Finish the transition
                this.FinishTransition();
            }
        }

        private FinishTransition() {
            // Set state 
            this.model.isAnimating = false;
            this.model.isPending = true;
            // Update current index
            this.model.currentIndex = this.model.nextIndex;
            // Update slides
            this.UpdateSlides();
            // Restart timer
            this.StartTimer();
        }

        public SetTimerManager(timeoutService: ng.ITimeoutService): void {
            if (typeof this.timerManager == "undefined") {
                if (this.model.delay > 0) {
                    this.timerModel = <ModernWeb.ITimerModel>{
                        delay: this.model.delay
                    };
                    this.timerManager = new TimerBO(this.timerModel, timeoutService, () => this.GoToNext(PlayType.Automatic));
                }
            }
            else {
                this.timerManager.Model.delay = this.model.delay;
                this.timerManager.Clear();
                this.progressBarManager.Stop();
                this.StartTimer();
            }
        }

        public HandleNgAnimationEnd(event: JQueryEventObject): void {
            this.scope.$apply(() => {
                this.HandleAnimationEnd(event);
            });
        }

        public HandleAnimationEnd(event: JQueryEventObject): void {
            var target: Element = event.target || event.srcElement;

            // WARNING Handle only animation event on slide element
            if (!target.hasAttribute("slide")) {
                return;
            }

            event.stopPropagation();
            this.HandleTransition();
        }

        public AddSlide(slide: ModernWeb.ISlideScope): void {
            this.model.slides.push(<ModernWeb.ISlideBusinessModel>{
                id: CarouselBO.counter++,
                isActive: false,
                isShowed: false,
                isIn: false,
                isOut: false,
                carousel: this.model
            });
            
            if (this.model.slides.length === 1 || (angular.isDefined(slide.isActive) && slide.isActive)) {
                var indexLastSlide: number = this.model.slides.length - 1;
                this.model.slides[indexLastSlide].isActive = true;
                this.model.slides[indexLastSlide].isShowed = true;
            }
        }

        public RemoveSlide(slide: ModernWeb.ISlideScope): void {
            for (var i: number = 0, count: number = this.model.slides.length; i < count; i++) {
                var item = this.model.slides[i];

                if (item.id === slide.id) {
                    this.model.slides.splice(i, 1);
                    return;
                }
            }
        }

        public Play(): void {
            if (!this.IsSlidable ||
                this.model.delay <= 0 ||
                this.model.playType != PlayType.Automatic ||
                this.model.playState == PlayState.Play) {
                return;
            }

            this.model.playState = PlayState.Play;
            this.model.currentPlayType = PlayType.Automatic;

            if (!this.model.isAnimating) {
                this.model.isPending = true;
                this.StartTimer();
            }
        }

        public Pause(): void {
            this.model.playState = PlayState.Pause;
            this.timerManager.Pause();
            this.progressBarManager.Pause();
        }
        
        public Stop(): void {
            this.model.playState = PlayState.Stop;
            this.timerManager.Clear();
            this.progressBarManager.Stop();

            // Reset
            if (this.IsAnimating) {
                // Reset index if an animation is running
                this.model.nextIndex = this.model.currentIndex;
            }

            this.model.isAnimating = false;
            this.model.isPending = false;
            this.model.isTransitionFinished = false;
            this.UpdateSlides();
        }

        public GoToNext(trigerredType: PlayType): void {
            var nextIndex: number = (this.model.playDirection == PlayDirection.Descending) ? this.DecrementIndex(this.model.currentIndex) : this.IncrementIndex(this.model.currentIndex);
            this.GoTo(nextIndex, trigerredType);
        }

        public GoToPrev(trigerredType: PlayType): void {
            var nextIndex: number = (this.model.playDirection == PlayDirection.Descending) ? this.IncrementIndex(this.model.currentIndex) : this.DecrementIndex(this.model.currentIndex);
            this.GoTo(nextIndex, trigerredType);
        }

        public GoToElementAt(index: number, trigerredType: PlayType): void {
            this.GoTo(index, trigerredType);
        }
    }
}