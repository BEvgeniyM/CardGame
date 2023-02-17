import * as PIXI from 'pixi.js'

export class Event  {
    public static readonly GAME_OVER = 'GAME_OVER';
    public static readonly YOU_WIN = 'YOU_WIN';

    public static readonly LOAD_GAME_START ='LOAD_GAME_START';
    public static readonly PRELOADER_COMPLETE ='PRELOADER_COMPLETE';

    public static readonly I_MOVE_CARD_ON_TABLE ='I_MOVE_CARD_ON_TABLE';
    public static readonly MOB_MOVE_CARD_ON_TABLE ='MOB_MOVE_CARD_ON_TABLE';

    public static readonly I_FITE_CARF_ON_TABLE ='I_FITE_CARF_ON_TABLE';
    public static readonly MOB_FITE_CARF_ON_TABLE ='MOB_FITE_CARF_ON_TABLE';

    public static readonly I_PICKUP_CARD ='I_PICKUP_CARD';
    public static readonly MOB_PICKUP_CARD ='MOB_PICKUP_CARD';
    public static readonly PICKUP_CARDS_END ='PICKUP_CARDS_END';

    public static readonly MOVE_CARD_TO_EDGE ='MOVE_CARD_TO_EDGE';
    public static readonly ROUND_END ='ROUND_END';
    public static readonly ROUND_CLOSE ='ROUND_CLOSE';

    public static readonly I_CLOSE_ROUND ='I_CLOSE_ROUND';
    public static readonly MOB_CLOSE_ROUND ='MOB_CLOSE_ROUND';

    public static readonly CHECK_CARD_AND ='CHECK_CARD_AND';

    public static readonly ACTION ='ACTION';
    public static readonly LOCK_BTN ='LOCK_BTN';

    public static readonly UI_GETCART ='UI_GETCART';
    public static readonly UI_HELP ='UI_HELP';
    public static readonly UI_RESET ='UI_RESET';
    public static readonly UI_MENU_OPEN ='UI_MENU_OPEN';
    public static readonly UI_MENU_CLOSE ='UI_MENU_CLOSE';

    public static ArrayOfListeners: Array<PIXI.DisplayObject> = [];
    
    public static InitEmiter(s:PIXI.DisplayObject,e:string,f:Function):void{
        s.on(e,f as any);
        Event.ArrayOfListeners.push(s);
    }

    public static DispachEvent(e:string,a?:string):void{
        for (let i = 0; i < Event.ArrayOfListeners.length; i++) {
             Event.ArrayOfListeners[i].emit(e,a);
        }
    }
}