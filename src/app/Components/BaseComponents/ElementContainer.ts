import { Container, DisplayObject } from 'pixi.js';
import { Element, ElementConfig } from '../Element';

export class ElementContainer extends Container {

  public element: any
  public childs: Element[] = [];

  constructor(public config: ElementConfig) {
    super()

    if (config.childs) {
      for (let i = 0; i < config.childs.length; i++) {
        // this.childs.push(new Element(this, config.childs[i]));
        new Element(this, config.childs[i])
      }
    }
  }


  addElement(e: Element): Element {
    this.addChild(e.element);
    this.childs.push(this.removeElement(e));
    e.parent = this;
    this.sort(e);
    return e
  }

  getElement(id: number): Element {
    return this.childs[id];
  }

  removeElement(e: any): Element {
    return e.parent.childs.includes(e) && e.parent.childs.splice(e.parent.childs.indexOf(e), 1)[0] || 'Element not found in prent';
  }

  sort(e: any) {
    // создаем объект, содержащий индексы объектов из первого массива
    const indexMap: { [id: number]: number } = {};
    e.parent.children.forEach((obj: any, index: number) => {
      indexMap[obj.id] = index;
    });

    // сортируем элементы второго массива по индексам первого массива
    e.parent.childs.sort((a: any, b: any) => indexMap[a.element.id] - indexMap[b.element.id]);

  }
  
  moveElement(e: any): Element {
    const globalPos = e.element.getGlobalPosition(); 
    this.addElement(e);    
    const localPos = this.toLocal(globalPos);  //We transform the global coordinates of the sprite into local coordinates relative to the current container
    e.element.position.set(localPos.x, localPos.y);
    return e
  }

    // Set Position 
    // const globalPos = this._element.getGlobalPosition();
    // const elementContainer = tt.element as ElementContainer
    // elementContainer.addElement(this._ELEMENT);
    // const localPos = this._element.parent.toLocal(globalPos);
    // this._element.position.set(localPos.x, localPos.y);
    // Set Position

}






