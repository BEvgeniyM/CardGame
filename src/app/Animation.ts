import { Container, Sprite, Texture, Graphics } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'
import { DataSetting } from '../Utils/DataSetting';

export class Animation extends Image {

    public _timeLine: gsap.core.Timeline | null = null;
    // public _gsap: gsap.core.Tween | null = null;
    public _lockEvent: boolean = false;

    constructor() {
       super()
    }


}
