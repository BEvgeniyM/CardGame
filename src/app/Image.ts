import { Container, Sprite, Texture, Graphics } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'
import { DataSetting } from '../Utils/DataSetting';

export class Image extends Sprite {

    public _timeLine: gsap.core.Timeline | null = null;
    public _gsap: gsap.core.Tween | null = null;
    public _lockEvent: boolean = false;

    constructor(private _parent?:Container, private _cnf?: ConfigImag) {
        super();
        _cnf && _cnf.x && (this.x = _cnf.x);
        _cnf && _cnf.y && (this.x = _cnf.y);
        _cnf && _cnf.z && (this.zIndex = _cnf.z);
        _cnf && _cnf.ax && (this.anchor.x = _cnf.ax);
        _cnf && _cnf.ay && (this.anchor.y = _cnf.ay);
        _cnf && _cnf.alpha && (this.alpha = _cnf.alpha);
        _cnf && _cnf.scale && (this.scale.set(_cnf.scale));
        _cnf && _cnf.parent && _cnf.parent.addChild(this);
        _parent &&_parent.addChild(this);
        _cnf && _cnf.t && (this.texture = Image.GetTexture(_cnf.t));
    }



    static GetTexture(str: string): Texture {
        return PIXI.Texture.from(str);
    }


    static SpriteCreat(s: PIXI.Container, t: string, z: number = 0, alpha: number = 1, anchor: number = 0.5): PIXI.Sprite {
        const spr = new Sprite(PIXI.Texture.from(t));
        spr.zIndex = z;
        spr.alpha = alpha;
        spr.anchor.set(anchor);

        s.addChild(spr);
        return spr
    }

    static SpriteGraphics(s: PIXI.Container, cnf: ConfigGraphics): Graphics {
        const graphics = new PIXI.Graphics();
        graphics.alpha = cnf.alpha;
        graphics.zIndex = cnf.z;
        graphics.beginFill(cnf.color);

        if (cnf.type == 'Rest') {
            graphics.drawRect(cnf.x, cnf.y, window.innerWidth * cnf.w, window.innerHeight * cnf.h);
        }

        graphics.endFill();

        s.addChild(graphics);
        return graphics
    }

}

export type ConfigImag = {
    t?: string,
    tb?: string,
    x?: number,
    y?: number,
    z?: number,
    ax?: number,
    ay?: number,
    alpha?: number,
    scale?: number,
    parent?: Container
}

export type ConfigGraphics = {
    type: string,
    alpha: number,
    color: number,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number
}