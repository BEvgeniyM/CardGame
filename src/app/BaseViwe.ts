import { Container, Texture, Text, Graphics, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { Cart } from './Cart';
import { Event } from './Event';
import { StageController } from '../StageController';
import { CustomUtils } from '../Utils/CustomUtils'

export class BaseViwe extends Container {
    private _cartArras: Array<PIXI.DisplayObject> = [];
    private _cartStock: Container = new Container();
    private _cartPull: Container = new Container();
    private _pullCount: number = 0;
    private _pullOfsetX: number = 0;
    private _cartHeight: number = 0;

    private _timeStart: number = 6;
    private _timeEnd: number = 4;
    private _timeDel: number = 0;

    private _angle: number = 5;
    private _anchorY: number = 0.05;
    private _pointXCartPull: number = 400;
    private _cardsTexture: Array<string> = [];


    constructor(private _parent: Container<PIXI.DisplayObject>) {
        super();
        this.name = this.constructor.name;
        this.sortableChildren = true;
        this._parent.addChild(this);
        this.addChild(this._cartPull).name = '_cartPull';
        let debug = new PIXI.Graphics();
        debug.beginFill(0xFFFFFF)
        debug.drawRect(0, 0, 10, 10)
        debug.endFill();
        debug.position.set(0, 0);
        debug.alpha = 0;
        this._cartPull.addChild(debug)
        this._cartPull.position.set(window.outerWidth * 0.5, window.outerHeight);
        this.addChild(this._cartStock).name = '_cartStock';

        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }


    start(cartCount: number = 1, _cardsTexture: Array<string>): BaseViwe {
        this._timeDel = (this._timeStart - this._timeEnd) / (_cardsTexture.length - 1)
        this._cardsTexture = _cardsTexture;
        for (let i = 0; i < this._cardsTexture.length; i++) {
            let texture = Texture.from(this._cardsTexture[i]);
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

            let sprite = new Cart(texture);
            let width = window.outerHeight > window.outerWidth ? window.outerHeight : window.outerWidth;
            let sc = window.outerHeight > window.outerWidth ? sprite.height / window.outerHeight : sprite.height / window.outerWidth;

            sprite.position.set(width + sprite.width, CustomUtils.getRandomArbitrary());
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


            this.resizeCanvas();
        }

        this.getFromStock();
        return this;
    }

    getFromStock(): void {
        let child = this._cartArras.shift() as Cart;
        child && this.moveTo(child, 1);
    }

    moveTo(cart: Cart, i: number): void {
        let width = window.outerHeight > window.outerWidth ? window.outerHeight : window.outerWidth;
        let time = (this._timeStart - (this._timeDel * (this._cartPull.children.length - 1)))
        cart.position.set(width + cart.height, CustomUtils.getRandomArbitrary());
        cart.scale.set(CustomUtils.getScaleCart(this._cartHeight));
        cart._gsap =
            gsap.to(cart, {
                x: -this._cartHeight,
                angle: 360 * CustomUtils.getRandomArbitrary(1, 3),
                y: CustomUtils.getRandomArbitrary(),
                onCompleteParams: [cart, i],
                callbackScope: this,
                // delay:time * i,
                duration: time,
                onComplete: this.onCompleteStock
            })
    }

    moveToStock(cart: Cart, angle: number): void {
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

    onCompleteStock(cart: Cart, i: number): void {
        cart.angle = 0;
        this.checkWin();
        this.getFromStock();
    }

    onComplete(cart: any): void {
        if (cart) {
            cart.position.set(0, 0);
            this._cartPull.addChild(cart);
            this.removeChild(cart);
        }

        this.checkWin();
        this.getFromStock();
        this.resizeCanvas();

    }

    checkWin(): void {
        if (this._cartStock.children.length == 0 && this._cartArras.length == 0) {
            this._parent.emit(Event.YOUWIN, this)
        } else if (this._cartArras.length == 0) {
            this._parent.emit(Event.GAMEOVER, this)
        }
    }

    onDragStart(event: any): void {
        this.alpha = 0.9;
        StageController.dragTarget = this;
        StageController.app.stage.on('pointermove', StageController.onDragMove, StageController.app.stage);

        let r = StageController.dragTarget as Cart;
        if (r._gsap && r._gsap) {
            r.angle = 0;
            r._gsap.kill();
        }
    }

    onDragEnd(event: any): void {
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


                // this._cartPull.scale.set(this._cartPull.scale.x * 0.5);
                this._pullOfsetX = this._cartPull.width * 2;
            }

            this._pullCount++;

            this.moveToStock(StageController.dragTarget as Cart, angle);

            StageController.app.stage.off('pointermove', StageController.onDragMove);
            StageController.dragTarget.alpha = 1;
            StageController.dragTarget = null;
        }
    }

    resizeCanvas(): void {

        for (let i = 0; i < this._cartPull.children.length; i++) {
            this._cartPull.children[i].scale.set(CustomUtils.getScaleCart(this._cartHeight));
        }

        for (let i = 0; i < this._cartStock.children.length; i++) {
            this._cartStock.children[i].scale.set(CustomUtils.getScaleCart(this._cartHeight));
        }


        let offsetY = (window.screen.availWidth - this._cartPull.width) / 2 + this._cartPull.width / 2;
        if (this._cartPull.children.length > 2) {
            this._cartPull.position.set(offsetY, window.outerHeight - this._cartPull._localBounds.maxY - this._cartPull.height * 0.01);
        } else
            gsap.to(this._cartPull, {
                x: offsetY,
                y: window.outerHeight - this._cartPull._localBounds.maxY - this._cartPull.height * 0.01,
                duration: 1,
            })
    }

    endMasege(text: string): void {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x1f6db1);
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

        const basicText = new PIXI.Text(text.toUpperCase(), style);
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
                duration: 5
            })
            .from(graphics,1, {
                alpha: 0.5,
                repeat:100,
                duration: 2
            })            

    }

    

}
