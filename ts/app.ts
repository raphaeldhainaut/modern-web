/// <reference path="ModernWeb.ts" />
/// <reference path="Services/DialogService.ts" />
/// <reference path="Directives/AnimateNumberDirective.ts" />
/// <reference path="Directives/ProgressDirective.ts" />
/// <reference path="Directives/ProgressBarDirective.ts" />
/// <reference path="Directives/ProgressBarAnimatedDirective.ts" />
/// <reference path="Directives/CarouselDirective.ts" />
/// <reference path="Directives/SlideDirective.ts" />
/// <reference path="Directives/DialogDirective.ts" />
/// <reference path="Directives/WizardDirective.ts" />
/// <reference path="Directives/StepDirective.ts" />
/// <reference path="Directives/GridDirective.ts" />
/// <reference path="Controllers/AnimateNumberController.ts" />
/// <reference path="Controllers/InsertController.ts" />
/// <reference path="Controllers/ProgressController.ts" />
/// <reference path="Controllers/ProgressBarController.ts" />
/// <reference path="Controllers/ProgressBarAnimatedController.ts" />
/// <reference path="Controllers/CarouselController.ts" />
/// <reference path="Controllers/DialogController.ts" />
/// <reference path="Controllers/RemoteDialogController.ts" />
/// <reference path="Controllers/WizardController.ts" />
/// <reference path="Controllers/GridController.ts" />

module ModernWeb { // namespace = ModernWeb
    'use strict';

/*  ==========================================================================
    Module
    ========================================================================== */
    angular
        .module('ModernWeb', ['ODataResources'])

        /*  RootScope
        ========================================================================== */
        .run(['$rootScope', ($rootScope) => {
            $rootScope.PlayState = ModernWeb.PlayState;
            $rootScope.PlayType = ModernWeb.PlayType;
            $rootScope.PlayDirection = ModernWeb.PlayDirection;
        }])

        /*  Service
        ========================================================================== */
        .service('dialogService', ModernWeb.Services.DialogService)

        /*  Directive
        ========================================================================== */
        .directive('mwAnimateNumber', ModernWeb.Directives.AnimateNumberDirective.Factory())
        .directive('mwProgress', ModernWeb.Directives.ProgressDirective.Factory())
        .directive('mwProgressBar', ModernWeb.Directives.ProgressBarDirective.Factory())
        .directive('mwProgressBarAnimated', ModernWeb.Directives.ProgressBarAnimatedDirective.Factory())
        .directive('mwDialog', ModernWeb.Directives.DialogDirective.Factory())
        .directive('mwCarousel', ModernWeb.Directives.CarouselDirective.Factory())
        .directive('mwSlide', ModernWeb.Directives.SlideDirective.Factory())
        .directive('mwWizard', ModernWeb.Directives.WizardDirective.Factory())
        .directive('mwStep', ModernWeb.Directives.StepDirective.Factory())
        .directive('mwGrid', ModernWeb.Directives.GridDirective.Factory())

        /*  Controller
        ========================================================================== */
        .controller('AnimateNumberController', ModernWeb.Controllers.AnimateNumberController)
        .controller('InsertController', ModernWeb.Controllers.InsertController)
        .controller('ProgressController', ModernWeb.Controllers.ProgressController)
        .controller('ProgressBarController', ModernWeb.Controllers.ProgressBarController)
        .controller('ProgressBarAnimatedController', ModernWeb.Controllers.ProgressBarAnimatedController)
        .controller('DialogController', ModernWeb.Controllers.DialogController)
        .controller('RemoteDialogController', ModernWeb.Controllers.RemoteDialogController)
        .controller('CarouselController', ModernWeb.Controllers.CarouselController)
        .controller('WizardController', ModernWeb.Controllers.WizardController)
        .controller('GridController', ModernWeb.Controllers.GridController);
}