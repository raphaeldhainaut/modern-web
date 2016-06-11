/// <reference path="../../ModernWeb.ts" />

module ModernWeb.Directives {
    'use strict';

    export const TEMPLATES_PATH: string = '/lib/modern-web/templates/';

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