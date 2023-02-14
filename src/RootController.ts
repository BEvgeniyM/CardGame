import { Container, Application, Loader } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from './MessageMeneger';
import { BaseController } from './app/BaseController';
import { BaseViwe } from './app/BaseViwe';
import { UIViwe } from './app/UIViwe';
import { UIController } from './app/UIController';
import { Preloader } from './app/Preloader';
import { Event } from './app/Event';
import { gsap } from "gsap";
import { type } from 'os';
import { DataSetting } from './Utils/DataSetting';

export class RootController extends Container {


    /** SETING */
    private _startDelay: number = 0.5 //s



    /** SETING */


    private _preloader: Preloader = {} as Preloader
    private _controller: BaseController = {} as BaseController;
    private _viwe: BaseViwe = {} as BaseViwe;
    private _UIviwe: UIViwe = {} as UIViwe;
    private _UIcontroller: UIController = {} as UIController;
    private _cardsTexture: Array<[string, string]> = [];
    private _data: any;
    private _chengeWhoseMoveID: boolean = false;


    constructor(private _app: Application) {
        super();
        this.name = this.constructor.name;
        _app.stage.addChild(this);

        this.on(Event.PRELOADERCOMPLETE, this.gameStart);
        this.on(Event.LOADGAMESTART, this.loadGameStart);
        this.on(Event.ACTION, this.anyEction);
    }


    init(): void {
        this._preloader = new Preloader(this).init();
        this.addChild(this._preloader);

        this._viwe = new BaseViwe();
        this._controller = new BaseController(this._viwe).init();
        this.addChild(this._controller);

        this._UIviwe = new UIViwe();
        this._UIcontroller = new UIController(this._UIviwe).init();
        this.addChild(this._UIcontroller);
    }

    //** Loaded asset *****************************************/
    //    Start                                               //
    //*********************************************************/

    loadGameStart() {
        this._data = new MessageMeneger(this).init();
    }

    loadGameAssets(data: any): Promise<void> {
        this._data = data;
        const cards = data.cards;
        return new Promise((res, rej) => {
            const loader = Loader.shared;

            for (let i = 0; i < cards.length; i++) {
                loader.add(cards[i].code, cards[i].image);
                this._cardsTexture.push([cards[i].code, cards[i].value]);
                // this._cardsTexture.push('eeer');
            }

            loader.onComplete.once(() => {
                this.onCompleteloadGameAssets();
            });

            loader.onProgress.once((e: any) => {
                console.log(e.progress);
                //    this._preloader.onProgress()          
            });

            loader.onError.once(() => {
                rej();
            });

            loader.load();
        });
    }

    onCompleteloadGameAssets(): void {
        gsap.to(this, {
            delay: this._startDelay,
            callbackScope: this,
            onComplete: () => {
                this._preloader.highPreLoader();
            }
        })
    }

    //** Loaded asset *****************************************/
    //         END                                            //
    //*********************************************************/


    gameStart() {
        gsap.to(this, {
            delay: this._startDelay,
            callbackScope: this,
            onComplete: () => {
                this._UIviwe.start();
                this._viwe.start(10, this._cardsTexture);
                this.firastRound();
            }
        })
    }


    anyEction(actoin: string) {
        // debugger
        switch (actoin) {
            case Event.ROUNDCLOSE_I:
                this._controller.emit(Event.ACTION, Event.ROUNDCLOSE_I);
                break;
            case Event.ROUNDCLOSE_MOB:
                this._UIcontroller.emit(Event.ACTION, Event.ROUNDCLOSE_MOB);
                break
            // case Event.ROUNDLOES_I:
            //     this._UIcontroller.emit(Event.ACTION, Event.ROUNDLOES_I);
            //     break;
            // case Event.ROUNDCLOSE_MOB:
            //     this._UIcontroller.emit(Event.ACTION, Event.ROUNDLOES_MOB);
            //     break;
            case Event.ROUNDCLOSE:
                this._UIcontroller.emit(Event.ACTION, Event.ROUNDCLOSE);
                break;
            case Event.PICKUPCARDS:
                break;
            case Event.PICKUPCARDSEND:
                break;
            case Event.CHECKCARDAND:
                this.preperNewRound();
                break;
            case Event.MYCARTONTABLE:
                break;
            default:
                break;
        }

    }




    preperNewRound() {
        if (this._chengeWhoseMoveID) {
            this._UIcontroller.preperNewRound();
        }

        this._controller.preperNewRound();
        this._chengeWhoseMoveID = false;
    }


    chengeWhoseMoveID(f: number): boolean {
        if (f != DataSetting.WhoseMoveID) {
            this._chengeWhoseMoveID = true;
            DataSetting.WhoseMoveID = f;
            return true
        }
        return false
    }


    firastRound() {
        this._UIcontroller.firastRound();
        this._controller.firastRound();
    }

}

type CartType = {
    texture: string,
    id: string
}
