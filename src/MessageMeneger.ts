import { RootController } from './RootController';

export class MessageMeneger {
  private _data: XMLHttpRequest | null = null;
  private _deckID: string = '';

  constructor(private _parent: RootController) {
  }

  getCarts(): void {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.deckofcardsapi.com/api/deck/" + this._deckID + "/draw/?count=36");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.onComplete(xhr.response);
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }

  init(): void {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this._deckID = xhr.response.deck_id;
        this.getCarts();
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }

  onComplete(data: XMLHttpRequest): void {
    this._parent.loadGameAssets(data);
  }

}


type cards = {
  'cards': Array<any>
}