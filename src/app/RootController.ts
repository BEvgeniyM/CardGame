import {Container, Application,Loader} from  'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from './MessageMeneger';
import { BaseController } from './BaseController';
import { BaseViwe } from './BaseViwe';


export class RootController extends Container{

private _controller: BaseController = {} as BaseController;
private _viwe: BaseViwe = {} as BaseViwe;
private _cardsTexture: Array<string> = [];

constructor(private _app: Application, private _data:any){
    super();
    this.name = this.constructor.name;
    this.loadGameAssets(this._data.cards);   
}


init(){  
    this._controller = new BaseController().init();
    this._app.stage.addChild(this._controller);

    this._viwe = new BaseViwe(this._controller, this._cardsTexture).init(10);
}

 loadGameAssets(cards:any): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;

        for (let i = 0; i < cards.length; i++) {
            loader.add(cards[i].code, cards[i].image);
            this._cardsTexture.push(cards[i].code);
        }        

        loader.onComplete.once(() => {
            this.onComplete();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

onComplete (){
 this.init();
}



}
  