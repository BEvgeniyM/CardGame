import { Container } from 'pixi.js'
import { Event } from '../app/Event';
import { BaseViwe } from '../app/BaseViwe';
import * as PIXI from 'pixi.js'





export class DataSetting {

    static GameWidth:number = 1920
    static GameHeight:number = 1080

    static DefaultDeley:number = 0.5;    // in [s]
    static DefaultDuration:number = 0.5  // in [s]

    
    static WhoseMoveID: number = 1;
    static WhoseLoseID: number = 2;






    static Cart  = {
        skin:'skin_2'
    }

    static Progress = {
        x:0.37,
        y:0.9,
        scale:0.38,
        portret:{
            x:0.1,
            y:0.35,
        }
    }

    static Menu = {t:'menu',x:0.07,y:0.88,ax:0.5,ay:0.5,scale:0.2,duration:DataSetting.DefaultDuration}
    static WinPanel = {t:'winPanel',x:0,y:0,ax:0,ay:0,scale:0.1,duration:DataSetting.DefaultDuration}

    static HeroMy = {t:'hero_1',tb:'shift_1',x:0.90,y:0.90,ax:0.5,ay:0.5,scale:0.2,duration:DataSetting.DefaultDuration}       
    static HeroMob = {t:'hero_2',tb:'shift_2',x:0.90,y:0.08,ax:0.5,ay:0.5,scale:0.18,duration:DataSetting.DefaultDuration}  
    
    static HelpClose = {t:'round_close',x:0.9,y:0.1,ax:0.5,ay:0.5,scale:0.08,duration:DataSetting.DefaultDuration} 
    static HelpPaper = {t:'papir',x:0.1,y:0.1,ax:0,ay:0,scale:0.4,duration:DataSetting.DefaultDuration, portret:{
        t:'papir_2',
        x:0.5,
        y:0.35,
        scale:0.7
    }} 
    static Helpseal = {t:'seal',x:0.7,y:0.6,ax:0,ay:0,scale:0.1,duration:DataSetting.DefaultDuration, portret:{
        x:0.6,
        y:0.5,
        scale:0.1
    }} 
    static HeroMobPosition = [1,1]      // in Px




    
}   