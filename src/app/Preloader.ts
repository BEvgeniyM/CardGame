import { Container, Application, Loader, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from '../MessageMeneger';
import { BaseController } from './BaseController';
import { BaseViwe } from './BaseViwe';
import { Event } from './Event';
import { StageController } from '../StageController'
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'
import { DataSetting } from '../Utils/DataSetting';


export class Preloader extends Container {

    /** SETING */
    private _skale: number = 1 //s
    private _cartCount: number = 100;
    private _sleshScren: Sprite = {} as Sprite;
    private _pregress = new Container();

    /** SETING */


    constructor(private _perent: PIXI.DisplayObject) {
        super();
    }

    init(): Preloader {
        // StageController.app.stage.addChild(this);
        this.sortableChildren = true;
        this._zIndex = 10000;
        this._pregress.zIndex = 20000;
        this.addChild(this._pregress);
        this.loadGameAssets();
        window.addEventListener("resize", this.resizeCanvas.bind(this));
        return this
    }


    loadGameAssets(): Promise<void> {
        return new Promise((res, rej) => {
            const loader = Loader.shared;
            loader.add("skin_1", "./assets/skin_1.png");

            loader.add("splash_screen_1", "./assets/splash_screen_1.png");
            loader.add("splash_screen_4", "./assets/splash_screen_4.png");
            loader.add("splash_screen_2", "./assets/splash_screen_2.png");
            loader.add("splash_screen_3", "./assets/splash_screen_3.png");



            loader.add("papir", "./assets/papir.png");
            loader.add("seal", "./assets/seal.png");
            loader.add("papir_2", "./assets/papir_2.png");
            loader.add("back_", "./assets/back_.png");
            loader.add("za", "./assets/za.png");
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


            loader.add("close", "./assets/close.png");
            loader.add("round_close", "./assets/round_close.png");
            loader.add("menu", "./assets/menu.png");




            loader.onProgress.add((e: any) => {
                this.onProgress(e)
            });



            loader.onComplete.once(() => {
                this.creatPreloader();
                this._perent.emit(Event.LOADGAMESTART)
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

    creatPreloader(): void {
        const graph = new PIXI.Graphics();
        graph.beginFill(0x000000)
        graph.drawRect(0, 0, window.innerWidth * 10, window.innerHeight * 10)
        graph.endFill();
        graph.position.set(0, 0);
        graph.alpha = 1;
        graph.zIndex = 1001;
        this.addChild(graph);

        const texture = PIXI.Texture.from('splash_screen_1');
        this._sleshScren = new Sprite(texture);
        this._sleshScren.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
        this._sleshScren.scale.set(this._skale);
        this._sleshScren.cursor = 'pointer';
        this._sleshScren.anchor.set(0.5);
        this._sleshScren.interactive = true;
        this._sleshScren.angle = 0
        this._sleshScren.zIndex = 1002;

        this.addChild(this._sleshScren);
        CustomUtils.ResizeBack(this._sleshScren);
        this.resizeCanvas();
    }

    highPreLoader(): void {
        this._perent.emit(Event.PRELOADERCOMPLETE);

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
            delay: 4,
            duration: 1
        })

        gsap.to(this, {
            delay: 5,
            callbackScope: this,
            onComplete: this.onCompleteLoader
        })
    }


    onProgress(e: any) {
        console.log(e.progress);

        const texture = PIXI.Texture.from('skin_1');
        let sprite = new Sprite(texture);
        sprite.position.set(sprite.width* 1 * e.progress / (100),0);
        sprite.scale.set(this._skale);
        sprite.cursor = 'pointer';
        sprite.anchor.set(0.5);
        sprite.interactive = true;
        sprite.angle = CustomUtils.GetRandomArbitrary(75, 120)
        sprite.zIndex = 2000;
        sprite.alpha = 0;
        CustomUtils.SetScaleOfProz(sprite,DataSetting.Progress)
        gsap.timeline()
            .to(sprite.scale, {
                x: 0.1,
                y: 0.1,
                delay: 0.0,
                duration: 1,
            })
            .to(sprite, {
                alpha: 1,
                delay: 0.0,
                duration: 1,
            })
        this._pregress.addChild(sprite);
    }

    onCompleteLoader() {
        this.zIndex = -1000;
        this.removeAllListeners()
        this.removeChildren()

    }


    resizeCanvas(): void {
        
        CustomUtils.SetAngle(this._pregress);
        CustomUtils.SetPositionProz(this._pregress,DataSetting.Progress);
        // this._pregress.scale.set(DataSetting.Progress.scale);
        // for (let i = 0; i < this._pregress.children.length; i++) {
        //     const sprite = this._pregress.children[i] as Sprite;
        //     CustomUtils.SetScaleOfProz(sprite,DataSetting.Progress.scale);
        // }

        CustomUtils.ResizeBack(this._sleshScren);
        // CustomUtils.ResizePreloader(this);
    }
}
