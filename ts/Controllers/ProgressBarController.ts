/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/ProgressBarBO.ts" />

module ModernWeb.Controllers {
    'use strict';

/*  DefaultConfig
    ========================================================================== */
    const progressBarConfig: ModernWeb.IProgressBarModel = <ModernWeb.IProgressBarModel>{
        min: 0,
        max: 100,
        value: 0
    };
    
/*  ==========================================================================
    Interface
    ========================================================================== */
    export interface IProgressBarController {
        SetPercentage: () => void;
    }
    
/*  ==========================================================================
    ProgressBarController
    ========================================================================== */
    export class ProgressBarController extends BaseController implements IProgressBarController {
        protected scope: IProgressBarScope;
        private progressBarBO: ModernWeb.Business.ProgressBarBO;

        static $inject = ['$scope'];

        public constructor($scope: IProgressBarScope) {
            super($scope);
            this.SetDefaultValue();
            this.progressBarBO = new ModernWeb.Business.ProgressBarBO(this.scope);
            this.SetWatches();
        }

        private SetDefaultValue(): void {
            if (!angular.isDefined(this.scope.min)) {
                this.scope.min = progressBarConfig.min;
            }
            if (!angular.isDefined(this.scope.max)) {
                this.scope.max = progressBarConfig.max;
            }
            if (!angular.isDefined(this.scope.value)) {
                this.scope.value = progressBarConfig.value;
                var ratio: number = 100 / (this.scope.max - this.scope.min);
                var percentage: number = Math.round((this.scope.value - this.scope.min) * ratio);
                this.scope.percentage = percentage;
            }
        }

        private SetWatches(): void {
            this.scope.$watch(() => this.scope.value, (newValue, oldValue) => {
                this.progressBarBO.SetPercentage();
            });
            this.scope.$watch(() => this.scope.min, (newValue, oldValue) => {
                this.progressBarBO.SetPercentage();
            });
            this.scope.$watch(() => this.scope.max, (newValue, oldValue) => {
                this.progressBarBO.SetPercentage();
            });
        }

        public SetPercentage(): void {
            this.progressBarBO.SetPercentage();
        }
    }
}