import { DisplayObject, Container } from 'pixi.js';
import {Element, ElementConfig } from './Element';

type EventCallback = (event: any) => void;

export class Button extends Element {
    public lockEvent = false;
    public pressed = false;

    constructor(parent: Container, public config: ElementConfig, events: string[], callbacks?: EventCallback[], context?: any[]) {
        super(parent, config);
        this.element.interactive = true;

        events.forEach((eventName, index) => {
            const callback = callbacks?.[index];
            const context = callbacks?.[index] ?? this.element;
            if (callback) {
                this.element.on(eventName, callback,context);
            }
        });
    }
}