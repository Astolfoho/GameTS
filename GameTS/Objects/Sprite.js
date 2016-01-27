var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite(url, x, y, width, height, repeat) {
                var _this = this;
                _super.call(this);
                this.image = document.createElement("img");
                this.image.src = url;
                this.x = x;
                this.y = y;
                this.image.onload = function () { return _this.onImageLoad(); };
                this.w = width;
                this.h = height;
                this.repeat = repeat;
            }
            Sprite.prototype.onImageLoad = function () {
                this.w = this.w || this.image.width;
                this.h = this.h || this.image.height;
                this.collision.init();
                this.onLoadComplete();
            };
            Sprite.prototype.init = function () {
                _super.prototype.init.call(this);
            };
            Sprite.prototype.render = function (context) {
                this.onUpdate();
                if (!this.repeat) {
                    context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.w, this.h);
                }
                else {
                    var ptrn = this.pattern || context.createPattern(this.image, this.repeat);
                    context.fillStyle = ptrn;
                    context.translate(this.x, this.y);
                    context.fillRect(-this.x, -this.y, this.w, this.h);
                    context.translate(-this.x, -this.y);
                }
            };
            return Sprite;
        })(Objects.BaseObject);
        Objects.Sprite = Sprite;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=sprite.js.map