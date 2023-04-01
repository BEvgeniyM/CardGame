import { Container, DisplayObject, Sprite } from 'pixi.js'
import { EventGame } from '../../components/EventGame';
import { DataSetting } from './DataSetting';

import { Button } from '../../components/Button';
import { EE } from '../../components/baseComponents/EE';
import { WebFont } from '../../components/baseComponents/WebFont';
import { Element, ElementConfig } from '../../components/Element';
import { ElementContainer } from '../../components/baseComponents/ElementContainer';



export class UIViwe extends Container {

    private _menuElementContaine: Element;
    private _helpElementConteiner: Element;
    private _aboutElementConteiner: Element;
    // private _helpBackGroundContainer: Element;
    private _settingElementContaine: Element;

    private _btnTackCard_I: Button;
    private _btnTackCard_Mob: Button;
    private _menu: Button;



    constructor() {
        super()
        this.sortableChildren = true;
        this.zIndex = 1000;
        this.sortChildren();
    }

    start(): void {

        this._menu = new Button(this, DataSetting.Menu, ['pointerdown'], [this.ectioOnMenu.bind(this)]);

        this._btnTackCard_I = new Button(this, DataSetting.HeroMy, ['pointerdown'], [this.clickOnHeroMy.bind(this)]);
        this._btnTackCard_Mob = new Button(this, DataSetting.HeroMob, ['pointerdown'], [this.clickOnHeroMob.bind(this)]);

        const t = Object.assign({ parent: this }, DataSetting.TextHelp);

        this._menuElementContaine = new Element(this, DataSetting.MenuElementContaine);
        this._menuElementContaine.element.alpha = 0;
        this._menuElementContaine.element.visible = false;


        (this._menuElementContaine.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_SETTING)
        });
        (this._menuElementContaine.element as ElementContainer).childs[3].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_HELP)
        });
        (this._menuElementContaine.element as ElementContainer).childs[4].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_ABOUT)
        });


        // this._helpBackGroundContainer = new Element(this,DataSetting.HelpBackGroundContainer);
        // this._helpBackGroundContainer.element.alpha = 0;

        // (this._helpBackGroundContainer.element as ElementContainer).childs[0].element.on('pointerdown', () => {
        //     EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_CLOSE)
        // });


        this._helpElementConteiner = new Element(this,DataSetting.HelpElementConteiner);
        this._helpElementConteiner.element.alpha = 0;
        this._helpElementConteiner.element.visible = false;


        (this._helpElementConteiner.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_CLOSE)
        });

        this._aboutElementConteiner = new Element(this,DataSetting.AboutElementConteiner);
        this._aboutElementConteiner.element.alpha = 0;
        this._aboutElementConteiner.element.visible = false;


        (this._aboutElementConteiner.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_CLOSE);
            (this._aboutElementConteiner.element as ElementContainer).childs[2].animation.animaLittleMove();
        });

        this._settingElementContaine = new Element(this,DataSetting.SettingElementContaine);
        this._settingElementContaine.element.alpha = 0;
        this._settingElementContaine.element.visible = false;


        (this._settingElementContaine.element as ElementContainer).childs[1].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_SOUN_ON);
            (this._settingElementContaine.element as ElementContainer).childs[1].animation.animaLittleMove();
        });
        (this._settingElementContaine.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_SOUN_SWITCH);
            (this._settingElementContaine.element as ElementContainer).childs[2].animation.animaLittleMove();
        });
        (this._settingElementContaine.element as ElementContainer).childs[3].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_SOUN_OFF);
            (this._settingElementContaine.element as ElementContainer).childs[3].animation.animaLittleMove();
        });
        (this._settingElementContaine.element as ElementContainer).childs[4].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_ANIMATION_ON);
            (this._settingElementContaine.element as ElementContainer).childs[4].animation.animaLittleMove();
        });
        (this._settingElementContaine.element as ElementContainer).childs[5].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_ANIMATION_OFF);
            (this._settingElementContaine.element as ElementContainer).childs[5].animation.animaLittleMove();
        });


        

        this.creatHelp();
    }



    creatHelp() {          
        (this._menuElementContaine.element as ElementContainer).childs[1].animation.animationMeth();
        (this._menuElementContaine.element as ElementContainer).childs[1].animation.moveFromTo();

        for (let i = 1; i < (this._menuElementContaine.element as ElementContainer).childs.length; i++) {
            (this._menuElementContaine.element as ElementContainer).childs[i].animation.moveFromTo().moveFromToZ();
        }
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    clickOnHeroMob(f: boolean = true) {
    }
    clickOnHeroMy(f: boolean = true) {
        EE.Glob.emit(EventGame.ACTION, EventGame.I_CLOSE_ROUND);
    }
    ectionOnHeroMy(f: boolean = true) {
        this.ectionOnHero(this._btnTackCard_I, f);
    }
    ectionOnHeroMob(f: boolean = true) {
        this.ectionOnHero(this._btnTackCard_Mob, f);
    }
    ectionOnHero(s: Button, f: boolean) {
        if (f == true) {
            s.animation.rotatingAndСhangingTexture(s.config.t);
        } else s.animation.rotatingAndСhangingTexture(s.config.tb);
    }
    ectioOnMenu() {
        EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_CLICK);
        (this._menu as Element).animation.animaLittleMove();
    }


    lockBtnGameIU(f: boolean): void {
        this._btnTackCard_I.element.interactive = f;
        this._btnTackCard_Mob.element.interactive = f;
    }
    unLockBtn(f: boolean): void { 
        console.log('fffff',f);
        this._menuElementContaine.element.interactiveChildren = f       
        this._helpElementConteiner.element.interactiveChildren = false
        this._aboutElementConteiner.element.interactiveChildren = false
        // this._helpBackGroundContainer.element.interactiveChildren = false
        this._settingElementContaine.element.interactiveChildren = f
    }



    helpPaper() {
    }

    clickOnMenu() {
        this._menuElementContaine.animation.alphaAnimation(); 
    }

    helpClick() {
        this._helpElementConteiner.animation.alphaAnimation();
    }

    aboutClick() {
        this._aboutElementConteiner.animation.alphaAnimation();
    }

    settingClick() {
        this._settingElementContaine.animation.alphaAnimation();
    }

    closeBtn() {
        // this._helpBackGroundContainer.animation.alphaAnimation();
    }
    close(){
        this._helpElementConteiner.element.alpha !=0 && this._helpElementConteiner.animation.alphaToZeroAnimation();
        this._aboutElementConteiner.element.alpha !=0 && this._aboutElementConteiner.animation.alphaToZeroAnimation();
        // this._helpBackGroundContainer.element.alpha !=0 && this._helpBackGroundContainer.animation.alphaToZeroAnimation();
        this._settingElementContaine.element.alpha !=0 && this._settingElementContaine.animation.alphaToZeroAnimation();
    }

    


}