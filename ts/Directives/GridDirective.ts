/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/GridController.ts" />

module ModernWeb.Directives {
    'use strict';

/* ==========================================================================
    Interface
    ========================================================================= */

/* ==========================================================================
    GridDirective
    ========================================================================== */
    export class GridDirective extends BaseDirective {
        public transclude: boolean = true;
        public replace: boolean = true;
        public templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string = (element: JQuery, attributs: IBaseDirectiveAttributs): string => {
            return attributs.templateUrl || TEMPLATES_PATH + 'Grid/Grid.html';
        };
        public link: ng.IDirectiveLinkFn = ($scope: IGridScope, $element: JQuery, attributs: IBaseDirectiveAttributs): void => {
            $scope.grid = <IDataGridModel>{
                cols: $scope.columns,
                rows: {}
            };

            $.ajax({
                type: "POST",
                dataType: "json",
                url: $scope.url,
                async: false
            }).done((data: any) => {
                $scope.grid.rows = data;
            }).fail(function () {
                //TODO Manage error
                //console.log();
            });
        };
        public controller: string = "GridController";
        public controllerAs: string = "GridCtrl";
        
        public scope = {
            url: '@',
            columns: '=',
            isPageable: '=pageable',
            isFilterable: '=filterable'
        };

        public constructor() {
            super();
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new GridDirective();
            };

            directive["$inject"] = [];

            return directive;
        }
    }
}