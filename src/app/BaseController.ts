import { Container } from 'pixi.js'
import { Event } from './Event';
import { BaseViwe } from './BaseViwe';
import * as PIXI from 'pixi.js'


export class BaseController extends Container {
    
    constructor(private _viwe:BaseViwe) {
        super();
        this.name = this.constructor.name;
        this.addChild(_viwe);
    }

    public roundLoase:number = 0;


    init(): BaseController {
        this.on(Event.GAMEOVER, this.gameOveerMessage);
        this.on(Event.YOUWIN, this.winMessage);
        this.on(Event.FITCARD,this.fitCard);
        this.on(Event.PICKUPCARDS,this.pickUpCards);
        this.on(Event.MYCARTONTABLE,this.myCartOnTable);
        this.on(Event.PICKUPCARDSEND,this.pickUpCardsEnd);
        this.on(Event.MOVETOEDGE,this.myCartToEdge);
        return this;

    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       SET VALUE                                                                        */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    setInteractive(s:Container, f:boolean):void{
        s.interactiveChildren = f;
    }

    setRoundLoase(i:number){
        this.roundLoase = i;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**                       ECTION                                                                           */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    fitCard(){
        this.setInteractive(this._viwe.get_cartPull(),true);
        this._viwe.checkWin();
    }

    pickUpCards(){
        this.setInteractive(this._viwe.get_cartPull(),true);
        this._viwe.pickUpCards(this.roundLoase);
    }

    pickUpCardsEnd(){
       this.endRound();
    }

    myCartOnTable(){
        this.setInteractive(this._viwe.get_cartPull(),false);
        this._viwe.get_cartPull().interactive = false;
    }

    myCartToEdge(){
        this.endRound();
    }

    endRound(){
        this._viwe.endRound();
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
