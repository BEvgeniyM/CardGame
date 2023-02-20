import { Container } from 'pixi.js';
import {Element, ElementConfig } from './Element';
import { Animation } from './BaseComponents/Animation';
import { Filters, FilterConfig } from './BaseComponents/Filters';
import { Button } from './Button';

export class ElementContainer extends Element{
    public messageContainer = new Container();
    public child:Element[] = [];


    constructor(parent: Container, public config: MessageConfig) {
        super(parent, config);
        parent.addChild(this.messageContainer);

        for (let i = 0; i < config.childs.length; i++) {
            // new Element(this.messageContainer,config.childs[i]);
            this.child.push(new Element(this.messageContainer,config.childs[i]));
        }

        // this.animation = new Animation(this);   
    }
}


export interface MessageConfig {
    type?: string;
    childs: Array<ElementConfig>
}





