/// <reference path="Base/BaseController.ts" />

module ModernWeb.Controllers {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IGridController {
    }

/* ==========================================================================
    GridController
    ========================================================================== */
    export class GridController extends BaseController implements IGridController {
        protected scope: IGridScope;

        public constructor($scope: IGridScope) {
            super($scope);
        }

        public SynchronizeScroll() {

        }
    }
}