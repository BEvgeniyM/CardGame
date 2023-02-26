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
        this.on(Event.ACTION, this.action);
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
        // debugger
        const isMyTurn = DataSetting.WhoseMoveID == DataSetting.My_ID;
        const view = this._viwe;
        switch (action) {
            case Event.I_MOVE_CARD_ON_TABLE:
            case Event.MOB_MOVE_CARD_ON_TABLE:
                this.checkEction();
                break;

            case Event.I_FITE_CARF_ON_TABLE:
            case Event.MOB_FITE_CARF_ON_TABLE:
                view.lockUnLockMyCart(true);
                this.chackHowRun();
                break;

            case Event.I_CLOSE_ROUND:
                this.parent.emit(Event.ACTION, Event.LOCK_BTN);
                if (isMyTurn) {
                    view.i_PickUpCart();
                } else {
                    view.cartToEdge();
                }
                this.chengeWhoseLosePreRoundID(2);
                break;

            case Event.MOB_CLOSE_ROUND:
                this.parent.emit(Event.ACTION, Event.LOCK_BTN);
                this.parent.emit(Event.ACTION, Event.MOB_CLOSE_ROUND);
                if (isMyTurn) {
                    view.cartToEdge();
                } else {
                    view.mobPickUpCart();
                }
                this.chengeWhoseLosePreRoundID(1);
                break;

            case Event.PICKUP_CARDS_END:
                view.closeCartMob();
                // view.openCartMy();
                view.endRound();
                break;

            case Event.ROUND_END:
                view.openCartMy();
                this.parent.emit(Event.ACTION, Event.ROUND_CLOSE);
                this.emit(Event.ACTION, Event.ROUND_CLOSE);
                break;

            case Event.ROUND_CLOSE:
                view.lockUnLockMyCart(true);
                view.checkWin();
                this.chackHowRun();
                break;

            case Event.YOU_WIN:
                view.endMasege(DataSetting.YouWin);
                break;

            case Event.GAME_OVER:
                view.endMasege(DataSetting.YouLose);
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
            // this._viwe.lockUnLockMyCart(false);
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

    preperNewRound(): void {

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       MESSEGE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


}
