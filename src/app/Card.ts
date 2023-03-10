import { Sprite, Texture } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'
import { DataSetting } from '../Utils/DataSetting';

export class Cart extends Sprite {

    /** SETING */
    private _openDur: number = 0.5 //s
    /** SETING */

    protected _back = Texture.from(DataSetting.Cart.skin);
    public _timeLine!: gsap.core.Timeline;

    public _gsap: gsap.core.Tween | null = null;
    public _lockEvent: boolean = false;
    public value: number = 0;
    public mastW: string = '';
    protected _isOpen: boolean = false;

    constructor(protected _cart: Texture, public id: [string, string], f: [string, string]) {
        super();
        this.texture = this._back;
        this.mastW = f[0][1];
        let w: number = 1;

        if (f[0][1] == id[0][1]) {
            w = 10;
        }



        switch (id[1]) {
            case '2':
                this.value = 2 * w;
                break;
            case '3':
                this.value = 3 * w;
                break;
            case '4':
                this.value = 4 * w;
                break;
            case '5':
                this.value = 5 * w;
                break;
            case '6':
                this.value = 6 * w;
                break;
            case '7':
                this.value = 7 * w;
                break;
            case '8':
                this.value = 8 * w;
                break;
            case '9':
                this.value = 9 * w;
                break;
            case '10':
                this.value = 10 * w;
                break;
            case 'JACK':
                this.value = 11 * w;
                break;
            case "QUEEN":
                this.value = 12 * w;
                break;
            case 'KING':
                this.value = 13 * w;
                break;
            case 'ACE':
                this.value = 14 * w;
                break;
            default:
                this.value = +id[1] * w;
                break;

        }

        CustomUtils.ResizeSprit(this)
    }

    isNeedOpen(): boolean {
        if (this._isOpen) {
            return false
        }
        return this._isOpen = true;
    }

    openCart(): void {
        debugger
        if (!this.isNeedOpen()) {
            return
        }

        
        const cx = this.scale.x * 0.1;
        this._timeLine = gsap.timeline()
            .to(this.scale, {
                x: cx,
                callbackScope: this,
                duration: this._openDur,
                onComplete: () => {
                    this.texture = this._cart;
                    CustomUtils.ResizeSprit(this);
                    this.scale.x = 0;
                }
            })
            .to(this.scale, {
                x: CustomUtils.ResizeSprit(this),
                callbackScope: this,
                duration: this._openDur,
                onComplete: () => {

                }
            }, '>')
    }

    cloasCart(): void {
        this._timeLine = gsap.timeline()
            .to(this.scale, {
                x: 0,
                callbackScope: this,
                duration: this._openDur,
                onComplete: () => {
                    this.texture = this._back;
                    CustomUtils.ResizeSprit(this)
                    this.scale.x = 0;
                }
            })
            .to(this.scale, {
                x: CustomUtils.ResizeSprit(this),
                callbackScope: this,
                duration: this._openDur,
                onComplete: () => {

                }
            }, '>')
        //    this._timeLine.reversed();
    }

    setCart(e: PIXI.Texture): void {
        this._cart = e;
    }

    static SpriteCreat(s: PIXI.Container, t: string, z: number = 0, alpha: number = 1, anchor: number = 0.5): PIXI.Sprite {
        const spr = new Sprite(PIXI.Texture.from(t));
        spr.zIndex = z;
        spr.alpha = alpha;
        spr.anchor.set(anchor);

        s.addChild(spr);
        return spr
    }

}
