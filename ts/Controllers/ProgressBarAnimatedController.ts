/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/ProgressBarAnimatedBO.ts" />

module ModernWeb.Controllers {
    'use strict';

/*  Default config
    ========================================================================== */
    const progressCssConfig: ModernWeb.IProgressBarAnimatedModel = <ModernWeb.IProgressBarAnimatedModel>{
        delay: 3500
    };

/*  ==========================================================================
    Interface
    ========================================================================== */
    export interface IProgressBarAnimatedController {
        Play: () => void;
        Pause: () => void;
        Stop: () => void;
    }

/*  ==========================================================================
    ProgressBarAnimatedController
    ========================================================================== */
    export class ProgressBarAnimatedController extends BaseController implements IProgressBarAnimatedController {
        protected scope: IProgressBarAnimatedScope;
        private progressBO: ModernWeb.Business.ProgressBarAnimatedBO;

        static $inject = ['$scope'];

        public constructor($scope: IProgressBarAnimatedScope) {
            super($scope);
            this.SetDefaultValue();
            this.progressBO = new ModernWeb.Business.ProgressBarAnimatedBO(this.scope);
        }

        private SetDefaultValue(): void {
            if (!angular.isDefined(this.scope.delay)) {
                this.scope.delay = progressCssConfig.delay;
            }
        }
        
        public Play(): void {
            this.progressBO.Play();
        }

        public Pause(): void {
            this.progressBO.Pause();
        }

        public Stop(): void {
            this.progressBO.Stop();
        }
    }
}