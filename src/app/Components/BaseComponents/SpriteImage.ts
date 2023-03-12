import { Sprite, Texture, SCALE_MODES, Graphics,Rectangle } from 'pixi.js';
import { ElementConfig } from '../Element';

export class SpriteImage extends Sprite {
  public textureID: string;

  constructor(public config: ElementConfig) {
    super();

    if (config) {
      this.x = config.x ?? this.x;
      this.y = config.y ?? this.y;
      this.zIndex = config.z ?? this.zIndex;
      this.anchor.set(config.ax ?? this.anchor.x, config.ay ?? this.anchor.y);
      this.alpha = config.alpha ?? this.alpha;
      config.scale ?? this.scale.set(config.scale);
      config.t && this.setTexture(config.t);
      // this.addDebug();
    }
  }

  setTexture(str: string): void {
    this.textureID = str;
    this.texture = Texture.from(str);
    // this.texture.scaleMode = SCALE_MODES.NEAREST;
  }

  static GetTexture(str: string | undefined): Texture {
    if (!str) return Texture.EMPTY
    return Texture.from(str);
  }

  addDebug() {
    const graphics = new Graphics();
    graphics.lineStyle(2, 0xff0000);
    graphics.drawRect(0, 0, this.width, this.height);
    this.addChild(graphics);
  }

}

