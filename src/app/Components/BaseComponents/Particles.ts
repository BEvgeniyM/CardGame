import { Container } from 'pixi.js';
import { Emitter, AnimatedParticle } from "pixi-particles";
import { SpriteImage } from './SpriteImage'

export class Particles extends Container {
    public emitter: any = ''
    public textureName: string = ''

    // constructor(public name: string, public config: any){
    constructor(public config: any) {
        super()
        // @@ Help link!!
        // https://pixijs.io/particle-emitter/docs/
        // https://codesandbox.io/s/ck04u?file=/src/index.tsx:1924-1945
        // https://www.npmjs.com/package/pixi-particles
        // https://pixijs.io/pixi-particles-editor/#

        if (config) {         
            const texture = SpriteImage.GetTexture(config.t);

            const emitter = new Emitter(this, texture, this.setting());
            this.emitter = emitter
            emitter.autoUpdate = true;
            emitter.emit = true;       
            
            // emitter.updateSpawnPos(0, -300);
            // emitter.updateOwnerPos(0, 0);        
            // emitter.particleConstructor = AnimatedParticle;
          }
        this.interactiveChildren = false;  ///@@ good! 
        this.zIndex = config.zIndex ? config.zIndex : 0
        this.textureName = config.texture?config.texture:console.log("ERROR: Particles textureName not found");
    }
    

    setting(): any {
        const emiter = {
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 0.3,
                "end": 0.01,
                "minimumScaleMultiplier": 0.1
            },
            "color": {
                "start": "#fff894",
                "end": "#f70000"
            },
            "speed": {
                "start": 100,
                "end": 50,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 50,
                "y": -700
            },
            "maxSpeed": 200,
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": true,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 0.2,
                "max": 2
            },
            "blendMode": "normal",
            "frequency": 0.001,
            "emitterLifetime": -0.99,
            "maxParticles": 300,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": window.innerHeight,
                "w": window.innerWidth * 2,
                "h": window.innerHeight
            }
        }

        return emiter
    }   

}