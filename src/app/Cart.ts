import {Sprite,Texture} from  'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

export class Cart extends Sprite{
public _gsap: gsap.core.Tween | null = null;
public _lockEvent:boolean = false
constructor(texture:Texture){
    super();
    this.texture = texture;
}

}
  