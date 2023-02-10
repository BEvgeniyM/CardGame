import { Container, Sprite } from 'pixi.js'
import { Event } from './Event';
import { BaseViwe } from './BaseViwe';
import { Cart } from './Cart';
import { CustomUtils } from '../Utils/CustomUtils'
import { BaseController } from './BaseController';
import { setDefaultResultOrder } from 'dns';
import { DataSetting } from '../Utils/DataSetting';
import * as PIXI from 'pixi.js'


export class UIViwe extends Container {

    private _menu: Sprite = {} as Sprite
    private _close: Sprite = {} as Sprite
    private _winPanel: Sprite = {} as Sprite
    private _heroMy: Sprite = {} as Sprite
    private _heroMob: Sprite = {} as Sprite
    private _helpClose: Sprite = {} as Sprite

    private _helpData = new Container()


    

    constructor(){
        super()
        // this.interactiveChildren = true
    }

    start(): void {
        this._winPanel = this.cretHero(this._winPanel,DataSetting.WinPanel);
        this._heroMy = this.cretHero(this._heroMy,DataSetting.HeroMy,this.clickOnHeroMy.bind(this));
        this._heroMob = this.cretHero(this._heroMy,DataSetting.HeroMob,this.clickOnHeroMob.bind(this));
        this._helpClose = this.cretHero(this._helpClose,DataSetting.HelpClose,this.helpClick.bind(this));
        this._menu = this.cretHero(this._menu,DataSetting.Menu,this.clickOnMenu.bind(this));

        this.creatHelp();

        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.resizeCanvas();
    }
    

    cretHero(s:Sprite,cnf:any,f:any = ()=>{}): Sprite{
        s = Cart.SpriteCreat(this,cnf.t);

        // The important bit of this example, this is how you change the default blend mode of the sprite
        // s.blendMode = PIXI.BLEND_MODES.ADD;
        s.blendMode = PIXI.BLEND_MODES.HARD_LIGHT;

        s.name = cnf.t;
        s.interactive = true;
        s.on('pointerdown', f);
        s.anchor.set(cnf.ax,cnf.ay);
        CustomUtils.SetScaleOfProz(s as PIXI.Sprite, cnf.scale);
        CustomUtils.SetScalePositionProz(s,cnf);
        return s
    }

    creatHelp(){
        const btn = new PIXI.Graphics();
        btn.beginFill(0x00000);
        btn.drawRect(0, 0, window.outerWidth*4, window.outerHeight*4);
        btn.endFill();
        btn.position.set(0, 0);
        btn.alpha = 0.5;
        this._helpData.addChild(btn);
        this._helpData.addChild(this._helpClose);
        this._helpData.visible =false
        this.addChild(this._helpData);
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    clickOnHeroMy(){
        if(this._heroMy.name == DataSetting.HeroMy.t){
            this.rotationHero(this._heroMy,DataSetting.HeroMy.tb)
        } else  this.rotationHero(this._heroMy,DataSetting.HeroMy.t)
    }

    clickOnHeroMob(){
        if(this._heroMob.name == DataSetting.HeroMob.t){
            this.rotationHero(this._heroMob,DataSetting.HeroMob.tb)
        } else  this.rotationHero(this._heroMob,DataSetting.HeroMob.t)
    }

    rotationHero(s:Sprite,t:string){
        s.name = t
        this.parent.emit(Event.UI_MENU_OPEN);
        const sx = s.scale.x;
        CustomUtils.GoTo(s.scale,{
                x:0,
                callbackScope:s,
                onComplete:()=>{
                    s.texture = PIXI.Texture.from(t);
                    CustomUtils.GoTo(s.scale,{
                        x:sx,
                        callbackScope:s,
                        onComplete:()=>{
                        }})
                }})
    }

    helpClick(){
        this._helpData.visible = false;
    }

    clickOnMenu(){
        this._helpData.visible = true;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       resizeCanvas                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////



    resizeCanvas(){
        CustomUtils.SetScaleOfProz(this._menu as PIXI.Sprite, DataSetting.Menu.scale);
        CustomUtils.GoToProz(this._menu,DataSetting.Menu);

        CustomUtils.SetScaleOfProz(this._winPanel as PIXI.Sprite, DataSetting.WinPanel.scale);
        CustomUtils.GoToProz(this._winPanel,DataSetting.WinPanel);

        CustomUtils.SetScaleOfProz(this._heroMy as PIXI.Sprite, DataSetting.HeroMy.scale);
        CustomUtils.GoToProz(this._heroMy,DataSetting.HeroMy);

        CustomUtils.SetScaleOfProz(this._heroMob as PIXI.Sprite, DataSetting.HeroMob.scale);
        CustomUtils.GoToProz(this._heroMob,DataSetting.HeroMob);

        CustomUtils.SetScaleOfProz(this._helpClose as PIXI.Sprite, DataSetting.HelpClose.scale);
        CustomUtils.GoToProz(this._helpClose,DataSetting.HelpClose);

    }

}