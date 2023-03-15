import { Container } from 'pixi.js'
import { EventGame } from '../../components/EventGame';
import { UIViwe } from './UIViwe';
import { DataSetting } from '../../../Utils/DataSetting';
import { EE } from '../../components/baseComponents/EE';

import gsap from 'gsap';

import * as PIXI from 'pixi.js'


export class UIController extends Container {
    private isOpenMenu: boolean = false

    constructor(private _viwe: UIViwe) {
        super();
        this.name = this.constructor.name;
        this.addChild(_viwe);
        this.zIndex = 100
    }

    init(): UIController {
        EE.Glob.on(EventGame.ACTION, this.action,this);
        return this;
    }


    action(action: string) {
        // debugger
        const viwe = this._viwe;
        switch (action) {
            case EventGame.I_CLOSE_ROUND:              
                viwe.lockBtn(false);
                viwe.ectionOnHeroMy(false);
                viwe.ectionOnHeroMob(true);
                break;
            case EventGame.MOB_CLOSE_ROUND:  
                viwe.lockBtn(false);
                viwe.ectionOnHeroMy(true);
                viwe.ectionOnHeroMob(false);
                break;
            case EventGame.ROUND_END:
                viwe.lockBtn(true);
                break;
            case EventGame.ROUND_CLOSE:
                viwe.lockBtn(true);
                break;
            case EventGame.MOB_PICKUP_CARD:
                debugger
                viwe.lockBtn(true);
                break;
            case EventGame.I_PICKUP_CARD:
                viwe.lockBtn(true);
                break;
            case EventGame.START_GAME:
                this.firastRound();
                break;
            case EventGame.UI_HELP:
                viwe.close();
                viwe.helpClick();
                viwe.closeBtn();
                break;
            case EventGame.UI_ABOUT:
                viwe.close();
                viwe.aboutClick();
                viwe.closeBtn();
                break;
            case EventGame.UI_MENU_CLOSE:
                viwe.close();
                viwe.clickOnMenu();                
                this.isOpenMenu = false;
                viwe.unLockBtn(false);
                break;
            case EventGame.UI_MENU_CLICK:
                this.isOpenMenu = !this.isOpenMenu;
                viwe.unLockBtn(this.isOpenMenu);
                viwe.clickOnMenu();
                viwe.close();
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