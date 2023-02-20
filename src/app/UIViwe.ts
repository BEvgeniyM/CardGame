import { Container, DisplayObject, Sprite } from 'pixi.js'
import { Event } from './Event';
import { BaseViwe } from './BaseViwe';
import { Cart } from './Cart';
import { CustomUtils } from '../Utils/CustomUtils'
import { BaseController } from './BaseController';
import { setDefaultResultOrder } from 'dns';
import { DataSetting } from '../Utils/DataSetting';

import { Button } from './Components/Button';
import { ElementContainer } from './Components/ElementContainer';
import {WebFont} from './Components/BaseComponents/WebFont';
import * as PIXI from 'pixi.js'
import gsap from 'gsap';
import {Element, ElementConfig } from './Components/Element';



export class UIViwe extends Container {

    private _menuMessage: ElementContainer;
    private _close: Sprite;
    private _winPanel: Sprite;
    private _heroMy: Sprite;
    // private _heroMy: DisplayObject;
    private _heroMob: Sprite;
   
    private _helpDataText: WebFont;
    private _helpseal: Sprite;

    private _helpData = new Container()

    private _helpClose: Button;
    private _helpPaper: Button;
    private _btnTackCard_I: Button;
    private _btnTackCard_Mob: Button;
    private _menu: Button;

    constructor(){
        super()
        // this.interactiveChildren = true
        this.sortableChildren = true
        this.sortChildren();
    }

    start(): void {
        
        this._helpClose =  new Button (this,DataSetting.HelpClose,['pointerdown'],[this.helpClick.bind(this)]);
        this._helpPaper =  new Button (this,DataSetting.HelpPaper,['pointerdown'],[this.helpPaper.bind(this)]);
        this._menu =  new Button (this,DataSetting.Menu,['pointerdown'],[this.clickOnMenu.bind(this)]);


        this._btnTackCard_I =  new Button (this,DataSetting.HeroMy,['pointerdown'],[this.clickOnHeroMy.bind(this)]);
        this._btnTackCard_Mob =  new Button (this,DataSetting.HeroMob,['pointerdown'],[this.clickOnHeroMob.bind(this)]);

        const t = Object.assign({parent:this}, DataSetting.TextHelp);        
        this._helpDataText = new WebFont('_helpDataText',t);
        

        this.creatHelp();

        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.resizeCanvas();
    }
    


    creatHelp(){
        this._menuMessage = new ElementContainer(this,DataSetting.MessageHelp);
        this._menuMessage.messageContainer.visible = false
        for (let i = 1; i < this._menuMessage.child.length; i++) {
            this._menuMessage.child[i].animation.moveFromTo();
        }
        //@ts-ignore()
        this._menuMessage.child[0].element.setScale();
        this._menuMessage.child[0].animation.animationMeth();


        const btn = new Element(this._helpData,DataSetting.HelpBackGround).element
        this._helpData.addChild(this._helpPaper.element);
        this._helpData.addChild(this._helpDataText);
        this._helpData.addChild(this._helpClose.element);
        this._helpData.visible =false
        this.addChild(this._helpData);

      
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    clickOnHeroMob(f:boolean = true){
    }
    clickOnHeroMy(f:boolean = true){
        this.parent.emit(Event.ACTION,Event.I_CLOSE_ROUND);
    }
    ectionOnHeroMy(f:boolean = true){
        this.ectionOnHero(this._btnTackCard_I,f);
    }
    ectionOnHeroMob(f:boolean = true){
        this.ectionOnHero(this._btnTackCard_Mob,f);
    }
    ectionOnHero(s:Button,f:boolean){
        if(f == true){
            s.animation.rotatingAndСhangingTexture(s.config.t);
        } else s.animation.rotatingAndСhangingTexture(s.config.tb);
    }

   

    lockBtn(f:boolean):void{
      this.interactiveChildren = f;
    }



    helpPaper(){
    }

    helpseal(){
    }

    helpClick(){
        this._helpData.visible = false;
    }

    clickOnMenu(){        
        this._menuMessage.messageContainer.visible = !this._menuMessage.messageContainer.visible;
        debugger
        // this._menuMessage.animation.alphaAnimation(this._menuMessage.messageContainer.visible)
        for (let i = 0; i < this._menuMessage.child.length; i++) {
            this._menuMessage.child[i].animation.alphaAnimation(this._menuMessage.messageContainer.visible);
        }
        // this._helpData.visible = true;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       resizeCanvas                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////



    resizeCanvas(){
        CustomUtils.SetScaleOfProz(this._menu.element as PIXI.Sprite, DataSetting.Menu);
        CustomUtils.GoToProz(this._menu.element,DataSetting.Menu);

        CustomUtils.SetScaleOfProz(this._btnTackCard_I.element as PIXI.Sprite, DataSetting.HeroMy);
        CustomUtils.GoToProz(this._btnTackCard_I.element,DataSetting.HeroMy);

        CustomUtils.SetScaleOfProz(this._btnTackCard_Mob.element as PIXI.Sprite, DataSetting.HeroMob);
        CustomUtils.GoToProz(this._btnTackCard_Mob.element,DataSetting.HeroMob);

        CustomUtils.setPositionAndScaleFromParentOfProz(this._menuMessage);


        CustomUtils.SetTextureOfProz(this._helpPaper.element as PIXI.Sprite,DataSetting.HelpPaper);
        CustomUtils.SetScaleOfProz(this._helpPaper.element as PIXI.Sprite, DataSetting.HelpPaper);
        CustomUtils.GoToProz(this._helpPaper.element,DataSetting.HelpPaper);

        CustomUtils.SetScaleOfProz(this._helpClose.element as PIXI.Sprite, DataSetting.HelpClose);
        CustomUtils.GoToProz(this._helpClose.element,DataSetting.HelpClose);

    }

}