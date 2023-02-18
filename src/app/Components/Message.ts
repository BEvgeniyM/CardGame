import { Container } from 'pixi.js';
import {Element, ElementConfig } from './Element';

export class Message {
    public message = new Container();

    constructor(parent: Container, public config: MessageConfig) {
        parent.addChild(this.message);

        for (let i = 0; i < config.array.length; i++) {
            new Element(this.message,config.array[i]);
        }
    }
}


export interface MessageConfig {
    type?: string;
    array: Array<ElementConfig>
}





