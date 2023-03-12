import { Sprite, DisplayObject, Container } from 'pixi.js';
import { gsap } from "gsap";
import { CustomUtils } from '../../../Utils/CustomUtils';
import { ElementConfig, ElementType, Element } from '../Element';
import { ElementContainer } from '../BaseComponents/ElementContainer';
import { SimpleRopeImage } from './SimpleRopeImage';
import { SpriteImage } from './SpriteImage';
import { Filters } from './Filters';
import { StageController } from '../../../StageController';
import { DataSetting } from '../../../Utils/DataSetting';

export class Animation {
  private _timeLine: gsap.core.Timeline;
  private _gsap: gsap.core.Tween;
  private _element: ElementType;
  private _ELEMENT: Element;
  private _config: ElementConfig;
  private _filters: Filters;

  constructor(private ELEMENT: Element) {
    this._ELEMENT = ELEMENT;
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
          onComplete: () => { }
        });
      }
    });
  }

  setPositionCarts(x: any, y: number) {
    CustomUtils.GoTo(this._element, {
      x: x,
      y: y,
      angle: 0,
      delay: 0,
      callbackScope: this._element,
      onComplete: () => { }
    });
  }

  majorMastOpen(): void {
    // debugger
    const c = {
      angle: -90,
      // f: this.rotatingAndСhangingTexture.bind(this._element)
    }
    const e = this._element as SpriteImage
    e.anchor.set(0.5, 1);
    this.rotatingAndСhangingTexture()
    CustomUtils.GoTo(this._element, c)
  }




  addsetBlurFilterAnimation(f: boolean) {
    f && this._element.filters?.shift()
    !f && this._filters.setFilter();
  }

  moveFromTo(): Animation {
    gsap.to(this._element, {
      x: this._element.x * 0.05,
      delay: CustomUtils.GetRandomArbitrary(0, 3),
      duration: DataSetting.DefaultDuration * 10,
      repeat: 10000,
      yoyo: true,
    })
    return this
  }

  fan(a:number,c: number): Animation {

    gsap.timeline()
    .to(this._element, {
        angle:a,
        duration: DataSetting.DefaultDuration
    })  
    return this
  }

  animaLittleMove(): void {
    const cart = this._element
    const p = cart.y;
    const z = cart.zIndex;
    cart.zIndex = 1000;
    this._element.interactive = false
    gsap.to(cart, {
      y: cart.y + CustomUtils.GetRandomArbitrary(0, -30),
      direction: DataSetting.DefaultDuration,
      callbackScope: this,
      onComplete: () => {
        gsap.to(cart, {
          y: p,
          direction: DataSetting.DefaultDuration,
          onComplete: () => {
            cart.zIndex = z;
            this._element.interactive = true
          }
        })
      }
    })
  }

  animaCartMove(tt: Element, g?: any): any {
    const gg = g ? g : gsap;
    return gg.to(this._element, {
      angle: CustomUtils.GetRandomArbitrary(-7, 7),
      x: tt.element.getGlobalPosition().x - this._element.getGlobalPosition().x,
      y: tt.element.getGlobalPosition().y - this._element.getGlobalPosition().y + CustomUtils.GetRandomArbitrary(-5, 5),
      delay: 0.0,
      direction: 0.5,
      callbackScope: this,
      onUpdate: () => { },
      onComplete: () => {
        this._element.position.set(0, 0);
        const elementContainer = tt.element as ElementContainer
        elementContainer.addElement(this._ELEMENT);
      }
    })

  }

  animaCartMover(tt: Element, g?: gsap.core.Timeline | null, d?: number): any {
    const rr = this._element as SpriteImage
    rr.angle = 0;
    rr.anchor.set(0.5);
    // Set Position 
    const globalPos = this._element.getGlobalPosition();
    const elementContainer = tt.element as ElementContainer
    elementContainer.addElement(this._ELEMENT);
    const localPos = this._element.parent.toLocal(globalPos);
    this._element.position.set(localPos.x, localPos.y);
    // Set Position

    const gg = g ? g : gsap;
    return gg.to(this._element, {
      angle: CustomUtils.GetRandomArbitrary(-7, 7),
      x: CustomUtils.GetRandomArbitrary(-5, 5),
      y: CustomUtils.GetRandomArbitrary(-5, 5),
      delay: d,
      direction: 20,
      callbackScope: this,
      onStartParams: [this],
      onStart: () => {

      },
      onComplete: () => {
        this._element.position.set(0, 0);
      }
    })
  }

  cartMoveToCenter(g?: gsap.core.Timeline | null, d?: number): Animation {
    const rr = this._element as SpriteImage
    rr.angle = 0;
    rr.anchor.set(0.5);

    const gg = g ? g : gsap;
    gg.to(this._element, {
      angle: CustomUtils.GetRandomArbitrary(-7, 7),
      x: CustomUtils.GetRandomArbitrary(-5, 5),
      y: CustomUtils.GetRandomArbitrary(-5, 5),
      delay: d,
      direction: 0.5,
      callbackScope: this,
      onStartParams: [this],
      onStart: () => {

      },
      onComplete: () => {
        this._element.position.set(0, 0);
      }
    })
    return this
  }
  changingTexture(t: string | null = null): Animation {
    const sprite = this._element as SpriteImage;
    if (sprite.textureID === t) {
      return this;
    }
    const scaleX = this._element.scale.x;

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
          onComplete: () => { }
        });
      }
    });
    return this
  }


  moveRigth_0(): Animation {
    gsap.to(this._element, {
      x: window.innerWidth,
      delay: CustomUtils.GetRandomArbitrary(0, 10),
      duration: DataSetting.DefaultDuration * 10,
      repeat: 10000,
      yoyo: true,
    })
    return this
  }

  moveRigth_1(): Animation {
    gsap.to(this._element, {
      x: window.innerWidth * 0.9,
      y: window.innerHeight * 0.9,
      delay: CustomUtils.GetRandomArbitrary(0, 10),
      duration: DataSetting.DefaultDuration * 10,
      repeat: 10000,
      yoyo: true,
    })
    return this
  }

  moveFromToZ(): Animation {
    gsap.to(this._element.scale, {
      y: 0.95,
      x: 0.95,
      delay: CustomUtils.GetRandomArbitrary(0, 3),
      duration: DataSetting.DefaultDuration * 10,
      repeat: 10000,
      yoyo: true,
    })
    return this
  }
  moveFromToA(): Animation {
    gsap.to(this._element, {
      angle: CustomUtils.GetRandomArbitrary(-5, 5),
      delay: CustomUtils.GetRandomArbitrary(0, 3),
      duration: DataSetting.DefaultDuration * 10,
      repeat: 10000,
      yoyo: true,
    })
    return this
  }

  alphaAnimation(a: boolean = true) {
    this._element.alpha = !a ? 1 : 0;
    gsap.to(this._element, {
      alpha: a ? 1 : 0,
      duration: DataSetting.DefaultDuration * 1,
    })
  }

  animationMeth() {
    const sprite = this._element as SimpleRopeImage;

    if (!sprite.points) {
      console.error("Point array not found in config for Meth");
      debugger
      return
    }

    let count = 0;
    StageController.app.ticker.add(() => {
      count += 0.01;
      for (let i = 0; i < sprite.points.length; i++) {
        sprite.points[i].y = Math.sin((i * 0.5) + count) * 2;
        sprite.points[i].x = i * sprite.xStap + Math.cos((i * 0.3) + count) * 2;
      }
    });
  }

  animationMeth_2() {
    const sprite = this._element as SimpleRopeImage;

    if (!sprite.points) {
      console.error("Point array not found in config for Meth");
      debugger
      return
    }

    let count = 0;
    StageController.app.ticker.add(() => {
      count += 0.1;
      for (let i = 0; i < sprite.points.length; i++) {
        sprite.points[i].y = Math.sin((i * 0.5) + count) * 30;
        sprite.points[i].x = i * sprite.xStap + Math.cos((i * 0.3) + count) * 20;
      }
    });
  }
}
