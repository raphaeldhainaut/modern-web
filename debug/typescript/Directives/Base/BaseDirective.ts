/// <reference path="../../ModernWeb.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================== */
    export interface IBaseDirectiveAttributs extends ng.IAttributes {
        templateUrl?: string;
    }

/* ==========================================================================
    BaseDirective
    ========================================================================== */
    export class BaseDirective implements ng.IDirective {
    }
}