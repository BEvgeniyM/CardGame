import { Container } from 'pixi.js'
import { Event } from './Event';
import { UIViwe } from './UIViwe';
import { DataSetting } from '../Utils/DataSetting';
import gsap from 'gsap';

import * as PIXI from 'pixi.js'


export class UIController extends Container {
    constructor(private _viwe: UIViwe) {
        super();
        this.name = this.constructor.name;
        this.addChild(_viwe);
    }

    init(): UIController {
        this.on(Event.UI_GETCART, this.getCart);
        // this.on(Event.UI_HELP, this.helpOpen);
        // this.on(Event.UI_MENU_OPEN, this.menuOpen);
        // this.on(Event.UI_MENU_CLOSE, this.menuClose);
        // this.on(Event.UI_RESET, this.reset);

        this.on(Event.ACTION, this.action);
        return this;
    }


    action(action: string) {
        // debugger
        switch (action) {
            case Event.I_CLOSE_ROUND:
                this.parent.emit(Event.ACTION, Event.I_CLOSE_ROUND);
                this._viwe.lockBtn(false);
                this._viwe.ectionOnHeroMy(false);
                this._viwe.ectionOnHeroMob(true);
                break;
            case Event.MOB_CLOSE_ROUND:  
                this._viwe.lockBtn(false);
                this._viwe.ectionOnHeroMy(true);
                this._viwe.ectionOnHeroMob(false);
                break;
            case Event.ROUND_CLOSE:
                debugger
                this._viwe.lockBtn(true);
                break;
        }
    }

    // roundCloseI() {
    //     //   DataSetting.WhoseMoveID = 2;

    // }

    getCart() {

    }
    helpOpen() {

    }
    menuOpen() {
    }
    menuClose() {

    }
    reset() {

    }

    preperNewRound() {
        this._viwe.lockBtn(true);
        if (DataSetting.WhoseMoveID == 2) {
            this._viwe.ectionOnHeroMy(false);
            gsap.to(this, {
                delay: DataSetting.DefaultDeley,
                onComplete: () => {
                    this._viwe.ectionOnHeroMob(true);
                }
            })

        } else {
            this._viwe.ectionOnHeroMob(false);
            gsap.to(this, {
                delay: DataSetting.DefaultDeley,
                onComplete: () => {
                    this._viwe.ectionOnHeroMy(true);
                }
            })
        }
    }

    firastRound() {
        this._viwe.lockBtn(false);
        this._viwe.ectionOnHeroMy(true);
        this._viwe.ectionOnHeroMob(false);
    }

}