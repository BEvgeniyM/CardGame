import { gsap } from "gsap";
import { DataSetting } from '../../modules/cartGame/DataSetting';
import { EE } from './EE'
import { EventGame } from '../../components/EventGame';


export class Timer {

    constructor(e: string | Function, content?: any, private delay?: number) {
        if(e === "string"){
            this.timer(e, content);
        }
        if(e instanceof Function ){
            this.timerFuntion(e, content);
        }
      
    }

    private timer(e: any, content?: any) {
        gsap.to(this, {
            delay: this.delay ?? DataSetting.DefaultDeley,
            callbackScope: this,
            onComplete: () => {
                EE.Glob.emit(EventGame.ACTION, e, content)
            }
        })
    }

    private timerFuntion(e: Function, content?: any) {
        gsap.to(this, {
            delay: this.delay ?? DataSetting.DefaultDeley,
            callbackScope: this,
            onComplete: () => {
               e()
            }
        })
    }
}