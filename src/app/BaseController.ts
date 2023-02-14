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
                // this.parent.emit(Event.ACTION,Event.ROUNDLOES_I);
                this.chengeWhoseLosePreRoundID(2);
                break;
            case Event.ROUNDCLOSE_MOB:
                this.parent.emit(Event.ACTION, Event.ROUNDCLOSE_MOB);
                if (DataSetting.WhoseMoveID == DataSetting.My_ID) {
                    this._viwe.cartToEdge();
                } else {
                    this._viwe.mobPickUpCart();
                }
                // this.parent.emit(Event.ACTION,Event.ROUNDLOES_MOB);
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


            case Event.YOUWIN:
                this._viwe.endMasege(DataSetting.YouWin);
                break;
            case Event.GAMEOVER:
                this._viwe.endMasege(DataSetting.YouLose);
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
        if (DataSetting.WhoseMoveID == 2) {
            this._viwe.mobFite()
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       MESSEGE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


}
