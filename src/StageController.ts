import {Container, Application,Loader, Sprite,  settings, ENV } from  'pixi.js'
import * as PIXI from 'pixi.js'
import { BaseViwe } from './app/BaseViwe';
import { Cart } from './app/Cart';

export class StageController {

    backgroundColor:  number = 0x072500;
    gameWidth:number = 960;
    gameHeight:number = 540;

    static dragTarget: PIXI.DisplayObject | null = null;
    static app:Application

    constructor(){

        StageController.app = new Application({
            backgroundColor: this.backgroundColor,
            width: this.gameWidth,
            height: this.gameHeight,
            resizeTo:window,
        });
       document.body.appendChild(StageController.app.view);

       window.addEventListener("resize", this.resizeCanvas);
       // window.addEventListener("orientationchange", resize);
       this.registerPixiInspector();
       this.resizeCanvas();
       this.init();
    }

    init():Application{   
    settings.RESOLUTION = window.devicePixelRatio;
    settings.PREFER_ENV = ENV.WEBGL_LEGACY;
    
    StageController.app.stage.interactive = true;
    // StageController.app.stage.hitArea = StageController.app.screen;

    // StageController.app.stage.on('pointerup', StageController.onDragEnd);
    // StageController.app.stage.on('pointerupoutside', StageController.onDragEnd);
        return StageController.app; 
    }

    static onDragEnd() {        
        if (StageController.dragTarget) {
            StageController.app.stage.off('pointermove', StageController.onDragMove);
            StageController.dragTarget.alpha = 1;
            StageController.dragTarget = null;
        }
    }
    
    static onDragMove(event: any) {
        if (StageController.dragTarget) {            
            // @ts-ignore
            StageController.dragTarget.parent.toLocal(event.data.global, null, StageController.dragTarget.position);
        }
    }


     resizeCanvas(): void {
       
        const resize = () => {
          
            // StageController.app.renderer.resize(window.innerWidth,window.innerHeight);
            // if(window.screen.orientation.angle ==0){
            //     StageController.app.renderer.resize(window.screen.availHeight,window.screen.availWidth);
            // } else
            StageController.app.renderer.resize(window.screen.availWidth,window.screen.availHeight);
            // app.stage.scale.x = scale;
            // app.stage.scale.y = window.innerHeight / gameHeight;
            // app.stage.scale.y = scale;
            
            // Viwe.ResizeCanvas();            
        };
    
       
        setTimeout(() => {
            resize();  
        }, 0);
    
       
    }
   

    registerPixiInspector() {
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

}