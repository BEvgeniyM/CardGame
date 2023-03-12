import { Event } from './Event';
import { TableViwe } from './TableViwe';
import { LogicGame } from './LogicGame';
import { DataSetting } from '../Utils/DataSetting';
import { Cart_ } from './Cart_';
import { gsap } from "gsap";
import { EE } from './Components/BaseComponents/EE';




export class TableController {
    private logicGame: LogicGame;
    private myStap: boolean = true;


    constructor(private _viwe: TableViwe) {
        EE.Glob.on(Event.ACTION, this.action, this);
        this.logicGame = new LogicGame()
    }


    action(action: string, cart: Cart_) {
        const view = this._viwe;
        const logic = this.logicGame;
        const tableContaine = view._map.get('TableContaine');
        const playrElementContaine = view._map.get('PlayrElementContaine');
        const mobElementContaine = view._map.get('MobElementContaine');
        const topContaine = view._map.get('TopContaine');
        // debugger
        switch (action) {
            case Event.SELECTED_CART:
                if (LogicGame.WhoFiteID == DataSetting.PlayrWinnerID) {
                    const t = logic.canAddCardToTable(cart, tableContaine, playrElementContaine.element.childs, topContaine);
                    t && this.timer(Event.I_MOVE_CARD_ON_TABLE, cart);
                    t && view.removeEventToPlayrCard();
                } else {
                    const t = logic.playerCanBeatCardOnTable(cart, tableContaine, playrElementContaine.element.childs, topContaine);
                    t && this.timer(Event.I_MOVE_CARD_ON_TABLE, cart);
                    t && view.removeEventToPlayrCard();
                }
                break;
            case Event.I_MOVE_CARD_ON_TABLE:
                if (LogicGame.WhoFiteID == DataSetting.PlayrWinnerID) {
                    const t = logic.mobTrueFoundCart(tableContaine, mobElementContaine.element.childs, topContaine);
                    t ? this.timer(Event.MOB_MOVE_CARD_ON_TABLE, cart) : this.timer(Event.MOB_PICKUP_CARD);
                    t && view.removeEventToPlayrCard();
                } else {
                    const t = logic.mobTrueFoundCart(tableContaine, mobElementContaine.element.childs, topContaine);
                    t ? this.timer(Event.MOB_MOVE_CARD_ON_TABLE, cart) : this.timer(Event.MOB_CLOSE_ROUND);
                }
                break;
            case Event.MOB_MOVE_CARD_ON_TABLE:
                view.addEventToPlayrCard();
                break;
            case Event.I_FITE_CARF_ON_TABLE:
                break;
            case Event.MOB_FITE_CARF_ON_TABLE:
                view.addEventToPlayrCard();
                break;
            case Event.I_PICKUP_CARD:
                LogicGame.WhoFiteID = DataSetting.MobWinnerID;
                view.iPickUpCarts();
                break;
            case Event.MOB_PICKUP_CARD:
                LogicGame.WhoFiteID = DataSetting.PlayrWinnerID;
                view.mobPickUpCarts();
                view.removeEventToPlayrCard();
                this.timer(Event.ROUND_CLOSE);
                break;
            case Event.I_CLOSE_ROUND:
                LogicGame.WhoFiteID == DataSetting.PlayrWinnerID ? view.moveToEdge() : view.PlayrPickUpCarts();
                LogicGame.WhoFiteID = DataSetting.MobWinnerID;
                view.removeEventToPlayrCard();
                this.timer(Event.ROUND_CLOSE);
                break;
            case Event.MOB_CLOSE_ROUND:
                LogicGame.WhoFiteID == DataSetting.MobWinnerID ? view.moveToEdge() : view.mobPickUpCarts();
                LogicGame.WhoFiteID = DataSetting.PlayrWinnerID;
                view.removeEventToPlayrCard();
                this.timer(Event.ROUND_CLOSE);
                break;
            case Event.PICKUP_CARDS_END:
                break;
            case Event.ROUND_CLOSE:
                view.cartsFomeStack();
                break;
            case Event.ROUND_END:
                LogicGame.WhoFiteID == DataSetting.MobWinnerID && logic.mobTrueFoundCart(tableContaine, mobElementContaine.element.childs, topContaine);
                view.openMyCarts();
                // view.openMobCarts(); //for debug
                view.rotetStockMy();
                view.rotetStockMob();
                view.addEventToPlayrCard();

                if(logic.getRoundWinnerID(playrElementContaine)){
                    this.timer(Event.YOU_WIN, cart) 
                }else{
                    this.timer(Event.GAME_OVER, cart) 
                }
                break;

            case Event.YOU_WIN:
                debugger
                break;
            case Event.GAME_OVER:
                debugger
                break;
            case Event.START_GAME:
                view.cartsFomeStack()
                view.majorMastOpen()
                break;
            default:
                break;
        }
    }

    timer(e: any, p?: any) {
        gsap.to(this, {
            delay: 0.5,
            callbackScope: this,
            onComplete: () => {
                EE.Glob.emit(Event.ACTION, e, p)
            }
        })
    }
}
