import * as PIXI from 'pixi.js'
import { getEventType } from '../../Utils/Fullscreen';

export class EventGame  {
    public static readonly  POINTE = getEventType();
    // public static readonly  POINTE = 'pointerdown';


    public static readonly START_GAME = 'START_GAME';
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
    public static readonly SELECTED_CART ='SELECTED_CART';
    public static readonly LOCK_BTN ='LOCK_BTN';

    public static readonly UI_GETCART ='UI_GETCART';
    public static readonly UI_HELP ='UI_HELP';
    public static readonly UI_SETTING ='UI_SETTING';
    public static readonly UI_ABOUT ='UI_ABOUT';
    
    public static readonly UI_HELP_CLOSE ='UI_HELP_CLOSE';

    
    public static readonly UI_RESET ='UI_RESET';
    public static readonly UI_MENU_OPEN ='UI_MENU_OPEN';
    public static readonly UI_MENU_CLOSE ='UI_MENU_CLOSE';
    public static readonly UI_MENU_CLICK ='UI_MENU_CLICK';
    public static readonly UI_MENU_SOUN_ON ='UI_MENU_SOUN_ON';
    public static readonly UI_MENU_SOUN_OFF ='UI_MENU_SOUN_OFF';
    public static readonly UI_MENU_SOUN_SWITCH ='UI_MENU_SOUN_SWITCH';
    public static readonly UI_MENU_ANIMATION_ON ='UI_MENU_ANIMATION_ON';
    public static readonly UI_MENU_ANIMATION_OFF ='UI_MENU_ANIMATION_OFF';

    public static ArrayOfListeners: Array<PIXI.DisplayObject> = [];
    
    public static InitEmiter(s:PIXI.DisplayObject,e:string,f:Function):void{
        s.on(e,f as any);
        EventGame.ArrayOfListeners.push(s);
    }

    public static DispachEvent(e:string,a?:string):void{
        for (let i = 0; i < EventGame.ArrayOfListeners.length; i++) {
             EventGame.ArrayOfListeners[i].emit(e,a);
        }
    }
}