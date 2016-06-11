/// <reference path="Base/BaseDirective.ts" />

module ModernWeb.Directives {
    'use strict';
    
/* ==========================================================================
    StepDirective
    ========================================================================== */
    export class StepDirective extends BaseDirective {
        public require: any = '^mwWizard';
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || TEMPLATES_PATH + 'Wizard/Step.html';
        };
        public scope: any = {
            step: "=",
            Valid: "&valid",
            Validate: "&validate"
        };
        public link: ng.IDirectiveLinkFn = (scope: ModernWeb.IStepScope, element: JQuery, attributs: ng.IAttributes, wizardCtrl: ModernWeb.Controllers.WizardController) => {          
            // Default Value
            if (!angular.isDefined(scope.Valid)) {
                scope.Valid = () => {
                    return true;
                }
            }

            if (!angular.isDefined(scope.Validate)) {
                scope.Validate = () => {
                    return;
                }
            }

            // Step methods
            scope.Next = () => {
                wizardCtrl.Next();
            };

            scope.Previous = () => {
                wizardCtrl.Previous();
            };

            scope.Select = () => {
                wizardCtrl.Select(scope.step.id)
            };

            scope.Finish = (event: Event) => {
                wizardCtrl.Finish(event);
            };

            // Destroy
            scope.$on('$destroy', function () {
                wizardCtrl.RemoveStep(scope);
            });

            // Add step in Wizard
            wizardCtrl.AddStep(scope);
        };

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new StepDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}