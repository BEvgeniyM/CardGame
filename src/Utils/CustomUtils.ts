
export class CustomUtils {
    static getRandomArbitrary(min: number = 100, max: number = window.outerHeight - 100): number {
        return Math.random() * (max - min) + min;
    }
}