import { Cart_ } from "./Cart_";
import { Element } from "./Components/Element";
import { Event } from "../app/Event";
import { ElementContainer } from "./Components/BaseComponents/ElementContainer";
import { DataSetting } from "../Utils/DataSetting";

export class LogicGame {
  private _cards: Cart_[] = [];
  private _trumpSuit: string = "";

  static WinnerID: number | null = null
  static WhoFiteID: number | null = null

  constructor() {

  }

  public getCards(): Cart_[] {
    return this._cards;
  }

  public getTrumpSuit(): string {
    return this._trumpSuit;
  }

  public canAddCardToTable(card: Cart_, tableContaine: Element, playerCards: Cart_[], ts: ElementContainer): boolean {
    // Получаем карты, которые уже лежат на столе
    const tableCards = (tableContaine.element as ElementContainer).childs as Cart_[];
    const c = tableContaine.element as ElementContainer;

    // Если на столе еще нет карт, то игрок может положить любую карту
    if (tableCards.length === 0) {
      c.moveElement(card).animation.cartMoveToCenter();
      return true;
    }

    // Получаем масть карты, которую игрок хочет положить на стол
    const cardSuit = card.mastW;

    // Проверяем, есть ли на столе карты с такой же мастью
    for (const tableCard of tableCards) {
      if (tableCard.mastW === cardSuit) {
        c.moveElement(card).animation.cartMoveToCenter();
        return true;
      }
    }

    // Иначе игрок не может положить выбранную карту
    card.animation.animaLittleMove();
    return false;
  }

  setZindex(s: Cart_[]): number {
    for (let i = 0; i < s.length; i++) {
      s[i].element.zIndex = i;
    }
    return s.length
  }
  // /**
  //  * Проверяет, можно ли положить карту на стол
  //  * @param card Карта для проверки
  //  * @param tableCards Карты, которые уже лежат на столе
  //  * @param playerCards Карты игрока
  //  * @param isFirstMove Является ли ход первым
  //  * @returns true, если карта можно положить, false - в противном случае
  //  */
  public canPutCardOnTable(card: Cart_, tableContaine: Element, playerCards: Cart_[], ts: ElementContainer, isFirstMove: boolean): boolean {
    // Если это первый ход, то можно положить любую карту
    let c = tableContaine.element as ElementContainer;
    let tableCards = c.childs as Cart_[];
    this._trumpSuit = card.trumpSuit;

    if (isFirstMove) {
      c.moveElement(card).animation.cartMoveToCenter().changingTexture();
      return true;
    }

    // Если карта является козырной, то можно положить только козырь или старшую козырную карту
    if (card.mastW === this._trumpSuit) {
      for (const tableCard of tableCards) {
        if (tableCard.mastW !== this._trumpSuit || tableCard.value > card.value) {
          card.animation.animaLittleMove();
          return false;
        }
      }
      card.element.zIndex = this.setZindex(tableCards);
      c.moveElement(card).animation.cartMoveToCenter().changingTexture();
      return true;
    }

    // Если карта не является козырной, то можно положить карту той же масти или козырь
    for (const playerCard of playerCards) {
      if (playerCard.mastW === card.mastW || playerCard.mastW === this._trumpSuit) {
        card.animation.animaLittleMove();
        return false;
      }
    }
    card.element.zIndex = this.setZindex(tableCards);
    c.moveElement(card).animation.cartMoveToCenter().changingTexture();
    return true;
  }

  public mobTrueFoundCart(tableContaine: Element, mobCards: Cart_[], ts: ElementContainer): boolean {
    return this.canBeatCardOnTable(tableContaine, mobCards, ts)
  }


  public canBeatCardOnTable(tableContaine: Element, playerCards: Cart_[], ts: ElementContainer): boolean {

    const s = tableContaine.element as ElementContainer;
    const tableCards = s.childs as Cart_[];

    // Если на столе нет карт, то побить нельзя  но можно бросить карту
    if (tableCards.length === 0) {
      s.moveElement(playerCards[0]).animation.cartMoveToCenter().changingTexture();
      return true;
    }

    // Если последняя карта на столе - козырь, то можно побить только козырем или старшей козырной картой
    const lastCardOnTable = tableCards[tableCards.length - 1];
    const trumpSuit = lastCardOnTable.trumpSuit;

    if (lastCardOnTable.mastW === trumpSuit) {
      for (let i = 0; i < playerCards.length; i++) {
        const playerCard = playerCards[i];
        if (playerCard.mastW === trumpSuit && playerCard.value > lastCardOnTable.value) {
          playerCard.element.zIndex = this.setZindex(tableCards);
          s.moveElement(playerCard).animation.cartMoveToCenter().changingTexture();
          return true;
        }
      }
    } else {
      // Если последняя карта на столе - не козырь, то можно побить картой той же масти или козырем
      for (let i = 0; i < playerCards.length; i++) {
        const playerCard = playerCards[i];
        if ((playerCard.mastW === lastCardOnTable.mastW && playerCard.value > lastCardOnTable.value) ||
          (playerCard.mastW === trumpSuit)) {
          playerCard.element.zIndex = this.setZindex(tableCards);
          s.moveElement(playerCard).animation.cartMoveToCenter().changingTexture();
          return true;
        }
      }
    }
    return false;
  }

  public playerCanBeatCardOnTable(card: Cart_, tableContaine: Element, playerCards: Cart_[], ts: ElementContainer): boolean {

    const s = tableContaine.element as ElementContainer;
    const tableCards = s.childs as Cart_[];

    // Если на столе нет карт, то побить нельзя  но можно бросить карту
    if (tableCards.length === 0) {
      s.moveElement(playerCards[0]).animation.cartMoveToCenter();
      return true;
    }

    // Если последняя карта на столе - козырь, то можно побить только козырем или старшей козырной картой
    const lastCardOnTable = tableCards[tableCards.length - 1];
    const trumpSuit = lastCardOnTable.trumpSuit;

    if (lastCardOnTable.mastW === trumpSuit) {
      for (let i = 0; i < playerCards.length; i++) {
        const playerCard = card;
        if (playerCard.mastW === trumpSuit && playerCard.value > lastCardOnTable.value) {
          playerCard.element.zIndex = this.setZindex(tableCards);
          s.moveElement(playerCard).animation.cartMoveToCenter();
          return true;
        }
      }
    } else {
      // Если последняя карта на столе - не козырь, то можно побить картой той же масти или козырем
      for (let i = 0; i < playerCards.length; i++) {
        const playerCard = card;
        if ((playerCard.mastW === lastCardOnTable.mastW && playerCard.value > lastCardOnTable.value) ||
          (playerCard.mastW === trumpSuit)) {
          playerCard.element.zIndex = this.setZindex(tableCards);
          s.moveElement(playerCard).animation.cartMoveToCenter();
          return true;
        }
      }
    }
    card.animation.animaLittleMove();
    return false;
  }

  // /**
  //  * Определяет победителя раунда
  //  * @param tableCards Карты, которые лежат на столе
  //  * @returns Индекс победителя в массиве карт на столе
  //  */

  public getRoundWinnerID(m: Element): boolean {
    if (m.element.children.length == 0){
      LogicGame.WinnerID = DataSetting.PlayrWinnerID;
      return true
    } else {
      LogicGame.WinnerID = DataSetting.MobWinnerID;
      return false
    }
  }



}