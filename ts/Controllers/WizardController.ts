/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/WizardBO.ts" />

module ModernWeb.Controllers {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IWizardController {
        AddStep: (step: IStepScope) => void;
        RemoveStep: (step: IStepScope) => void;
        Next: () => void;
        Previous: () => void;
        Select: (index: number) => void;
        Finish: (event: Event) => void;
        Cancel: () => void;
    }

/* ==========================================================================
    WizardController
    ========================================================================== */
    export class WizardController extends BaseController implements IWizardController {
        protected scope: IWizardScope;
        private wizardBO: ModernWeb.Business.WizardBO;

        static $inject = ['$scope'];

        public constructor($scope: IWizardScope) {
            super($scope);
            this.wizardBO = new ModernWeb.Business.WizardBO(this.scope);
        }

        public AddStep(step: IStepScope): void {
            this.wizardBO.AddStep(step);
        }

        public RemoveStep(scope: IStepScope): void {
            this.wizardBO.RemoveStep(scope.step);
        }

        public Next(): void {
            this.wizardBO.GoToNext();
        }

        public Previous(): void {
            this.wizardBO.GoToPrevious();
        }

        public Select(id: number): void {
            this.wizardBO.GoToId(id);
        }

        public Finish(event: Event): void {
            this.wizardBO.Finish(event);
        }

        public Cancel(): void {
            this.wizardBO.Cancel();
        }
    }
}