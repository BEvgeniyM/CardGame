import { Container } from 'pixi.js'
import { EventGame } from '../../components/EventGame';
import { UIViwe } from './UIViwe';
import { Animation } from '../../decorators/Animation';
import { SoundController } from '../../../SoundController';
import { EE } from '../../components/baseComponents/EE';
import { gsap } from "gsap";

export class UIController extends Container {
    private isOpenMenu: boolean = false
    private nextSound: string ='dion';

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
                viwe.lockBtnGameIU(false);           
                viwe.ectionOnHeroMy(false);
                viwe.ectionOnHeroMob(true);
                break;
            case EventGame.MOB_CLOSE_ROUND:  
                viwe.lockBtnGameIU(false);
                viwe.ectionOnHeroMy(true);
                viwe.ectionOnHeroMob(false);
                break;
            case EventGame.ROUND_END:
                viwe.lockBtnGameIU(true);
                break;
            case EventGame.ROUND_CLOSE:
                break;
            case EventGame.MOB_PICKUP_CARD:
                viwe.lockBtnGameIU(false);
                break;
            case EventGame.I_PICKUP_CARD:
                viwe.lockBtnGameIU(false);
                break;
            case EventGame.START_GAME:
                viwe.lockBtnGameIU(false);
                this.firastRound();
                SoundController.playSound('gludio')
                break;
            case EventGame.UI_SETTING:
                viwe.close();
                viwe.settingClick();
                viwe.closeBtn();
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
            case EventGame.UI_MENU_SOUN_ON: 
                SoundController.unmuteAllSound();
                break;    
            case EventGame.UI_MENU_SOUN_OFF: 
                SoundController.muteAllSound();
                break;               
            case EventGame.UI_MENU_SOUN_SWITCH: 
                SoundController.stopAllSound();
                if(this.nextSound == 'gludio'){    
                    this.nextSound = 'dion';       
                    SoundController.playSound('gludio');
                } else{
                    this.nextSound = 'gludio';
                    SoundController.playSound('dion');
                }             
                break;   
            case EventGame.UI_MENU_ANIMATION_ON:
                Animation.LockAnimation = true;
                break;    
            case EventGame.UI_MENU_ANIMATION_OFF:
                Animation.LockAnimation = false;
                break;     
        }
    }


    firastRound() {
        this._viwe.ectionOnHeroMy(true);
        this._viwe.ectionOnHeroMob(false);
    }

}