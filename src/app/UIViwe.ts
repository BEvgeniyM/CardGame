import { Container, Sprite } from 'pixi.js'
import { Event } from './Event';
import { BaseViwe } from './BaseViwe';
import { Cart } from './Cart';
import { CustomUtils } from '../Utils/CustomUtils'
import { BaseController } from './BaseController';
import { setDefaultResultOrder } from 'dns';
import { DataSetting } from '../Utils/DataSetting';
import {WebFont} from '../app/WebFont';
import * as PIXI from 'pixi.js'
import gsap from 'gsap';


export class UIViwe extends Container {

    private _menu: Sprite = {} as Sprite
    private _close: Sprite = {} as Sprite
    private _winPanel: Sprite = {} as Sprite
    private _heroMy: Sprite = {} as Sprite
    private _heroMob: Sprite = {} as Sprite
    private _helpClose: Sprite = {} as Sprite
    private _helpPaper: Sprite = {} as Sprite
    private _helpDataText: WebFont = {} as WebFont
    private _helpseal: Sprite = {} as Sprite

    private _helpData = new Container()


    constructor(){
        super()
        // this.interactiveChildren = true
    }

    start(): void {
        this._heroMy = this.cretHero(this._heroMy,DataSetting.HeroMy,this.clickOnHeroMy.bind(this));
        this._heroMob = this.cretHero(this._heroMy,DataSetting.HeroMob,this.clickOnHeroMob.bind(this));
        this._helpClose = this.cretHero(this._helpClose,DataSetting.HelpClose,this.helpClick.bind(this));
        this._helpPaper = this.cretHero(this._helpPaper,DataSetting.HelpPaper,this.helpPaper.bind(this));
        
        const t = Object.assign({parent:this}, DataSetting.TextHelp);
        
        this._helpDataText = new WebFont('_helpDataText',t);
        
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
        CustomUtils.SetScaleOfProz(s as PIXI.Sprite, cnf);
        CustomUtils.SetPositionProz(s,cnf);
        // gsap.to(s,{
           
        //         x:cnf.x+CustomUtils.GetRandomArbitrary(-10,10),
        //         y:cnf.y+CustomUtils.GetRandomArbitrary(-10,10),
               
          
        //     duration: DataSetting.DefaultDuration,
        //     repeat:1000,
        // })
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
        this._helpData.addChild(this._helpPaper);
        // this._helpData.addChild(this._helpseal);
        this._helpData.addChild(this._helpDataText);
        this._helpData.addChild(this._helpClose);
        this._helpData.visible =false
        this.addChild(this._helpData);
        
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    clickOnHeroMob(f:boolean = true){
    }
    clickOnHeroMy(f:boolean = true){
        this.parent.emit(Event.ACTION,Event.ROUNDCLOSE_I);
    }

    ectionOnHeroMy(f:boolean = true){
        this.ectionOnHero(this._heroMy,DataSetting.HeroMy,f);
    }
    ectionOnHeroMob(f:boolean = true){
        this.ectionOnHero(this._heroMob,DataSetting.HeroMob,f);
    }
    ectionOnHero(s:Sprite,cnf:any,f:boolean){
        if(f == true){
            this.rotationHero(s,cnf.t)
        } else  this.rotationHero(s,cnf.tb);
    }


    rotationHero(s:Sprite,t:string){
        s.name = t
        // this.parent.emit(Event.UI_MENU_OPEN);
        const sx = CustomUtils.SetScaleOfProz(s as PIXI.Sprite, DataSetting.HeroMob);

        CustomUtils.GoTo(s.scale,{
                x:sx*0.1,
                delay:0,
                callbackScope:s,
                onComplete:()=>{
                    s.texture = PIXI.Texture.from(t);
                    CustomUtils.GoTo(s.scale,{
                        x:sx,
                        delay:0,
                        callbackScope:s,
                        onComplete:()=>{
                        }})
                }})
    }

    helpPaper(){
    }

    helpseal(){
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
        CustomUtils.SetScaleOfProz(this._menu as PIXI.Sprite, DataSetting.Menu);
        CustomUtils.GoToProz(this._menu,DataSetting.Menu);

        CustomUtils.SetTextureOfProz(this._helpPaper,DataSetting.HelpPaper);
        CustomUtils.SetScaleOfProz(this._helpPaper as PIXI.Sprite, DataSetting.HelpPaper);
        CustomUtils.GoToProz(this._helpPaper,DataSetting.HelpPaper);

        // CustomUtils.SetScaleOfProz(this._winPanel as PIXI.Sprite, DataSetting.WinPanel);
        // CustomUtils.GoToProz(this._winPanel,DataSetting.WinPanel);


        CustomUtils.SetScaleOfProz(this._heroMy as PIXI.Sprite, DataSetting.HeroMy);
        CustomUtils.GoToProz(this._heroMy,DataSetting.HeroMy);

        CustomUtils.SetScaleOfProz(this._heroMob as PIXI.Sprite, DataSetting.HeroMob);
        CustomUtils.GoToProz(this._heroMob,DataSetting.HeroMob);

        CustomUtils.SetScaleOfProz(this._helpClose as PIXI.Sprite, DataSetting.HelpClose);
        CustomUtils.GoToProz(this._helpClose,DataSetting.HelpClose);

    }

}