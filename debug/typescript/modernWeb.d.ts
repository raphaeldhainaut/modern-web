declare module ModernWeb {
    enum PlayState {
        Play = 0,
        Pause = 1,
        Stop = 2,
    }
    enum PlayType {
        Automatic = 0,
        Manual = 1,
    }
    enum PlayDirection {
        Ascending = 0,
        Descending = 1,
    }
    interface IAnimateNumberModel {
        number: number;
        delay: number;
        sign: string;
        unit: string;
    }
    interface IAnimateNumberBusinessModel extends IAnimateNumberModel {
        numberAnimated: number;
    }
    interface IInsertModel {
        templateUrl: string;
        elementTarget: JQuery;
    }
    interface IInsertBusinessModel extends IInsertModel {
    }
    interface IProgressBarModel {
        value: number;
        min: number;
        max: number;
    }
    interface IProgressBarBusinessModel extends IProgressBarModel {
        percentage: number;
    }
    interface IProgressBarAnimatedModel {
        delay: number;
    }
    interface IProgressBarAnimatedBusinessModel extends IProgressBarAnimatedModel {
        isRunning: boolean;
        isPaused: boolean;
    }
    interface IDialogModel {
        id: string;
    }
    interface IDialogBusinessModel extends IDialogModel {
        id: string;
        isOpen: boolean;
    }
    interface IRemoteDialogModel extends IDialogModel, IInsertModel {
    }
    interface IRemoteDialogBusinessModel extends IRemoteDialogModel, IDialogBusinessModel, IInsertBusinessModel {
    }
    interface ICarouselModel {
        delay: number;
        playType: PlayType;
        playDirection: PlayDirection;
        isAnimated: boolean;
        isReverseAnimated: boolean;
    }
    interface ICarouselBusinessModel extends ICarouselModel, IProgressBarAnimatedBusinessModel {
        slides: Array<ModernWeb.ISlideBusinessModel>;
        isAnimating: boolean;
        isReverseAnimating: boolean;
        isPending: boolean;
        isTransitionFinished: boolean;
        currentIndex: number;
        nextIndex: number;
        currentPlayType: PlayType;
        playState: PlayState;
    }
    interface ISlideBusinessModel {
        id: number;
        isActive: boolean;
        isShowed: boolean;
        isIn: boolean;
        isOut: boolean;
        carousel: ICarouselBusinessModel;
    }
    interface ITimerModel {
        delay: number;
    }
    interface ITimerBusinessModel extends ITimerModel {
        isRunning: boolean;
        timeLeft: number;
        startDate: Date;
    }
    interface IWizardModel {
    }
    interface IWizardBusinessModel extends IWizardModel {
        steps: Array<ModernWeb.IStepBusinessModel>;
        currentIndex: number;
        isRunning: boolean;
    }
    interface IGridModel {
        isSortable: boolean;
    }
    interface IGridBusinessModel extends IGridModel {
    }
    interface IStepModel {
        Valid: () => boolean;
        Validate: () => void;
    }
    interface IStepBusinessModel extends IStepModel {
        id: number;
        isActive: boolean;
        isSubmitted: boolean;
        hasPreviousControl: boolean;
        hasNextControl: boolean;
        hasFinishControl: boolean;
    }
    interface IAnimateNumberScope extends ng.IScope, ModernWeb.IAnimateNumberBusinessModel {
    }
    interface IInsertScope extends ng.IScope, ModernWeb.IInsertBusinessModel {
    }
    interface IProgressScope extends ng.IScope {
    }
    interface IProgressBarScope extends ng.IScope, ModernWeb.IProgressBarBusinessModel {
    }
    interface IProgressBarAnimatedScope extends ng.IScope, ModernWeb.IProgressBarAnimatedBusinessModel {
    }
    interface IDialogScope extends ng.IScope, ModernWeb.IDialogBusinessModel {
    }
    interface IRemoteDialogScope extends ng.IScope, ModernWeb.IRemoteDialogBusinessModel {
        close: () => void;
    }
    interface ICarouselScope extends ng.IScope, ModernWeb.ICarouselBusinessModel {
        ProgressBarAnimatedCtrl: ModernWeb.Controllers.ProgressBarAnimatedController;
    }
    interface ISlideScope extends ng.IScope, ModernWeb.ISlideBusinessModel {
    }
    interface IWizardScope extends ng.IScope, ModernWeb.IWizardBusinessModel {
    }
    interface IStepScope extends ng.IScope {
        step: IStepBusinessModel;
        Valid: () => boolean;
        Validate: () => void;
        Next: () => void;
        Previous: () => void;
        Select: (id: number) => void;
        Finish: (event: Event) => void;
    }
    interface IGridScope extends ng.IScope, ModernWeb.IGridBusinessModel {
    }
}
declare module ModernWeb.Services {
    class ServiceBase {
    }
}
declare module ModernWeb.Services {
    class DialogService extends ServiceBase {
        private dialogs;
        static $inject: any[];
        constructor();
        AddDialog(dialog: ModernWeb.IDialogBusinessModel): void;
        RemoveDialog(id: string): void;
        RetrieveDialog(id: string): ModernWeb.IDialogBusinessModel;
    }
}
declare module ModernWeb.Directives {
    interface IBaseDirectiveAttributs extends ng.IAttributes {
        templateUrl?: string;
    }
    class BaseDirective implements ng.IDirective {
    }
}
declare module ModernWeb.Controllers {
    class BaseController {
        protected scope: ng.IScope;
        static SERVER_ERRORS: string;
        constructor($scope: ng.IScope);
        protected HandleServerErrorsResponse(dataResponse: any, form: ng.IFormController): void;
    }
}
declare module ModernWeb.Business {
    class BaseBO {
        protected scope: ng.IScope;
        constructor(scope: any);
    }
}
declare module ModernWeb.Business {
    interface IAnimateNumber {
        Animate: () => void;
        Reset: () => void;
    }
    class AnimateNumberBO extends BaseBO implements IAnimateNumber {
        private model;
        private intervalService;
        constructor(model: IAnimateNumberModel, intervalService: ng.IIntervalService);
        Animate(): void;
        Reset(): void;
    }
}
declare module ModernWeb.Controllers {
    interface IAnimateNumberController {
        Animate: () => void;
        Reset: () => void;
    }
    class AnimateNumberController extends BaseController implements IAnimateNumberController {
        protected scope: IAnimateNumberScope;
        private windowService;
        private animateNumberBO;
        static $inject: string[];
        constructor($scope: IAnimateNumberScope, $window: ng.IWindowService, $interval: ng.IIntervalService);
        private SetDefaultValue();
        AttachEventOnWindowScroll(element: JQuery): void;
        Animate(): void;
        Reset(): void;
    }
}
declare module ModernWeb.Directives {
    class AnimateNumberDirective extends BaseDirective {
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Controllers {
    interface IProgressController {
    }
    class ProgressController extends BaseController implements IProgressController {
        protected scope: IProgressScope;
        static $inject: string[];
        constructor($scope: IProgressScope);
    }
}
declare module ModernWeb.Directives {
    class ProgressDirective extends BaseDirective {
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        controller: string;
        controllerAs: string;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Business {
    interface IProgressBar {
        SetPercentage: () => void;
    }
    class ProgressBarBO extends BaseBO implements IProgressBar {
        private model;
        constructor(model: IProgressBarModel);
        SetPercentage(): void;
    }
}
declare module ModernWeb.Controllers {
    interface IProgressBarController {
        SetPercentage: () => void;
    }
    class ProgressBarController extends BaseController implements IProgressBarController {
        protected scope: IProgressBarScope;
        private progressBarBO;
        static $inject: string[];
        constructor($scope: IProgressBarScope);
        private SetDefaultValue();
        private SetWatches();
        SetPercentage(): void;
    }
}
declare module ModernWeb.Directives {
    class ProgressBarDirective extends BaseDirective {
        require: any;
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Business {
    interface IProgressBarAnimated {
        Play(): void;
        Pause(): void;
        Stop(): void;
    }
    class ProgressBarAnimatedBO extends BaseBO implements IProgressBarAnimated {
        private model;
        constructor(model: IProgressBarAnimatedBusinessModel);
        Play(): void;
        Pause(): void;
        Stop(): void;
    }
}
declare module ModernWeb.Controllers {
    interface IProgressBarAnimatedController {
        Play: () => void;
        Pause: () => void;
        Stop: () => void;
    }
    class ProgressBarAnimatedController extends BaseController implements IProgressBarAnimatedController {
        protected scope: IProgressBarAnimatedScope;
        private progressBO;
        static $inject: string[];
        constructor($scope: IProgressBarAnimatedScope);
        private SetDefaultValue();
        Play(): void;
        Pause(): void;
        Stop(): void;
    }
}
declare module ModernWeb.Directives {
    class ProgressBarAnimatedDirective extends BaseDirective {
        require: any;
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        scope: boolean;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Business {
    class TimerBO extends BaseBO {
        private model;
        private callback;
        private timeoutService;
        private timeoutHandler;
        Model: ModernWeb.ITimerModel;
        constructor(model: ModernWeb.ITimerModel, timeoutService: ng.ITimeoutService, callback: () => void);
        private ClearTimer();
        Start(): void;
        Pause(): void;
        Clear(): void;
        ResetTimeLeft(): void;
        private TimeElapsed;
    }
}
declare module ModernWeb.Business {
    interface ICarousel {
        AddSlide(slide: any): void;
        RemoveSlide(slide: any): void;
        Play(): void;
        Pause(): void;
        Stop(): void;
        GoToNext(trigerredType: PlayType): void;
        GoToPrev(trigerredType: PlayType): void;
        GoToElementAt(index: number, trigerredType: PlayType): void;
        IsActive(index: number): boolean;
    }
    class CarouselBO extends BaseBO implements ICarousel {
        private model;
        private timerManager;
        private timerModel;
        private progressBarManager;
        static counter: number;
        IsAutomatic: boolean;
        IsAnimating: boolean;
        IsPending: boolean;
        IsPaused: boolean;
        IsSlidable: boolean;
        constructor(model: ModernWeb.ICarouselModel, progressBarManager: ModernWeb.Business.ProgressBarAnimatedBO);
        private IncrementIndex(index);
        private DecrementIndex(index);
        private IsCurrent(index);
        private IsNext(index);
        IsActive(index: number): boolean;
        private IsShowed(index);
        private IsIn(index);
        private IsOut(index);
        private GoTo(index, trigerredType);
        private SetReverseAnimating();
        private StartTimer();
        private StartTransition(index);
        private UpdateSlides();
        private HandleTransition();
        private FinishTransition();
        SetTimerManager(timeoutService: ng.ITimeoutService): void;
        HandleNgAnimationEnd(event: JQueryEventObject): void;
        HandleAnimationEnd(event: JQueryEventObject): void;
        AddSlide(slide: ModernWeb.ISlideScope): void;
        RemoveSlide(slide: ModernWeb.ISlideScope): void;
        Play(): void;
        Pause(): void;
        Stop(): void;
        GoToNext(trigerredType: PlayType): void;
        GoToPrev(trigerredType: PlayType): void;
        GoToElementAt(index: number, trigerredType: PlayType): void;
    }
}
declare module ModernWeb.Controllers {
    interface ICarouselController {
        AddSlide: (slide: ISlideScope) => void;
        RemoveSlide: (slide: ISlideScope) => void;
        Play: () => void;
        Pause: () => void;
        Stop: () => void;
        Prev: () => void;
        Next: () => void;
        Select: (index: number) => void;
        IsSlideActive: (index: number) => boolean;
        IsPending: boolean;
        IsPaused: boolean;
        HasProgressBar: boolean;
        HasNavigation: boolean;
    }
    class CarouselController extends BaseController implements ICarouselController {
        protected scope: ICarouselScope;
        private carouselBO;
        private progressBarBO;
        private hasAnimationHandlerAttached;
        static $inject: string[];
        constructor($scope: ICarouselScope, $element: JQuery, $timeout: ng.ITimeoutService);
        private SetDefaultValue();
        private SetWatches(element, timeoutService);
        private AttachAnimationHandler(element);
        AddSlide(slide: ISlideScope): void;
        RemoveSlide(slide: ISlideScope): void;
        IsSlideActive(index: number): boolean;
        Play(): void;
        Pause(): void;
        Stop(): void;
        Next(): void;
        Prev(): void;
        Select(index: number): void;
        IsPending: boolean;
        IsPaused: boolean;
        HasProgressBar: boolean;
        HasNavigation: boolean;
    }
}
declare module ModernWeb.Directives {
    class CarouselDirective extends BaseDirective {
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        controller: string;
        controllerAs: string;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Directives {
    class SlideDirective extends BaseDirective {
        require: any;
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        scope: any;
        link: ng.IDirectiveLinkFn;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Business {
    interface IDialog {
        IsOpen: boolean;
        IsCollapse: boolean;
        Open(): void;
        Close(): void;
    }
    class DialogBO extends BaseBO implements IDialog {
        private model;
        private dialogService;
        IsOpen: boolean;
        IsCollapse: boolean;
        constructor(model: ModernWeb.IDialogModel, dialogService: ModernWeb.Services.DialogService);
        private Dialog;
        Open(): void;
        Close(): void;
    }
}
declare module ModernWeb.Controllers {
    interface IDialogController {
        IsOpen: boolean;
        IsCollapse: boolean;
        Open(): void;
        Close(): void;
    }
    class DialogController extends BaseController implements IDialogController {
        protected scope: IDialogScope;
        protected dialogService: ModernWeb.Services.DialogService;
        private dialogBO;
        IsOpen: boolean;
        IsCollapse: boolean;
        static $inject: string[];
        constructor($scope: IDialogScope, dialogService: ModernWeb.Services.DialogService);
        Open(): void;
        Close(): void;
    }
}
declare module ModernWeb.Directives {
    interface IDialogAttributes extends ng.IAttributes {
        id: string;
    }
    class DialogDirective extends BaseDirective {
        static dialogService: ModernWeb.Services.DialogService;
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        link: ng.IDirectiveLinkFn;
        constructor(dialogService: ModernWeb.Services.DialogService);
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Directives {
    class WizardDirective extends BaseDirective {
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        controller: string;
        controllerAs: string;
        link: ng.IDirectiveLinkFn;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Directives {
    class StepDirective extends BaseDirective {
        require: any;
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        scope: any;
        link: ng.IDirectiveLinkFn;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
declare module ModernWeb.Controllers {
    interface IInsertController {
        After: () => void;
        Before: () => void;
    }
    class InsertController extends BaseController implements IInsertController {
        protected scope: IInsertScope;
        protected element: JQuery;
        protected templateRequestService: ng.ITemplateRequestService;
        protected compileService: ng.ICompileService;
        static $inject: string[];
        constructor($scope: IInsertScope, $element: JQuery, $templateRequest: ng.ITemplateRequestService, $compile: ng.ICompileService);
        After(): void;
        Before(): void;
    }
}
declare module ModernWeb.Controllers {
    interface IRemoteDialogController extends IDialogController {
    }
    class RemoteDialogController extends DialogController implements IRemoteDialogController {
        private isInstanciated;
        protected scope: IRemoteDialogScope;
        protected element: JQuery;
        protected dialogService: ModernWeb.Services.DialogService;
        protected templateRequestService: ng.ITemplateRequestService;
        protected compileService: ng.ICompileService;
        static $inject: string[];
        constructor($scope: IRemoteDialogScope, $element: JQuery, dialogService: ModernWeb.Services.DialogService, $templateRequest: ng.ITemplateRequestService, $compile: ng.ICompileService);
        Open(): void;
        Close(): void;
        After(): void;
        Before(): void;
    }
}
declare module ModernWeb.Business {
    interface IWizard {
        AddStep: (step: IStepModel) => void;
        RemoveStep: (step: IStepBusinessModel) => void;
        GoToNext(): void;
        GoToPrevious(): void;
        GoTo(index: number): void;
        Finish(event: Event): void;
        Cancel(): void;
    }
    class WizardBO extends BaseBO implements IWizard {
        private model;
        static counter: number;
        constructor(model: ModernWeb.IWizardModel);
        private UpdateSteps();
        private IsActive(index);
        private IncrementIndex(index);
        private DecrementIndex(index);
        private AreIntermediateStepsValid(startIndex, endIndex);
        private RetrieveStepIndex(id);
        AddStep(step: ModernWeb.IStepModel): void;
        RemoveStep(step: ModernWeb.IStepBusinessModel): void;
        private TriggerIntermediateStepsValidation(startIndex, endIndex);
        GoTo(index: number): void;
        GoToNext(): void;
        GoToPrevious(): void;
        GoToId(id: number): void;
        Finish($event: Event): void;
        Cancel(): void;
    }
}
declare module ModernWeb.Controllers {
    interface IWizardController {
        AddStep: (step: IStepScope) => void;
        RemoveStep: (step: IStepScope) => void;
        Next: () => void;
        Previous: () => void;
        Select: (index: number) => void;
        Finish: (event: Event) => void;
        Cancel: () => void;
    }
    class WizardController extends BaseController implements IWizardController {
        protected scope: IWizardScope;
        private wizardBO;
        static $inject: string[];
        constructor($scope: IWizardScope);
        AddStep(step: IStepScope): void;
        RemoveStep(scope: IStepScope): void;
        Next(): void;
        Previous(): void;
        Select(id: number): void;
        Finish(event: Event): void;
        Cancel(): void;
    }
}
declare module ModernWeb.Controllers {
    interface IGridController {
    }
    class GridController extends BaseController implements IGridController {
        protected scope: IGridScope;
        constructor($scope: IGridScope);
        SynchronizeScroll(): void;
    }
}
declare module ModernWeb {
}
declare module ModernWeb.Directives {
    class GridDirective extends BaseDirective {
        transclude: boolean;
        replace: boolean;
        templateUrl: (element: JQuery, attributs: IBaseDirectiveAttributs) => string;
        constructor();
        static Factory(): ng.IDirectiveFactory;
    }
}
