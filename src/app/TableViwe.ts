import { Container, Texture, Text, Graphics, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { Cart } from './Cart';
import { Event } from './Event';
import { StageController } from '../StageController';
import { Element, ElementConfig } from './Components/Element';
import { ElementContainer } from './Components/BaseComponents/ElementContainer';
import { CustomUtils } from '../Utils/CustomUtils'
import { BaseController } from './BaseController';
import { DataSetting } from '../Utils/DataSetting';
import { Cart_ } from './Cart_';
import { EventEmitter } from 'eventemitter3'
import { EE } from './Components/BaseComponents/EE';


export class TableViwe extends Element {
    private _playr: Element;
    private _stock: Element[] = [];
    public _map = new Map();
    static TopContainer: ElementContainer;


    constructor(parent: Container, public config: ElementConfig) {
        super(parent, config)
        const elementContainer = this.element as ElementContainer;
        for (let i = 0; i < elementContainer.childs.length; i++) {
            if (elementContainer.childs[i].config?.name) {
                this._map.set(elementContainer.childs[i].config?.name, elementContainer.childs[i])
            }
        }
    }

    start(cartCount: number = 1, _cardsTexture: Array<[string, string]>): TableViwe {
        const stocElementContaine = this._map.get('StocElementContaine').element as ElementContainer;

        for (let i = 0; i < _cardsTexture.length; i++) {
            const cnf = Object.assign({ tb: _cardsTexture[i][0], z: i }, DataSetting.CartS);
            this._stock.push(new Cart_(stocElementContaine, cnf, _cardsTexture[i], _cardsTexture[0]));
        }
        return this;
    }


    cartsFomeStack(m: number = 6, i: number = 6) {
        const elementContainer = this.element as ElementContainer;
        const playrElementContaine = this._map.get('PlayrElementContaine');
        const mobElementContaine = this._map.get('MobElementContaine');


        const cm = mobElementContaine.element.childs.length
        const cp = playrElementContaine.element.childs.length
        const r = gsap.timeline({
            // delay:6,
            onComplete: () => {
                EE.Glob.emit(Event.ACTION, Event.ROUND_END)
            }
        })

        for (let i = cm; i < 6; i++) {
            this._stock.pop()?.animation.animaCartMove(mobElementContaine, r)
            // this._stock.pop()?.animation.animaCartMover(mobElementContaine,null, i* 0.5)            
        }

        for (let i = cp; i < 6; i++) {
            const cart = this._stock.pop();
            cart?.element.on('pointerdown', () => { EE.Glob.emit(Event.ACTION, Event.SELECTED_CART, cart) }, this);
            // cart?.animation.animaCartMover(playrElementContaine,null, i* 0.5);            
            cart?.animation.animaCartMove(playrElementContaine, r);
        }
    }

    majorMastOpen(): void {
        this._stock[0].animation.majorMastOpen();
    }

    mobPickUpCarts() {
        const elementContainer = this._map.get('MobElementContaine');
        const TableContaine = this._map.get('TableContaine');

        while (TableContaine.childs.length != 0) {
            TableContaine.childs[0].animation.rotatingAndСhangingTexture(elementContainer.childs[0].config.t);
            TableContaine.childs[0].element.removeAllListeners();
            TableContaine.childs[0].animation.animaCartMover(elementContainer);
        }
    }

    PlayrPickUpCarts() {
        debugger
        const elementContainer = this._map.get('PlayrElementContaine');
        const TableContaine = this._map.get('TableContaine');

        
        while (TableContaine.childs.length != 0) {            
            // TableContaine.childs[0].element.on('pointerdown', () => {
            //     EE.Glob.emit(Event.ACTION, Event.SELECTED_CART, TableContaine.childs[0])
            // },  TableContaine.childs[0]);
            // TableContaine.childs[0].animation.rotatingAndСhangingTexture(elementContainer.childs[0].config.t);          
            // TableContaine.childs[0].animation.animaCartMover(elementContainer);
            elementContainer.element.moveElement(TableContaine.childs[0]).animation.cartMoveToCenter();
        }
    }

    moveToEdge() {
        const elementContainer = this._map.get('EdgeElementContaine');
        const TableContaine = this._map.get('TableContaine');

        while (TableContaine.childs.length != 0) {
            TableContaine.childs[0].animation.animaCartMover(elementContainer);
        }
    }

    iPickUpCarts() {
        debugger
        const elementContainer = this._map.get('PlayrElementContaine');
        const TableContaine = this._map.get('TableContaine');

        while (TableContaine.childs.length != 0) {
            TableContaine.childs[0].animation.rotatingAndСhangingTexture(elementContainer.childs[0].config.t);
            TableContaine.childs[0].animation.animaCartMover(elementContainer);
        }
    }
    openMobCarts() {
        const elementContainer = this._map.get('MobElementContaine').element as ElementContainer;
        for (let i = 0; i < elementContainer.childs.length; i++) {
            elementContainer.childs[i].animation.rotatingAndСhangingTexture(elementContainer.childs[i].config.tb);
            // elementContainer.childs[0].element.on('pointerdown', () => {
            //     EE.Glob.emit(Event.ACTION, Event.SELECTED_CART, elementContainer.childs[0])
            // }, elementContainer.childs[0].element);
        }
    }
    openMyCarts() {
        const elementContainer = this._map.get('PlayrElementContaine').element as ElementContainer;
        for (let i = 0; i < elementContainer.childs.length; i++) {
            elementContainer.childs[i].animation.rotatingAndСhangingTexture(elementContainer.childs[i].config.tb);

        }
    }
    rotetStockMy() {
        const elementContainer = this._map.get('PlayrElementContaine').element as ElementContainer;
        this.rotetStock(elementContainer, 90)
    }
    rotetStockMob() {
        const elementContainer = this._map.get('MobElementContaine').element as ElementContainer;
        this.rotetStock(elementContainer, -90)
    }
    rotetStock(elementContainer: ElementContainer, a: number): void {
        gsap.to(elementContainer, {
            angle: -elementContainer.childs.length / 2 * 15,
            duration: 2 * DataSetting.DefaultDuration
        })
        for (let i = 0; i < elementContainer.childs.length; i++) {
            const csp = elementContainer.childs[i].element as Sprite
            csp.angle = 0;
            csp.anchor.set(0.5, 1.2);

            gsap.to(csp, {
                angle: i * 15 - 75 + a,
                duration: DataSetting.DefaultDuration
            })
        }
    }
    


}

