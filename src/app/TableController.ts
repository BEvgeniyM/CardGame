import { Container } from 'pixi.js'
import { Event } from './Event';
import { TableViwe } from './TableViwe';
import * as PIXI from 'pixi.js'
import { DataSetting } from '../Utils/DataSetting';


export class TableController extends Container {

    constructor(private _viwe: TableViwe) {
        super();
        this.name = this.constructor.name;
        this.on(Event.ACTION,this.action);
        this.emit(Event.ACTION,Event.ROUND_END);
    }

    public roundLoasePlayrId: number = 0;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       SET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

 

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
                break;

            case Event.I_FITE_CARF_ON_TABLE:
            case Event.MOB_FITE_CARF_ON_TABLE:            
                break;

            case Event.I_CLOSE_ROUND:             
                break;

            case Event.MOB_CLOSE_ROUND:             
                break;

            case Event.PICKUP_CARDS_END:
                break;

            case Event.ROUND_END:     
            view.cartsFomeStack();        
                break;

            case Event.ROUND_CLOSE: 
                view.cartsFomeStack()             
                break;

            case Event.YOU_WIN:
             
                break;

            case Event.GAME_OVER:
              
                break;

            default:
                break;
        }
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       MESSEGE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////



    
}
