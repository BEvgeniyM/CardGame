import { Graphics } from 'pixi.js';
import { Animation } from './Animation';
import { ElementConfig } from './Element';

export class GraphicImage extends Graphics {
  public animation: Animation;

  constructor(private config: ElementConfig) {
    super();

    if (config) {
      this.x = config.x ?? this.x;
      this.y = config.y ?? this.y;
      this.zIndex = config.z ?? this.zIndex;
      this.alpha = config.alpha ?? this.alpha;
      config.scale ?? this.scale.set(config.scale);
    }
  }

}


