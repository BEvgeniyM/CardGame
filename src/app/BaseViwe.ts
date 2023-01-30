import { Container, Texture, Text } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { Cart } from './Cart';
import { Event } from './Event';
import { StageController } from '../StageController';


export class BaseViwe extends Container {
    private _cartArras: Array<PIXI.DisplayObject> = [];
    private _cartStock: Container = new Container();
    private _cartPull: Container = new Container();
    private _pullCount: number = 0;
    private _pullOfsetX: number = 0;
    private _cartHeight: number = 0;

    private _angle: number = 10;
    private _anchorY: number = 1.2;
    private _pointXCartPull: number = 400;
    private _cardsTexture: Array<string> = [];
    constructor(private _parent: Container<PIXI.DisplayObject>) {
        super();
        this.name = this.constructor.name;
        this.sortableChildren = true;
        this._parent.addChild(this);
        this.addChild(this._cartPull).name = '_cartPull';
        this._cartPull.position.set(window.outerWidth * 0.5, window.outerHeight);
        this.addChild(this._cartStock).name = '_cartStock';

        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }


    start(cartCount: number = 1, _cardsTexture: Array<string>): BaseViwe {
        this._cardsTexture = _cardsTexture;
        for (let i = 0; i < this._cardsTexture.length; i++) {
            let texture = Texture.from(this._cardsTexture[i]);
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

            let sprite = new Cart(texture);
            let width = window.outerHeight > window.outerWidth ? window.outerHeight : window.outerWidth;
            let sc = window.outerHeight > window.outerWidth ? sprite.height / window.outerHeight : sprite.height / window.outerWidth;

            sprite.position.set(width + sprite.width, this.getRandomArbitrary());
            sprite.scale.set(0.5);
            sprite.cursor = 'pointer';
            sprite.anchor.set(0.5);

            sprite.interactive = true;
            sprite.on('pointerdown', this.onDragStart, sprite);
            sprite.on('pointerup', this.onDragEnd, this);
            sprite.on('pointerupoutside', this.onDragEnd, this);

            this._cartHeight = sprite.height;
            this._cartArras.push(sprite);
            this._cartStock.addChild(sprite);

            this.moveTo(sprite, i);
            this.resizeCanvas();
        }
        return this;
    }


    moveTo(cart: Cart, i: number) {
        let width = window.outerHeight > window.outerWidth ? window.outerHeight : window.outerWidth;
        cart.position.set(width + cart.height, this.getRandomArbitrary());
        cart._gsap =
            gsap.to(cart, {
                x: -cart.height,
                angle: 360 * this.getRandomArbitrary(1, 3),
                y: this.getRandomArbitrary(),
                onCompleteParams: [cart, i],
                callbackScope: this,
                delay: 3 * i,
                duration: 3,
                onComplete: this.onCompleteStock
            })
    }

    moveToStock(cart: Cart, angle: number) {
        if (cart) {
            cart.off('pointerdown', this.onDragStart);
            cart.off('pointerup', this.onDragEnd);
            cart.off('pointerupoutside', this.onDragEnd);
            cart.anchor.set(0.5, this._anchorY);
        }

        gsap.to(cart, {
            x: this._cartPull.x,
            angle: angle,
            y: this._cartPull.y,
            callbackScope: this,
            onCompleteParams: [cart],
            duration: 2,
            onComplete: this.onComplete
        })
    }

    onCompleteStock(cart: Cart, i: number) {
        if (this._cardsTexture.length == i + 1) {
            debugger
            this._parent.emit(Event.END, this)
        }
    }

    onComplete(cart: any) {
        if (cart) {
            cart.position.set(0 + this._pullOfsetX, 0);
            this._cartPull.addChild(cart);
            this.removeChild(cart);
        }

        if (!this._cartStock.children.length) {
            this._parent.emit(Event.END, this)
        }
    }

    getRandomArbitrary(min: number = 100, max: number = window.outerHeight - 100): number {
        return Math.random() * (max - min) + min;
    }

    onDragStart(event: any) {
        this.alpha = 0.9;
        StageController.dragTarget = this;
        StageController.app.stage.on('pointermove', StageController.onDragMove, StageController.app.stage);

        let r = StageController.dragTarget as Cart;
        if (r._gsap && r._gsap) {
            r.angle = 0;
            r._gsap.kill();
        }
    }

    onDragEnd(event: any) {
        if (StageController.dragTarget) {

            let angle: number = this._pullCount * this._angle - 75;

            if (angle >= 75) {
                this._pullCount = 0;
                this._anchorY -= 0.2;
                angle = this._pullCount * this._angle - 75;
            }

            if (this._anchorY <= 0.8) {
                this._pullCount = 0;
                this._anchorY = 1.2;
                angle = this._pullCount * this._angle - 75;
                this._pointXCartPull += 400;


                this._cartPull.scale.set(this._cartPull.scale.x * 0.5);
                this._pullOfsetX = this._cartPull.width * 2;
            }

            this._pullCount++;

            this.moveToStock(StageController.dragTarget as Cart, angle);

            StageController.app.stage.off('pointermove', StageController.onDragMove);
            StageController.dragTarget.alpha = 1;
            StageController.dragTarget = null;
        }
    }

    resizeCanvas() {
        // setTimeout(() => {        
        let offsetY = (window.screen.availWidth - this._cartPull.width) / 2 + this._cartPull.width / 2;
        this._cartPull.position.set(offsetY, window.screen.availHeight - this._cartHeight);
        // }, 100);   
    }

    endMasege() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xDE3249);
        graphics.drawRect(0, 0, window.outerWidth * 4, window.outerHeight * 4);
        graphics.endFill();
        graphics.alpha = 0.2;
        graphics.zIndex = 999;

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 120,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        const basicText = new PIXI.Text('GAME OVER', style);
        basicText.x = (window.outerWidth - basicText.width) / 2 + basicText.width / 2;
        basicText.y = (window.outerHeight - basicText.height) / 2 + basicText.height / 2;
        basicText.anchor.set(0.5)
        basicText.scale.set(0.2);
        basicText.zIndex = 1000

        this.addChild(graphics);
        this.addChild(basicText);

        gsap.timeline()
            .to(basicText.scale, {
                x: 1.1,
                y: 1.1,
                duration: 0.5
            })
            .to(basicText.scale, {
                x: 0.9,
                y: 1,
                duration: 0.1
            })
    }

}
