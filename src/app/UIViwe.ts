import { Container, DisplayObject, Sprite } from 'pixi.js'
import { EventGame } from './EventGame';
import { DataSetting } from '../Utils/DataSetting';

import { Button } from './Components/Button';
import { EE } from './Components/BaseComponents/EE';
import { WebFont } from './Components/BaseComponents/WebFont';
import { Element, ElementConfig } from './Components/Element';
import { ElementContainer } from './Components/BaseComponents/ElementContainer';



export class UIViwe extends Container {

    private _menuMessage: Element;
    private _helpElementConteiner: Element
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

        this._helpClose = new Button(this, DataSetting.HelpClose, ['pointerdown'], [this.helpClick.bind(this)]);
        this._helpPaper = new Button(this, DataSetting.HelpPaper, ['pointerdown'], [this.helpPaper.bind(this)]);
        this._menu = new Button(this, DataSetting.Menu, ['pointerdown'], [this.clickOnMenu.bind(this)]);


        this._btnTackCard_I = new Button(this, DataSetting.HeroMy, ['pointerdown'], [this.clickOnHeroMy.bind(this)]);
        this._btnTackCard_Mob = new Button(this, DataSetting.HeroMob, ['pointerdown'], [this.clickOnHeroMob.bind(this)]);

        const t = Object.assign({ parent: this }, DataSetting.TextHelp);

        this._menuMessage = new Element(this, DataSetting.MenuElementContaine);
        this._menuMessage.element.alpha = 0;

        (this._menuMessage.element as ElementContainer).childs[2].element.interactive = true;
        (this._menuMessage.element as ElementContainer).childs[2].element.interactiveChildren = true;
        (this._menuMessage.element as ElementContainer).childs[2].element.on('pointerdown', () => {
            EE.Glob.emit(EventGame.ACTION, EventGame.UI_HELP)
        });

        this._helpElementConteiner = new Element(this,DataSetting.HelpElementConteiner);
        this._helpElementConteiner.element.alpha = 0;

        this.creatHelp();

        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.resizeCanvas();
    }



    creatHelp() {          
        (this._menuMessage.element as ElementContainer).childs[0].animation.animationMeth();
        (this._menuMessage.element as ElementContainer).childs[0].animation.moveFromTo();

        for (let i = 1; i < (this._menuMessage.element as ElementContainer).childs.length; i++) {
            (this._menuMessage.element as ElementContainer).childs[i].animation.moveFromTo().moveFromToZ();
        }

        const btn = new Element(this._helpData, DataSetting.HelpBackGround).element

        this._helpData.addChild(this._helpPaper.element);
        // this._helpData.addChild(this._helpDataText);
        this._helpData.addChild(this._helpClose.element);
        this._helpData.visible = false
        this.addChild(this._helpData);
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

    helpseal() {
    }

    helpClick() {
        this._helpElementConteiner.animation.alphaAnimation(this._helpElementConteiner.element.alpha < 1 ? true : false);
    }

    clickOnMenu() {
        this._menuMessage.animation.alphaAnimation(this._menuMessage.element.alpha < 1 ? true : false);      
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       resizeCanvas                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////



    resizeCanvas() {
    }

}