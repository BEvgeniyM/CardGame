import { Container, Sprite, Texture, Graphics, DisplayObject } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { CustomUtils } from '../../Utils/CustomUtils'
import { DataSetting } from '../../Utils/DataSetting';

export class Animation {

    private _timeLine: gsap.core.Timeline;
    private _gsap: gsap.core.Tween;
    private _lockEvent: boolean = false;
    private element: DisplayObject
    constructor(private s: DisplayObject) {
          this.element = s
    }

    rotatingAndСhangingTexture (s:Sprite,t:string){
        
        s.name = t
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


}
