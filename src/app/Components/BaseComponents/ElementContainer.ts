import { Container, DisplayObject } from 'pixi.js';
import {Element, ElementConfig } from '../Element';

export class  ElementContainer extends Container{

    public childs:Element[] = [];

    constructor(public config: ElementConfig) {
        super()
        if (config.childs) {
            for (let i = 0; i < config.childs.length; i++) {
              this.childs.push(new Element(this, config.childs[i]));
            }
        }
    }

    
  addElement(elementConfig: ElementConfig): void {
    const newElement = new Element(this, elementConfig);
    this.addChild(newElement.element);
    this.childs.push(newElement);
  }

  getElement(id:number): Element {
    return this.childs[id];
  }

}






