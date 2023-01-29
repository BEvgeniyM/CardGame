import {Loader, Texture, AnimatedSprite, PixelExtractOptions } from "pixi.js";
import * as PIXI from 'pixi.js'
import { StageController } from './StageController';
import { MessageMeneger } from './app/MessageMeneger';
import { getSpine } from "./spine-example";
import "./style.css";


declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new StageController().init();



window.onload = async (): Promise<void> => {
    await loadGameAssets();

    new MessageMeneger(app).init();
    

    const birdFromSprite = getBird();
    birdFromSprite.anchor.set(0.5, 0.5);
    birdFromSprite.position.set(gameWidth / 2, gameHeight);

    const spineExample = getSpine();
    spineExample.position.y = 580;

    app.stage.addChild(birdFromSprite);
    app.stage.addChild(spineExample);
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        loader.add("pixie", "./assets/spine-assets/pixie.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

function getBird(): AnimatedSprite {
    const bird = new AnimatedSprite([
        Texture.from("birdUp.png"),
        Texture.from("birdMiddle.png"),
        Texture.from("birdDown.png"),
    ]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);

    return bird;
}
