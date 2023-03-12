import { Card } from "./Card";
import { Element } from "./Components/Element";
import { EventGame } from "./EventGame";
import { ElementContainer } from "./Components/BaseComponents/ElementContainer";
import { DataSetting } from "../Utils/DataSetting";

export class LogicGame {
  private _cards: Card[] = [];
  private _trumpSuit: string = "";

  static WinnerID: number | null = null
  static WhoFiteID: number | null = null

  constructor() {

  }

  public getCards(): Card[] {
    return this._cards;
  }

  public getTrumpSuit(): string {
    return this._trumpSuit;
  }

  public canAddCardToTable(card: Card, tableContaine: Element, playerCards: Card[], ts: ElementContainer): boolean {
    // Получаем карты, которые уже лежат на столе
    const tableCards = (tableContaine.element as ElementContainer).childs as Card[];
    const c = tableContaine.element as ElementContainer;

    // Если на столе еще нет карт, то игрок может положить любую карту
    if (tableCards.length === 0) {
      c.moveElement(card).animation.cardMoveToCenter();
      return true;
    }

    // Получаем масть карты, которую игрок хочет положить на стол
    const cardSuit = card.mastW;

    // Проверяем, есть ли на столе карты с такой же мастью
    for (const tableCard of tableCards) {
      if (tableCard.mastW === cardSuit) {
        c.moveElement(card).animation.cardMoveToCenter();
        return true;
      }
    }

    // Иначе игрок не может положить выбранную карту
    card.animation.animaLittleMove();
    return false;
  }

  setZindex(s: Card[]): number {
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
  public canPutCardOnTable(card: Card, tableContaine: Element, playerCards: Card[], ts: ElementContainer, isFirstMove: boolean): boolean {
    // Если это первый ход, то можно положить любую карту
    let c = tableContaine.element as ElementContainer;
    let tableCards = c.childs as Card[];
    this._trumpSuit = card.trumpSuit;

    if (isFirstMove) {
      c.moveElement(card).animation.cardMoveToCenter().changingTexture();
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
      c.moveElement(card).animation.cardMoveToCenter().changingTexture();
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
    c.moveElement(card).animation.cardMoveToCenter().changingTexture();
    return true;
  }

  public mobTrueFoundCard(tableContaine: Element, mobCards: Card[], ts: ElementContainer): boolean {
    return this.canBeatCardOnTable(tableContaine, mobCards, ts)
  }


  public canBeatCardOnTable(tableContaine: Element, playerCards: Card[], ts: ElementContainer): boolean {

    const s = tableContaine.element as ElementContainer;
    const tableCards = s.childs as Card[];

    // Если на столе нет карт, то побить нельзя  но можно бросить карту
    if (tableCards.length === 0) {
      s.moveElement(playerCards[0]).animation.cardMoveToCenter().changingTexture();
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
          s.moveElement(playerCard).animation.cardMoveToCenter().changingTexture();
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
          s.moveElement(playerCard).animation.cardMoveToCenter().changingTexture();
          return true;
        }
      }
    }
    return false;
  }

  public playerCanBeatCardOnTable(card: Card, tableContaine: Element, playerCards: Card[], ts: ElementContainer): boolean {

    const s = tableContaine.element as ElementContainer;
    const tableCards = s.childs as Card[];

    // Если на столе нет карт, то побить нельзя  но можно бросить карту
    if (tableCards.length === 0) {
      s.moveElement(playerCards[0]).animation.cardMoveToCenter();
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
          s.moveElement(playerCard).animation.cardMoveToCenter();
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
          s.moveElement(playerCard).animation.cardMoveToCenter();
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