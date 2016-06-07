/// <reference path="Base/BaseBO.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IProgressBarAnimated {
        Play(): void;
        Pause(): void;
        Stop(): void;
    }
    
/* ==========================================================================
    ProgressBarAnimatedBO
    ========================================================================== */
    export class ProgressBarAnimatedBO extends BaseBO implements IProgressBarAnimated {
        private model: IProgressBarAnimatedBusinessModel;

        public constructor(model: IProgressBarAnimatedBusinessModel) {
            super(model);
            this.model = model;
            this.model.isRunning = false;
            this.model.isPaused = false;
        }

        public Play(): void {
            this.model.isRunning = true;
            this.model.isPaused = false;
        }

        public Pause(): void {
            this.model.isPaused = true;
        }

        public Stop(): void {
            this.model.isRunning = false;
            this.model.isPaused = false;
        }
    }
}