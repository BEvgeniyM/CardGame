import { Container, Texture, Text, Graphics, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { Cart } from './Cart';
import { Event } from './Event';
import { StageController } from '../StageController';
import { Element,ElementConfig } from './Components/Element';
import { ElementContainer } from './Components/BaseComponents/ElementContainer';
import { CustomUtils } from '../Utils/CustomUtils'
import { BaseController } from './BaseController';
import { DataSetting } from '../Utils/DataSetting';
import { Cart_ } from './Cart_';

export class TableViwe extends Element {
    private _playr:Element;
    private _stock:Element[] = [];
    private _map = new Map();

    constructor(protected parent: Container, public config: ElementConfig){
        super(parent,config)
        for (let i = 0; i < this.childs.length; i++) {   
            if(this.childs[i].config?.name){
                this._map.set(this.childs[i].config?.name,this.childs[i])
            }
        }       
    }

    start(cartCount: number = 1, _cardsTexture: Array<[string, string]>): TableViwe {      

        for (let i = 0; i < _cardsTexture.length; i++) {   
            for (let i = 0; i < _cardsTexture.length; i++) {
                const elementContainer = this.element as ElementContainer;
                const element = elementContainer.childs[1].element;
                this._stock.push(new Cart_(element, DataSetting.CartS,_cardsTexture[i], _cardsTexture[0]));
              }
        }
        
      
        return this;
    }


    cartsFomeStack(){
        const elementContainer = this.element as ElementContainer;
        const element = elementContainer.childs[1].element;

        gsap.timeline({repeat:6, onComplete:()=>{
            
        }})
        .to(this,{
            delay:0.1,
            onComplete:()=>{
                this._stock.pop()?.animation.animaCartMove(elementContainer.childs[2].element)
            },
        }).to(this,{
            delay:0,
            onComplete:()=>{
                this._stock.pop()?.animation.animaCartMove(elementContainer.childs[3].element)
            }
        })
       
    }
   
}
   
