import { Container, Graphics } from 'pixi.js';
import { ElementConfig } from '../Element';

export class GraphicImage extends Graphics {
  private color: number;

  constructor(private config: ElementConfig) {
    super();
    this.color = config.color ?? 0xffffff;
    this.setup();
  }

  private setup(): void {
    this.position.set(this.config.x ?? 0, this.config.y ?? 0);
    this.width = this.config.w ?? 100;
    this.height = this.config.h ?? 100;
    this.zIndex = this.config.z ?? 0;
    this.alpha = this.config.alpha ?? 1;
    this.scale.set(this.config.scale ?? 1);
    this.createGraphic();
  }

  private createGraphic(): void {
    if (this.config.interType?.toUpperCase() === 'RECTANGLE') {
      this.createRectangle();
    }
  }

  private createRectangle(): void {
    this.beginFill(this.color);
    this.drawRect(0, 0, this.width, this.height);
    this.endFill();
  }
}
