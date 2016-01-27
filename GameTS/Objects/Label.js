var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(text, color, iconUrl, iconSize, fontSize, useCollisionHandler) {
                if (color === void 0) { color = "black"; }
                if (fontSize === void 0) { fontSize = 15; }
                if (useCollisionHandler === void 0) { useCollisionHandler = false; }
                _super.call(this, useCollisionHandler);
                this.fontName = "arial";
                this.text = text;
                this.color = color;
                this.iconUrl = iconUrl;
                this.iconSize = iconSize;
                this.fontSize = fontSize;
            }
            Label.prototype.init = function () {
                var _this = this;
                if (this.iconUrl) {
                    this._img = document.createElement("img");
                    this._img.onload = function () { _this.img_OnLoad(); };
                    this._img.src = this.iconUrl;
                }
            };
            Label.prototype.img_OnLoad = function () {
                this._img.isReady = true;
                if (!this.iconSize) {
                    this.iconSize = { w: this._img.width, h: this._img.height };
                }
            };
            Label.prototype.render = function (context) {
                this.onUpdate();
                if (this._img && this._img.isReady) {
                    context.drawImage(this._img, 0, 0, this._img.width, this._img.height, this.x - this.iconSize.w - 5, (this.y), this.iconSize.w, this.iconSize.h);
                }
                context.font = "bold " + this.fontSize.toString() + "px " + this.fontName;
                context.fillStyle = this.color;
                context.fillText(this.text, this.x, this.y + 15, context.measureText(this.text).width);
            };
            return Label;
        })(Objects.BaseObject);
        Objects.Label = Label;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=Label.js.map