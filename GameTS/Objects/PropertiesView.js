import { BaseObject } from './BaseObjects';
export class PropertiesView extends BaseObject {
    constructor(obj, x, y) {
        super(false);
        this._lineH = 12;
        this._obj = obj;
        this.x = x;
        this.y = y;
    }
    render(context) {
        var i = 1;
        var keys = Object.getOwnPropertyNames(this._obj);
        context.strokeStyle = "white";
        context.strokeRect(this.x - 7, this.y, 250, keys.length * this._lineH + 7);
        context.fillStyle = "rgba(255,255,255,.4)";
        context.fillRect(this.x - 7, this.y, 250, keys.length * this._lineH + 7);
        for (var i = 0; i < keys.length; i++) {
            var iplus = i + 1;
            var lineY = iplus * this._lineH + this.y;
            context.fillStyle = "black";
            context.fillText(`${keys[i]}:${this._obj[keys[i]]}`, this.x, lineY);
        }
    }
    onUpdate() {
    }
}
//# sourceMappingURL=PropertiesView.js.map