import { Container, Application, Loader, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from '../MessageMeneger';
import { BaseController } from './BaseController';
import { BaseViwe } from './BaseViwe';
import { Event } from './Event';
import {StageController} from '../StageController'
import { gsap } from "gsap";
import { CustomUtils } from '../Utils/CustomUtils'


export class Preloader extends Container {

   /** SETING */
   private _skale: number = 1 //s
   private _cartCount: number = 100;
   /** SETING */


constructor(private _perent: PIXI.DisplayObject){
    super();
}

init():Preloader{
    StageController.app.stage.addChild(this);
    this._zIndex = 10000;
    this.loadGameAssets();
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    return this
}


 loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("preLoder", "./assets/jocer.jpeg");
        loader.add("cartBack", "./assets/cartBackground_.png");
        loader.add("back", "./assets/back.png");
        loader.add("back_", "./assets/back_.png");
        loader.add("za", "./assets/za.png");
        loader.add("zs", "./assets/zs.png");
        loader.add("skin_2", "./assets/skin_2.png");
        loader.add("skin_1", "./assets/skin_1.png");
        loader.add("skin_3", "./assets/skin_3.png");
        loader.add("table_1", "./assets/table_1.png");
        loader.add("table_2", "./assets/table_2.png");
        loader.add("table_3", "./assets/table_3.png");
        loader.add("table_4", "./assets/table_4.png");


        loader.onComplete.once(() => {
                this.creatPreloader();
                this._perent.emit(Event.LOADGAMESTART)
                return this
        });

        loader.onError.once(() => {
            rej();
        });

        this.position.set(window.innerWidth*0.5,window.innerHeight*0.5);
        this.pivot.set(window.innerWidth*0.5,window.innerHeight*0.5);
        
        loader.load();
    });
}

creatPreloader():void{
    for (let i = 0; i < this._cartCount; i++) {
    const texture = PIXI.Texture.from('za');
    let sprite = new Sprite(texture);
            sprite.position.set(window.innerWidth*Math.random(), window.innerHeight*Math.random());
            sprite.scale.set(this._skale);
            sprite.cursor = 'pointer';
            sprite.anchor.set(0.5);
            sprite.interactive = true;
            sprite.angle = 360*Math.random()
            sprite.zIndex = 1000-i;
            gsap.timeline()
            .to(sprite.scale,{
                x:0.6,
                y:0.6,
                delay:0.011*i,
                duration:10,
            })

            
    this.addChild(sprite);
    }
    // const texture = PIXI.Texture.from('zs');
    // let sprite = new Sprite(texture);
    //         sprite.position.set(window.innerWidth*0.5, window.innerHeight*0.5);
    //         sprite.scale.set(this._skale);
    //         sprite.cursor = 'pointer';
    //         sprite.anchor.set(0.5);
    //         sprite.interactive = true;
    //         sprite.angle = 0
    //         sprite.zIndex = 1001;
    //         gsap.timeline()
    //         .to(sprite.scale,{
    //             x:1.1,
    //             y:1.1,
    //             delay:0.011,
    //             duration:10,
    //         })

            
    // this.addChild(sprite);
}

highPreLoader():void{
    this._perent.emit(Event.PRELOADERCOMPLETE);
    
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[this.children.length -1 - i];
        gsap.to(element,{
            angle:-0+i*5,
            x:window.innerWidth*0.5,
            y:window.innerHeight*0.5,
            delay:1*Math.random(),
            duration:1
        });
        
    }
    // gsap.to(this,{
    //     angle:180,
    //     delay:2,
    //     duration:1
    // })
    gsap.to(this.scale,{
        x:0.9,
        y:0.9,
        delay:2,
        duration:1
    })
    gsap.to(this.scale,{
        x:1,
        y:1,
        delay:3,
        duration:1
    })
    gsap.to(this,{
        alpha:0,
        delay:4,
        duration:1
    })

    gsap.to(this,{
        delay:5,
        callbackScope: this,
        onComplete: this.onCompleteLoader
    })
}

onCompleteLoader(){
    this.zIndex= -1000;
    this.removeAllListeners()
    this.removeChildren()
  
}


resizeCanvas(): void {
    CustomUtils.ResizePreloader(this);
}
}
