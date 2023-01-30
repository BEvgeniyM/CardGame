import { StageController } from './StageController';
import { RootController } from './RootController';
import "./style.css";


declare const VERSION: string;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new StageController().init();
new RootController(app).init();

