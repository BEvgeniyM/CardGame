import { Container, Graphics } from 'pixi.js';
import { ElementConfig } from '../Element';

export class GraphicImage extends Graphics {
  private color: number;

  constructor(public config: ElementConfig) {
    super();
    this.color = typeof config.color === "number" || typeof config.color === "string"
  ? +config.color || 0x00000
  : 0x00000;
    this.setup();
  }

  private setup(): void {
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
    this.drawRect(0, 0, this.config.w ?? 100, this.config.h ?? 100);
    this.position.set(this.config.x ?? 0, this.config.y ?? 0);
    this.endFill();
  }
}
