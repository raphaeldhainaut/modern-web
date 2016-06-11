/// <reference path="Base/BaseController.ts" />

module ModernWeb.Controllers {
    'use strict';

/*  DefaultConfig
    ========================================================================== */


/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IProgressController {
    }

/* ==========================================================================
    ProgressController
    ========================================================================== */
    export class ProgressController extends BaseController implements IProgressController {
        protected scope: IProgressScope;

        static $inject = ['$scope'];

        public constructor($scope: IProgressScope) {
            super($scope);
        }
    }
}