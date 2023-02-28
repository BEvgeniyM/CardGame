import { Container, Texture, Text, Graphics, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

import { Cart } from './Cart';
import { Event } from './Event';
import { StageController } from '../StageController';
import { CustomUtils } from '../Utils/CustomUtils'
import { BaseController } from './BaseController';
import { setDefaultResultOrder } from 'dns';
import { DataSetting } from '../Utils/DataSetting';

export class BaseViwe extends Container {
    private _cartArras: Array<PIXI.DisplayObject> = [];
    private _cartStock: Container = new Container();
    private _cartPull: Container = new Container();
    private _topCont: Container = new Container();

    private _mobPull: Container = new Container();
    private _table: Container = new Container();
    private _mylastCart: Cart;
    private _moblastCart: Cart;


    private _pullCount: number = 0;
    private _pullOfsetX: number = 0;
    private _cartHeight: number = 0;
    private _cartZIndex: number = 1;

    private _timeStart: number;
    private _timeEnd: number = 4;
    private _timeDel: number = 0;
    private _delayNewCart: number = 0.5;

    private _angle: number = 10;
    private _anchorY: number = 0.05;
    private _pointXCartPull: number = 400;
    private _cardsTexture: Array<[string, string]> = [];
    private _back: Sprite = {} as Sprite;
    private _parent: BaseController = {} as BaseController;

    constructor() {
        super();
        this.name = this.constructor.name;
        this.sortableChildren = true;

        const debug = new PIXI.Graphics();
        debug.beginFill(0xFFFFFF)
        debug.drawRect(0, 0, 10, 10)
        debug.endFill();
        debug.position.set(0, 0);
        debug.alpha = 1;
        // this._cartPull.addChild(debug);

        this._topCont.position.set(0);
        this._topCont.zIndex = 500;
        this._topCont.interactiveChildren = false;
        this.addChild(this._topCont).name = '_topCont';

        this._table.position.set(0);
        this._table.zIndex = 400;
        this._table.interactiveChildren = false;

        this.addChild(this._table).name = '_table';

        this._mobPull.position.set(window.innerWidth * 0.5, 0);
        this._mobPull.zIndex = 100
        this.addChild(this._mobPull).name = '_mobPull';

        this._cartPull.position.set(window.innerWidth * 0.5, window.outerHeight);
        this._cartPull.zIndex = 200
        this.addChild(this._cartPull).name = '_cartPull';

        this._cartStock.zIndex = 300
        this._cartStock.position.set(window.innerWidth * 0.90, window.innerHeight * 0.5 + CustomUtils.CartHeight / 2)
        this.addChild(this._cartStock).name = '_cartStock';

        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }

    init() {
        this._parent = this.parent as BaseController;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       GET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    get_cartPull(): Container {
        return this._cartPull
    }
    get_mobPull(): Container {
        return this._mobPull
    }
    get_table(): Container {
        return this._table
    }

    addbackground(): void {
        this._back = Cart.SpriteCreat(this, 'table_4', 1);
        CustomUtils.SetPositionProz(this._back, DataSetting.BackGround);
        CustomUtils.GoToProz(this._back, DataSetting.BackGround);
        CustomUtils.ResizeBack(this._back);
    }


    start(cartCount: number = 1, _cardsTexture: Array<[string, string]>): BaseViwe {
        this.init();
        this.addbackground();

        this._timeDel = (this._timeStart - this._timeEnd) / (_cardsTexture.length - 1)
        this._cardsTexture = _cardsTexture;
        for (let i = 0; i < this._cardsTexture.length; i++) {
            const texture = Texture.from(this._cardsTexture[i][0]);
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

            const cart = new Cart(texture, this._cardsTexture[i], this._cardsTexture[0]);
            cart.position.set(0, 0)
            cart.cursor = 'pointer';
            cart.anchor.set(0.5);
            cart.position.set(0.1 * i, 0.1 * i)
            cart.zIndex = 1;
            cart.interactive = true;

            // sprite.on('pointerdown', this.onDragStart, sprite);
            // sprite.on('pointerup', this.onDragEnd, this);
            // sprite.on('pointerupoutside', this.onDragEnd, this);

            CustomUtils.CartHeight = cart.height;
            this._cartArras.push(cart);
            this._cartStock.addChild(cart);


            this.resizeCanvas();
        }

        this.majorMastOpen();
        // this.endRound();

        return this;
    }

    majorMastOpen(): void {
        const cart = this._cartStock.children[0] as Cart
        const c = {
            x: -cart.height * 0.5,
            angle: -90,
            f: cart.openCart.bind(cart)
        }
        CustomUtils.GoTo(cart, c)
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       CALC                                                                              */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCart(s?: any): Cart {
        return s.children?.pop() as Cart;
    }

    angleCal(count: number = this._pullCount): number {
        let angle: number = count * this._angle - 75;

        if (angle >= 75) {
            count = 0;
            this._anchorY -= 0.2;
            angle = count * this._angle - 75;
        }

        if (this._anchorY <= 0.8) {
            this._pullCount = 0;
            this._anchorY = 1.2;
            angle = count * this._angle - 75;
            this._pointXCartPull += 400;

            this._pullOfsetX = this._cartPull.width * 2;
        }

        this._pullCount++;

        return angle
    }

    myorMod(i: number): boolean {
        return i % 2 != 0
    }

    setZindeCart(cart: Cart): void {
        cart.zIndex = this._cartZIndex;
        this._cartZIndex++;
        this.sortChildren();
    }

    setAngle(i: number): number {
        return this.myorMod(i) ? 90 : -90;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const response = await fetch('https://api.github.com/users/sitepen'); 

    rotetStock(s: PIXI.Container): void {
        const a = s.name == '_mobPull' ? -90 : 90;
        gsap.to(s, {
            angle: -s.children.length / 2 * this._angle,
            duration: 2 * DataSetting.DefaultDuration
        })
        for (let i = 0; i < s.children.length; i++) {
            const csp = s.children[i] as Sprite
            csp.angle = 0;
            csp.anchor.set(0.5, 1.2);

            gsap.to(csp, {
                angle: i * this._angle - 75 + a,
                duration: DataSetting.DefaultDuration
            })

        }
    }



    cartToContener(s: Container, cart: Cart): void {
        cart.position.set(cart.getGlobalPosition().x, cart.getGlobalPosition().y);
        this._cartStock.removeChild(cart);
        this._table.removeChild(cart);
        this._mobPull.removeChild(cart);
        this._cartPull.removeChild(cart);
        cart.anchor.set(0.5);

        this.addChild(cart);
    }

    cartToEdge(): void {
        const g = gsap.timeline({
            onComplete: () => {
                this._parent.emit(Event.ACTION, Event.PICKUP_CARDS_END);
            }
        })

        while (this._table.children.length != 0) {
            if (!this._table.children[0]) {
                return
            }

            const cart = this._table.children[0] as Cart;
            cart.anchor.set(0.5);

            cart.position.set(cart.getGlobalPosition().x, cart.getGlobalPosition().y);
            this._table.removeChild(cart);
            this.addChild(cart);

            g.to(cart, {
                angle: 0 + CustomUtils.GetRandomArbitrary(-120, 120),
                x: CustomUtils.GetRandomArbitrary(0, window.innerWidth * 0.2),
                y: CustomUtils.GetRandomArbitrary(window.innerHeight * 0.3, window.screen.availHeight * 0.7),
                delay: CustomUtils.GetRandomArbitrary(0, 0.25),
                duration: DataSetting.DefaultDuration,
                callbackScope: this,
            }, '<')
        }
    }

    checkWin(): void {
        if (this._cartStock.children.length == 0 && this._cartPull.children.length == 0) {
            this._parent.emit(Event.ACTION, Event.YOU_WIN);
        } else if (this._cartStock.children.length == 0 && this._mobPull.children.length == 0) {
            this._parent.emit(Event.ACTION, Event.GAME_OVER);
        }
    }

    resizeCanvas(): void {
        CustomUtils.ResizeStock(this._cartStock);
        CustomUtils.ResizeBack(this._back);
        CustomUtils.ResizePullMob(this._mobPull);
        CustomUtils.ResizeMyPull(this._cartPull);
        CustomUtils.ResizeTable(this._table);
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
            .from(graphics, 1, {
                alpha: 0.5,
                repeat: 100,
                duration: 2
            })

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    preperatCart(cart: Cart): void {
        cart.anchor.set(0.5);
        cart.position.set(cart.getGlobalPosition().x, cart.getGlobalPosition().y);
        this._cartPull.removeChild(cart);
        this._mobPull.removeChild(cart);
        this._topCont.addChild(cart);
    }
    animaLittleMove(cart: Cart): void {
        const p = cart.y;
        const z = cart.zIndex;
        cart.zIndex = 1000;
        this.lockUnLockMyCart(false);
        gsap.to(cart, {
            y: cart.y + CustomUtils.GetRandomArbitrary(0, -30),
            direction: DataSetting.DefaultDuration,
            callbackScope: this,
            onComplete: () => {
                gsap.to(cart, {
                    y: p,
                    direction: DataSetting.DefaultDuration,
                    onComplete: () => {
                        cart.zIndex = z;
                        this.lockUnLockMyCart(true);
                    }
                })
            }
        })
    }
    animaCartMove(cart: Cart, s: Container, t: Container, e: any, g?: any): void {
        const gg = g ? g : gsap;
        gg.to(cart, {
            angle: CustomUtils.GetRandomArbitrary(-7, 7),
            x: t.x,
            y: t.y + CustomUtils.GetRandomArbitrary(-5, 5),
            direction: DataSetting.DefaultDuration,
            callbackScope: this,
            onComplete: () => {
                cart.position.set(0, 0);
                this._topCont.removeChild(cart);
                t.addChild(cart);
                this.parent.emit(Event.ACTION, e);
            }
        })
    }
    cardTo(cart: Cart, s: Container, t: Container, e: string, g?: any): boolean {
        this._mylastCart = cart;
        DataSetting.MylastCart = cart

        if (!this.checkPossibleToPutCard()) {
            this.animaLittleMove(cart);
            return false;
        }

        cart.off('pointerdown', this.ImoveToTable, this);

        this.preperatCart(cart);
        this.setZindeCart(cart);
        this.animaCartMove(cart, s, t, e, g);
        return true;
    }

    ImoveToTable(e: any): void {
        const cart = e.currentTarget;
        e.currentTarget = null;
        if (!cart) {
            return
        }
        this._mylastCart = cart;
        if (DataSetting.WhoseMoveID != DataSetting.My_ID) {
            this.cardTo(cart, this._cartPull, this._table, Event.I_MOVE_CARD_ON_TABLE);
            this.lockUnLockMyCart(false);
        } else if (this.checkPossibleToTableCard(cart)) {
            this.lockUnLockMyCart(false);
            this.cardTo(cart, this._cartPull, this._table, Event.I_FITE_CARF_ON_TABLE);
        } else this.animaLittleMove(cart);
    }

    MobmoveToTable(): boolean {
        for (let i = 0; i < this._mobPull.children.length; i++) {
            const cart = this._mobPull.children[i] as Cart;
            if (this.checkPossibleToTableCard(cart)) {
                cart.openCart();
                this._mobPull.children[0] && this.cardTo(cart, this._mobPull, this._table, Event.MOB_MOVE_CARD_ON_TABLE);
                return true
            }
            this.animaLittleMove(cart);
        }

        this._parent.emit(Event.ACTION, Event.MOB_CLOSE_ROUND)
        return false;
    }


    mobPickUpCart(): void {
        this.pickUpCart(this._mobPull);
    }

    i_PickUpCart(): void {
        this.pickUpCart(this._cartPull);
    }

    pickUpCart(s: Container): void {
        const g = gsap.timeline({
            onComplete: () => {
                this.rotetStock(this._mobPull);
                this.rotetStock(this._cartPull);
                this.parent.emit(Event.ACTION, Event.PICKUP_CARDS_END);
            }
        })

        const c = this._table.children.length;
        for (let i = 0; i < c; i++) {
            const cart = this._table.children[0] as Cart;
            this.cardTo(cart, this._table, s, 'iiii', g);
            // cart.cloasCart();
        }
    }


    cardToMob(): void {
        for (let i = 0; i < this._mobPull.children.length; i++) {
            const c = this._mobPull.children[i] as Cart;
            if (this.checkPossibleToTableCard(c)) {
                this.cardTo(c, this._mobPull, this._table, Event.I_MOVE_CARD_ON_TABLE);
                return
            }
        }
    }



    chekTopCartOnTableFite(cart: Cart): boolean {
        const l = this._table.children.length - 1;
        const topCart = this._table.children[l] as Cart;
        if (topCart.id[0][1] == cart.id[0][1] && topCart.value < cart.value) {
            return true
        } else if (cart.mastW == cart.id[0][1] && topCart.value < cart.value) {
            return true
        }
        return false
    }

    checkPossibleToTableCard(c: Cart): boolean {
        if (!this._table.children.length) {
            return true
        }
        for (let i = 0; i < this._table.children.length; i++) {
            const cart = this._table.children[i] as Cart;

            if (cart.id[0][1] == c.id[0][1] && cart.value < c.value) {
                return true
            } else if (c.mastW == c.id[0][1] && cart.value < c.value) {
                return true
            }
        }
        return false
    }
    checkPossibleToPutCard(): boolean {
        if (!this._table.children.length) {
            return true
        }
        for (let i = 0; i < this._table.children.length; i++) {
            const cart = this._table.children[i] as Cart;


            if (cart.id[0][1] == this._mylastCart.id[0][1] || this._mylastCart.id[0][1] == this._mylastCart.mastW) {
                return true
            }
        }
        return false
    }
    mobTryingFiteCartOnTable() {
        this.mobFiteCart(this._mobPull);
    }
    mobFiteCart(s: PIXI.Container): boolean {
        this._mylastCart = this._table.children[this._table.children.length - 1] as Cart;
        for (let i = 0; i < this._mobPull.children.length; i++) {
            const cart = this._mobPull.children[i] as Cart;

            if (this._mylastCart.id[0][1] == cart.id[0][1] && this._mylastCart.value < cart.value) {
                this.cardTo(cart, this._mobPull, this._table, Event.MOB_FITE_CARF_ON_TABLE);
                cart.openCart();
                return true
            }
        }

        for (let i = 0; i < this._mobPull.children.length; i++) {
            const cart = this._mobPull.children[i] as Cart;

            if (cart.mastW == cart.id[0][1] && this._mylastCart.value < cart.value) {
                this.cardTo(cart, this._mobPull, this._table, Event.MOB_FITE_CARF_ON_TABLE);
                cart.openCart();
                return true
            }
        }

        gsap.to(this, {
            delay: DataSetting.DefaultDeley,
            callbackScope: this,
            onComplete: () => {
                this.checkWin();
                this._parent.setRoundLoase(2);
                this._parent.emit(Event.ACTION, Event.MOB_CLOSE_ROUND);
            }
        })
        return false
    }

    r(){
        this.rotetStock(this._mobPull);
        this.rotetStock(this._cartPull);
    }
    endRound(): void {
        if (this._cartStock.children.length == 0) {
            this.parent.emit(Event.ACTION, Event.ROUND_END);
            return
        }

        const g = gsap.timeline({
            onComplete: () => {
                this.rotetStock(this._mobPull);
                this.rotetStock(this._cartPull);
                this.parent.emit(Event.ACTION, Event.ROUND_END);
            }
        });

        this.checkCountCart(g, this._mobPull, "_mobPull");
        this.checkCountCart(g, this._cartPull, '_cartPull');
    }

    checkCountCart(g: any, t: Container, e: string): void {
        let c = 0;
        if (t.children.length < 6) {
            c = 6 - t.children.length
            for (let i = 0; i < c; i++) {
                g.to(this, {
                    // delay: DataSetting.DefaultDeley * i,
                    onComplete: () => {
                        const cart = this.getCart(this._cartStock);
                        cart && this.cardTo(cart, this._cartStock, t, e, g);
                    }
                }, '<')
            }
        }

    }

    lockUnLockMyCart(f: boolean): void {
        this._cartPull.interactiveChildren = f;
    }


    openCartMy(): void {
        this.cartOpenOrClose(this._cartPull, true);
    }

    closeCartMob(): void {
        this._mobPull.children.length>6 && this.cartOpenOrClose(this._mobPull, false);
    }

    cartOpenOrClose(s: Container, f: boolean): void {
        for (let i = 0; i < s.children.length; i++) {
            const cart = s.children[i] as Cart;
            if (f) {
                cart.openCart();
                cart.on('pointerdown', this.ImoveToTable, this);
            } else cart.cloasCart();
        }
    }


}
