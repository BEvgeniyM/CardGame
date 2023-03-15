import { Sprite, Texture, Container } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { gsap } from "gsap";
import { CustomUtils } from '../../../Utils/CustomUtils'
import { Element, ElementConfig } from '../../components/Element'
import { DataSetting } from './DataSetting';

export class Card extends Element {

    /** SETING */
    private _openDur: number = 0.5 //s
    /** SETING */

    protected _back = Texture.from(DataSetting.Card.skin);
    public _timeLine!: gsap.core.Timeline;

    public _gsap: gsap.core.Tween | null = null;
    public _lockEvent: boolean = false;
    public value: number = 0;
    public mastW: string = '';
    public trumpSuit: string = '';
    protected _isOpen: boolean = false;

    constructor(parent: Container, public config: ElementConfig, public id: [string, string], f: [string, string]) {
        super(parent, config);
        this.trumpSuit = f[0][1];
        this.mastW = id[0][1];
        let w: number = 1;

        if (f[0][1] == id[0][1]) {
            w = 10;
        }

        switch (id[1]) {
            case '2':
                this.value = 2 * w;
                break;
            case '3':
                this.value = 3 * w;
                break;
            case '4':
                this.value = 4 * w;
                break;
            case '5':
                this.value = 5 * w;
                break;
            case '6':
                this.value = 6 * w;
                break;
            case '7':
                this.value = 7 * w;
                break;
            case '8':
                this.value = 8 * w;
                break;
            case '9':
                this.value = 9 * w;
                break;
            case '10':
                this.value = 10 * w;
                break;
            case 'JACK':
                this.value = 11 * w;
                break;
            case "QUEEN":
                this.value = 12 * w;
                break;
            case 'KING':
                this.value = 13 * w;
                break;
            case 'ACE':
                this.value = 14 * w;
                break;
            default:
                this.value = +id[1] * w;
                break;

        }
    }

    isNeedOpen(): boolean {
        if (this._isOpen) {
            return false
        }
        return this._isOpen = true;
    }


}
