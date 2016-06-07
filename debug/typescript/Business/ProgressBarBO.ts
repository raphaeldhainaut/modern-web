/// <reference path="Base/BaseBO.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IProgressBar {
        SetPercentage: () => void;
    }
    
/* ==========================================================================
    ProgressBarBO
    ========================================================================== */
    export class ProgressBarBO extends BaseBO implements IProgressBar {
        private model: IProgressBarBusinessModel;

        public constructor(model: IProgressBarModel) {
            super(model);
            this.model = <ModernWeb.IProgressBarBusinessModel>model;
            this.SetPercentage();
        }

        public SetPercentage(): void {
            var ratio: number = 100 / (this.model.max - this.model.min);
            var percentage: number = Math.round((this.model.value - this.model.min) * ratio);

            if (percentage < 0) {
                this.model.percentage = 0;
            }
            else if (percentage > 100) {
                this.model.percentage = 100;
            }
            else {
                this.model.percentage = percentage;
            }
        }
    }
}