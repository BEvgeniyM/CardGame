import { Sprite, Texture } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'

export class Cart extends Sprite {

   /** SETING */
   private _openDur: number = 0.5 //s
   /** SETING */

    protected _back =  Texture.from('skin_2');
    protected _cart =  Texture.from('cartBack');
    public _timeLine!: gsap.core.Timeline;

    public _gsap: gsap.core.Tween | null = null;
    public _lockEvent: boolean = false;
    public value:number = 0;
    public mastW:string = '';

    constructor(texture: Texture, public id: [string,string],f:[string,string]) {
        super();
        this.texture = this._back;
        this._cart = texture
        this.mastW = f[0][1];

        let w:number = 1;

        if(f[0][1]==id[0][1]){
             w = 10;
        }
       


        switch (id[1]) {
            case '10':
                this.value = 10*w;
                break;
            case "QUEEN":
                this.value = 12*w;
                break;
            case 'JACK':
                this.value = 11*w;
                break;
            case 'KING':
                this.value = 13*w;
                break;
            case 'ACE':
                this.value = 14*w;
                break;    
            default:
                this.value = +id[1]*w;
                break;

        }
        
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
        this._timeLine = gsap.timeline()
        .to(this.scale, {
            x:0,
            callbackScope: this,
            duration: this._openDur,
            onComplete: ()=>{
                this.texture = this._back;
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
        //    this._timeLine.reversed();
    }

    setCart(e: PIXI.Texture){
         this._cart = e;
    }

    static SpriteCreat(s:PIXI.Container, t:string, z:number = 0, alpha:number = 1,anchor:number = 0.5): PIXI.Sprite{
        const spr = new Sprite(PIXI.Texture.from(t));
        spr.zIndex = z;
        spr.alpha = alpha;
        spr.anchor.set(anchor);

        s.addChild(spr);
        return spr
    }

}
