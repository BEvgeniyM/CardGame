
import * as PIXI from 'pixi.js'

export class CustomUtils {
    static CartHeight: number = 0;
    static GetRandomArbitrary(min: number = 100, max: number = window.outerHeight - 100): number {
        return Math.random() * (max - min) + min;
    }
    static GetScaleCart():number{
        // if(window.screen.orientation.angle ==0) return 0.5
        return (window.screen.availHeight / 4)* 0.5/CustomUtils.CartHeight
    }

    
    static SetCartSize(s:PIXI.Sprite){
        CustomUtils.CartHeight = s.height 
    }

    static ResizeBack(s:PIXI.Sprite): void{
        s.scale.set(1);
        debugger
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
        const sc = window.screen.availHeight/4;
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
}