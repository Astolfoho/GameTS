import { BaseObject, ISize } from './BaseObjects'
import { IDrawingContext } from '../Graphics/IDrawingContext'

//declare interface HTMLImageElement {
//    isReady: boolean;
//}


export abstract class Label extends BaseObject {

    public text: string;
    public color: string;
    public iconUrl: string;
    public iconSize: ISize;
    public fontSize: number;
    public fontName: string = "arial";


    private _img: HTMLImageElement;

    constructor(text: string, color: string = "black", iconUrl?: string, iconSize?: ISize, fontSize = 15, useCollisionHandler: boolean = false) {
        super(useCollisionHandler);

        this.text = text;
        this.color = color;
        this.iconUrl = iconUrl;
        this.iconSize = iconSize;
        this.fontSize = fontSize;
    }

    public init() {
        if (this.iconUrl) {
            this._img = document.createElement("img");
            this._img.onload = () => { this.img_OnLoad() };
            this._img.src = this.iconUrl;
        }
    }

    private img_OnLoad() {
        this._img["isReady"] = true;
        if (!this.iconSize) {
            this.iconSize = <ISize>{ w: this._img.width, h: this._img.height };
        }
    }

    public render(context: IDrawingContext): void {
        this.onUpdate();

        if (this._img && this._img["isReady"]) {
            context.drawImage(this._img, 0, 0, this._img.width, this._img.height, this.x - this.iconSize.w - 5, (this.y), this.iconSize.w, this.iconSize.h);
        }


        context.font = "bold " + this.fontSize.toString() + "px " + this.fontName;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y + 15, context.measureText(this.text).width);



    }
} 