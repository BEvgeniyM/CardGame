import { Container } from 'pixi.js';
import {Element, ElementConfig } from './Element';

export class MessageContainer {
    public message = new Container();

    constructor(parent: Container, public config: MessageConfig) {
        parent.addChild(this.message);

        for (let i = 0; i < config.childs.length; i++) {
            new Element(this.message,config.childs[i]);
        }
    }
}


export interface MessageConfig {
    type?: string;
    childs: Array<ElementConfig>
}





