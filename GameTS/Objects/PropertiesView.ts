import { BaseObject, ISize } from './BaseObjects'
import { IDrawingContext } from '../Graphics/IDrawingContext'



export class PropertiesView extends BaseObject {

    private _obj: any;
    private _lineH: number = 12
    //private _properties: { [key: string]: string; };

    public x: number;
    public y: number;
     

    constructor(obj: any, x: number, y: number) {
        super(false);
        this._obj = obj;
        this.x = x;
        this.y = y
    }

    public render(context: IDrawingContext): void {
        var i = 1;
        var keys = Object.getOwnPropertyNames(this._obj);

        context.strokeStyle = "white";
        context.strokeRect(this.x-7, this.y, 250, keys.length * this._lineH +7);
        context.fillStyle = "rgba(255,255,255,.4)";
        context.fillRect(this.x-7, this.y, 250, keys.length * this._lineH + 7);

        for (var i = 0; i < keys.length; i++) {
            var iplus = i + 1;
            var lineY = iplus * this._lineH + this.y;

            context.fillStyle = "black";
            context.fillText(`${keys[i]}:${this._obj[keys[i]]}`, this.x, lineY)
        }
    }

    public onUpdate() {
    }
} 