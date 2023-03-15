import { sound } from '@pixi/sound';

export class SoundController{

  public static playSound(alias: string, sprite?: string): void {
    if (!sound.exists(alias)) {
      console.error(`Sound '${alias}' not found.`);
      return;
    }
    sound.play(alias, { sprite });
  }
  public static pauseSound(alias: string, sprite?: string): void {
    if (!sound.exists(alias)) {
      console.error(`Sound '${alias}' not found.`);
      return;
    }
    sound.pause(alias);
  }

}
