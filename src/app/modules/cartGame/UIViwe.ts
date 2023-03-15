import { Container, DisplayObject, Sprite } from 'pixi.js'
import { EventGame } from '../../components/EventGame';
import { DataSetting } from '../../../Utils/DataSetting';

import { Button } from '../../components/Button';
import { EE } from '../../components/baseComponents/EE';
import { WebFont } from '../../components/baseComponents/WebFont';
import { Element, ElementConfig } from '../../components/Element';
import { ElementContainer } from '../../components/baseComponents/ElementContainer';



export class UIViwe extends Container {

    private _menuMessage: Element;
    private _helpElementConteiner: Element;
    private _aboutElementConteiner: Element;
    private _helpBackGroundContainer: Element;



    
    private _close: Sprite;
    private _winPanel: Sprite;
    private _heroMy: Sprite;
    private _heroMob: Sprite;

    private _helpDataText: WebFont;
    private _helpseal: Sprite;

    private _helpData = new Container()

    private _helpClose: Button;
    private _helpPaper: Button;
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

        this._menu = new Button(this, DataSetting.Menu, ['pointerdown'], [this.clickOnMenu.bind(this)]);


        this._btnTackCard_I = new Button(this, DataSetting.HeroMy, ['pointerdown'], [this.clickOnHeroMy.bind(this)]);
        this._btnTackCard_Mob = new Button(this, DataSetting.HeroMob, ['pointerdown'], [this.clickOnHeroMob.bind(this)]);

        const t = Object.assign({ parent: this }, DataSetting.TextHelp);


        this._helpBackGroundContainer = new Element(this,DataSetting.HelpBackGroundContainer);
        this._helpBackGroundContainer.element.alpha = 0;

        (this._helpBackGroundContainer.element as ElementContainer).childs[1].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_CLOSE)
        });


        this._menuMessage = new Element(this, DataSetting.MenuElementContaine);
        this._menuMessage.element.alpha = 0;

        (this._menuMessage.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_HELP)
        });
        (this._menuMessage.element as ElementContainer).childs[3].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_ABOUT)
        });


        this._helpElementConteiner = new Element(this,DataSetting.HelpElementConteiner);
        this._helpElementConteiner.element.alpha = 0;

        (this._helpElementConteiner.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_CLOSE)
        });


        this._aboutElementConteiner = new Element(this,DataSetting.AboutElementConteiner);
        this._aboutElementConteiner.element.alpha = 0;

        (this._aboutElementConteiner.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_MENU_CLOSE)
        });


        this.creatHelp();
    }



    creatHelp() {          
        (this._menuMessage.element as ElementContainer).childs[0].animation.animationMeth();
        (this._menuMessage.element as ElementContainer).childs[0].animation.moveFromTo();

        for (let i = 1; i < (this._menuMessage.element as ElementContainer).childs.length; i++) {
            (this._menuMessage.element as ElementContainer).childs[i].animation.moveFromTo().moveFromToZ();
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



    lockBtn(f: boolean): void {        
        // this._btnTackCard_I.element.interactiveChildren = f;
        // this._btnTackCard_Mob.element.interactiveChildren = f; 
        // this.interactiveChildren = f;
    }



    helpPaper() {
    }

    clickOnMenu() {
        // this._menuMessage.element.visible = !this._menuMessage.element.visible
        this._menuMessage.animation.alphaAnimation(this._menuMessage.element.alpha < 1 ? true : false);      
        this.helpBack();
    }

    helpClick() {
        this._helpElementConteiner.animation.alphaAnimation(this._helpElementConteiner.element.alpha < 1 ? true : false);
    }

    aboutClick() {
        this._aboutElementConteiner.animation.alphaAnimation(this._aboutElementConteiner.element.alpha < 1 ? true : false);
        // this._helpBackGroundContainer.element.alpha < 1 && this._helpBackGroundContainer.animation.alphaAnimation(false);
    }

    helpBack() {
        this._helpBackGroundContainer.animation.alphaAnimation(this._helpBackGroundContainer.element.alpha < 1 ? true : false);
        // this._aboutElementConteiner.element.alpha < 1 && this._aboutElementConteiner.animation.alphaAnimation(false);
    }
    close(){
        
    }

    helpClose() {
        this._helpElementConteiner.animation.alphaAnimation(this._helpElementConteiner.element.alpha < 1 ? true : false);
        this._aboutElementConteiner.animation.alphaAnimation(this._aboutElementConteiner.element.alpha < 1 ? true : false);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       resizeCanvas                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

}