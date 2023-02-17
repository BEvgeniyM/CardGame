import { Loader, TextStyleAlign, BitmapText, IBitmapTextStyle, Container, Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js'
import { CompositeTilemap, CompositeRectTileLayer } from '@pixi/tilemap';
import { settings } from '@pixi/tilemap';

import gsap from "gsap";
import { StageController } from '../app/../StageController'
import { CustomUtils } from '../Utils/CustomUtils'
export class WebFont extends Container {

    /*************************************************************************************
      VARIABLES 
    **************************************************************************************/
    public blurFilters?: PIXI.Filter | null;
    public filters: Array<any> = [];
    public textSample: any = '';
    // public progressBar: boolean = false
    protected _maskSprite: Sprite | null = null;

    /*************************************************************************************
      CONSTRUCTOR CREATER
    **************************************************************************************/
    constructor(public name: string, public config: any) {
        super()
        this.interactiveChildren = false;  ///@@ good!      
        config.parent.addChild(this);
        this.config.style = config.style ? config.style : {}

        window.addEventListener("resize", this.resizeCanvas.bind(this));


        this.creatWebFont();
        this.resizeCanvas.bind(this)()
    }

    public resizeCanvas(): number {
        let s = this.children[0] as PIXI.DisplayObject;
        const cnf = this.config;


        if (cnf.portret && CustomUtils.IsPortret()) {
            CustomUtils.GoToProz(this, cnf.portret)
        } else CustomUtils.GoToProz(this, cnf)

        // s.scale.set(1);
        // if (CustomUtils.IsPortret() && cnf.portret && cnf.portret.scale) {
        //     if (CustomUtils.IsPortret()) {
        //         s.scale.set(window.innerHeight * cnf.portret.scale / s.height);
        //     } else s.scale.set(window.innerWidth * cnf.portret.scale / s.height);
        //     return s.scale.x
        // }

        // if (CustomUtils.IsPortret()) {
        //     s.scale.set(window.innerHeight * cnf.scale / s.height);
        // } else s.scale.set(window.innerWidth * cnf.scale / s.height);
        return s.scale.x
    }





    public creatTilemap(textureName: string): Sprite {
        debugger
        const texture = PIXI.Texture.from(textureName);
        const sprite = new Sprite();
        const tilemap = new CompositeTilemap();
        const map = tilemap.tile(texture, 0, 0);

        settings.TEXTURES_PER_TILEMAP = 8;
        settings.use32bitIndex = true;

        sprite.addChild(map)
        for (var i = 0; i <= (window.innerWidth / texture.width); i++) {
            for (var j = 0; j <= (window.innerHeight / texture.height); j++) {
                tilemap.addFrame(texture, i * texture.width, j * texture.height);
            }
        }

        this.addChild(sprite);
        return sprite
    }


    protected setMask(): PIXI.Sprite | PIXI.Graphics {
        // Only Sprite 
        // this._maskSprite = new PIXI.Sprite(PIXI.Texture.from(this.config.mask));
        // this._maskSprite.anchor.set(0.5)

        this._maskSprite = this.creatTilemap(this.config.mask);
        this._maskSprite.scale.set(this.config.mask_scale);
        this.addChild(this._maskSprite);



        if (this.config.moveMask) {
            this.moveMask()
        }

        return this._maskSprite
    }

    protected moveMask(): void {
        let count = 0;
        StageController.app.ticker.add(() => {
            count += 0.002;
            // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
            if (this._maskSprite) {
                this._maskSprite.x = -200 + Math.cos(count) * 40
                this._maskSprite.y = -200 + Math.sin(count) * 40
            }
            // Reset x to 0 when it's over width to keep values from going to very huge numbers.
            if (this._maskSprite && this._maskSprite.x > this._maskSprite.width) { this._maskSprite.x = 0; }
        });
        // if(this._maskSprite) {let startPoint = this._maskSprite.y}
        // StageController.app.ticker.add(() => {
        //     // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
        //     if(this._maskSprite){             

        //         this._maskSprite.y--
        //     }
        //     // Reset x to 0 when it's over width to keep values from going to very huge numbers.
        //     if (this._maskSprite && this._maskSprite.y < 0) { this._maskSprite.y = this._maskSprite.height; }
        // });
    }


    public creatWebFont() {
        let defaultStyle = {
            fontSize: 90,
            fill: 'white',
            align: 'center',

            // fontWeight:'200',
            // letterSpacing:2,  
        }
        let style = Object.assign(defaultStyle, this.config.style)
        // debugger
        // style.fontFamily ='Freehand-Regular'
        // create some white text using the Snippet webfont
        // const textSample = new PIXI.Text(this.config.text, style);

        const textSample = new PIXI.Text(this.config.text, new PIXI.TextStyle(style));


        if (this.config.mask) {
            this.setMask().mask = textSample
        }
        // this.setMask()
        textSample.position.set(this.config.x, this.config.y);
        this.textSample = textSample
        this.addChild(textSample);

        if (this.config.displacementFilterTexture && this.config.scaleX && this.config.scaleY) {
            this.setВisplacementFilter(this.config.displacementFilterTexture, this.config.scaleX, this.config.scaleY)
        }

        // gsap.to(textSample, {
        //     alpha: 1,
        //     direction: 4,
        //     // y:temp,
        //     delay: 0,
        //     onComplete: () => {
        //         //   this.emit(EventName.PRELOADER_COMPLETE)
        //     },
        //     callbackScope: this,
        //     // onCompleteParams: [],
        //     ease: 'none',
        // })

    }


    // копия из Image  нужно всю функцию взять от туда
    protected setBlurFilter(blurVolueX: number = 0, blurVolueY: number = 0, blurQuality: number = 8): void {
        if (!blurVolueX && !blurVolueY) {
            return
        }
        const blurFilters = new PIXI.filters.BlurFilter();

        blurFilters.blurX = blurVolueX;
        blurFilters.blurY = blurVolueY;
        blurFilters.quality = blurQuality;

        this.filters.push(blurFilters);
        this.blurFilters = blurFilters;

        //***************************help setting below!!!************************ */
        // @ts-ignore 
        // this.blurFilters.repeatEdgePixels = true
        // this.blurFilters.quality = 3       
        // this.blurFilters.blurX  = 3       
        // this.blurFilters.blurY  = 3       
        // window.tre = this;

    }

    // копия из Image  нужно всю функцию взять от туда
    protected setВisplacementFilter(DisplacementFilterTexture: string, scaleX: number, scaleY: number): void {
        if (!DisplacementFilterTexture && !scaleX && !scaleY) {
            return
        }
        const displacementSprite = PIXI.Sprite.from(PIXI.Texture.from(DisplacementFilterTexture));
        displacementSprite.name = DisplacementFilterTexture;
        // Make sure the sprite is wrapping.
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);


        this.filters.push(displacementFilter);
        displacementFilter.scale.x = scaleX;
        displacementFilter.scale.y = scaleY;

        this.addChild(displacementSprite);

        StageController.app.ticker.add(() => {
            // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
            displacementSprite.x++;
            // Reset x to 0 when it's over width to keep values from going to very huge numbers.
            if (displacementSprite.x >= displacementSprite.width/10) { 
                displacementSprite.x = 0;
             }
        });
        //@ts-ignore
        window.tre = this;
    }



    protected setConfig(c: any): void {
        const config = c;
        if (!c) {
            console.error("WARNING :: config.portret not found", c);
            return
        }
        try {
            // this.blurVolueX = config.blurVolueX?config.blurVolueX:null
            // this.blurVolueY = config.blurVolueX?config.blurVolueX:null
            // this.displacementFilterScaleX = config.displacementFilterScaleX?config.displacementFilterScaleX:null
            // this.displacementFilterScaleY = config.displacementFilterScaleY?config.displacementFilterScaleY:null
            this.sortableChildren = true;
            // this.anchor.set(config.anchor ? config.anchor : 0);
            this.y = config.y ? config.y : 0;
            this.x = config.x ? config.x : 0;
            this.scale.x = config.sx ? config.sx : 1;
            this.scale.y = config.sy ? config.sy : 1;
            this.alpha = config.alpha ? config.alpha : 1;
            this.zIndex = config.zIndex ? config.zIndex : 1;
            // this.blurQuality = config.blurQuality ? config.blurQuality : 8;
            // this.name = config.name?config.name:'NO NAME';  
            this.visible = true;
            // this.texture = this.imageTextureArrayId[0]!;

            this.setBlurFilter(config.blurVolueX!, config.blurVolueY!, config.blurQuality!);
            this.setВisplacementFilter(config.displacementFilterTexture!, config.displacementFilterScaleX!, config.displacementFilterScaleY!)
        } catch (error) {
            console.error(this.name + "ERROR:: INTERNAL");
        }
    }

}

