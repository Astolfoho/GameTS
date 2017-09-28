import { BaseObject } from './BaseObjects';
//declare interface HTMLImageElement {
//    isReady: boolean;
//}
export class Label extends BaseObject {
    constructor(text, color = "black", iconUrl, iconSize, fontSize = 15, useCollisionHandler = false) {
        super(useCollisionHandler);
        this.fontName = "arial";
        this.text = text;
        this.color = color;
        this.iconUrl = iconUrl;
        this.iconSize = iconSize;
        this.fontSize = fontSize;
    }
    init() {
        if (this.iconUrl) {
            this._img = document.createElement("img");
            this._img.onload = () => { this.img_OnLoad(); };
            this._img.src = this.iconUrl;
        }
    }
    img_OnLoad() {
        this._img["isReady"] = true;
        if (!this.iconSize) {
            this.iconSize = { w: this._img.width, h: this._img.height };
        }
    }
    render(context) {
        this.onUpdate();
        if (this._img && this._img["isReady"]) {
            context.drawImage(this._img, 0, 0, this._img.width, this._img.height, this.x - this.iconSize.w - 5, (this.y), this.iconSize.w, this.iconSize.h);
        }
        context.font = "bold " + this.fontSize.toString() + "px " + this.fontName;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y + 15, context.measureText(this.text).width);
    }
}
//# sourceMappingURL=Label.js.map