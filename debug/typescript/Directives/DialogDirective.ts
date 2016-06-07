/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/DialogController.ts" />

module ModernWeb.Directives {
    'use strict';
/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IDialogAttributes extends ng.IAttributes {
        id: string;
    }

/* ==========================================================================
    DialogDirective
    ========================================================================== */
    export class DialogDirective extends BaseDirective {
        static dialogService: ModernWeb.Services.DialogService;
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || '/lib/modernWeb/templates/Dialog/Dialog.html';
        };
        public link: ng.IDirectiveLinkFn = ($scope: ModernWeb.IDialogScope, element: JQuery, attributes: IDialogAttributes) => {
            $scope.id = attributes.id;
            DialogDirective.dialogService.AddDialog($scope);
        };

        public constructor(dialogService: ModernWeb.Services.DialogService) {
            super();
            DialogDirective.dialogService = dialogService;
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = (dialogService: ModernWeb.Services.DialogService) => {
                return new DialogDirective(dialogService);
            };

            directive["$inject"] = ['dialogService'];

            return directive;
        }
    }
}