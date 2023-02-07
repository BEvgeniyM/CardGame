import { Sprite, Texture } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'

export class Cart extends Sprite {

   /** SETING */
   private _openDur: number = 0.5 //s
   /** SETING */

    protected _back =  Texture.from('cartBack');
    protected _cart =  Texture.from('cartBack');
    public _timeLine!: gsap.core.Timeline;

    public _gsap: gsap.core.Tween | null = null;
    public _lockEvent: boolean = false;



    constructor(texture: Texture, public id: string) {
        super();
        this.texture = this._back;
        this._cart = texture;
        
        CustomUtils.ResizeSprit(this)
    }

    openCart(){
        // this.anchor.set(0.5);
        this._timeLine = gsap.timeline()
        .to(this.scale, {
            x:0,
            callbackScope: this,
            duration: this._openDur,
            onComplete: ()=>{
                this.texture = this._cart;
                CustomUtils.ResizeSprit(this)
                this.scale.x = 0;
            }
        }) 
        .to(this.scale, {
            x:CustomUtils.ResizeSprit(this),
            callbackScope: this,
            duration: this._openDur,
            onComplete: ()=>{

            }
        },'>')
    }

    cloasCart(){
       this._timeLine.reversed();
    }

    setCart(e: PIXI.Texture){
         this._cart = e;
    }

}
