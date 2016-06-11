/// <reference path="Base/BaseBO.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IWizard {
        AddStep: (step: IStepModel) => void;
        RemoveStep: (step: IStepBusinessModel) => void;
        GoToNext(): void;
        GoToPrevious(): void;
        GoTo(index: number): void;
        Finish(event: Event): void;
        Cancel(): void;
    }

/* ==========================================================================
    WizardBO
    ========================================================================== */
    export class WizardBO extends BaseBO implements IWizard {
        private model: ModernWeb.IWizardBusinessModel;
        public static counter: number = 0;

        public constructor(model: ModernWeb.IWizardModel) {
            super(model);
            this.model = <ModernWeb.IWizardBusinessModel>model;
            this.model.steps = new Array<ModernWeb.IStepBusinessModel>();
            this.model.currentIndex = 0;
        }

        private UpdateSteps(): void {
            for (var i: number = 0, count: number = this.model.steps.length; i < count; i++) {
                var step = this.model.steps[i];

                // Update active state
                step.isActive = this.IsActive(i);
            }
        }

        private IsActive(index: number): boolean {
            return index == this.model.currentIndex;
        }

        private IncrementIndex(index: number): number {
            return ((index + 1) <= this.model.steps.length) ? index + 1 : index;
        }

        private DecrementIndex(index: number): number {
            return ((index - 1) >= 0) ? index - 1 : 0;
        }

        private AreIntermediateStepsValid(startIndex: number, endIndex: number): boolean {
            for (var i: number = startIndex; i < endIndex; i++) {
                if (!this.model.steps[i].Valid()) {
                    return false;
                }
            }

            return true;
        }

        private RetrieveStepIndex(id: number): number {
            for (var i: number = 0, count: number = this.model.steps.length; i < count; i++) {
                var step = this.model.steps[i];

                if (step.id === id) {
                    return i;
                }
            }
            
            return null;
        }

        public AddStep(step: ModernWeb.IStepModel): void {
            this.model.steps.push(<ModernWeb.IStepBusinessModel>{
                id: WizardBO.counter++,
                Valid: step.Valid,
                Validate: step.Validate,
                isActive: false,
                isSubmitted: false,
                hasPreviousControl: false,
                hasNextControl: false,
                hasFinishControl: false
            });

            if (this.model.steps.length === 1) {
                this.model.steps[0].isActive = true;
            }
            
            // Set Controls (previous, next, finish) for each step
            for (var i: number = 0, count: number = this.model.steps.length; i < count; i++) {
                var item = this.model.steps[i];
                item.hasNextControl = false;
                item.hasPreviousControl = false;
                item.hasFinishControl = false;

                if (i < (count - 1)) {
                    item.hasNextControl = true;
                }
                if (i > 0) {
                    item.hasPreviousControl = true;
                }
                if (i === (count - 1)) {
                    item.hasFinishControl = true;
                }
            }
        }

        public RemoveStep(step: ModernWeb.IStepBusinessModel): void {
            for (var i: number = 0, count: number = this.model.steps.length; i < count; i++) {
                var item = this.model.steps[i];

                if (item.id === step.id) {
                    this.model.steps.splice(i, 1);
                    return;
                }
            }
        }

        private TriggerIntermediateStepsValidation(startIndex: number, endIndex: number): void {
            for (var i: number = startIndex; i < endIndex; i++) {
                var item = this.model.steps[i];
                // Update submit state
                item.isSubmitted = true;
                // Trigger Validate function
                item.Validate();
            }
        }

        public GoTo(index: number): void {
            this.TriggerIntermediateStepsValidation(this.model.currentIndex, index);

            if (index == this.model.currentIndex ||
                (index > this.model.currentIndex && !this.AreIntermediateStepsValid(this.model.currentIndex, index))) {
                return;
            }

            if (index >= 0 && index <= this.model.steps.length - 1) {
                this.model.currentIndex = index;
                this.UpdateSteps();
            }
        }
        public GoToNext(): void {
            this.GoTo(this.IncrementIndex(this.model.currentIndex));
        }

        public GoToPrevious(): void {
            this.GoTo(this.DecrementIndex(this.model.currentIndex));
        }
        
        public GoToId(id: number): void {
            this.GoTo(this.RetrieveStepIndex(id));
        }

        public Finish($event: Event): void {
            this.TriggerIntermediateStepsValidation(0, this.model.steps.length);

            if (!this.AreIntermediateStepsValid(0, this.model.steps.length)) {
                event.preventDefault();
                return;
            }

            this.model.currentIndex = 0;
        }

        public Cancel(): void {
            this.model.currentIndex = 0;
        }
    }
}