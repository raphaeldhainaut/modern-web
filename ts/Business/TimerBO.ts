/// <reference path="Base/BaseBO.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    TimerBO
    ========================================================================== */
    export class TimerBO extends BaseBO {
        private model: ModernWeb.ITimerBusinessModel;
        private callback: () => void;
        private timeoutService: ng.ITimeoutService;
        private timeoutHandler: ng.IPromise<void>;

        public get Model(): ModernWeb.ITimerModel { return <ModernWeb.ITimerModel>this.model; }

        public constructor(model: ModernWeb.ITimerModel, timeoutService: ng.ITimeoutService, callback: () => void) {
            super(model);
            this.model = <ModernWeb.ITimerBusinessModel>model;
            this.model.isRunning = false;
            this.model.timeLeft = this.model.delay;
            this.timeoutService = timeoutService;
            this.callback = callback;
        }

        private ClearTimer(): void {
            if (this.timeoutHandler == null) {
                return;
            }
            
            var success: boolean = this.timeoutService.cancel(this.timeoutHandler);
            if (success) {
                this.timeoutHandler = null;
            }
        }

        public Start(): void {
            if (this.model.delay <= 0) {
                return;
            }

            //Prevent to have collateral timeout
            this.ClearTimer();
            this.model.isRunning = true;
            this.model.startDate = new Date();
            this.timeoutHandler = this.timeoutService(() => {
                this.callback();
                this.ResetTimeLeft();
            }, this.model.timeLeft);
        }

        public Pause(): void {
            if (!this.model.isRunning) {
                return;
            }

            this.model.isRunning = false;
            var timeLeft = this.model.timeLeft - this.TimeElapsed;
            this.model.timeLeft = (timeLeft < 0) ? 0 : timeLeft;
            this.ClearTimer();
        }

        public Clear(): void {
            this.model.isRunning = false;
            this.ResetTimeLeft();
            this.ClearTimer();
        }

        public ResetTimeLeft(): void {
            this.model.timeLeft = this.model.delay;
        }

        private get TimeElapsed(): number {
            return new Date().getTime() - this.model.startDate.getTime();
        }
    }
}