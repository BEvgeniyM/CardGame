import { Container, Application, Loader } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from './MessageMeneger';
import { BaseController } from './app/BaseController';
import { BaseViwe } from './app/BaseViwe';
import { Preloader } from './app/Preloader';
import { Event } from './app/Event';

export class RootController extends Container {

    private _preloader: Preloader = {} as Preloader
    private _controller: BaseController = {} as BaseController;
    private _viwe: BaseViwe = {} as BaseViwe;
    private _cardsTexture: Array<string> = [];
    private _data: any;

    constructor(private _app: Application) {
        super();
        this.name = this.constructor.name;
        this.on(Event.PRELOADERCOMPLETE,this.gameStart)
        
    }


    init(): void {

        this._preloader = new Preloader(this).init();
        this._data = new MessageMeneger(this).init();

        this._controller = new BaseController().init();
        this._viwe = new BaseViwe(this._controller);
        this._app.stage.addChild(this._controller);
    }

    loadGameAssets(data: any): Promise<void> {
        this._data = data;
        const cards = data.cards;
        return new Promise((res, rej) => {
            const loader = Loader.shared;

            for (let i = 0; i < cards.length; i++) {
                loader.add(cards[i].code, cards[i].image);
                this._cardsTexture.push(cards[i].code);
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
        this._preloader.highPreLoader();
    }

    gameStart(){
        this._viwe.start(10, this._cardsTexture);
    }



}
