import { Container } from 'pixi.js'
import { Event } from './Event';
import { BaseViwe } from './BaseViwe';
import * as PIXI from 'pixi.js'


export class UIViwe extends Container {
    constructor(){
        super()
        this.init()
    }

    init(): void {
        this.cretBtn('GET_CART').on('pointerdown', ()=>{this.parent.emit(Event.UI_GETCART)});
    }

    cretBtn(s:string){
        const btn = new PIXI.Graphics();
        btn.name = s
        btn.beginFill(0xFFFFFF)
        btn.drawRect(0, 0, 100, 50)
        btn.endFill();
        btn.position.set(0, 0);
        btn.alpha = 1;
        this.addChild(btn);
        return btn
    }
}