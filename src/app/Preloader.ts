import { Container, DisplayObject, Loader, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { Element } from './components/Element';
import { EventGame } from './components/EventGame';
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'
import { DataSetting } from './modules/cartGame/DataSetting';
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import { EE } from './components/baseComponents/EE';
import { ElementContainer } from './components/baseComponents/ElementContainer';

//** Plugin Should be add befor start Loaders !!!*/
PIXI.Loader.registerPlugin(WebfontLoaderPlugin);

export class Preloader extends Container {

    /** SETING */
    private _skale: number = 1 //s
    private _cardCount: number = 100;
    private _sleshScren: Element;
    private _pregress: Element;

    /** SETING */


    constructor(private _perent: PIXI.DisplayObject) {
        super();
        Loader.registerPlugin(WebfontLoaderPlugin);
    }

    init(): Preloader {
        this.sortableChildren = true;
        this.loadGameAssets();
        return this
    }

    loadGameAssetsMain(): Promise<void> {
        return new Promise((res, rej) => {
            const loader = Loader.shared;

            // loader.add("skin_1", "./assets/skin_1.png");
            // loader.add("splash_screen_1", "./assets/splash_screen_1.png");

            loader.add("splash_screen_4", "./assets/splash_screen_4.png");
            loader.add("splash_screen_2", "./assets/splash_screen_2.png");
            loader.add("splash_screen_3", "./assets/splash_screen_3.png");


            loader.add("gludio", "./assets/gludio.mp3");
            loader.add("dion", "./assets/dion.mp3");

            loader.add("map_repeat", "./assets/map_repeat.png");
            loader.add("fire", "./assets/fire.png");
            loader.add("BtnS", "./assets/BtnS.png");
            loader.add("BtnSS", "./assets/BtnSS.png");
            loader.add("BtnSSLong", "./assets/BtnSSLong.png");
            loader.add("flag_3", "./assets/flag_3.png");
            loader.add("flag", "./assets/flag.png");
            loader.add("papir", "./assets/papir.png");
            loader.add("seal", "./assets/seal.png");
            loader.add("papir_2", "./assets/papir_2.png");
            loader.add("back_", "./assets/back_.png");
            loader.add("zs", "./assets/zs.png");
            loader.add("skin_2", "./assets/skin_2.png");
            loader.add("skin_3", "./assets/skin_3.png");
            loader.add("table_1", "./assets/table_1.png");
            loader.add("table_2", "./assets/table_2.png");
            loader.add("table_3", "./assets/table_3.png");
            loader.add("table_4", "./assets/table_4.png");
            loader.add("winPanel", "./assets/winPanel.png");


            loader.add("hero_1", "./assets/hero_1.png");
            loader.add("hero_2", "./assets/hero_2.png");
            loader.add("hero_3", "./assets/hero_3.png");
            loader.add("hero_4", "./assets/hero_4.png");
            loader.add("shift_1", "./assets/shift_1.png");
            loader.add("shift_2", "./assets/shift_2.png");
            loader.add("shift_3", "./assets/shift_3.png");


            // loader.add("close", "./assets/close.png");
            loader.add("round_close", "./assets/round_close.png");
            loader.add("menu", "./assets/menu.png");
         



            loader.onProgress.add((e: any) => {
                this.onProgress(e)
            });

            loader.onComplete.once(() => {
                EE.Glob.emit(EventGame.ACTION,EventGame.LOAD_GAME_START)
                return this
            });

            loader.onError.once(() => {
                rej();
            });

            this.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
            this.pivot.set(window.innerWidth * 0.5, window.innerHeight * 0.5);

            loader.load();
        });
    }

    loadGameAssets(): Promise<void> {
        return new Promise((res, rej) => {
            const loader = Loader.shared;

            loader.add("PoorStory-Regular", "./assets/font/PoorStory-Regular.ttf");
            loader.add("Freehand-Regular", "./assets/Freehand-Regular.ttf");
            loader.add("Snippet-Regular", "./assets/font/Snippet-Regular.ttf");
            loader.add("Snippet", "./assets/font/Snippet.ttf");
            loader.add("close", "./assets/close.png");
            loader.add("fire2", "./assets/fire2.png");

            loader.add(DataSetting.SplashScreen.t, "./assets/" + DataSetting.SplashScreen.t + '.png');
            loader.add(DataSetting.Progress.t, "./assets/" + DataSetting.Progress.t + '.png');

            loader.onComplete.once(() => {
                this.loadGameAssetsMain();
                this.creatPreloader();
                return this
            });

            loader.onError.once(() => {
                rej();
            });

            loader.load();
        });
    }

    creatPreloader(): void {
        this._sleshScren = new Element(this, DataSetting.SplashScreenContainer);
    }

    highPreLoader(): void {
        EE.Glob.emit(EventGame.ACTION,EventGame.PRELOADER_COMPLETE);

        gsap.to(this.scale, {
            x: 1,
            y: 1,
            delay: 2,
            duration: 1
        })
        gsap.to(this.scale, {
            x: 1.05,
            y: 1.05,
            delay: 3,
            duration: 1
        })
        gsap.to(this, {
            alpha: 0,
            delay: 1,
            duration: 1
        })

        gsap.to(this, {
            delay: 5,
            callbackScope: this,
            onComplete: this.onCompleteLoader
        })
    }


    onProgress(e: any) {
        let r = Object.assign( {x : DataSetting.Progress.length * e.progress / 10}  ,DataSetting.Progress);

        (this._sleshScren.element.children[3] as any).children[0].text = CustomUtils.FormatNumber(e.progress);
        (this._sleshScren.element.children[5] as any).children[1].text = CustomUtils.FormatNumber(e.progress);
    }

    onCompleteLoader() {
        this.zIndex = -1000;
        this.removeAllListeners();
        this.removeChildren();
    }


}
