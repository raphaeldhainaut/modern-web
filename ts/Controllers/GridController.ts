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
        
        private dataSource: OData.IResourceClass<OData.IResource<any>>;
        
        private filterField: string;
        private orderByField: string;
        private pageField: number;
        private pageSize: number;

        static $inject = ['$scope', '$element', '$odataresource'];

        public constructor($scope: IGridScope, $element: JQuery, $odataresource: OData.IResourceService) {
            super($scope);
            this.dataSource = $odataresource($element.attr('url'));
        }

        public SynchronizeScroll() {

        }

        public Sort(field: string): void {
            //var character = this.odataresource('/odata/Characters/:characterId', { characterId: '@id' });
            //var character = this.odataresource('/odata/Characters');
            var ryu = this.dataSource.odata().filter("Name", "Ryu").query();
            console.log(ryu);
        }
    }
}