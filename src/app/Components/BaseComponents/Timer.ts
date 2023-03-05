import { gsap } from "gsap";
import { DataSetting } from '../../../Utils/DataSetting';
import { EE } from './EE'
import { Event } from '../../Event';


export class Timer {

 constructor(e: string, p:string, private delay:number = DataSetting.DefaultDeley){
    this.timer(e, p);
 }


private timer(e: any, p?: any) {
    gsap.to(this, {
        delay: this.delay,
        callbackScope: this,
        onComplete: () => {
            EE.Glob.emit(Event.ACTION, e, p)
        }
    })
}
}