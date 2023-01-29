import {Container} from  'pixi.js'
import { Event } from './Event';
import {BaseViwe}from './BaseViwe';
import * as PIXI from 'pixi.js'


export class BaseController extends Container{
constructor(){
    super();
    this.name = this.constructor.name;
}



init(): BaseController{
    this.on(Event.END, this.endMessage);
    return this;
    
}

endMessage(view:BaseViwe):void{
    debugger
    view.endMasege();
}

}
  