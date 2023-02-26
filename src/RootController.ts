import { Container, Application, Loader } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from './MessageMeneger';
import { BaseController } from './app/BaseController';
import { BaseViwe } from './app/BaseViwe';
import { TableViwe } from './app/TableViwe';
import { TableController } from './app/TableController';
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


    private _preloader: Preloader;
    private _controller: BaseController;
    private _viwe: BaseViwe;
    private _table: TableViwe;
    private _tableController: TableController;
    private _UIviwe: UIViwe;
    private _UIcontroller: UIController;
    private _cardsTexture: Array<[string, string]> = [];
    private _data: any;
    private _chengeWhoseMoveID: boolean = false;


    constructor(private _app: Application) {
        super();
        this.name = this.constructor.name;
        this.sortableChildren = true;
        this.sortChildren();
        _app.stage.addChild(this);

        this.on(Event.PRELOADER_COMPLETE, this.gameStart);
        this.on(Event.LOAD_GAME_START, this.loadGameStart);
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
                // this._table = new TableViwe(this,DataSetting.TableElementContaine).start(10, this._cardsTexture);
                // this._tableController = new TableController(this._table)
                this._UIviwe.start();
                this._viwe.start(10, this._cardsTexture);
                this.firastRound();
            }
        })
    }


    anyEction(actoin: string) {
        // debugger
        switch (actoin) {
            case Event.I_CLOSE_ROUND:
                this._controller && this._controller.emit(Event.ACTION, Event.I_CLOSE_ROUND);
                this._tableController && this._tableController.emit(Event.ACTION, Event.I_CLOSE_ROUND);
                break;
            case Event.MOB_CLOSE_ROUND:
                this._UIcontroller.emit(Event.ACTION, Event.MOB_CLOSE_ROUND);
                break
            case Event.I_CLOSE_ROUND:
                break;
            case Event.MOB_CLOSE_ROUND:
                break;
            case Event.ROUND_CLOSE:
                this._UIcontroller.emit(Event.ACTION, Event.ROUND_CLOSE);
                break;
            case Event.PICKUP_CARDS_END:
                break;
            case Event.CHECK_CARD_AND:
                this.preperNewRound();
                break;
            case Event.I_MOVE_CARD_ON_TABLE:
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
