import { Container, Application, Loader } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from './MessageMeneger';
import { BaseController } from './app/BaseController';
import { BaseViwe } from './app/BaseViwe';
import { Preloader } from './app/Preloader';
import { Event } from './app/Event';
import { gsap } from "gsap";
import { type } from 'os';

export class RootController extends Container {


   /** SETING */
   private _startDelay: number = 0.5 //s



   /** SETING */


    private _preloader: Preloader = {} as Preloader
    private _controller: BaseController = {} as BaseController;
    private _viwe: BaseViwe = {} as BaseViwe;
    private _cardsTexture: Array<string> = [];
    private _data: any;


    constructor(private _app: Application) {
        super();
        this.name = this.constructor.name;
        this.on(Event.PRELOADERCOMPLETE,this.gameStart);
        this.on(Event.LOADGAMESTART,this.loadGameStart);

    }


    init(): void {
        this._preloader = new Preloader(this).init();

        this._controller = new BaseController().init();
        this._viwe = new BaseViwe(this._controller);
        this._app.stage.addChild(this._controller);
    }

    //** Loaded asset *****************************************/
    //    Start                                               //
    //*********************************************************/

    loadGameStart(){
        this._data = new MessageMeneger(this).init();
    }

    loadGameAssets(data: any): Promise<void> {
        this._data = data;
        const cards = data.cards;
        return new Promise((res, rej) => {
            const loader = Loader.shared;

            for (let i = 0; i < cards.length; i++) {
                loader.add(cards[i].code, cards[i].image);
                this._cardsTexture.push(cards[i].code);
                // this._cardsTexture.push('eeer');
            }

            loader.onComplete.once(() => {
                this.onCompleteloadGameAssets();
            });

            loader.onProgress.once((e: any) => {
                //    console.log(e.progress);           
            });

            loader.onError.once(() => {
                rej();
            });

            loader.load();
        });
    }

    onCompleteloadGameAssets(): void {
        gsap.to(this,{
            delay:this._startDelay,
            callbackScope:this,
            onComplete:()=>{
                this._preloader.highPreLoader();
            }
        })
    }

    //** Loaded asset *****************************************/
    //         END                                            //
    //*********************************************************/


    gameStart(){
        gsap.to(this,{
            delay:this._startDelay,
            callbackScope:this,
            onComplete:()=>{
                this._viwe.start(10, this._cardsTexture);
            }
        })
    }
}

type CartType = {
    texture:string,
    id:string
}
