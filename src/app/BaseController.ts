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
        // this.on(Event.GAMEOVER, this.gameOveerMessage);
        // this.on(Event.YOUWIN, this.winMessage);
        // this.on(Event.FITCARD, this.fitCard);
        // this.on(Event.PICKUPCARDS, this.pickUpCards);
        // this.on(Event.MYCARTONTABLE, this.myCartOnTable);
        this.on(Event.ACTION, this.action);
        // this.on(Event.PICKUPCARDSEND, this.pickUpCardsEnd);
        // this.on(Event.PICKUPCARD_MOB, this.pickUpCardsMob);
        // this.on(Event.MOVETOEDGE, this.myCartToEdge);
        // this.on(Event.CHECKCARDAND, this.checkCardEnd);
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
    action(action: string) {
        debugger
        switch (action) {
            case Event.MYCARTONTABLE:
                this.checkEction();
                break;
            case Event.MOBCARTONTABLE:
                this.checkEction();
                break;

            case Event.IFITECARTONTABLE:
                this.chackHowRun();
                break;
            case Event.MOBFITECARTONTABLE:
                break;

            case Event.IPICKUPCART:
                break;
            case Event.MOBPICKUPCART:
                break;


            case Event.ROUNDCLOSE_I:
                if (DataSetting.WhoseMoveID == DataSetting.My_ID) {
                    this._viwe.i_PickUpCart();
                } else {
                    this._viwe.cartToEdge();
                }
                this.chengeWhoseLosePreRoundID(2);
                break;
            case Event.ROUNDCLOSE_MOB:
                this.parent.emit(Event.ACTION, Event.ROUNDCLOSE_MOB);
                if (DataSetting.WhoseMoveID == DataSetting.My_ID) {
                    this._viwe.cartToEdge();
                } else {
                    this._viwe.mobPickUpCart();
                }
                this.chengeWhoseLosePreRoundID(1);
                break;


            case Event.PICKUPCARDSEND:
                this._viwe.openCartMy();
                this._viwe.endRound();
                break;
            case Event.ROUNDEND:
                this._viwe.openCartMy();
                this.parent.emit(Event.ACTION, Event.ROUNDCLOSE);
                this.emit(Event.ACTION, Event.ROUNDCLOSE);
                break;
            case Event.ROUNDCLOSE:
                this._viwe.checkWin();
                this.chackHowRun();
                break;

            default:
                break;
        }
    }

    firastRound() {
        this._viwe.endRound();
    }

    checkEction() {
        if (DataSetting.WhoseMoveID == DataSetting.My_ID) {
        } else {
            this._viwe.mobTryingFiteCartOnTable();
        }

    }

    chackHowRun() {
        if (DataSetting.WhoseMoveID == DataSetting.My_ID) {
            this._viwe.MobmoveToTable();
        } else {

        }
    }

    chengeWhoseLosePreRoundID(f: number): boolean {
        if (f != DataSetting.WhoseMoveID) {
            // this._chengeWhoseMoveID = true;
            DataSetting.WhoseMoveID = f;
            return true
        }
        return false
    }

    fitCard() {
        this.setInteractive(this._viwe.get_cartPull(), true);
        this._viwe.checkWin();
    }

    pickUpCards() {
        this.parent.emit(Event.PICKUPCARDS, Event.PICKUPCARDS)
        this.setInteractive(this._viwe.get_cartPull(), true);
        this._viwe.pickUpCards(this.roundLoasePlayrId);
    }

    pickUpCardsEnd() {
        this.parent.emit(Event.PICKUPCARDSEND, Event.PICKUPCARDSEND)
        // this.endRound();
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

    checkCardEnd(s: Container) {
        // @@   s  == name  emit 2 Event.CHECKCARDAND

        this.parent.emit(Event.CHECKCARDAND, Event.CHECKCARDAND)
    }

    endRound() {
        this._viwe.endRound();
    }

    preperNewRound() {
        if (DataSetting.WhoseMoveID == 2) {
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
