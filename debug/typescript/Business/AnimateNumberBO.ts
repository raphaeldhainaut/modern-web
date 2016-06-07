/// <reference path="Base/BaseBO.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IAnimateNumber {
        Animate: () => void;
        Reset: () => void;
    }
    
/* ==========================================================================
    AnimateNumberBO
    ========================================================================== */
    export class AnimateNumberBO extends BaseBO implements IAnimateNumber {
        private model: IAnimateNumberBusinessModel;
        private intervalService: ng.IIntervalService;

        public constructor(model: IAnimateNumberModel, intervalService: ng.IIntervalService) {
            super(model);
            this.intervalService = intervalService;
            this.model = <ModernWeb.IAnimateNumberBusinessModel>model;
            this.model.numberAnimated = 0;
        }
        
        public Animate(): void {
            this.Reset();
            var intervalTime: number = (this.model.number > 0) ? this.model.delay / this.model.number : 0;

            var handler: ng.IPromise<void> = this.intervalService(() => {
                this.model.numberAnimated++;

                if (this.model.numberAnimated >= this.model.number) {
                    this.intervalService.cancel(handler);
                }
            }, intervalTime);
        }

        public Reset(): void {
            this.model.numberAnimated = 0;
        }
    }
}