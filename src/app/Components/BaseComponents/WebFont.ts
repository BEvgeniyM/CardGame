import { Loader, TextStyleAlign, BitmapText, IBitmapTextStyle, Container, Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { CompositeTilemap, CompositeRectTileLayer } from '@pixi/tilemap';
import { ElementContainer } from './ElementContainer';
import { settings } from '@pixi/tilemap';
import gsap from 'gsap';
import { StageController } from '../../../StageController';
import { CustomUtils } from '../../../Utils/CustomUtils';

export class WebFont extends ElementContainer {
  public textSample: any = '';
  protected _maskSprite: Sprite;
  protected defaultStyle = {
    fontSize: 90,
    fill: 'white',
    align: 'center',
    fontFamily: 'Freehand-Regular',
  };

  constructor(public config: any) {
    super(config);
    this.interactiveChildren = false;

    if (config) {
      this.x = config.x ?? this.x;
      this.y = config.y ?? this.y;
      this.zIndex = config.z ?? this.zIndex;
      this.alpha = config.alpha ?? this.alpha;
      config.scale ?? this.scale.set(config.scale);
      config.style && this.createTilemap(config.t);
    }

    this.createWebFont();
  }

  public createTilemap(textureName: string): Sprite {
    const texture = PIXI.Texture.from(textureName);
    const sprite = new Sprite();
    const tilemap = new CompositeTilemap();
    const map = tilemap.tile(texture, 0, 0);

    settings.TEXTURES_PER_TILEMAP = 8;
    settings.use32bitIndex = true;

    sprite.addChild(map);
    for (let i = 0; i <= window.innerWidth / texture.width; i++) {
      for (let j = 0; j <= window.innerHeight / texture.height; j++) {
        tilemap.addFrame(texture, i * texture.width, j * texture.height);
      }
    }

    return sprite;
  }

  protected setMask(): PIXI.Sprite | PIXI.Graphics {
    this._maskSprite = this.createTilemap(this.config.t);
    this._maskSprite.scale.set(this.config.ts);
    this.addChild(this._maskSprite);

    if (this.config.t) {
      this.moveMask();
    }

    return this._maskSprite;
  }

  protected moveMask(): void {
    let count = 0;
    StageController.app.ticker.add(() => {
      count += 0.02;
      if (this._maskSprite) {
        this._maskSprite.x = -200 + Math.cos(count) * 40;
        this._maskSprite.y = -200 + Math.sin(count) * 40;
      }
      if (this._maskSprite && this._maskSprite.x > this._maskSprite.width) {
        this._maskSprite.x = 0;
      }
    });
  }

  public createWebFont() {
    const style = Object.assign(this.defaultStyle, this.config.style);
    const textSample = new PIXI.Text(this.config.text, new PIXI.TextStyle(style));

    if (this.config.t) {
      this.setMask().mask = textSample;
    }

    this.textSample = textSample;
    this.addChild(textSample);
  }
}
