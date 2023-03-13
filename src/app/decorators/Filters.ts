import { Sprite, Texture, filters } from 'pixi.js';
import * as PIXI from 'pixi.js'
import { StageController } from '../../StageController';
import { ElementConfig, ElementType, Element } from '../components/Element';

export class Filters {

  public static readonly DisplacementFilter = 'DISPLACEMENTFILTER';
  public static readonly BlurFilter = 'BLURFILTER';
  public static readonly Math = 'MATH';

  private _element: ElementType;
  private _config: ElementConfig

  constructor(private ELEMENT: Element) {
    this._element = ELEMENT.element;
    this._config = ELEMENT.config;
    this._element.filters = [];

    this.setFilter();
  }


  setFilter() {
    if (this._config.filter && this._config.filter.length != 0) {
      for (let i = 0; i < this._config.filter.length; i++) {

        if (this._config.filter[i].type?.toUpperCase() == Filters.DisplacementFilter) {
          this.setВisplacementFilter(this._config.filter[i]);
        }

        if (this._config.filter[i].type == Filters.BlurFilter) {
          this.setBlurFilter(this._config.filter[i]);
        }

        if (this._config.filter[i].type == Filters.Math) {
          this.setMath(this._config.filter[i]);
        }

      }
    }
  }

  protected setBlurFilter(f: FilterConfig): void {
    if (!f.blurX || !f.blurY || !f.quality) {
      return
    }
    const blurFilters = new filters.BlurFilter();

    blurFilters.blurX = f.blurX;
    blurFilters.blurY = f.blurY;
    blurFilters.quality = f.quality;
    blurFilters.repeatEdgePixels = true;

    this._element.filters && this._element.filters.push(blurFilters);
  }


  protected setВisplacementFilter(f: FilterConfig): void {

    if (!f.DisplacementFilterTexture) {
      return
    }

    const displacementSprite = Sprite.from(Texture.from(f?.DisplacementFilterTexture));
    displacementSprite.name = f.DisplacementFilterTexture;
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementFilter.scale.set(f.scale);
    displacementSprite.position = this._element.position;

    this._element.filters && this._element.filters.push(displacementFilter);
    // this._element.mask = displacementSprite;    
    this._element.parent.addChild(displacementSprite);

    StageController.app.ticker.add(() => {
      displacementSprite.x++;
      if (displacementSprite.x >= displacementSprite.width / 2) {
        displacementSprite.x = 0;
      }
    });
  }

  setMath(f: FilterConfig): void {

    // if (!f.DisplacementFilterTexture) {
    //   return
    // }

    // let points: Array<PIXI.Point> = [];
    // const ropeLength = 400 / 20;
    // for (let i = 0; i < 20; i++) {
    //   points.push(new PIXI.Point(i * ropeLength, 0));
    // }

    // // const strip = new PIXI.SimpleRope(PIXI.Texture.from(f?.DisplacementFilterTexture), points);

    // let s = this._element as PIXI.Sprite
    // const strip = new PIXI.SimpleRope(s.texture, points);
    // strip.scale.set(f.scale);
    // this._element.parent.addChild(strip);


    // let count = 0;
    // StageController.app.ticker.add(() => {
    //   count += 0.1;
    //   // make the snake
    //   for (let i = 0; i < points.length; i++) {
    //     points[i].y = Math.sin((i * 0.5) + count) * 30;
    //     points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    //   }
    // });


  }



}


export interface FilterConfig {
  type?: string;
  x?: number,
  y?: number,
  ax?: number,
  ay?: number,
  blurX?: number,
  blurY?: number,
  quality?: number,
  DisplacementFilterTexture?: string;
  alpha?: number;
  scale?: number;
}