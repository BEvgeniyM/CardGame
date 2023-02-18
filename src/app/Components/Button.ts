import { DisplayObject, Container } from 'pixi.js';
import { ElementConfig } from './Element';
import { Element } from './Element';

type EventCallback = (event: any) => void;

export class Button extends Element {
    public lockEvent = false;
    public pressed = false;

    constructor(parent: Container, private config: ElementConfig, events: string[], callbacks?: EventCallback[], context?: any[]) {
        super(parent, config);
        this.elem.interactive = true;

        events.forEach((eventName, index) => {
            const callback = callbacks?.[index];
            const context = callbacks?.[index] ?? this.elem;
            if (callback) {
                this.elem.on(eventName, callback,context);
            }
        });
    }
}