import { EventGame } from './EventGame';
import { TableViwe } from './TableViwe';
import { LogicGame } from './LogicGame';
import { DataSetting } from '../Utils/DataSetting';
import { Card } from './Card';
import { gsap } from "gsap";
import { EE } from './Components/BaseComponents/EE';




export class TableController {
    private logicGame: LogicGame;
    private myStap: boolean = true;


    constructor(private _viwe: TableViwe) {
        EE.Glob.on(EventGame.ACTION, this.action, this);
        this.logicGame = new LogicGame()
    }


    action(action: string, card: Card) {
        const view = this._viwe;
        const logic = this.logicGame;
        const tableContaine = view._map.get('TableContaine');
        const playrElementContaine = view._map.get('PlayrElementContaine');
        const mobElementContaine = view._map.get('MobElementContaine');
        const topContaine = view._map.get('TopContaine');
        // debugger
        switch (action) {
            case EventGame.SELECTED_CART:
                if (LogicGame.WhoFiteID == DataSetting.PlayrWinnerID) {
                    const t = logic.canAddCardToTable(card, tableContaine, playrElementContaine.element.childs, topContaine);
                    t && this.timer(EventGame.I_MOVE_CARD_ON_TABLE, card);
                    t && view.removeEventToPlayrCard();
                } else {
                    const t = logic.playerCanBeatCardOnTable(card, tableContaine, playrElementContaine.element.childs, topContaine);
                    t && this.timer(EventGame.I_MOVE_CARD_ON_TABLE, card);
                    t && view.removeEventToPlayrCard();
                }
                break;
            case EventGame.I_MOVE_CARD_ON_TABLE:
                if (LogicGame.WhoFiteID == DataSetting.PlayrWinnerID) {
                    const t = logic.mobTrueFoundCard(tableContaine, mobElementContaine.element.childs, topContaine);
                    t ? this.timer(EventGame.MOB_MOVE_CARD_ON_TABLE, card) : this.timer(EventGame.MOB_PICKUP_CARD);
                    t && view.removeEventToPlayrCard();
                } else {
                    const t = logic.mobTrueFoundCard(tableContaine, mobElementContaine.element.childs, topContaine);
                    t ? this.timer(EventGame.MOB_MOVE_CARD_ON_TABLE, card) : this.timer(EventGame.MOB_CLOSE_ROUND);
                }
                break;
            case EventGame.MOB_MOVE_CARD_ON_TABLE:
                view.addEventToPlayrCard();
                break;
            case EventGame.I_FITE_CARF_ON_TABLE:
                break;
            case EventGame.MOB_FITE_CARF_ON_TABLE:
                view.addEventToPlayrCard();
                break;
            case EventGame.I_PICKUP_CARD:
                LogicGame.WhoFiteID = DataSetting.MobWinnerID;
                view.iPickUpCards();
                break;
            case EventGame.MOB_PICKUP_CARD:
                LogicGame.WhoFiteID = DataSetting.PlayrWinnerID;
                view.mobPickUpCards();
                view.removeEventToPlayrCard();
                this.timer(EventGame.ROUND_CLOSE);
                break;
            case EventGame.I_CLOSE_ROUND:
                LogicGame.WhoFiteID == DataSetting.PlayrWinnerID ? view.moveToEdge() : view.PlayrPickUpCards();
                LogicGame.WhoFiteID = DataSetting.MobWinnerID;
                view.removeEventToPlayrCard();
                this.timer(EventGame.ROUND_CLOSE);
                break;
            case EventGame.MOB_CLOSE_ROUND:
                LogicGame.WhoFiteID == DataSetting.MobWinnerID ? view.moveToEdge() : view.mobPickUpCards();
                LogicGame.WhoFiteID = DataSetting.PlayrWinnerID;
                view.removeEventToPlayrCard();
                this.timer(EventGame.ROUND_CLOSE);
                break;
            case EventGame.PICKUP_CARDS_END:
                break;
            case EventGame.ROUND_CLOSE:
                view.cardsFomeStack();
                break;
            case EventGame.ROUND_END:
                LogicGame.WhoFiteID == DataSetting.MobWinnerID && logic.mobTrueFoundCard(tableContaine, mobElementContaine.element.childs, topContaine);
                view.openMyCards();
                // view.openMobCards(); //for debug
                view.rotetStockMy();
                view.rotetStockMob();
                view.addEventToPlayrCard();

                if(logic.getRoundWinnerID(playrElementContaine)){
                    this.timer(EventGame.YOU_WIN, card) 
                }else{
                    this.timer(EventGame.GAME_OVER, card) 
                }
                break;

            case EventGame.YOU_WIN:
                debugger
                break;
            case EventGame.GAME_OVER:
                debugger
                break;
            case EventGame.START_GAME:
                view.cardsFomeStack()
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
                EE.Glob.emit(EventGame.ACTION, e, p)
            }
        })
    }
}
