import { Container, Texture, Text, Graphics, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { Cart } from './Cart';
import { Event } from './Event';
import { StageController } from '../StageController';
import { CustomUtils } from '../Utils/CustomUtils'
import { BaseController } from './BaseController';
import { setDefaultResultOrder } from 'dns';

export class BaseViwe extends Container {
    private _cartArras: Array<PIXI.DisplayObject> = [];
    private _cartStock: Container = new Container();
    private _cartPull: Container = new Container();
    private _mobPull:Container = new Container();
    private _table:Container = new Container();
    private _mylastCart: Cart = {} as Cart;


    private _pullCount: number = 0;
    private _pullOfsetX: number = 0;
    private _cartHeight: number = 0;
    private _cartZIndex: number = 1;

    private _timeStart: number = 6;
    private _timeEnd: number = 4;
    private _timeDel: number = 0;
    private _delayNewCart:number = 0.5;

    private _angle: number = 10;
    private _anchorY: number = 0.05;
    private _pointXCartPull: number = 400;
    private _cardsTexture: Array<[string,string]> = [];
    private _back: Sprite = {} as Sprite;
    private _parent: BaseController = {} as BaseController;

    constructor() {
        super();
        this.name = this.constructor.name;
        this.sortableChildren = true;

        const debug = new PIXI.Graphics();
        debug.beginFill(0xFFFFFF)
        debug.drawRect(0, 0, 10, 10)
        debug.endFill();
        debug.position.set(0, 0);
        debug.alpha = 1;
        // this._cartPull.addChild(debug);

        this._table.position.set(0);
        this._table.zIndex = 400;
        this._table.interactiveChildren = false;

        this.addChild(this._table).name = '_table';

        this._mobPull.position.set(window.outerWidth * 0.5, 0);
        this._mobPull.zIndex = 100
        this.addChild(this._mobPull).name = '_mobPull';

        this._cartPull.position.set(window.outerWidth * 0.5, window.outerHeight);
        this._cartPull.zIndex = 200
        this.addChild(this._cartPull).name = '_cartPull';

        this._cartStock.zIndex = 300
        this._cartStock.position.set(window.screen.availWidth*0.90,window.screen.availHeight*0.5+CustomUtils.CartHeight/2)
        this.addChild(this._cartStock).name = '_cartStock';
        
        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }

    init(){
        this._parent = this.parent as BaseController;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       GET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    get_cartPull():Container{
        return this._cartPull
    }
    get_mobPull():Container{
        return this._mobPull
    }
    get_table():Container{
        return this._table
    }

    addbackground(){
        const texture = Texture.from('back_');
        this._back = new Sprite(texture);
        this._back.anchor.set(0);
        this._back.zIndex = 1;
        this._back.alpha = 0;
        gsap.to(this._back,{
            alpha:1,
            duration:1
        })
        this.addChild(this._back);
        CustomUtils.ResizeBack(this._back);

        const back_0 = new Sprite(Texture.from('back_'));
        back_0.scale.set(10);
        back_0.anchor.set(0.5);
        back_0.zIndex = 0
        this.addChild(back_0);
    }


    start(cartCount: number = 1, _cardsTexture: Array<[string,string]>): BaseViwe {
        this.init();
        this.addbackground();

        this._timeDel = (this._timeStart - this._timeEnd) / (_cardsTexture.length - 1)
        this._cardsTexture = _cardsTexture;
        for (let i = 0; i < this._cardsTexture.length; i++) {
            let texture = Texture.from(this._cardsTexture[i][0]);
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

            let sprite = new Cart(texture,this._cardsTexture[i],this._cardsTexture[0]);
            let width = window.outerHeight > window.outerWidth ? window.outerHeight : window.outerWidth;
            let sc = window.outerHeight > window.outerWidth ? sprite.height / window.outerHeight : sprite.height / window.outerWidth;

            // sprite.position.set(width + sprite.width, CustomUtils.GetRandomArbitrary());

            // sprite.position.set(window.screen.availWidth*0.98,window.screen.availHeight*0.02);
             sprite.position.set(0,0)
            // sprite.scale.set(0.5);
            sprite.cursor = 'pointer';
            sprite.anchor.set(0.5);
            sprite.position.set(0.1*i,0.1*i)
            sprite.zIndex = 1;
            sprite.interactive = true;
            // sprite.on('pointerdown', this.onDragStart, sprite);
            // sprite.on('pointerup', this.onDragEnd, this);
            // sprite.on('pointerupoutside', this.onDragEnd, this);

            CustomUtils.CartHeight = sprite.height
            this._cartArras.push(sprite);
            this._cartStock.addChild(sprite);


            this.resizeCanvas();
        }

         const cart = this._cartStock.children[0] as Cart;
         cart.anchor.set(0.5,1)
         gsap.to(cart,{
            angle:-90,
            duration:1,
            onComplete:()=>{
                cart.openCart();
            }
         })

        // this.getFromStock();
        this.firstStep();

        return this;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       CALC                                                                              */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    angleCal(count:number = this._pullCount){
        let angle: number = count * this._angle - 75;

            if (angle >= 75) {
                count = 0;
                this._anchorY -= 0.2;
                angle = count * this._angle - 75;
            }

            if (this._anchorY <= 0.8) {
                this._pullCount = 0;
                this._anchorY = 1.2;
                angle = count * this._angle - 75;
                this._pointXCartPull += 400;

                this._pullOfsetX = this._cartPull.width * 2;
            }

            this._pullCount++;

            return angle
    }

    myorMod(i:number):boolean{
        return i%2!=0
    }

    setZindeCart(cart: Cart){
        cart.zIndex = this._cartZIndex;
        this._cartZIndex ++;
        this.sortChildren();
    }

    setAngle(i:number):number{
        return this.myorMod(i)?90:-90;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    cartToPull(s:Container ,cart: Cart,angle:number,i:number,){
        
        const a = this.setAngle(i);

        gsap.to(cart, {
            x: s.x,
            angle: angle + a,
            y: s.y,
            callbackScope: this,
            delay:i*this._delayNewCart,
            onCompleteParams: [cart],
            duration: 1,
            onComplete: ()=>{
                if (cart) {
                    cart.position.set(0, 0);
                    s.addChild(cart);
                    this.removeChild(cart);
                    this._table.removeChild(cart);
                    this.rotetStock(s);
                    
                }
        

                gsap.to(s,{
                    angle: s.angle - this._angle,
                    duration:2
                })
        
                gsap.to(cart.pivot,{
                    x:cart.width/2,
                    y:cart.height*1.2,
                    duration:2
                })
                cart.openCart();//!!!!

                if(this.myorMod(i)){
                    cart.openCart();
                    cart.on('pointerdown',this.moveToTable,this)
                }
                this.resizeCanvas();
            }
        })
    }

    firstStep(count:number = 12, f:boolean  = false){
        if(f){
                let child = this._cartArras.pop() as Cart;
                child && this.moveToMy(child, count);
        }else {
            for (let i = 0; i < count; i++) {
                let child = this._cartArras.pop() as Cart;
                child && this.moveToMy(child, i);
            }
        }
       
    }

    moveToMy(cart: Cart, i: number): void {
        const angle = this.angleCal();

        if(this.myorMod(i)&& this._cartPull.children.length < 6){
           this.cartToPull(this._cartPull,cart,this.angleCal(this._cartPull.children.length),i)
        } else if(this._mobPull.children.length < 6){ 
            this.cartToPull(this._mobPull,cart,this.angleCal(this._mobPull.children.length),i)
        }
    }

  
    moveToTable(e:any){
        this.parent.emit(Event.MYCARTONTABLE);

        e.currentTarget.position.set(e.currentTarget.getGlobalPosition().x,e.currentTarget.getGlobalPosition().y);

        this.setZindeCart(e.currentTarget);
        this._cartStock.removeChild(e.currentTarget);
        this._table.addChild(e.currentTarget);
        this._mylastCart = e.currentTarget;

        gsap.to(e.currentTarget,{
            angle: 0+CustomUtils.GetRandomArbitrary(-7,7),
            x:window.screen.availWidth*0.5+CustomUtils.GetRandomArbitrary(-20,20),
            y:window.screen.availHeight*0.5+CustomUtils.GetRandomArbitrary(-5,5),
            direction:1,
            onComplete: ()=>{
                this.moveToTableMob();
            }
       })
    }

    addCart(i:number){
        let child = this._cartArras.shift() as Cart;
        child && this.moveToMy(child, i);
    }
  
    checkCart(s: PIXI.Container):boolean{

        for (let i = 0; i <this._mobPull.children.length; i++) {
            const cart = this._mobPull.children[i] as Cart;

            
            // if(this._mylastCart.id[1] == cart.id[1] && this._mylastCart.id[0] < cart.id[0]){
                if(this._mylastCart.id[0][1]== cart.id[0][1]  && this._mylastCart.value < cart.value){
                    console.log(this._mylastCart.id, cart.id);

                    cart.position.set(cart.getGlobalPosition().x,cart.getGlobalPosition().y)
                    cart.openCart();
        
                    this.setZindeCart(cart);
                    this._mobPull.removeChild(cart);
                    this._table.addChild(cart);
                
                    gsap.to(cart,{
                        angle: CustomUtils.GetRandomArbitrary(-7,7),
                        x:window.screen.availWidth*0.5+CustomUtils.GetRandomArbitrary(-20,20),
                        y:window.screen.availHeight*0.5+CustomUtils.GetRandomArbitrary(-5,5),
                        direction:1,
                        onComplete: ()=>{
                            gsap.to(this,{
                                delay:1,
                                callbackScope:this,
                                onComplete:()=>{
                                    this._parent.emit(Event.FITCARD);
                                }
                            })
                        }
                })
                
               return true
            } 
        }

        for (let i = 0; i <this._mobPull.children.length; i++) {
            const cart = this._mobPull.children[i] as Cart;

                if(cart.mastW == cart.id[0][1] && this._mylastCart.value < cart.value){
                    console.log(this._mylastCart.id, cart.id);

                    cart.position.set(cart.getGlobalPosition().x,cart.getGlobalPosition().y)
                    cart.openCart();
        
                    this.setZindeCart(cart);
                    this._mobPull.removeChild(cart);
                    this._table.addChild(cart);
                
                    gsap.to(cart,{
                        angle: CustomUtils.GetRandomArbitrary(-7,7),
                        x:window.screen.availWidth*0.5+CustomUtils.GetRandomArbitrary(-20,20),
                        y:window.screen.availHeight*0.5+CustomUtils.GetRandomArbitrary(-5,5),
                        direction:1,
                        onComplete: ()=>{
                            gsap.to(this,{
                                delay:1,
                                callbackScope:this,
                                onComplete:()=>{
                                    this._parent.emit(Event.FITCARD);
                                }
                            })
                        }
                })
                
               return true
            } 
        }

        gsap.to(this,{
                delay:1,
                callbackScope:this,
                onComplete:()=>{
                    this.checkWin();
                    this._parent.setRoundLoase(2);
                    this._parent.emit(Event.PICKUPCARDS);
                }
        })
        return false
    }

    moveToTableMob(){
        this.checkCart(this._mobPull);
    }


    cartToedge(){
       this.parent.emit(Event.MOVETOEDGE); 
       while (this._table.children.length != 0) {
             if(!this._table.children[0]){
               return
             }
             
             const cart = this._table.children[0] as Cart;
             cart.anchor.set(0.5);

             this._table.removeChild(cart);
             this.addChild(cart);

             gsap.to (cart,{
                angle:0+CustomUtils.GetRandomArbitrary(-120,120),
                x:CustomUtils.GetRandomArbitrary(0,window.screen.availWidth*0.2),
                y:CustomUtils.GetRandomArbitrary(window.screen.availHeight*0.2,window.screen.availHeight*0.8),
                delay:CustomUtils.GetRandomArbitrary(0,0.25),
                duration:0.5,
                callbackScope: this,
                
                onComplete:()=>{
                    this.rotetStock(this._cartPull);
                    this.rotetStock(this._mobPull);
                }
            })
       }
    }

    rotetStock(s: PIXI.Container){
        const a = s.name=='_mobPull'?-90:90;

        for (let i = 0; i < s.children.length; i++) {
            gsap.to(s.children[i],{
                angle: i * this._angle*2 - 75+a,
                duration:1
            })
            
        }
    }


    pickUpCards(myOrMmob:number){
        for (let i = 0; i < this._table.children.length; i++) {
            const cart = this._table.children[i] as Cart;

             if(this.myorMod(myOrMmob)){
                cart.on('pointerdown',this.moveToTable,this);
                this.cartToPull(this._cartPull,cart,this.angleCal(this._cartPull.children.length),i)
             }else { 
                cart.cloasCart();
                cart.off('pointerdown',this.moveToTable,this);
                this.cartToPull(this._mobPull,cart,this.angleCal(this._mobPull.children.length),i)
             }
        }

        gsap.to(this,{
            delay:this._table.children.length*this._delayNewCart,
            onComplete:()=>{
                    this.parent.emit(Event.PICKUPCARDSEND);
            }
         })
    }


    endRound(){
        if(this._mobPull.children.length < 6){
            const c = 6 -this._mobPull.children.length 
            for (let i = 0; i < c; i++) {
                gsap.to(this,{
                    delay: 0.5*i,
                    onComplete:()=>{
                        this.firstStep(0,true);
                    }
                })
            }
        }

        if(this._cartPull.children.length < 6){
            const c = 6 -this._cartPull.children.length 
            for (let i = 0; i < c; i++) {
                gsap.to(this,{
                    delay: 0.5*i,
                    onComplete:()=>{
                        this.firstStep(1,true);
                    }
                })
            }
        }
    }
    

    checkWin(): void {

        if (this._cartStock.children.length == 0 && this._cartPull.children.length == 0) {
            this._parent.emit(Event.YOUWIN, this)
        } else if (this._cartStock.children.length == 0 && this._mobPull.children.length == 0) {
            this._parent.emit(Event.GAMEOVER, this)
        } else if(this._cartPull.children.length  == 0 || this._mobPull.children.length == 0){
            this.cartToedge();
        } 
    }

    resizeCanvas(): void {

        CustomUtils.ResizeStock(this._cartStock);
        CustomUtils.ResizeBack(this._back);
        CustomUtils.ResizePullMob(this._mobPull)
        // CustomUtils.ResizeContainer(this._cartStock);

        // for (let i = 0; i < this._cartPull.children.length; i++) {
        //     this._cartPull.children[i].scale.set(CustomUtils.GetScaleCart());
        // }

        let offsetY = (window.screen.availWidth - this._cartPull.width) / 2 + this._cartPull.width / 2;
 
            gsap.to(this._cartPull, {
                x: offsetY,
                // y: window.outerHeight - this._cartPull._localBounds.maxY - this._cartPull.height * 0.01,
                y: window.outerHeight  - this._cartPull.height * 0.2,

                duration: 1,
            })
    }



    endMasege(text: string): void {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x1f6db1);
        graphics.drawRect(0, 0, window.outerWidth * 4, window.outerHeight * 4);
        graphics.endFill();
        graphics.alpha = 0.2;
        graphics.zIndex = 999;

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 120,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        const basicText = new PIXI.Text(text.toUpperCase(), style);
        basicText.x = (window.outerWidth - basicText.width) / 2 + basicText.width / 2;
        basicText.y = (window.outerHeight - basicText.height) / 2 + basicText.height / 2;
        basicText.anchor.set(0.5)
        basicText.scale.set(0.2);
        basicText.zIndex = 1000

        this.addChild(graphics);
        this.addChild(basicText);

        gsap.timeline()
            .to(basicText.scale, {
                x: 1.1,
                y: 1.1,
                duration: 0.5
            })
            .to(basicText.scale, {
                x: 0.9,
                y: 1,
                duration: 5
            })
            .from(graphics,1, {
                alpha: 0.5,
                repeat:100,
                duration: 2
            })            

    }

    

}
