import { Container, Application, Loader, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { MessageMeneger } from '../MessageMeneger';
import { BaseController } from './BaseController';
import { BaseViwe } from './BaseViwe';
import { Event } from './Event';
import {StageController} from '../StageController'
import { gsap } from "gsap";

export class Preloader extends Container {

constructor(private _perent: PIXI.DisplayObject){
    super();
}

init():Preloader{
    StageController.app.stage.addChild(this);
    this._zIndex = 10000;
    this.loadGameAssets()
    return this
}
// window.onload = async (): Promise<void> => {
//     await loadGameAssets();

//     new MessageMeneger(app).init();
    

//     const birdFromSprite = getBird();
//     birdFromSprite.anchor.set(0.5, 0.5);
//     birdFromSprite.position.set(gameWidth / 2, gameHeight);

//     const spineExample = getSpine();
//     spineExample.position.y = 580;

//     app.stage.addChild(birdFromSprite);
//     app.stage.addChild(spineExample);
//     app.stage.interactive = true;
// };

 loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("preLoder", "./assets/jocer.jpeg");

        loader.onComplete.once(() => {
           
            for (let i = 0; i < 90; i++) {
                this.creatPreloader(i);
            }

            
        });

        loader.onError.once(() => {
            rej();
        });

        this.position.set(window.innerWidth*0.5,window.innerHeight*0.5)
        this.pivot.set(window.innerWidth*0.5,window.innerHeight*0.5)
       
       
        
        loader.load();
    });
}

creatPreloader(i:number):void{
   
    const texture = PIXI.Texture.from('preLoder');
    let sprite = new Sprite(texture);
            sprite.position.set(window.innerWidth*Math.random(), window.innerHeight*Math.random());
            sprite.scale.set(0.5);
            sprite.cursor = 'pointer';
            sprite.anchor.set(0.5);
            sprite.interactive = true;
            sprite.angle = 360*Math.random()
            sprite.zIndex = 1000-i;
            gsap.timeline()
            .to(sprite.scale,{
                x:1,
                y:1,
                delay:5*Math.random(),
                duration:1
            })

            
    this.addChild(sprite);
}

highPreLoader():void{

    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        gsap.to(element,{
            angle:90+i,
            x:window.innerWidth*0.5,
            y:window.innerHeight*0.5,
            delay:1*Math.random(),
            duration:1
        });
        
    }
    gsap.to(this,{
        angle:180,
        delay:2,
        duration:1
    })
    gsap.to(this.scale,{
        x:0.5,
        y:0.5,
        delay:2,
        duration:1
    })
    gsap.to(this.scale,{
        x:2,
        y:2,
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
    this._perent.emit(Event.PRELOADERCOMPLETE)
}
}
