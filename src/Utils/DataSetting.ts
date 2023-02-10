import { Container } from 'pixi.js'
import { Event } from '../app/Event';
import { BaseViwe } from '../app/BaseViwe';
import * as PIXI from 'pixi.js'





export class DataSetting {

    static DefaultDeley:number = 0.5;    // in [s]
    static DefaultDuration:number = 0.5  // in [s]


    static MemuBtnHeight = 0.2        // [%] of Height screen
    static WinPanelHeight = 0.1        // [%] of Height screen

    static Menu = {t:'menu',x:0.07,y:0.88,ax:0.5,ay:0.5,scale:0.2,duration:DataSetting.DefaultDuration}
    static WinPanel = {t:'winPanel',x:0,y:0,ax:0,ay:0,scale:0.1,duration:DataSetting.DefaultDuration}

    static HeroMy = {t:'hero_1',tb:'shift_1',x:0.95,y:0.95,ax:0.5,ay:0.5,scale:0.2,duration:DataSetting.DefaultDuration}       
    static HeroMob = {t:'hero_2',tb:'shift_2',x:0.95,y:0.08,ax:0.5,ay:0.5,scale:0.18,duration:DataSetting.DefaultDuration}  
    
    static HelpClose = {t:'round_close',x:0.9,y:0.1,ax:0.5,ay:0.5,scale:0.08,duration:DataSetting.DefaultDuration} 
    static HeroMobPosition = [1,1]      // in Px




    
}   