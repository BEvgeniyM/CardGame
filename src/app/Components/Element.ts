import { Container, DisplayObject, Filter} from 'pixi.js';
import { SpriteImage } from './BaseComponents/SpriteImage';
import { GraphicImage } from './BaseComponents/GraphicImage';
import { Animation } from './BaseComponents/Animation';
import { Filters,FilterConfig } from './BaseComponents/Filters';

export class Element {
    public static readonly SpriteImage = 'SpriteImage';
    public static readonly GraphicImage = 'GraphicImage';

    // public blurFilters?: Filter | null;
    // public filters: Array<any> = [];

    public element: ElementType;
    public animation: Animation;
    public filters: Filters;

    constructor(parent: Container, public config: ElementConfig) {

        switch (config.type) {
            case Element.SpriteImage:
                this.element = new SpriteImage(config);
                break;
            case Element.GraphicImage:
                this.element = new GraphicImage(config);
                break;
            default:
                break;
        }

        if (this.element) {
            parent.addChild(this.element);
            this.filters = new Filters(this);
            this.animation = new Animation(this);
        }
    }
}


export interface ElementConfig {
    type?: string;
    interType?: string;
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
    filter?:Array<FilterConfig>
}




export type ElementType = SpriteImage | GraphicImage;



