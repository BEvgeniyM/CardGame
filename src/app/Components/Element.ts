import { Container, DisplayObject} from 'pixi.js';
import { SpriteImage } from './SpriteImage';
import { GraphicImage } from './GraphicImage';
import { Animation } from './Animation';

export class Element {
    public static readonly SpriteImage = 'SpriteImage';
    public static readonly GraphicImage = 'GraphicImage';
    public elem: SpriteImage | GraphicImage;
    public animation: Animation;

    constructor(parent: Container, config: ElementConfig) {

        switch (config.type) {
            case Element.SpriteImage:
                this.elem = new SpriteImage(config);
                break;
            case Element.GraphicImage:
                this.elem = new GraphicImage(config);
                break;
            default:
                break;
        }

        if (this.elem) {
            parent.addChild(this.elem);
           this.elem.animation = new Animation(this.elem);
        }
    }

    getElement(): DisplayObject {
        return this.elem;
    }
}


export interface ElementConfig {
    type?: string;
    t?: string;
    tb?: string;
    x?: number;
    y?: number;
    z?: number;
    ax?: number;
    ay?: number;
    alpha?: number;
    scale?: number;
    color?: number;
    w?: number;
    h?: number;
}



