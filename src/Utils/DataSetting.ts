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
        scale: 1,
        viweport:{cover:true,angle:true},

    }

    static Progress = {
        type: 'SpriteImage',
        t: 'skin_1',
        x: 0.5,
        y: 0.9,
        length: 100,
        scale: 0.1,
        z: 2000,
        ax: 0.5,
        ay: 0.5,
        alpha: 0,
        portret: {
            scale: 0.05,
            x: 0.1,
            y: 0.5,
        }
    }

    static SplashScreenContainer = {
        type: 'ElementContainer',      
        /** not worc in Conteiner  ax: 0, ay: 1, */
        x: 0.0, y: 0.0, ax: 0, ay: 1, scale: 1, z: 10000,
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.SplashScreenBackGround,DataSetting.SplashScreen],       
    }

    /*********************************************************************************************** */
    /******** Conteiner for Cart **************************************************8**************** */
    /*********************************************************************************************** */
    static CartS = {
        type: 'SpriteImage',
        t:'skin_2', x: 0.0, y: 0.0, ax:0.5,ay:0.5, scale: 0.4, z: 1,
        viweport:{sch:0.25, portret:{ scw:0.2}},
    }

    static TableBackground = {
        type: 'SpriteImage',
        t:'table_4', x: 0.5, y: 0.5, ax:0.5,ay:0.5, scale: 1, z: 0,
    }

    static StocElementContaine = {
        type: 'ElementContainer',
        name: 'StocElementContaine',
        x: 0.9, y: 0.5, scale: 1, z: 10,
        portret: {scale:1, x: 0.90, y: 0.5},
        childs:[],
        // viweport:{fr:50,fb:20}
    }

    static EdgeElementContaine = {
        type: 'ElementContainer',
        name: 'EdgeElementContaine',
        x: 0.0, y: 0.5, scale: 1, z: 10,
        portret: {scale:1, x: 0.0, y: 0.5},
        childs:[]
    }

    static MobElementContaine = {
        type: 'ElementContainer',
        name: 'MobElementContaine',
        x: 0.5, y: 0.12, scale: 1, z: 10, ft:200,
        portret: {scale:1, x: 0.5, y: 0.12},
        childs:[]
    }

    static PlayrElementContaine = {
        type: 'ElementContainer',
        name: 'PlayrElementContaine',
        x: 0.5, y: 0.88, scale: 1, z: 10, 
        portret: {scale:1, x: 0.5, y: 0.88},
        childs:[]
    }

    static TableElementContaine = {
        type: 'ElementContainer',
        name: 'TableElementContaine',
        x: 0.0, y: 0.0, scale: 1, z: 0,
        portret: {scale:1, x: 0.0, y: 0.0},
        childs:[
            DataSetting.TableBackground,
            DataSetting.StocElementContaine,
            DataSetting.MobElementContaine,
            DataSetting.PlayrElementContaine,
            DataSetting.EdgeElementContaine
        ]
    }

    /*********************************************************************************************** */
    /******** Button Part *********************************************************8**************** */
    /*********************************************************************************************** */
   

    static HeroMy = {
        filter:[{type:'DISPLACEMENTFILTER',DisplacementFilterTexture:'map_repeat',scale:10,ax:0.5,ay:0.5},
        {blurY:0.2,blurX:0.2,type:'BLURFILTER',quality:16}],
        type: 'SpriteImage',
        t: 'hero_1', tb: 'shift_1', x: 0.90, y: 0.90, ax: 0.5, ay: 0.5, scale: 0.2, duration: DataSetting.DefaultDuration
    }
    static HeroMob = {
        filter:[{type:'DISPLACEMENTFILTER',DisplacementFilterTexture:'splash_screen_1',scale:10,ax:0.5,ay:0.5},
        {blurY:0.2,blurX:0.2,type:'BLURFILTER',quality:8}],
        type: 'SpriteImage',
        t: 'hero_2', tb: 'shift_3', x: 0.90, y: 0.08, ax: 0.5, ay: 0.5, scale: 0.18, duration: DataSetting.DefaultDuration 
    }

    /*********************************************************************************************** */
    /******** Button Part *********************************************************8**************** */
    /*********************************************************************************************** */
    static Menu = {
        type: 'SpriteImage',
        t: 'menu', x: 0.07, y: 0.88, ax: 0.5, ay: 0.5, scale: 0.2, duration: DataSetting.DefaultDuration, z:1000
    }
    static WinPanel = {
        type: 'SpriteImage',
        t: 'winPanel', x: 0, y: 0, ax: 0, ay: 0, scale: 0.1, duration: DataSetting.DefaultDuration
    }

    /*********************************************************************************************** */
    /******** help         *********************************************************8**************** */
    /*********************************************************************************************** */

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

    static TextHelp = {
        type: 'WebFont',
        text: 'Help Data',
        filter:[
            {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        t: 'flag_3', ts: 2, x: 0.5, y: 0.5, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.5, y: 0.5},
        style: {
            fontSize: 20,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }

    // static HelpElementConteiner = {
    //     type: 'ElementContainer',
    //     x: 0.0, y: 0.2, scale: 0.5, z: 0,
    //     portret: {scale: 0.7, x: 0.0, y: 0.2},
    //     childs:[DataSetting.HelpBackGround,DataSetting.HelpPaper,DataSetting.TextHelp,DataSetting.HelpClose]
    // }
    /*********************************************************************************************** */
    /******** ElementContainer Menu *********************************************************8**************** */
    /*********************************************************************************************** */
    static Flag = {
        filter:[
        {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
        ],
        type: 'SimpleRopeImage',
        xStap:20,        
        sizeInPXfrom: 300, ///
        t: 'flag_3', tb: 'flag_3', x: -0.1, y: 1, ax: 0, ay: 0.0, scale: 1, duration: DataSetting.DefaultDuration,
        viweport:{sf:300}
    }

    static Btn_0 = {      
        type: 'SpriteImage',
        sizeInPXfrom: 200,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 1, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.0, y: 1},
        viweport:{sf:200}
    }

    static Btn_1 = {      
        type: 'SpriteImage',
        sizeInPXfrom: 300,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 1, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.0, y: 1},
        viweport:{sf:300}
    }

    static Btn_2 = {     
        type: 'SpriteImage',
        sizeInPXfrom: 400,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 1, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.0, y: 1},
        viweport:{sf:400}
    }

    static Btn_0_Text = {
        type: 'WebFont',
        text: 'Setting',
        filter:[
            {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:200},    
        t: 'shift_3', ts: 2, x: 0.32, y: 0.9, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.32, y: 0.9},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }

    
    static Btn_1_Text = {
        type: 'WebFont',
        text: 'Help',
        filter:[
            {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        t: 'shift_3', ts: 2, x: 0.30, y: 0.93, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.30, y: 0.93},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }

    
    static Btn_2_Text = {
        type: 'WebFont',
        text: 'About us',
        filter:[
            {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:400},    
        t: 'shift_3', ts: 2, x: 0.15, y: 0.95, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.15, y: 0.95},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }

   
    static Btn_0_Containe = {
        type: 'ElementContainer',
        x: 0.0, y: 0.0, scale: 1, z: 1,
        viweport:{sf:0},   
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.Btn_0,DataSetting.Btn_0_Text]
    }
    static Btn_1_Containe = {
        type: 'ElementContainer',
        x: 0.0, y: 0.0, scale: 1, z: 2,
        viweport:{sf:0},   
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.Btn_1,DataSetting.Btn_1_Text]
    }
    static Btn_2_Containe = {
        type: 'ElementContainer',
        x: 0.0, y: 0.0, scale: 1, z: 3,
        viweport:{sf:0},   
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.Btn_2,DataSetting.Btn_2_Text]
    }
    static MenuElementContaine = {
        type: 'ElementContainer',
        x: 0.0, y: 0.2, scale: 0.5, z: 1000,
        portret: {scale: 0.7, x: 0.0, y: 0.2},
        childs:[DataSetting.Flag,DataSetting.Btn_0_Containe,DataSetting.Btn_1_Containe,DataSetting.Btn_2_Containe]
    }

    static MenuElementTextHelp = {
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
        }
    }
}   