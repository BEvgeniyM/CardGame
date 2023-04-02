import { Container, Texture, Text, Graphics, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { EventGame } from '../../components/EventGame';
import { StageController } from '../../../StageController';
import { Element, ElementConfig } from '../../components/Element';
import { ElementContainer } from '../../components/baseComponents/ElementContainer';
import { CustomUtils } from '../../../Utils/CustomUtils'
import { DataSetting } from './DataSetting';
import { Card } from './Card';
import { EventEmitter } from 'eventemitter3'
import { EE } from '../../components/baseComponents/EE';


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

    start(cardCount: number = 1, _cardsTexture: Array<[string, string]>): TableViwe {
        const stocElementContaine = this._map.get('StocElementContaine').element as ElementContainer;

        for (let i = 0; i < _cardsTexture.length; i++) {
            const cnf = Object.assign({ tb: _cardsTexture[i][0], z: i }, DataSetting.CardS);
            this._stock.push(new Card(stocElementContaine, cnf, _cardsTexture[i], _cardsTexture[0]));
        }
        return this;
    }

    addEventToPlayrCard() {
        console.log("addEventToPlayrCard");  
        const pec = this._map.get('PlayrElementContaine').element.childs;
        for (let i = 0; i < pec.length; i++) {
            const card = pec[i];
            card?.element.removeAllListeners();
            // console.log(i,card);            
            card?.element.on(EventGame.POINTE, () => {
                console.log('click',card, this);                
                EE.Glob.emit(EventGame.ACTION, EventGame.SELECTED_CART, card)
            }, this);
        }
    }
    removeEventToPlayrCard() {
        console.log('removeEventToPlayrCard');       
        const pec = this._map.get('PlayrElementContaine').element.childs;
        for (let i = 0; i < pec.length; i++) {
            const card = pec[i];
            card?.element.removeAllListeners();
        }
    }


    cardsFomeStack(m: number = 6, i: number = 6) {
        const elementContainer = this.element as ElementContainer;
        const playrElementContaine = this._map.get('PlayrElementContaine');
        const mobElementContaine = this._map.get('MobElementContaine');


        const cm = mobElementContaine.element.childs.length
        const cp = playrElementContaine.element.childs.length
        const r = gsap.timeline({
            onComplete: () => {
                EE.Glob.emit(EventGame.ACTION, EventGame.ROUND_END)
            }
        })

        for (let i = cm; i < 6; i++) {
            this._stock.pop()?.animation.animaCardMove(mobElementContaine, r)
        }

        for (let i = cp; i < 6; i++) {
            const card = this._stock.pop();
            // card?.element.on('pointerup', () => { EE.Glob.emit(EventGame.ACTION, EventGame.SELECTED_CART, card) }, this);
            card?.animation.animaCardMove(playrElementContaine, r);
        }
    }

    majorMastOpen(): void {
        this._stock[0].animation.majorMastOpen();
    }

    mobPickUpCards() {
        const elementContainer = this._map.get('MobElementContaine');
        const TableContaine = this._map.get('TableContaine');

        while (TableContaine.childs.length != 0) {
            TableContaine.childs[0].animation.rotatingAndСhangingTexture(elementContainer.childs[0].config.t);
            TableContaine.childs[0].element.removeAllListeners();
            TableContaine.childs[0].animation.animaCardMover(elementContainer);
        }
    }

    PlayrPickUpCards() {
        const elementContainer = this._map.get('PlayrElementContaine');
        const TableContaine = this._map.get('TableContaine');

        
        while (TableContaine.childs.length != 0) {     
            elementContainer.element.moveElement(TableContaine.childs[0]).animation.cardMoveToCenter();
        }
    }

    moveToEdge() {
        const elementContainer = this._map.get('EdgeElementContaine');
        const TableContaine = this._map.get('TableContaine');

        while (TableContaine.childs.length != 0) {
            TableContaine.childs[0].animation.animaCardMover(elementContainer);
        }
    }

    iPickUpCards() {
        const elementContainer = this._map.get('PlayrElementContaine');
        const TableContaine = this._map.get('TableContaine');

        while (TableContaine.childs.length != 0) {
            TableContaine.childs[0].animation.rotatingAndСhangingTexture(elementContainer.childs[0].config.t);
            TableContaine.childs[0].animation.animaCardMover(elementContainer);
        }
    }
    openMobCards() {
        const elementContainer = this._map.get('MobElementContaine').element as ElementContainer;
        for (let i = 0; i < elementContainer.childs.length; i++) {
            elementContainer.childs[i].animation.rotatingAndСhangingTexture(elementContainer.childs[i].config.tb);
        }
    }
    openMyCards() {
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

