import { Card } from './Card';

export class DataSetting {

    static GameWidth: number = 1920
    static GameHeight: number = 1080

    static DefaultDeley: number = 0.5;    // in [s]
    static DefaultDuration: number = 0.5  // in [s]

    static PlayrWinnerID = 100   
    static MobWinnerID = 1   
    static WhoFiteID:number = 100 ;
    // static WhoseMoveID: number = 1;
    // static WhoseFiteID: number = 1;

    static My_ID: number = 2;
    static MylastCard: Card;
    static MoBlastCard: Card;


    static Card = {
        skin: 'skin_2'
    }



    static  SettingParticles = {
        type: 'Particles',
        t: 'close', particles:'emiter', x: 0, y: 0, ax: 0, ay: 0, scale: 0.46, duration: DataSetting.DefaultDuration
    }

    

    static BackGround = {
        type: 'SpriteImage',
        t: 'table_4', x: 0.5, y: 0.5, ax: 0.5, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration
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
    static  SettingParticles2 = {
        type: 'Particles',
        t: 'fire2', particles:'emiter', x: 0.485, y: 0.87,
        portret: {scale: 1,  x: 0.15, y: 0.5},
    }

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

    static Progress_01_Text = {
        type: 'WebFont',
        text: '01',
        filter:[
            {type:'DISPLACEMENTFILTER',DisplacementFilterTexture:'splash_screen_1',scale:1,ax:0.5,ay:0.5}
            ],   
        viweport:{angle:true},    
        t: 'fire2', ts: 2,  x: 0.470, y: 0.85, ax: 0.5, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1,  x: 0.175, y: 0.470},
        style: {
            fontSize: 25,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'PoorStory-Regular',
            wordWrapWidth:10,
            wordWrap: true
        }
    }
    static Progress_00_Text = {
        type: 'WebFont',
         text: '01',
        filter:[
            {type:'DISPLACEMENTFILTER',DisplacementFilterTexture:'splash_screen_1',scale:1,ax:0.5,ay:0.5}
            ],   
        viweport:{angle:true},    
        ts: 2,  x: 0.470, y: 0.85, ax: 0.5, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1,  x: 0.15, y: 0.470},
        style: {
            fontSize: 25,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'PoorStory-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
            wordWrapWidth:10,
            wordWrap: true
        }
    }

    static SplashScreenContainer = {
        type: 'ElementContainer',      
        /** not work in Conteiner  ax: 0, ay: 1, */
        x: 0.0, y: 0.0, ax: 0, ay: 1, scale: 1, z: 10000,
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[
            DataSetting.SplashScreenBackGround,
            DataSetting.SplashScreen,                      
            DataSetting.SettingParticles,
            DataSetting.Progress_00_Text,
            DataSetting.Progress_01_Text,
            DataSetting.SettingParticles2,
        ]
    }

    /*********************************************************************************************** */
    /******** Conteiner for Card **************************************************8**************** */
    /*********************************************************************************************** */
    
    static CardS = {
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
        x: 0.1, y: 0.5, scale: 1, z: 10,
        portret: {scale:1, x: 0.1, y: 0.5},
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

    static TableContaine = {
        type: 'ElementContainer',
        name: 'TableContaine',
        x: 0.5, y: 0.5, scale: 1, z: 11,
        portret: {scale:1, x: 0.5, y: 0.5},
        childs:[]
    }

    static TopContaine = {
        type: 'ElementContainer',
        name: 'TopContaine',
        x: 0.0, y: 0.0, scale: 1, z: 100,
        portret: {scale:1, x: 0.0, y: 0.0},
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
            DataSetting.EdgeElementContaine,
            DataSetting.TableContaine,
            DataSetting.TopContaine,            
            // DataSetting.SettingParticles,
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
        t: 'round_close', x: 0.95, y: 0.05, ax: 1, ay: 0, scale: 0.3, duration: DataSetting.DefaultDuration 
    }



    static HelpBackGroundContainer = {
        type: 'ElementContainer',
        x: 0.0, y: 0.0, scale: 1, z: 0,
        // viweport:{scw:0.8, portret:{ scw:1}}, 
        childs:[
            // DataSetting.HelpBackGround,
            DataSetting.HelpClose
        ]
    }

    static HelpPaper = {
        debug:true,
        type: 'SpriteImage',
        t: 'papir', x: 0, y: 0, ax: 0, ay: 0, scale: 0.46, duration: DataSetting.DefaultDuration, 
        // tb: 'papir_2',
        // viweport:{scw:0.9, portret:{ scw:1}},  
        // portret: {
        //     x: 0.0,
        //     y: 0.0,
        //     scale: 0.8
        // }

    }
    
    

    static TextHelp = {
        // debug:true,
        type: 'WebFont',
        text: 'The objective of the game is to shed all one\'s \n cards when there are no more cards left \n in the deck. At the end of the game, \n the last player with cards in their \n hand the player loses his ship.',
        filter:[
            {blurY:0,blurX:0,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:200},    
        t: 'fire2', ts: 2, x: 0.3, y: 0.35, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.1, y: 0.18},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'PoorStory-Regular',
            // wordWrap: true,
            // wordWrapWidth: 440,
        }
    }
    static TextHelp_00 = {
        type: 'WebFont',
        text: 'The objective of the game is to shed all one\'s \n cards when there are no more cards left \n in the deck. At the end of the game, \n the last player with cards in their \n hand the player loses his ship.',
        filter:[          
            ],   
        viweport:{sf:200},    
        // viweport:{'debug':true},    
        ts: 2, x: 0.3, y: 0.35, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.1, y: 0.18},
        style: {
            fontSize: 40,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'PoorStory-Regular',
            stroke: '#000000',
            strokeThickness: 1,           
            // wordWrap: true,
            // wordWrapWidth: 440,
             dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 1,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 5,
        }
    }

    static HelpElementConteiner = {
        type: 'ElementContainer',
        x: 0.2, y: 0.1, scale: 0.7, z: 0,
        portret: { x: 0.0, y: 0.4},
        viweport:{scw:0.7, portret:{ scw:1}}, 
        childs:[
            DataSetting.HelpPaper, 
            DataSetting.TextHelp_00,
            DataSetting.TextHelp,
        ]
    }
    /*********************************************************************************************** */
    /******** About         *********************************************************8**************** */
    /*********************************************************************************************** */


    // static AboutPaper = {
    //     type: 'SpriteImage',
    //     t: 'papir', x: 0, y: 0, ax: 0, ay: 0, scale: 0.46, duration: DataSetting.DefaultDuration, 
    // }
    

    static TextAbout = {
        // debug:true,
        type: 'WebFont',
        text: 'something about ..............',
        filter:[
            {blurY:0,blurX:0,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:200},    
        t: 'fire2', ts: 2, x: 0.35, y: 0.35, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.1, y: 0.18},
        style: {
            fontSize: 29,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'PoorStory-Regular',
            // wordWrap: true,
            // wordWrapWidth: 440,
        }
    }
    static TextAbout_00 = {
        type: 'WebFont',
        text: 'something about ..............',
        filter:[          
            ],   
        viweport:{sf:200},    
        // viweport:{'debug':true},    
        ts: 2, x: 0.35, y: 0.35, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.1, y: 0.18},
        style: {
            fontSize: 29,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'PoorStory-Regular',
            stroke: '#000000',
            strokeThickness: 0.5,           
            // wordWrap: true,
            // wordWrapWidth: 440,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 1,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
        }
    }

    static AboutElementConteiner = {
        type: 'ElementContainer',
        x: 0.2, y: 0.1, scale: 0.7, z: 0,
        portret: { x: 0.0, y: 0.4},
        viweport:{scw:0.7, portret:{ scw:1}}, 
        childs:[
            DataSetting.HelpPaper, 
            DataSetting.TextAbout_00,
            DataSetting.TextAbout,
        ]
    }

    /*********************************************************************************************** */
    /******** Setting         *********************************************************8**************** */
    /*********************************************************************************************** */
    // static SettingPaper = {
    //     type: 'SpriteImage',
    //     t: 'papir', x: 0, y: 0, ax: 0, ay: 0, scale: 0.46, duration: DataSetting.DefaultDuration, 
    // }
   
   
    static SettingBtn_1 = {      
        type: 'SpriteImage',
        // viweport:{sf:300},
        t: 'BtnSS', tb: 'BtnSS', x: 0.0, y: 0, ax: 0.0, ay:0, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.0, y: 0}       
    }
    static SettingBtn_1_Long = {      
        type: 'SpriteImage',
        // viweport:{sf:300},
        t: 'BtnSSLong', tb: 'BtnSSLong', x: 0.0, y: 0, ax: 0.0, ay:0, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.0, y: 0}       
    }
    static SettingBtn_Sound_01_Text = {
        type: 'WebFont',
        text: 'Sound On',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        t: 'fire2', ts: 2, x: 0.15, y: 0.07, ax: 0.0, ay: 0.0, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.15, y: 0.07},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }
    static SettingBtn_Sound_00_Text = {
        type: 'WebFont',
         text: 'Sound On',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        ts: 2, x: 0.15, y: 0.07, ax: 0.0, ay: 0.0, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.15, y: 0.07},
        style: {
            fontSize: 40,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
        }
    }

    static SettingBtn_change_sound_01_Text = {
        type: 'WebFont',
        text: ' Switch',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        t: 'fire2', ts: 2, x: 0.15, y: 0.07, ax: 0.0, ay: 0.0, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.15, y: 0.07},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }
    static SettingBtn_change_sound_00_Text = {
        type: 'WebFont',
         text: ' Switch',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        ts: 2, x: 0.15, y: 0.07, ax: 0.0, ay: 0.0, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.15, y: 0.07},
        style: {
            fontSize: 40,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
        }
    }

   
    static SettingBtn_Mute_01_Text = {
        type: 'WebFont',
        text: 'Sound Off',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        t: 'fire2', ts: 2,  x: 0.15, y: 0.07, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.15, y: 0.07},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }
    static SettingBtn_Mute_00_Text = {
        type: 'WebFont',
         text: 'Sound Off',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        ts: 2,  x: 0.15, y: 0.07, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1,  x: 0.15, y: 0.07},
        style: {
            fontSize: 40,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
        }
    }

    static SettingAnimationOn_01_Text = {
        type: 'WebFont',
        text: 'Animation On',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        t: 'fire2', ts: 2,  x: 0.25, y: 0.07, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.25, y: 0.07},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }
    static SettingAnimationOn_00_Text = {
        type: 'WebFont',
         text: 'Animation On',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        ts: 2,  x: 0.25, y: 0.07, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1,  x: 0.25, y: 0.07},
        style: {
            fontSize: 40,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
        }
    }

    static SettingAnimation_01_Text = {
        type: 'WebFont',
        text: 'Animation Off',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        t: 'fire2', ts: 2,  x: 0.25, y: 0.07, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1, x: 0.25, y: 0.07},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }
    static SettingAnimation_00_Text = {
        type: 'WebFont',
         text: 'Animation Off',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        ts: 2,  x: 0.25, y: 0.07, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // portret: {scale: 1,  x: 0.25, y: 0.07},
        style: {
            fontSize: 40,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
        }
    }

    static Setting_0_Containe = {
        type: 'ElementContainer',
        x: 0.25, y: 0.7, scale: 1, z: 1,
        viweport:{sf:100},   
        // portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.SettingBtn_1,DataSetting.SettingBtn_Sound_00_Text,DataSetting.SettingBtn_Sound_01_Text]
    }  
    static Setting_1_Containe = {
        type: 'ElementContainer',
        x: 2.5, y: 0.7, scale: 1, z: 1,
        viweport:{sf:100},   
        // portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.SettingBtn_1,DataSetting.SettingBtn_change_sound_00_Text,DataSetting.SettingBtn_change_sound_01_Text]
    }
    static Setting_2_Containe = {
        type: 'ElementContainer',
        x: 4.85, y: 0.7, scale: 1, z: 1,
        viweport:{sf:100},   
        // portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.SettingBtn_1,DataSetting.SettingBtn_Mute_00_Text,DataSetting.SettingBtn_Mute_01_Text]
    }
    static Setting_3_Containe = {
        type: 'ElementContainer',
        x: 0.25, y: 1.5, scale: 1, z: 1,
        viweport:{sf:100},   
        // portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.SettingBtn_1_Long,DataSetting.SettingAnimationOn_00_Text,DataSetting.SettingAnimationOn_01_Text]
    }
    static Setting_4_Containe = {
        type: 'ElementContainer',
        x: 3.75, y: 1.5, scale: 1, z: 1,
        viweport:{sf:100},   
        // portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.SettingBtn_1_Long,DataSetting.SettingAnimation_00_Text,DataSetting.SettingAnimation_01_Text]
    }
    static Setting_5_Containe = {
        type: 'ElementContainer',
        x: 0.25, y: 2.25, scale: 1, z: 1,
        viweport:{sf:100},   
        // portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.SettingBtn_1_Long,DataSetting.SettingAnimation_00_Text,DataSetting.SettingAnimation_01_Text]
    }
    static SettingBtn_2 = {
        type: 'SpriteImage',
        t: 'BtnSS',
        tb: 'BtnSS',
        x: 0.5,
        y: 0,
        ax: 0.5,
        ay: 0,
        scale: 1,
        duration: DataSetting.DefaultDuration,
        }
        
        static SettingBtn_3 = {
        type: 'SpriteImage',
        t: 'BtnSS',
        tb: 'BtnSS',
        x: 0.5,
        y: 0.1,
        ax: 0.5,
        ay: 0,
        scale: 1,
        duration: DataSetting.DefaultDuration,
        }
    static SettingElementContaine = {   
        type: 'ElementContainer',
        x: 0.2, y: 0.1, scale: 0.7, z: 0,
        portret: { x: 0.02, y: 0.4},
        viweport:{scw:0.7, portret:{ scw:1}}, 
        childs:[
            DataSetting.HelpPaper,
            DataSetting.Setting_0_Containe,
            DataSetting.Setting_1_Containe,
            DataSetting.Setting_2_Containe,
            DataSetting.Setting_3_Containe,
            DataSetting.Setting_4_Containe,
            DataSetting.SettingParticles,

        ]
    }
    


    /*********************************************************************************************** */
    /******** ElementContainer Menu *********************************************************8**************** */
    /*********************************************************************************************** */
    static MenuBackGround = {        
        // debug:true,
        type: 'GraphicImage',
        interType: 'RECTANGLE',
        color: '0x000000',
        x: -1,
        y: -1,
        w: 4000,
        h: 4000,
        z: 1001,
        scale:1,
        alpha: 0.5
        
    }

    static Flag = {
        filter:[
        {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
        ],
        type: 'SimpleRopeImage',
        xStap:20,        
        // sizeInPXfrom: 300, ///
        t: 'flag_3', tb: 'flag_3', x: -0.1, y: 1, ax: 0, ay: 0.0, scale: 1, duration: DataSetting.DefaultDuration,
        viweport:{sf:300}
    }

    static Btn_0 = {      
        type: 'SpriteImage',
        // sizeInPXfrom: 200,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 1, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.0, y: 1},
        viweport:{sf:200}
    }

    static Btn_1 = {      
        type: 'SpriteImage',
        // sizeInPXfrom: 300,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 1, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.0, y: 1},
        viweport:{sf:300}
    }

    static Btn_2 = {     
        type: 'SpriteImage',
        // sizeInPXfrom: 400,
        t: 'BtnS', tb: 'BtnS', x: 0.0, y: 1, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.0, y: 1},
        viweport:{sf:400}
    }

    static Btn_0_Text = {
        // debug:true,
        type: 'WebFont',
        text: 'Setting',
        filter:[
            {blurY:0,blurX:0,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:200},    
        t: 'fire2', ts: 2, x: 0.32, y: 0.9, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        // t: 'shift_3', ts: 2, x: 0.32, y: 0.9, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.32, y: 0.9},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }

    static Btn_00_Text = {
        type: 'WebFont',
        text: 'Setting',
        filter:[          
            ],   
        viweport:{sf:200},    
        ts: 2, x: 0.30, y: 0.8655172, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.30, y: 0.8655172},
        style: {
            fontSize: 42,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
        }
    }

    
    static Btn_1_Text = {
        type: 'WebFont',
        text: 'Help',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:300},    
        t: 'fire2', ts: 2, x: 0.30, y: 0.93, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.30, y: 0.93},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }
    static Btn_01_Text = {
        type: 'WebFont',
        text: 'Help',
        filter:[],   
        viweport:{sf:300},    
        ts: 2, x: 0.30, y: 0.93, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.30, y: 0.93},
        style: {
            fontSize: 42,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1
        }
    }
    
    static Btn_2_Text = {
        type: 'WebFont',
        text: 'About us',
        filter:[
            // {blurY:1,blurX:1,type:'BLURFILTER',quality:8}
            ],   
        viweport:{sf:400},    
        t: 'fire2', ts: 2, x: 0.15, y: 0.95, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.15, y: 0.95},
        style: {
            fontSize: 40,
            fill: 'white',
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular'
        }
    }
    static Btn_02_Text = {
        type: 'WebFont',
        text: 'About us',
        filter:[],   
        viweport:{sf:400},    
        ts: 2, x: 0.15, y: 0.95, ax: 0.0, ay: 0.5, scale: 1, duration: DataSetting.DefaultDuration,
        portret: {scale: 1, x: 0.15, y: 0.95},
        style: {
            fontSize: 42,
            fill: ['#000000'],
            align: 'center',
            color: '0x00000',
            fontFamily: 'Freehand-Regular',
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1
        }
    }

   
    static Btn_0_Containe = {
        type: 'ElementContainer',
        x: 0.0, y: 0.0, scale: 1, z: 1,
        viweport:{sf:0},   
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.Btn_0,DataSetting.Btn_00_Text,DataSetting.Btn_0_Text]
    }
    static Btn_1_Containe = {
        type: 'ElementContainer',
        x: 0.0, y: 0.0, scale: 1, z: 2,
        viweport:{sf:0},   
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.Btn_1,DataSetting.Btn_01_Text,DataSetting.Btn_1_Text]
    }
    static Btn_2_Containe = {
        type: 'ElementContainer',
        x: 0.0, y: 0.0, scale: 1, z: 3,
        viweport:{sf:0},   
        portret: {scale: 1, x: 0.0, y: 0.0},
        childs:[DataSetting.Btn_2,DataSetting.Btn_02_Text,DataSetting.Btn_2_Text]
    }
    static MenuElementContaine = {   
        type: 'ElementContainer',
        x: 0.0, y: 0.2, scale: 0.5, z: 1000,
        portret: {scale: 0.7, x: 0.0, y: 0.2},
        childs:[
            DataSetting.MenuBackGround,
            DataSetting.Flag,
            DataSetting.Btn_0_Containe,
            DataSetting.Btn_1_Containe,
            DataSetting.Btn_2_Containe,
            DataSetting.SettingParticles,

        ]
    }

    

  
}   