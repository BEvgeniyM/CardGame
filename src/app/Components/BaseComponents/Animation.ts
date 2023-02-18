import { Sprite, DisplayObject } from 'pixi.js';
import { gsap } from "gsap";
import { CustomUtils } from '../../../Utils/CustomUtils';
import { ElementConfig, ElementType,Element } from '../Element';
import { SpriteImage } from './SpriteImage';
import { Filters } from './Filters';
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
    const scaleX = CustomUtils.SetScaleOfProz(this._element as Sprite, this._config);

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
}
