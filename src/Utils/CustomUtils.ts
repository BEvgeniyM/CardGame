
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
        return   CustomUtils.CartHeight/(window.screen.availHeight - CustomUtils.CartHeight)
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ReSize VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    static ResizeBack(s:PIXI.Sprite): void{
        s.scale.set(1);
        s.anchor.set(0.5);
        s.angle = window.screen.availWidth < window.screen.availHeight?90:0;

        if(s.width == s.height){
            if(window.screen.availHeight > window.screen.availWidth){
                s.scale.set (window.screen.availHeight/ s.height);
            } else  s.scale.set (window.screen.availWidth / s.width);
        } else {
            if(window.screen.availHeight > window.screen.availWidth){
                s.scale.set (window.screen.availWidth / s.height); 
            }else s.scale.set (window.screen.availHeight/ s.height);
        }
        s.position.set(window.screen.availWidth/2, window.screen.availHeight/2)
    }

    static ResizePreloader(s: PIXI.Container): PIXI.Container {
        s.position.set(window.screen.availWidth*0.5, window.outerHeight * 0.5);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizeStock(s:PIXI.Container){
        s.position.set(window.screen.availWidth * 0.9, window.outerHeight * 0.5);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizeMyPull(s:PIXI.Container){
        const c = {
            x:(window.screen.availWidth - s.width) / 2 + s.width / 2,
            y:window.outerHeight  - s.height * 0.2
        }
        CustomUtils.GoTo(s,c);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizePullMob(s:PIXI.Container){
        const c = {
            x:window.screen.availWidth * 0.5,
            y:window.screen.availHeight * 0.01+ s.height * 0.2
        }
        CustomUtils.GoTo(s,c);
        return CustomUtils.ResizeContainerChildren(s);
    }

    static ResizeTable(s:PIXI.Container){
        const c = {
            x:window.screen.availWidth * 0.5,
            y:window.screen.availHeight * 0.5
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
        const sch= window.screen.availHeight/4;
        const scw = window.screen.availWidth/4;
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

    static SetScaleOfProz(s:PIXI.Container | PIXI.Sprite, proz:number):number{
        s.scale.set(1);
        if(CustomUtils.IsPortret()) {
            s.scale.set(window.screen.availHeight * proz /s.height);
        }else s.scale.set(window.screen.availWidth * proz /s.height);
        return s.scale.x
    }

    static SetScalePositionProz(s:PIXI.Container, cnf:any){
        s.position.set(window.screen.availWidth * cnf.x, window.screen.availHeight * cnf.y);
    }

    static GoToProz(s:any,cnf: any){
        const c = {
            x:cnf.x*window.screen.availWidth,
            y:cnf.y*window.screen.availHeight,
            duration:cnf.duration
        }
        gsap.to(s,c)
        return s
    }

    static IsPortret():boolean{
       return  window.screen.availHeight > window.screen.availWidth
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
