/// <reference path="Base/BaseController.ts" />
/// <reference path="DialogController.ts" />

module ModernWeb.Controllers {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IRemoteDialogController extends IDialogController {
    }

/* ==========================================================================
    RemoteDialogController
    ========================================================================== */
    export class RemoteDialogController extends DialogController implements IRemoteDialogController {
        private isInstanciated: boolean;
        protected scope: IRemoteDialogScope;
        protected element: JQuery;
        protected dialogService: ModernWeb.Services.DialogService;
        protected templateRequestService: ng.ITemplateRequestService;
        protected compileService: ng.ICompileService;
        
        static $inject = ['$scope', '$element', 'dialogService', '$templateRequest', '$compile'];

        public constructor($scope: IRemoteDialogScope, $element: JQuery, dialogService: ModernWeb.Services.DialogService, $templateRequest: ng.ITemplateRequestService, $compile: ng.ICompileService) {
            super($scope, dialogService);
            this.scope.close = () => this.Close();
            this.dialogService = dialogService;
            this.templateRequestService = $templateRequest;
            this.compileService = $compile;
            this.isInstanciated = false;
        }

        public Open(): void {
            if (!this.isInstanciated) {
                this.dialogService.AddDialog(<IDialogBusinessModel>{ id: this.scope.id, isOpen: (typeof this.scope.isOpen != "undefined") ? this.scope.isOpen : false });
                this.isInstanciated = true;
            }

            super.Open();
        }

        public Close(): void {
            if (!this.isInstanciated) {
                return;
            }

            super.Close();
            this.scope.elementTarget.parent().find("#" + this.scope.id).remove();
        }
        
        public After(): void {
            if (this.isInstanciated && this.IsOpen) {
                return;
            }

            this.Open();
            this.templateRequestService(this.scope.templateUrl).then((html) => {
                var template = angular.element(html);
                var content = this.compileService(template)(this.scope);
                this.scope.elementTarget.after(content);
            });
        }

        public Before(): void {
            if (this.isInstanciated && this.IsOpen) {
                return;
            }

            this.Open();
            this.templateRequestService(this.scope.templateUrl).then((html) => {
                var template = angular.element(html);
                var content = this.compileService(template)(this.scope);
                this.scope.elementTarget.before(content);
            });
        }
    }
}