import { Sprite, Texture } from 'pixi.js';
import { ElementConfig } from './Element';
import { Animation } from './Animation';

export class SpriteImage extends Sprite {
  public animation: Animation;

  constructor(private config: ElementConfig) {
    super();

    if (config) {
      this.x = config.x ?? this.x;
      this.y = config.y ?? this.y;
      this.zIndex = config.z ?? this.zIndex;
      this.anchor.set(config.ax ?? this.anchor.x, config.ay ?? this.anchor.y);
      this.alpha = config.alpha ?? this.alpha;
      config.scale ?? this.scale.set(config.scale);
      config.t && this.setTexture(config.t);
    }
  }

  setTexture(str: string): void {
    this.texture = Texture.from(str);
  }

}

