import { Container, IPoint } from 'pixi.js';

import { WebFont} from './BaseComponents/WebFont';
import { SpriteImage } from './BaseComponents/SpriteImage';
import { GraphicImage } from './BaseComponents/GraphicImage';
import { SimpleRopeImage } from './BaseComponents/SimpleRopeImage';
import { ElementContainer} from './BaseComponents/ElementContainer';

import { Animation } from './BaseComponents/Animation';
import { ViwePort } from './BaseComponents/ViwePort';
import { Filters, FilterConfig } from './BaseComponents/Filters';

import { CustomUtils } from '../../Utils/CustomUtils'
import { throws } from 'assert';

export class Element {
    public static readonly WebFont = 'WebFont';
    public static readonly SpriteImage = 'SpriteImage';
    public static readonly GraphicImage = 'GraphicImage';
    public static readonly SimpleRopeImage = 'SimpleRopeImage';
    public static readonly ElementContainer = 'ElementContainer';

    public childs: ElementType[] | Element[] = [];
    public element: ElementType;
    public animation: Animation;
    public filters: Filters;
    public viweport: ViwePort;
    public type: string;
    public parent: ElementContainer | null = null;

    constructor(parent: Container, public config: ElementConfig) {
        this.type = config.type??'';
        if( 'debug' in config){
            debugger
        }
        switch (config.type) {            
            case Element.WebFont:
                this.element = new WebFont(config);
                break;
            case Element.SpriteImage:
                this.element = new SpriteImage(config);
                break;
            case Element.GraphicImage:
                this.element = new GraphicImage(config);
                break;
            case Element.SimpleRopeImage:
                this.element = new SimpleRopeImage(config);
                break;
            case Element.ElementContainer:
                this.element = new ElementContainer(config).resizeElementContainer();
                break;
            default:
                break;
        }

        if (this.element) {
            parent.addChild(this.element); 
            if(parent instanceof ElementContainer){
                this.parent = parent;
                parent.childs?.push(this);
                const r = this.element as ElementContainer
                this.childs = r.childs; 
            }
            this.element.interactive = true
            // this.element.interactiveChildren = true;

            this.filters = new Filters(this);
            this.animation = new Animation(this);  
            this.viweport = new ViwePort(this);
           
        } else{
            console.error("Element not Created !!!");
            debugger
        }      

        this.viweport.resize();
    }    
}


export interface ElementConfig {
    type?: string;                     // ElementType
    name?: string;                     // Name
    interType?: string;                // For GraphicImage  RECTANGLE  | Arm... Cir..
    childs?: Array<ElementConfig>;     // Used with ElementContainer
    viweport?:viwePort,                // Setting for scaling and position
    t?: string;                        // Texture of Sprite or SimpleRopeI
    tb?: string;                       // Also Texture of Sprite or SimpleRopeI
    x: number;                         // x in % of windos.innerWidth  
    y: number;                         // x in % of windos.innerWidth
    z?: number;                        // zIndex
    ax?: number;                       // Anchor only for Sprite and WebText  
    ay?: number;                       // Anchor only for Sprite and WebText  
    alpha?: number;
    scale?: number;
    color?: number;
    w?: number;                        // For GraphicImage     
    h?: number;                        // For GraphicImage 
    ts?: number;                       // Scale of texture for WebText masck
    point?: IPoint[];                  // Array of IPiont only for SimpleRope
    xStap?:number;                     // SimpleRope divides lengthwise into xStap pieces
    filter?: Array<FilterConfig>,      // tow type of filters  BLURFILTER and DISPLACEMENTFILTER
    portret?:ElementConfig,            // Setting for portrait orientation
    debug?:boolean                     // Stap if incluode in config
}
//** Если мы используем контейне то все размеры x y бут строится относительно системы координат контейнера */
export type viwePort= {
    sf?: number;                       // 'SizeFrom' If this param will be used all size lick x, y will be calc from sf (used with ElementContainer)
    cover?: boolean;                   // If used cover will be try cover screen 
    angle?: boolean;                   // Depend from orientation rotation or not    
    fr?:number;                        // 'FromRight' site of screen in [px]
    fb?:number;                        // 'FromBotton' site of screen in [px]
    sch?:number;                       //  Scale in % from height!!! of screen, calc scale for element base on Height of Screen 
    scw?:number;                       //  Scale in % from width!!! of screen, calc scale for element base on Width of Screen 
    portret?:{
        sch?:number;                      
        scw?:number;                     
    }


}


export type ElementType =  ElementContainer | SpriteImage | GraphicImage | SimpleRopeImage | WebFont;



