import { Container } from 'pixi.js'
import { Event } from './Event';
import { BaseViwe } from './BaseViwe';
import * as PIXI from 'pixi.js'
import { DataSetting } from '../Utils/DataSetting';


export class BaseController extends Container {

    constructor(private _viwe: BaseViwe) {
        super();
        this.name = this.constructor.name;
        this.addChild(_viwe);
    }

    public roundLoasePlayrId: number = 0;


    init(): BaseController {
        this.on(Event.GAMEOVER, this.gameOveerMessage);
        this.on(Event.YOUWIN, this.winMessage);
        this.on(Event.FITCARD, this.fitCard);
        this.on(Event.PICKUPCARDS, this.pickUpCards);
        this.on(Event.MYCARTONTABLE, this.myCartOnTable);
        this.on(Event.PICKUPCARDSEND, this.pickUpCardsEnd);
        this.on(Event.PICKUPCARD_MOB, this.pickUpCardsMob);
        this.on(Event.MOVETOEDGE, this.myCartToEdge);
        this.on(Event.CHECKCARDAND, this.checkCardEnd);
        return this;

    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       SET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    setInteractive(s: Container, f: boolean): void {
        s.interactiveChildren = f;
    }

    setRoundLoase(i: number) {
        this.roundLoasePlayrId = i;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    fitCard() {
        this.setInteractive(this._viwe.get_cartPull(), true);
        this._viwe.checkWin();
    }

    pickUpCards() {
        this.parent.emit(Event.PICKUPCARDS,Event.PICKUPCARDS)
        this.setInteractive(this._viwe.get_cartPull(), true);
        this._viwe.pickUpCards(this.roundLoasePlayrId);
    }

    pickUpCardsEnd() {
        this.parent.emit(Event.PICKUPCARDSEND, Event.PICKUPCARDSEND)
        this.endRound();
    }

    pickUpCardsMob() {
        this.parent.emit(Event.ACTION, Event.PICKUPCARD_MOB);
        this.setInteractive(this._viwe.get_cartPull(), true);
        this._viwe.pickUpCards(this.roundLoasePlayrId);
    }

    myCartOnTable() {
        this.setInteractive(this._viwe.get_cartPull(), false);
        this._viwe.get_cartPull().interactive = false;
    }

    myCartToEdge() {
        this._viwe.cartToEdge();
        // this._viwe.lockUnLockMyCart(true);
    }

    checkCardEnd(s:Container){
        // @@   s  == name  emit 2 Event.CHECKCARDAND

        this.parent.emit(Event.CHECKCARDAND,Event.CHECKCARDAND)
    }

    endRound() {
        this._viwe.endRound();
    }

    preperNewRound(){
        if(DataSetting.WhoseMoveID == 2){
            this._viwe.mobFite()
        } 
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       MESSEGE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    startGame(): void {
    }

    gameOveerMessage(view: BaseViwe): void {
        view.endMasege('game over');
    }

    winMessage(view: BaseViwe): void {
        view.endMasege('You Win');
    }




}
