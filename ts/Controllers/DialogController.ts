/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/DialogBO.ts" />
/// <reference path="../Services/DialogService.ts" />

module ModernWeb.Controllers {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IDialogController {
        IsOpen: boolean;
        IsCollapse: boolean;
        Open(): void;
        Close(): void;
    }

/* ==========================================================================
    DialogController
    ========================================================================== */
    export class DialogController extends BaseController implements IDialogController {
        protected scope: IDialogScope;
        protected dialogService: ModernWeb.Services.DialogService;
        private dialogBO: ModernWeb.Business.DialogBO;
        
        public get IsOpen(): boolean { return this.dialogBO.IsOpen; }
        public get IsCollapse(): boolean { return this.dialogBO.IsCollapse; }

        static $inject = ['$scope', 'dialogService'];

        public constructor($scope: IDialogScope, dialogService: ModernWeb.Services.DialogService) {
            super($scope);
            this.dialogBO = new ModernWeb.Business.DialogBO(<IDialogBusinessModel>this.scope, dialogService);
        }

        public Open(): void {
            if (this.dialogBO.IsOpen) {
                return;
            }

            this.dialogBO.Open();
        }

        public Close(): void {
            if (!this.dialogBO.IsOpen) {
                return;
            }

            this.dialogBO.Close();
        }
    }
}