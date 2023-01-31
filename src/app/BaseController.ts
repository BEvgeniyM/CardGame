import { Container } from 'pixi.js'
import { Event } from './Event';
import { BaseViwe } from './BaseViwe';
import * as PIXI from 'pixi.js'


export class BaseController extends Container {
    constructor() {
        super();
        this.name = this.constructor.name;
    }



    init(): BaseController {
        this.on(Event.GAMEOVER, this.gameOveerMessage);
        this.on(Event.YOUWIN, this.winMessage);
        return this;

    }

    startGame(): void {
    }

    gameOveerMessage(view: BaseViwe): void {        
        view.endMasege('game over');
    }

    winMessage(view: BaseViwe): void {        
        view.endMasege('You Win');
    }

}
