/// <reference path="Base/ServiceBase.ts" />

module ModernWeb.Services {
    'use strict';

/* ==========================================================================
   DialogService
   ========================================================================== */
    export class DialogService extends ServiceBase {
        private dialogs: Core.IDictionary<ModernWeb.IDialogBusinessModel>;
        
        static $inject = [];

        public constructor() {
            super();
            this.dialogs = new Core.Dictionary<ModernWeb.IDialogBusinessModel>();
        }

        public AddDialog(dialog: ModernWeb.IDialogBusinessModel): void {
            this.dialogs.Add(dialog.id, dialog);
        }

        public RemoveDialog(id: string): void {
            this.dialogs.Remove(id);
        }

        public RetrieveDialog(id: string): ModernWeb.IDialogBusinessModel {
            if (!this.dialogs.ContainsKey(id)) {
                throw new Error("DialogService Fault: can't retrieve the dialog [id='" + id + "'] !");
            }
            
            return this.dialogs[id];
        }
    }
}