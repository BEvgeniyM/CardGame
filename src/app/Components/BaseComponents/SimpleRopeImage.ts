import { SimpleRope, Point, IPoint} from 'pixi.js';
import { ElementConfig } from '../Element';
import { SpriteImage } from './SpriteImage';

export class SimpleRopeImage extends SimpleRope {
  public textureID: string;
  public points: IPoint[];
  public xStap: number;

  constructor(public config: ElementConfig) {
    const point = config?.point ?? SimpleRopeImage.setPoint(config);  
    const texture = SpriteImage.GetTexture(config.t);
    super(texture, point);
    this.name = this.constructor.name;
    this.points = config.point  = point;
    if (config) {
      this.x = config.x ?? this.x;
      this.y = config.y ?? this.y;
      this.xStap = config.xStap ?? 1;
      this.zIndex = config.z ?? this.zIndex;
      console.log(texture.width,config.ax);      

      //* not worck for SimpleRope  ax: 0, ay: 0.0, */
      // config.ax && config.ay && this.pivot.set(-config.ax * texture.width, -config.ay  * texture.height);
      //** .pivot.set  not worck for SimpleRope from constructor  */
      
      this.alpha = config.alpha ?? this.alpha;      
      this.textureID = config?.t ?? 'undefound';
    }
  }

  setScale(){
    debugger
    // this.scale.set(1)
    // this.scale.set(0.7,0.4)
  }

  static setPoint(cnf:ElementConfig):IPoint[] {
    if(!cnf.xStap){
      console.error("Point array not found in config for Meth");
      debugger
      return []
    }
     const scale = cnf?.scale ?? 1;
     const points: IPoint[] = [];
     const width = SpriteImage.GetTexture(cnf.t).width * scale;
     const xStap = width / cnf.xStap;

    for (let i = 0; i < cnf.xStap; i++) {
      points.push(new Point(i * xStap, 0));
    }
    return  points
  }


}

