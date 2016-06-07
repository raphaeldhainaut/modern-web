module ModernWeb { // namespace = ModernWeb
    'use strict';

/*  ==========================================================================
    Enum
    ========================================================================== */
    export enum PlayState {
        Play,
        Pause,
        Stop
    }

    export enum PlayType {
        Automatic,
        Manual
    }

    export enum PlayDirection {
        Ascending,
        Descending
    }

/*  ==========================================================================
    Interface
    ========================================================================== */
    export interface IAnimateNumberModel {
        number: number;
        delay: number;
        sign: string;
        unit: string;
    }

    export interface IAnimateNumberBusinessModel extends IAnimateNumberModel {
        numberAnimated: number;
    }

    export interface IInsertModel {
        templateUrl: string;
        elementTarget: JQuery;
    }

    export interface IInsertBusinessModel extends IInsertModel {
    }

    export interface IProgressBarModel {
        value: number;
        min: number;
        max: number;
    }

    export interface IProgressBarBusinessModel extends IProgressBarModel {
        percentage: number;
    }

    export interface IProgressBarAnimatedModel {
        delay: number;
    }

    export interface IProgressBarAnimatedBusinessModel extends IProgressBarAnimatedModel {
        isRunning: boolean;
        isPaused: boolean;
    }

    export interface IDialogModel {
        id: string;
    }

    export interface IDialogBusinessModel extends IDialogModel {
        id: string;
        isOpen: boolean;
    }

    export interface IRemoteDialogModel extends IDialogModel, IInsertModel {
    }

    export interface IRemoteDialogBusinessModel extends IRemoteDialogModel, IDialogBusinessModel, IInsertBusinessModel {
    }

    export interface ICarouselModel {
        delay: number;
        playType: PlayType;
        playDirection: PlayDirection;
        isAnimated: boolean;
        isReverseAnimated: boolean;
    }

    export interface ICarouselBusinessModel extends ICarouselModel, IProgressBarAnimatedBusinessModel {
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

    export interface ISlideBusinessModel {
        id: number;
        isActive: boolean;
        isShowed: boolean;
        isIn: boolean;
        isOut: boolean;
        carousel: ICarouselBusinessModel;
    }

    export interface ITimerModel {
        delay: number;
    }

    export interface ITimerBusinessModel extends ITimerModel {
        isRunning: boolean;
        timeLeft: number;
        startDate: Date;
    }

    export interface IWizardModel {
    }

    export interface IWizardBusinessModel extends IWizardModel {
        steps: Array<ModernWeb.IStepBusinessModel>;
        currentIndex: number;
        isRunning: boolean;
    }

    export interface IGridModel  {
        isSortable: boolean;
    }

    export interface IGridBusinessModel extends IGridModel {
    }

    export interface IStepModel {
        Valid: () => boolean;
        Validate: () => void;
    }

    export interface IStepBusinessModel extends IStepModel {
        id: number;
        isActive: boolean;
        isSubmitted: boolean;
        hasPreviousControl: boolean;
        hasNextControl: boolean;
        hasFinishControl: boolean;
    }

/*  Scope Interface
    ========================================================================== */
    export interface IAnimateNumberScope extends ng.IScope, ModernWeb.IAnimateNumberBusinessModel {
    }

    export interface IInsertScope extends ng.IScope, ModernWeb.IInsertBusinessModel {
    }
    
    export interface IProgressScope extends ng.IScope {
    }
    
    export interface IProgressBarScope extends ng.IScope, ModernWeb.IProgressBarBusinessModel {
    }

    export interface IProgressBarAnimatedScope extends ng.IScope, ModernWeb.IProgressBarAnimatedBusinessModel {
    }

    export interface IDialogScope extends ng.IScope, ModernWeb.IDialogBusinessModel {
    }

    export interface IRemoteDialogScope extends ng.IScope, ModernWeb.IRemoteDialogBusinessModel {
        close: () => void;
    }

    export interface ICarouselScope extends ng.IScope, ModernWeb.ICarouselBusinessModel {
        ProgressBarAnimatedCtrl: ModernWeb.Controllers.ProgressBarAnimatedController;
    }

    export interface ISlideScope extends ng.IScope, ModernWeb.ISlideBusinessModel {
    }

    export interface IWizardScope extends ng.IScope, ModernWeb.IWizardBusinessModel {
    }

    export interface IStepScope extends ng.IScope {
        step: IStepBusinessModel;
        Valid: () => boolean;
        Validate: () => void;
        Next: () => void;
        Previous: () => void;
        Select: (id: number) => void;
        Finish: (event: Event) => void;
    }

    export interface IGridScope extends ng.IScope, ModernWeb.IGridBusinessModel {
    }
}