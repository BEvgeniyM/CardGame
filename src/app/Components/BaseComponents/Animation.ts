import { Sprite, DisplayObject } from 'pixi.js';
import { gsap } from "gsap";
import { CustomUtils } from '../../../Utils/CustomUtils';
import { ElementConfig, ElementType,Element } from '../Element';
import { SimpleRopeImage } from './SimpleRopeImage';
import { SpriteImage } from './SpriteImage';
import { Filters } from './Filters';
import { StageController } from '../../../StageController';
import { DataSetting } from '../../../Utils/DataSetting';

export class Animation {
  private _timeLine: gsap.core.Timeline;
  private _gsap: gsap.core.Tween;
  private _element: ElementType;
  private _config: ElementConfig;
  private _filters: Filters;
    
  constructor(private ELEMENT: Element) {
    this._element = ELEMENT.element;
    this._config = ELEMENT.config;
    this._filters = ELEMENT.filters;
    this.setPosition();
  }

  setPosition(): void {
    CustomUtils.SetScaleOfProz(this._element as Sprite, this._config);
    CustomUtils.GoToProz(this._element, this._config);
  }

  rotatingAndСhangingTexture(t: string | null = null): void {
    const sprite = this._element as SpriteImage;
    if (sprite.textureID === t) {
      return;
    }
    const scaleX = this._element.scale.x
    // const scaleX = CustomUtils.SetScaleOfProz(this._element as Sprite, this._config);

    CustomUtils.GoTo(this._element.scale, {
      x: scaleX * 0.1,
      delay: 0,
      callbackScope: this._element,
      onComplete: () => {
        if (t) {
          sprite.setTexture(t);
        } else if (sprite.textureID === this._config.tb && this._config.t) {
          sprite.setTexture(this._config.t);
        } else if (sprite.textureID === this._config.t && this._config.tb) {
          sprite.setTexture(this._config.tb);
        }

        CustomUtils.GoTo(this._element.scale, {
          x: scaleX,
          delay: 0,
          callbackScope: this._element,
          onComplete: () => {}
        });
      }
    });
  }

  addsetBlurFilterAnimation(f:boolean){
    f && this._element.filters?.shift()
    !f && this._filters.setFilter();
  }

  moveFromTo():Animation{    
   gsap.to( this._element,{
    x: this._element.x*0.05,
    delay:CustomUtils.GetRandomArbitrary(0,3),
    duration: DataSetting.DefaultDuration*10,
    repeat:10000,
    yoyo:true,
   })
   return this
  }

  moveFromToZ():Animation{    
    gsap.to(this._element.scale,{
     y: 0.95,
     x: 0.95,
     delay:CustomUtils.GetRandomArbitrary(0,3),
     duration: DataSetting.DefaultDuration*10,
     repeat:10000,
     yoyo:true,
    })
    return this
   }
   moveFromToA():Animation{    
    gsap.to(this._element,{
     angle:CustomUtils.GetRandomArbitrary(-5,5),
     delay:CustomUtils.GetRandomArbitrary(0,3),
     duration: DataSetting.DefaultDuration*10,
     repeat:10000,
     yoyo:true,
    })
    return this
   }

  alphaAnimation(a:boolean = true){
    this._element.alpha = !a?1:0;
    gsap.to( this._element,{
      alpha:a?1:0,
      duration: DataSetting.DefaultDuration * 1,
     })
  }

  animationMeth(){
    const sprite = this._element as SimpleRopeImage;

    if(!sprite.points){
      console.error("Point array not found in config for Meth");
      debugger
      return
    }

    let count = 0;
    StageController.app.ticker.add(() => {
      count += 0.01;
      for (let i = 0; i <  sprite.points.length; i++) {
        sprite.points[i].y = Math.sin((i * 0.5) + count) * 2;
        sprite.points[i].x = i * sprite.xStap + Math.cos((i * 0.3) + count) * 2;
      }
    });
  }

  animationMeth_2(){
    const sprite = this._element as SimpleRopeImage;

    if(!sprite.points){
      console.error("Point array not found in config for Meth");
      debugger
      return
    }

    let count = 0;
    StageController.app.ticker.add(() => {
      count += 0.1;
      for (let i = 0; i <  sprite.points.length; i++) {
        sprite.points[i].y = Math.sin((i * 0.5) + count) * 30;
        sprite.points[i].x = i * sprite.xStap + Math.cos((i * 0.3) + count) * 20;
      }
    });
  }
}
