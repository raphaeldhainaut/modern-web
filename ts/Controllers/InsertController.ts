/// <reference path="Base/BaseController.ts" />

module ModernWeb.Controllers {
    'use strict';

/*  ==========================================================================
    Interface
    ========================================================================== */
    export interface IInsertController {
        After: () => void;
        Before: () => void;
    }
    
/*  ==========================================================================
    InsertController
    ========================================================================== */
    export class InsertController extends BaseController implements IInsertController {
        protected scope: IInsertScope;
        protected element: JQuery;
        protected templateRequestService: ng.ITemplateRequestService;
        protected compileService: ng.ICompileService;

        static $inject = ['$scope', '$element', '$templateRequest', '$compile'];

        public constructor($scope: IInsertScope, $element: JQuery, $templateRequest: ng.ITemplateRequestService, $compile: ng.ICompileService) {
            super($scope);
            this.element = $element;
            this.templateRequestService = $templateRequest;
            this.compileService = $compile;
        }

        public After(): void {
            this.templateRequestService(this.scope.templateUrl).then((html) => {
                var template = angular.element(html);
                this.scope.elementTarget.after(template);
                this.compileService(template)(this.scope);
            });
        }

        public Before(): void {
            this.templateRequestService(this.scope.templateUrl).then((html) => {
                var template = angular.element(html);
                this.scope.elementTarget.before(template);
                this.compileService(template)(this.scope);
            });
        }
    }
}