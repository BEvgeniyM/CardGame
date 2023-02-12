import { Container } from 'pixi.js'
import { Event } from './Event';
import { UIViwe } from './UIViwe';
import { DataSetting } from '../Utils/DataSetting';

import * as PIXI from 'pixi.js'


export class UIController extends Container {
    constructor(private _viwe:UIViwe) {
        super();
        this.name = this.constructor.name;
        this.addChild(_viwe);
    }

    init(): UIController {
        this.on(Event.UI_GETCART, this.getCart);
        this.on(Event.UI_HELP, this.helpOpen);
        this.on(Event.UI_MENU_OPEN,this.menuOpen);
        this.on(Event.UI_MENU_CLOSE,this.menuClose);
        this.on(Event.UI_RESET,this.reset);
        this.on(Event.ROUNDCLOSE,this.roundCloseI);
        return this;
    }


    roundCloseI(){
      DataSetting.WhoseMoveID = 0; 
      this.parent.emit(Event.ACTION,Event.ROUNDCLOSE);
    }

    getCart(){

    }
    helpOpen(){
        
    }
    menuOpen(){
        debugger
    }
    menuClose(){
        
    }
    reset(){

    }
}