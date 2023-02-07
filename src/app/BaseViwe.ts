import { Container, Texture, Text, Graphics, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { Cart } from './Cart';
import { Event } from './Event';
import { StageController } from '../StageController';
import { CustomUtils } from '../Utils/CustomUtils'

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

    private _angle: number = 10;
    private _anchorY: number = 0.05;
    private _pointXCartPull: number = 400;
    private _cardsTexture: Array<string> = [];
    private _back: Sprite = {} as Sprite;


    constructor(private _parent: Container<PIXI.DisplayObject>) {
        super();
        this.name = this.constructor.name;
        this.sortableChildren = true;
        this._parent.addChild(this);
       
        const debug = new PIXI.Graphics();
        debug.beginFill(0xFFFFFF)
        debug.drawRect(0, 0, 10, 10)
        debug.endFill();
        debug.position.set(0, 0);
        debug.alpha = 1;
        // this._cartPull.addChild(debug);

        this._table.position.set(0);
        this._table.zIndex = 400;
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


    start(cartCount: number = 1, _cardsTexture: Array<string>): BaseViwe {
        this.addbackground();

        this._timeDel = (this._timeStart - this._timeEnd) / (_cardsTexture.length - 1)
        this._cardsTexture = _cardsTexture;
        for (let i = 0; i < this._cardsTexture.length; i++) {
            let texture = Texture.from(this._cardsTexture[i]);
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

            let sprite = new Cart(texture,this._cardsTexture[i]);
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

        // this.getFromStock();
        this.firstStep();

        return this;
    }



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

    cartToPull(s:Container ,cart: Cart,angle:number,i:number,){
        debugger
        const a = this.myorMod(i)?180:0;

        gsap.to(cart, {
            x: s.x,
            angle: angle -90+a,
            y: s.y,
            callbackScope: this,
            delay:i*0.5+5,
            onCompleteParams: [cart],
            duration: 1,
            onComplete: ()=>{
                if (cart) {
                    cart.position.set(0, 0);
                    s.addChild(cart);
                    this.removeChild(cart);
                    this.rotetStock(s)
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
                let child = this._cartArras.shift() as Cart;
                child && this.moveToMy(child, count);
        }else {
            for (let i = 0; i < count; i++) {
                let child = this._cartArras.shift() as Cart;
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
            const weidth = cart.id[0] 
            const mast = cart.id[1] 

            debugger
            if(this._mylastCart.id[1] == mast && this._mylastCart.id[0] < weidth){
        
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
                            this.checkWin();
                                    if(this._mobPull.children.length < 6){
                                        this.firstStep(1,true)
                                    }
                
                                    if(this._cartPull.children.length < 6){
                                        this.firstStep(2,true)
                                    }
        
                            gsap.to(this,{
                                delay:3,
                                callbackScope:this,
                                onComplete:()=>{
                                    this._parent.emit(Event.FITCARD);
                                    this.cartToedge();
                                }
                            })
                            
                        }
                })
                
               return true
            }
        }
        return false


    }

    moveToTableMob(){
        if(this.checkCart(this._mobPull)){
            debugger
           // карта бита
        } else{
            debugger
            // не бита
        }
        // if(this._mobPull.children.length){
        //     const cart = this._mobPull.children.shift() as Cart;

        //     if(!cart){
        //         return
        //     }

        //     cart.position.set(cart.getGlobalPosition().x,cart.getGlobalPosition().y)
        //     cart.openCart();

        //     this.setZindeCart(cart);
        //     this._mobPull.removeChild(cart);
        //     this._table.addChild(cart);
        
        //     gsap.to(cart,{
        //         angle: CustomUtils.GetRandomArbitrary(-7,7),
        //         x:window.screen.availWidth*0.5+CustomUtils.GetRandomArbitrary(-20,20),
        //         y:window.screen.availHeight*0.5+CustomUtils.GetRandomArbitrary(-5,5),
        //         direction:1,
        //         onComplete: ()=>{
        //             this.checkWin();
        //                     if(this._mobPull.children.length < 6){
        //                         this.firstStep(1,true)
        //                     }
        
        //                     if(this._cartPull.children.length < 6){
        //                         this.firstStep(2,true)
        //                     }

        //             gsap.to(this,{
        //                 delay:3,
        //                 callbackScope:this,
        //                 onComplete:()=>{
        //                     this.cartToedge();
        //                 }
        //             })
                    
        //         }
        // })
        // }
    }


    cartToedge(){
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



    // getFromStock(): void {
    //     let child = this._cartArras.shift() as Cart;
    //     child.anchor.set(0.5);
    //     child && this.moveToMy(child, 1);
    // }

    // moveTo(cart: Cart, i: number): void {
    //     let width = window.outerHeight > window.outerWidth ? window.outerHeight : window.outerWidth;
    //     let time = (this._timeStart - (this._timeDel * (this._cartPull.children.length - 1)))
    //     // cart.position.set(width + cart.height, CustomUtils.GetRandomArbitrary());
    //     cart.scale.set(CustomUtils.GetScaleCart());
    //     cart._gsap =
    //         gsap.to(cart, {
    //             x: - CustomUtils.CartHeight,
    //             angle: 360 * CustomUtils.GetRandomArbitrary(1, 3),
    //             y: CustomUtils.GetRandomArbitrary(),
    //             onCompleteParams: [cart, i],
    //             callbackScope: this,
    //             // delay:time * i,
    //             duration: time,
    //             onComplete: this.onCompleteStock
    //         })
    // }

    // moveToStock(cart: Cart, angle: number): void {
    //     if (cart) {
    //         cart.off('pointerdown', this.onDragStart);
    //         cart.off('pointerup', this.onDragEnd);
    //         cart.off('pointerupoutside', this.onDragEnd);
    //         cart.anchor.set(0.5, this._anchorY);
    //     }

    //     // cart.openCart()
    //     // cart.cloasCart()
    //     gsap.to(cart, {
    //         x: this._cartPull.x,
    //         angle: angle,
    //         y: this._cartPull.y,
    //         callbackScope: this,
    //         onCompleteParams: [cart],
    //         duration: 2,
    //         onComplete: this.onComplete
    //     })
    // }

    // onCompleteStock(cart: Cart, i: number): void {
    //     cart.angle = 0;
    //     this.checkWin();
    //     this.getFromStock();
    // }

    
   

    

    checkWin(): void {
        if (this._cartStock.children.length == 0 && this._cartPull.children.length == 0) {
            this._parent.emit(Event.YOUWIN, this)
        } else if (this._cartStock.children.length == 0 && this._mobPull.children.length == 0) {
            this._parent.emit(Event.GAMEOVER, this)
        }
    }

    // onDragStart(event: any): void {
    //     this.alpha = 0.9;
    //     StageController.dragTarget = this;
    //     StageController.app.stage.on('pointermove', StageController.onDragMove, StageController.app.stage);

    //     let r = StageController.dragTarget as Cart;
    //     if (r._gsap && r._gsap) {
    //         r.angle = 0;
    //         r._gsap.kill();
    //     }
    // }

    // onDragEnd(event: any): void {
    //     if (StageController.dragTarget) {

    //         let angle: number = this._pullCount * this._angle - 75;

    //         if (angle >= 75) {
    //             this._pullCount = 0;
    //             this._anchorY -= 0.2;
    //             angle = this._pullCount * this._angle - 75;
    //         }

    //         if (this._anchorY <= 0.8) {
    //             this._pullCount = 0;
    //             this._anchorY = 1.2;
    //             angle = this._pullCount * this._angle - 75;
    //             this._pointXCartPull += 400;


    //             // this._cartPull.scale.set(this._cartPull.scale.x * 0.5);
    //             this._pullOfsetX = this._cartPull.width * 2;
    //         }

    //         this._pullCount++;

    //         this.moveToStock(StageController.dragTarget as Cart, angle);

    //         StageController.app.stage.off('pointermove', StageController.onDragMove);
    //         StageController.dragTarget.alpha = 1;
    //         StageController.dragTarget = null;
    //     }
    // }

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
