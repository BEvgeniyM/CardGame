import { Sprite, DisplayObject } from 'pixi.js';
import { gsap } from "gsap";
import { CustomUtils } from '../../Utils/CustomUtils';
import { ElementConfig, ElementType, Element } from '../components/Element';
import { DataSetting } from '../../Utils/DataSetting';

export class ViwePort {
    private _timeLine: gsap.core.Timeline;
    private _gsap: gsap.core.Tween;
    private _element: ElementType;
    private _config: ElementConfig;

    constructor(private ELEMENT: Element) {
        this._element = ELEMENT.element;
        this._config = ELEMENT.config;

        window.addEventListener("resize", this.resize.bind(this));

        // setTimeout(() => {
        //     this.resize.bind(this) 
        // }, 300);
        
        this.resize();
    }

    // setPositionGoTo(): void {        
    //     gsap.to(this._element, this.setPositionImmediately());
    // }

    setPositionImmediately(): any {
        let c: any;
        const cnf = this._config;
    
        if (cnf.viweport && cnf.viweport.sf) {
            if (CustomUtils.IsPortret() && cnf.portret) {
                c = {
                    x: cnf.portret.x * cnf.viweport.sf,
                    y: cnf.portret.y * cnf.viweport.sf,
                }
            } else {
                c = {
                    x: cnf.x * cnf.viweport.sf,
                    y: cnf.y * cnf.viweport.sf,
                }
            }
        } else {
            if (CustomUtils.IsPortret() && cnf.portret) {
                c = {
                    x: cnf.portret.x * window.innerWidth,
                    y: cnf.portret.y * window.innerHeight,
                }
            } else {
                c = {
                    x: cnf.x * window.innerWidth,
                    y: cnf.y * window.innerHeight,
                }
            }
        }
    
        if (cnf.viweport?.fr !== undefined) {
            c.x = window.innerWidth - cnf.viweport?.fr - this._element.width;
        }
          
        if (cnf.viweport?.fb !== undefined) {
            c.y = window.innerHeight - cnf.viweport?.fb - this._element.height;
        }
          
        this._element.position.set(c.x, c.y);
        return c
    }
    

    setScaleImmediately(): void {
        const cnf = this._config;
        this._element.scale.set(1);
    
        let c: { x: number, y: number } = { x: 1, y: 1 };
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        if (CustomUtils.IsPortret() && cnf.portret && cnf.portret.scale) {
            c = {
                x: cnf.portret.scale,
                y: cnf.portret.scale
            }
        } else if (cnf.scale) {
            c = {
                x: cnf.scale,
                y: cnf.scale
            }
        }
        if (CustomUtils.IsPortret() && cnf.viweport?.portret){
            if (cnf.viweport.portret?.sch) {
                const scaleFromHeight = cnf.viweport.portret.sch * window.innerHeight / this._element.height;
                c.y = scaleFromHeight;
                c.x = scaleFromHeight;
            } else if (cnf.viweport.portret?.scw) {
                const scaleFromWidth = cnf.viweport.portret.scw * window.innerWidth / this._element.width;
                c.x = scaleFromWidth;
                c.y = scaleFromWidth;
            }
        } else {
            if (cnf.viweport?.sch) {
                const scaleFromHeight = cnf.viweport.sch * window.innerHeight / this._element.height;
                c.y = scaleFromHeight;
                c.x = scaleFromHeight;
            } else if (cnf.viweport?.scw) {
                const scaleFromWidth = cnf.viweport.scw * window.innerWidth / this._element.width;
                c.x = scaleFromWidth;
                c.y = scaleFromWidth;
            }
        }
       
    
        this._element.scale.set(c.x, c.y);
    }
    
    

    setAnchorImmediately(): void {
        let c: any;
        const cnf = this._config;


        if (CustomUtils.IsPortret() && cnf.portret) {
            c = {
                x: cnf.portret.ax ? cnf.portret.scale : cnf.ax ?? 0,
                y: cnf.portret.ay ? cnf.portret.scale : cnf.ay ?? 0,
            }
        } else if (cnf.scale) {
            c = {
                x: cnf.ax ?? 0,
                y: cnf.ay ?? 0,
            }
        }

        this._element.pivot.set(-c.x * this._element.width, -c.y * this._element.height);
    }


    setAngle() {
        if (this._element.config && this._element.config.viweport && this._element.config.viweport.angle === true) {
            this._element.angle = window.innerWidth < window.innerHeight ? 90 : 0;
        }
    }

    caverViwePort(): void {
        if (this._element.config && this._element.config.viweport && this._element.config.viweport.cover === true) {
            this._element.scale.set(1);

  

            if (this._element.width == this._element.height) {
                if (window.innerHeight > window.innerWidth) {
                    this._element.scale.set(window.innerHeight / this._element.height);
                } else this._element.scale.set(window.innerWidth / this._element.width);
            } else {
                if (window.innerHeight > window.innerWidth) {
                    this._element.scale.set(window.innerWidth / this._element.height);
                } else this._element.scale.set(window.innerHeight / this._element.height);
            }
            this._element.position.set(window.innerWidth / 2, window.innerHeight / 2);

            // const globalPos = this._element.getGlobalPosition(); 
            // const localPos = this._element.toLocal(globalPos);  //We transform the global coordinates of the sprite into local coordinates relative to the current container
            // this._element.position.set(localPos.x, localPos.y);
        }
    }

    resize(): void {
        if('debug' in this._config){
            debugger
            console.log("befor.... x:",this._element.x," y:",this._element.y);
        }
        
        this.setScaleImmediately();
        this.setPositionImmediately();
        this.setAngle();
        this.caverViwePort();
        // this.setAnchorImmediately();
       

    }

}
