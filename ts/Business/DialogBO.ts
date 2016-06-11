/// <reference path="Base/BaseBO.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IDialog {
        IsOpen: boolean;
        IsCollapse: boolean;
        Open(): void;
        Close(): void;
    }

/* ==========================================================================
    DialogBO
    ========================================================================== */
    export class DialogBO extends BaseBO implements IDialog {
        private model: ModernWeb.IDialogBusinessModel;
        private dialogService: ModernWeb.Services.DialogService;

        public get IsOpen(): boolean { return this.Dialog.isOpen; }
        public get IsCollapse(): boolean { return !this.Dialog.isOpen; }

        public constructor(model: ModernWeb.IDialogModel, dialogService: ModernWeb.Services.DialogService) {
            super(model);
            this.model = <ModernWeb.IDialogBusinessModel>model;
            this.model.isOpen = false;
            this.dialogService = dialogService;
        }
        
        private get Dialog(): ModernWeb.IDialogBusinessModel {
            return this.dialogService.RetrieveDialog(this.model.id);
        }

        public Open(): void {
            this.Dialog.isOpen = true;
            this.model.isOpen = true;
        }

        public Close(): void {
            this.Dialog.isOpen = false;
            this.model.isOpen = false;
        }
    }
}