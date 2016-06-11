/// <reference path="../../ModernWeb.ts" />

module ModernWeb.Business {
    'use strict';

/* ==========================================================================
    BaseBO
    ========================================================================== */
    export class BaseBO {
        protected scope: ng.IScope;

        public constructor(scope: any) {
            this.scope = scope;
        }
    }
}