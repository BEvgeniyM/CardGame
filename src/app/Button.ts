// import { Container, Sprite, Texture, Graphics } from 'pixi.js'
// import * as PIXI from 'pixi.js'
// import { gsap } from "gsap";
// import { CustomUtils } from '../Utils/CustomUtils'
// import { DataSetting } from '../Utils/DataSetting';
// import { Image, ConfigImag } from './Image';
// import { Animation } from './Animation';


// export class Button extends Image implements Animation {
//     constructor(_parent?:Container, _cnf?: ConfigImag) {
//         super(_parent, _cnf);
//         const t = this
//         debugger
//     }

//     rotationHero(){
        
//     }
// }

//соединяем примеси в классе, создавая полную реализацию
// applyMixins(Button, [Animation, Image]);

// //функция для создания примесей. Пробегает по свойствам и копировать их в целевой элемент, 
// //заполняя свойства-дублёры их реализациями.
// function applyMixins(derivedCtor: any, baseCtors: any[]) {
//     baseCtors.forEach(baseCtor => {
//         Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
//             derivedCtor.prototype[name] = baseCtor.prototype[name];
//         });
//     });
// }
  
  