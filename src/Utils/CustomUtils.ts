
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { DataSetting } from "./DataSetting";


export class CustomUtils {
    static CartHeight: number = 0;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       SET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static SetCartSize(s:PIXI.Sprite){
        CustomUtils.CartHeight = s.height;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       GET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static GetRandomArbitrary(min: number = 100, max: number = window.outerHeight - 100): number {
        return Math.random() * (max - min) + min;
    }

    static GetScaleCart():number{
        return   CustomUtils.CartHeight/(window.innerHeight - CustomUtils.CartHeight)
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ReSize VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static SetAngle(s:PIXI.Container | PIXI.Sprite){
        s.angle = window.innerWidth< window.innerHeight?90:0;
    }
    static ResizeBack(s:PIXI.Sprite): void{
        s.scale.set(1);
        s.anchor.set(0.5);
        CustomUtils.SetAngle(s);

        if(s.width == s.height){
            if(window.innerHeight > window.innerWidth){
                s.scale.set (window.innerHeight/ s.height);
            } else  s.scale.set (window.innerWidth/ s.width);
        } else {
            if(window.innerHeight > window.innerWidth){
                s.scale.set (window.innerWidth/ s.height); 
            }else s.scale.set (window.innerHeight/ s.height);
        }
        s.position.set(window.innerWidth/2, window.innerHeight/2)
    }

    static ResizePreloader(s: PIXI.Container): PIXI.Container {
        s.position.set(window.innerWidth*0.5, window.outerHeight * 0.5);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizeStock(s:PIXI.Container){
        s.position.set(window.innerWidth* 0.9, window.outerHeight * 0.5);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizeMyPull(s:PIXI.Container){
        const c = {
            x:(window.innerWidth- s.width) / 2 + s.width / 2,
            y:window.outerHeight  - s.height * 0.2
        }
        CustomUtils.GoTo(s,c);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizePullMob(s:PIXI.Container){
        const c = {
            x:window.innerWidth* 0.5,
            y:window.innerHeight * 0.01+ s.height * 0.2
        }
        CustomUtils.GoTo(s,c);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizeTable(s:PIXI.Container){
        const c = {
            x:window.innerWidth* 0.5,
            y:window.innerHeight * 0.5
        }
        CustomUtils.GoTo(s,c);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizeContainerChildren(s: PIXI.Container): PIXI.Container {
        for (let i = 0; i < s.children.length; i++) {
            CustomUtils.ResizeSprit(s.children[i] as PIXI.Sprite);
        }
        return s
    }

    static ResizeSprit(s:PIXI.Sprite): number{
        const sch= window.innerHeight/4;
        const scw = window.innerWidth/4;
        const sc = sch <scw?sch:scw;
        
        s.scale.set(1);
        s.scale.set(sc/s.height)
        return s.scale.x;
    }

    static GoTo(s:any,cnf: GoTo){
        const c = Object.assign({duration:DataSetting.DefaultDeley, delay: DataSetting.DefaultDeley},cnf)
        gsap.to(s,c)
        return s
    }

    static SetScaleOfProz(s: PIXI.Sprite, proz:number):number{
        s.scale.set(1);
        if(CustomUtils.IsPortret()) {
            s.scale.set(window.innerHeight * proz /s.height);
        }else s.scale.set(window.innerWidth* proz /s.height);
        return s.scale.x
    }

   

    static SetPositionProz(s:PIXI.Container, cnf:any){
        if(cnf.portret && CustomUtils.IsPortret()){
            s.position.set(window.innerWidth* cnf.portret.x, window.innerHeight * cnf.portret.y);
        } else s.position.set(window.innerWidth* cnf.x, window.innerHeight * cnf.y);
    }

    static GoToProz(s:any,cnf: any){
        const c = {
            x:cnf.x*window.innerWidth,
            y:cnf.y*window.innerHeight,
            duration:cnf.duration
        }
        gsap.to(s,c)
        return s
    }

    static IsPortret():boolean{
       return  window.innerHeight > window.innerWidth
    }
}


type GoTo = {
    x?:number,
    y?:number,
    angle?:number,
    alpha?:number,
    delay?:number,
    duration?:number,
    callbackScope?:PIXI.Container | PIXI.Sprite,
    onComplete?: gsap.Callback
}
