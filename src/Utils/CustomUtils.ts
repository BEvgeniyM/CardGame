
export class CustomUtils {
    static getRandomArbitrary(min: number = 100, max: number = window.outerHeight - 100): number {
        return Math.random() * (max - min) + min;
    }
    static getScaleCart(height:number):number{
        if(window.screen.orientation.angle ==0) return 0.5
        return (window.outerHeight / 4)* 0.5/height
    }
}