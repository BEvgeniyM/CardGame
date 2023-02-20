import { Container, IPoint } from 'pixi.js';

import { SpriteImage } from './BaseComponents/SpriteImage';
import { GraphicImage } from './BaseComponents/GraphicImage';
import { SimpleRopeImage } from './BaseComponents/SimpleRopeImage';
import { Animation } from './BaseComponents/Animation';
import { Filters, FilterConfig } from './BaseComponents/Filters';

export class Element {
    public static readonly SpriteImage = 'SpriteImage';
    public static readonly GraphicImage = 'GraphicImage';
    public static readonly SimpleRopeImage = 'SimpleRopeImage';

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
            case Element.SimpleRopeImage:
                this.element = new SimpleRopeImage(config);
                break;
            default:
                break;
        }

        if (this.element) {
            parent.addChild(this.element);   
            this.filters = new Filters(this);
            this.animation = new Animation(this);        
        } else{
            console.error("Element not Created !!!");
            debugger
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
    point?: IPoint[];
    xStap?:number;
    filter?: Array<FilterConfig>
}


export type ElementType = SpriteImage | GraphicImage | SimpleRopeImage;



