import { Container, Application, Loader, Sprite, settings, ENV, GC_MODES } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { BaseViwe } from './app/BaseViwe';
import { Cart } from './app/Card';
import { DataSetting } from '../src/Utils/DataSetting'

import { isFullScreen, requestFullScreen, deviceDetect } from './Utils/Fullscreen';

export class StageController {

    backgroundColor: number = 0x00000;
    gameWidth: number = DataSetting.GameWidth;
    gameHeight: number = DataSetting.GameHeight;

    static dragTarget: PIXI.DisplayObject | null = null;
    static app: Application

    constructor() {

        StageController.app = new Application({
            backgroundColor: this.backgroundColor,
            width: this.gameWidth,
            height: this.gameHeight,
            resizeTo: window,
            antialias:true,
            autoDensity:true
        });
        document.body.appendChild(StageController.app.view);

        window.addEventListener("resize", this.resizeCanvas);
        document.addEventListener("touchend", () => { !isFullScreen() && deviceDetect() && requestFullScreen(document.documentElement) });

        this.registerPixiInspector();
        this.resizeCanvas();
        this.init();
    }

    init(): Application {
        // settings.RESOLUTION = window.devicePixelRatio;
        // settings.PREFER_ENV = ENV.WEBGL_LEGACY;
        PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL2
        // PIXI.settings.RESOLUTION = 2
        PIXI.settings.GC_MODE = GC_MODES.AUTO;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR
        PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT =false
        PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL2
        PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;

        StageController.app.stage.sortableChildren = true;
        StageController.app.stage.interactive = true;
        // StageController.app.stage.hitArea = StageController.app.screen;

        // StageController.app.stage.on('pointerup', StageController.onDragEnd);
        // StageController.app.stage.on('pointerupoutside', StageController.onDragEnd);
        return StageController.app;
    }

    static onDragEnd() {
        if (StageController.dragTarget) {
            StageController.app.stage.off('pointermove', StageController.onDragMove);
            StageController.dragTarget.alpha = 1;
            StageController.dragTarget = null;
        }
    }

    static onDragMove(event: any) {

        if (StageController.dragTarget) {
            // @ts-ignore
            StageController.dragTarget.parent.toLocal(event.data.global, null, StageController.dragTarget.position);
        }
    }


    resizeCanvas(): void {
        const resize = () => {
            StageController.app.renderer.resize(window.screen.availWidth, window.screen.availHeight);
        };
        resize();
    }


    registerPixiInspector() {
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ && (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

}