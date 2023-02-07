
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

export class CustomUtils {
    static CartHeight: number = 0;


    static GetRandomArbitrary(min: number = 100, max: number = window.outerHeight - 100): number {
        return Math.random() * (max - min) + min;
    }

    static GetScaleCart():number{
        // if(window.screen.orientation.angle ==0) return 0.5
        // return (window.screen.availHeight / 4)* 0.5/CustomUtils.CartHeight
        console.log(CustomUtils.CartHeight/(window.screen.availHeight - CustomUtils.CartHeight));
        
        return   CustomUtils.CartHeight/(window.screen.availHeight - CustomUtils.CartHeight)
    }

    
    static SetCartSize(s:PIXI.Sprite){
        CustomUtils.CartHeight = s.height 
    }

    static ResizeBack(s:PIXI.Sprite): void{
        s.scale.set(1);
        if(window.screen.availWidth < window.screen.availHeight){
            s.angle = 90;
            // s.scale.set(s.width/(window.screen.availWidth-s.width))
        } else{
            s.angle = 0;
            // s.scale.set(s.height/(window.screen.availHeight-s.height))
        }
        s.anchor.set(0.5);
        s.position.set(window.screen.availWidth/2, window.screen.availHeight/2)
    }

    static ResizeSprit(s:PIXI.Sprite): number{
        const sch= window.screen.availHeight/4;
        const scw = window.screen.availWidth/4;
        const sc = sch <scw?sch:scw;
        
        s.scale.set(1);
        s.scale.set(sc/s.height)
        return s.scale.x;
    }

    static ResizeContainer(_cartPull: PIXI.Container): PIXI.Container {
        
            for (let i = 0; i < _cartPull.children.length; i++) {
                CustomUtils.ResizeSprit(_cartPull.children[i] as PIXI.Sprite);
            }

            let offsetY = (window.screen.availWidth - _cartPull.width) / 2 + _cartPull.width / 2;
            _cartPull.position.set(offsetY, window.outerHeight - _cartPull._localBounds.maxY - _cartPull.height * 0.01);
            
            return _cartPull
    }

    static ResizeStock(s:PIXI.Container){
        s.position.set(0,0);
        let offsetY = (window.screen.availWidth*0.90);
        s._localBounds && 
        gsap.to(s, {
            x: offsetY,
            y: 0 + s._localBounds.maxY + s.height * 0.01,
            duration: 1,
        })
        for (let i = 0; i < s.children.length; i++) {
            CustomUtils.ResizeSprit(s.children[i] as PIXI.Sprite);
            s.children[i].position.set(window.screen.availWidth*0.90,window.screen.availHeight*0.5)
            if(window.screen.availWidth < window.screen.availHeight){
                // s.children[i].angle = 90;
            } else{
                // s.children[i].angle = 0;
            }
        }
    }

    static ResizePull(s:PIXI.Container){
        s.position.set(0,0);
        let offsetY = (window.screen.availWidth - s.width) / 2 + s.width / 2;
        gsap.to(s, {
            x: offsetY,
            y: window.outerHeight - s._localBounds.maxY - s.height * 0.01,
            duration: 1,
        })
        for (let i = 0; i < s.children.length; i++) {
            CustomUtils.ResizeSprit(s.children[i] as PIXI.Sprite);
            s.children[i].position.set(offsetY,window.screen.availHeight*0.92)
            if(window.screen.availWidth < window.screen.availHeight){
                // s.children[i].angle = 90;
            } else{
                // s.children[i].angle = 0;
            }
        }
    }

    static ResizePullMob(s:PIXI.Container){
        // s.position.set(0,0);
        let offsetY = (window.screen.availWidth - s.width) / 2 + s.width / 2;
        gsap.to(s, {
            x: offsetY,
            y:  s.height * 0.20,
            duration: 1,
        })
    }
}