import { RootController } from './RootController';
import {Container, Application} from  'pixi.js'

export class MessageMeneger{
    private _data:XMLHttpRequest | null = null;
    private _deckID: string ='';

    constructor(private _app: Application){
    }
   
    getCarts ():XMLHttpRequest | void{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.deckofcardsapi.com/api/deck/"+this._deckID+"/draw/?count=10");       
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {            
            this.onComplete(xhr.response);
            return this._data = xhr.response;
          } else {
            console.log(`Error: ${xhr.status}`);
            return 
          }
        };
    }   

    init():XMLHttpRequest | void{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");       
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {            
            this._deckID = xhr.response.deck_id;
            return this.getCarts();
          } else {
            console.log(`Error: ${xhr.status}`);
          }
        };
    }

    onComplete (data:XMLHttpRequest){
        new RootController(this._app, data);
    }

}


type cards = {
    'cards': Array<any>
}