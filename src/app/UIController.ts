import { Container } from 'pixi.js'
import { Event } from './Event';
import { UIViwe } from './UIViwe';
import { DataSetting } from '../Utils/DataSetting';
import { EE } from './Components/BaseComponents/EE';

import gsap from 'gsap';

import * as PIXI from 'pixi.js'


export class UIController extends Container {
    constructor(private _viwe: UIViwe) {
        super();
        this.name = this.constructor.name;
        this.addChild(_viwe);
        this.zIndex = 100
    }

    init(): UIController {
        // this.on(Event.UI_GETCART, this.getCart);
        // this.on(Event.UI_HELP, this.helpOpen);
        // this.on(Event.UI_MENU_OPEN, this.menuOpen);
        // this.on(Event.UI_MENU_CLOSE, this.menuClose);
        // this.on(Event.UI_RESET, this.reset);
        EE.Glob.on(Event.ACTION, this.action,this);
        return this;
    }


    action(action: string) {
        // debugger
        const viwe = this._viwe;
        switch (action) {
            case Event.I_CLOSE_ROUND:              
                viwe.lockBtn(false);
                viwe.ectionOnHeroMy(false);
                viwe.ectionOnHeroMob(true);
                break;
            case Event.MOB_CLOSE_ROUND:  
                viwe.lockBtn(false);
                viwe.ectionOnHeroMy(true);
                viwe.ectionOnHeroMob(false);
                break;
            case Event.ROUND_END:
                viwe.lockBtn(true);
                break;
            case Event.ROUND_CLOSE:
                viwe.lockBtn(true);
                break;
            case Event.MOB_PICKUP_CARD:
                debugger
                viwe.lockBtn(true);
                break;
            case Event.I_PICKUP_CARD:
                viwe.lockBtn(true);
                break;
            case Event.START_GAME:
                viwe.lockBtn(false);
                this.firastRound();
                break;
            case Event.UI_HELP:
                viwe.helpClick()
                break;
        }
    }


    // preperNewRound() {
    //     this._viwe.lockBtn(true);
    //     if (DataSetting.WhoseMoveID == 2) {
    //         this._viwe.ectionOnHeroMy(false);
    //         gsap.to(this, {
    //             delay: DataSetting.DefaultDeley,
    //             onComplete: () => {
    //                 this._viwe.ectionOnHeroMob(true);
    //             }
    //         })

    //     } else {
    //         this._viwe.ectionOnHeroMob(false);
    //         gsap.to(this, {
    //             delay: DataSetting.DefaultDeley,
    //             onComplete: () => {
    //                 this._viwe.ectionOnHeroMy(true);
    //             }
    //         })
    //     }
    // }

    firastRound() {
        this._viwe.ectionOnHeroMy(true);
        this._viwe.ectionOnHeroMob(false);
    }

}