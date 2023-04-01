
import { Sprite} from 'pixi.js';
import { DataSetting } from "../app/modules/cartGame/DataSetting";


export class CustomUtils {
    static CardHeight: number = 0;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       SET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       GET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static GetRandomArbitrary(min: number = 100, max: number = window.outerHeight - 100): number {
        return Math.random() * (max - min) + min;
    }

    static GetScaleCard():number{
        return   CustomUtils.CardHeight/(window.innerHeight - CustomUtils.CardHeight)
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ReSize VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static FormatNumber(num: number): string {
        const roundedNum = Math.round(num * 100) / 100;
        if (num === 0) {
          return '0.0';
        }
        return roundedNum.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).padStart(4, ' ');
      }
      

    static ResizeSprit(s:Sprite): number{
        const sch= window.innerHeight/4;
        const scw = window.innerWidth/4;
        const sc = sch <scw?sch:scw;
        
        s.scale.set(1);
        s.scale.set(sc/s.height)
        return s.scale.x;
    }

    static IsPortret():boolean{
       return  window.innerHeight > window.innerWidth
    }
}

