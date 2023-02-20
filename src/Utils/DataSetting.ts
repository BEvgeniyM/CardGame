import { Container } from 'pixi.js'
import { Event } from '../app/Event';
import { BaseViwe } from '../app/BaseViwe';
import * as PIXI from 'pixi.js'
import { Cart } from '../app/Cart';





export class DataSetting {

    static GameWidth: number = 1920
    static GameHeight: number = 1080

    static DefaultDeley: number = 0.5;    // in [s]
    static DefaultDuration: number = 0.5  // in [s]


    static WhoseMoveID: number = 1;
    static WhoseFiteID: number = 1;

    static My_ID: number = 2;
    static MylastCart: Cart = {} as Cart;
    static MoBlastCart: Cart = {} as Cart;


    static Cart = {
        skin: 'skin_2'
    }




    static BackGround = {
        type: 'SpriteImage',
        t: 'table_4', x: 0.5, y: 0.5, ax: 0.5, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration
    }

    // static Helpseal = {t:'seal',x:0.7,y:0.6,ax:0,ay:0,scale:0.1,duration:DataSetting.DefaultDuration, portret:{
    //     x:0.6,
    //     y:0.5,
    //     scale:0.1
    // }} 

    static TextHelp = {
        text: 'The objective of the game is to shed all one\'s \n cards when there are no more cards left \n in the deck. At the end of the game, \n the last player with cards in their \n hand the player loses his ship.',
        x: 0.2, y: 0.3, ax: 0.5, ay: 0.5, duration: DataSetting.DefaultDuration,
        displacementFilterTexture: 'splash_screen_1',
        scaleX: 10,
        scaleY: 10,
        mask: 'shift_1',
        mask_scale: 2,
        moveMask: true,
        portret: {
            x: 0.2,
            y: 0.2,
            duration: DataSetting.DefaultDuration
        },
        style: {
            fontSize: 20,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        },
    }


    static Stock = { x: 0.92, y: 0.5, ax: 0.5, ay: 0.5, scale: 0.1, duration: DataSetting.DefaultDuration }
    static My_Pull = { x: 0.5, y: 0.92, ax: 0.5, ay: 0.5, scale: 0.15, duration: DataSetting.DefaultDuration }
    static Mob_Pull = { x: 0.5, y: 0.1, ax: 0.5, ay: 0.5, scale: 0.15, duration: DataSetting.DefaultDuration }
    static Table_Pull = { x: 0.5, y: 0.5, ax: 0.5, ay: 0.5, scale: 0.15, duration: DataSetting.DefaultDuration }


    static YouWin: string = 'YOU WIN'
    static YouLose: string = 'You Lose'





    /*********************************************************************************************** */
    /******** SplashScreen  Part ******************************************************************* */
    /*********************************************************************************************** */


    static SplashScreenBackGround = {
        type: 'GraphicImage',
        interType: 'Rectangle',
        color: 0x000000,
        x: 0,
        y: 0,
        w: 10,
        h: 10,
        z: 1001,
        alpha: 1,
        scale:1,
    }

    static SplashScreen = {
        type: 'SpriteImage',
        t: 'splash_screen_1',
        z: 1002,
        x: 0.5,
        y: 0.5,
        ax: 0.5,
        ay: 0.5,
        alpha: 1,
        scale: 1
    }

    static Progress = {
        type: 'SpriteImage',
        t: 'skin_1',
        x: 0.37,
        y: 0.9,
        length: 10,
        scale: 0.04,
        z: 2000,
        ax: 0.5,
        ay: 0.5,
        alpha: 0,
        portret: {
            scale: 0.05,
            x: 0.1,
            y: 0.35,
        }
    }


    /*********************************************************************************************** */
    /******** Button Part *********************************************************8**************** */
    /*********************************************************************************************** */
   

    static HeroMy = {
        filter:[{type:'DISPLACEMENTFILTER',DisplacementFilterTexture:'map_repeat',scale:2,ax:0.5,ay:0.5},
        {blurY:0,blurX:0,type:'BLURFILTER',quality:8}],
        type: 'SpriteImage',
        t: 'hero_1', tb: 'shift_1', x: 0.90, y: 0.90, ax: 0.5, ay: 0.5, scale: 0.2, duration: DataSetting.DefaultDuration
    }
    static HeroMob = {
        filter:[{type:'DISPLACEMENTFILTER',DisplacementFilterTexture:'splash_screen_1',scale:2,ax:0.5,ay:0.5},
        {blurY:0,blurX:0,type:'BLURFILTER',quality:8}],
        type: 'SpriteImage',
        t: 'hero_2', tb: 'shift_3', x: 0.90, y: 0.08, ax: 0.5, ay: 0.5, scale: 0.18, duration: DataSetting.DefaultDuration 
    }

    static Menu = {
        type: 'SpriteImage',
        t: 'menu', x: 0.07, y: 0.88, ax: 0.5, ay: 0.5, scale: 0.2, duration: DataSetting.DefaultDuration
    }
    static WinPanel = {
        type: 'SpriteImage',
        t: 'winPanel', x: 0, y: 0, ax: 0, ay: 0, scale: 0.1, duration: DataSetting.DefaultDuration
    }
    static HelpClose = {
        type: 'SpriteImage',
        t: 'round_close', x: 0.9, y: 0.1, ax: 0.5, ay: 0.5, scale: 0.08, duration: DataSetting.DefaultDuration }
    static HelpPaper = {
        type: 'SpriteImage',
        t: 'papir', x: 0.5, y: 0.5, ax: 0.5, ay: 0.5, scale: 0.4, duration: DataSetting.DefaultDuration, portret: {
            t: 'papir_2',
            x: 0.5,
            y: 0.5,
            scale: 0.7
        }
    }
    static HelpBackGround = {
        type: 'GraphicImage',
        interType: 'Rectangle',
        color: 0x000000,
        x: 0,
        y: 0,
        w: 10,
        h: 10,
        z: 1001,
        scale:1,
        alpha: 0.5
    }

    // static Flag = {
    //     filter:[{type:'DISPLACEMENTFILTER',DisplacementFilterTexture:'map_repeat',scale:10,ax:0.5,ay:0.5},
    //     {blurY:0,blurX:0,type:'BLURFILTER',quality:8}],
    //     type: 'SpriteImage',
    //     t: 'flag', tb: 'flag', x: 0.1, y: 0.4, ax: 0.5, ay: 0.5, scale: 0.6, duration: DataSetting.DefaultDuration
    // }
    static Flag = {
        filter:[
        {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
        ],
        type: 'SimpleRopeImage',
        xStap:20,
        t: 'flag_3', tb: 'flag_3', x: -0.01, y: 0.5, ax: 1, ay: 0.5, scale: 0.3, duration: DataSetting.DefaultDuration
    }

    static Btn_0 = {      
        type: 'SpriteImage',
        xStap:20,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 0.1, ax: 0, ay: 0.5, scale: 0.1, duration: DataSetting.DefaultDuration,
        portret: {scale: 0.1, x: 0.0, y: 0.1},
    }

    static Btn_1 = {      
        type: 'SpriteImage',
        xStap:20,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 0.4, ax: 0, ay: 0.5, scale: 0.1, duration: DataSetting.DefaultDuration,
        portret: {scale: 0.1, x: 0.0, y: 0.3},
    }

    static Btn_2 = {     
        type: 'SpriteImage',
        xStap:20,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 0.7, ax: 0, ay: 0.5, scale: 0.1, duration: DataSetting.DefaultDuration,
        portret: {scale: 0.1, x: 0.0, y: 0.5},
    }

    
    static MessageHelp = {
        type: 'ElementContainer',
        x: 0.0, y: 0.1, ax: 0, ay: 0.5, scale: 0.5, z: 0,
        portret: {scale: 0.7, x: 0.0, y: 0.4},
        childs:[DataSetting.Flag,DataSetting.Btn_0,DataSetting.Btn_1,DataSetting.Btn_2]
    }
}   