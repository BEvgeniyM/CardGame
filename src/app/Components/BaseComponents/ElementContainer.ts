import { Container, DisplayObject } from 'pixi.js';
import {Element, ElementConfig } from '../Element';

export class  ElementContainer extends Container{

    public childs:Element[] = [];

    constructor(public config: ElementConfig) {
        super()
        if (config.childs) {
            for (let i = 0; i < config.childs.length; i++) {
                this.childs.push(new Element(this,config.childs[i]));
            }
          }
    }

    addChildElement(s:Element){
        this.childs.push(s);
        this.addChild(s.element);
    }

}






