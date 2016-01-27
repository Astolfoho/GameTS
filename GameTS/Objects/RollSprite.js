var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var RollSprite = (function (_super) {
            __extends(RollSprite, _super);
            function RollSprite(url, x, y, width, height, useCollision, repeat) {
                var _this = this;
                if (useCollision === void 0) { useCollision = false; }
                if (repeat === void 0) { repeat = "repeat"; }
                _super.call(this, useCollision);
                this.image = document.createElement("img");
                this.image.src = url;
                this.x = x;
                this.y = y;
                this.image.onload = function () { return _this.onImageLoad(); };
                this.w = width;
                this.h = height;
                this.repeat = repeat;
            }
            RollSprite.prototype.onImageLoad = function () {
                var tcanvas = document.createElement("canvas");
                var tctx = tcanvas.getContext("2d");
                if (this.h && !this.w) {
                    var percent = this.h / this.image.height;
                    tcanvas.height = this.image.height * percent;
                    tcanvas.width = this.image.width * percent;
                    this.w = this.image.width > this.game.w ? this.game.w : this.image.width;
                }
                else if (this.w && !this.h) {
                    var percent = this.w / this.image.width;
                    tcanvas.height = this.image.height * percent;
                    tcanvas.width = this.image.width * percent;
                    this.w = this.image.height > this.game.h ? this.game.h : this.image.height;
                }
                else {
                    return;
                }
                tctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, tcanvas.width, tcanvas.height);
                this.auxCanvas = tcanvas;
            };
            RollSprite.prototype.init = function () {
                _super.prototype.init.call(this);
                this.rollPosition = { x: this.x, y: this.y };
            };
            RollSprite.prototype.render = function (context) {
                this.onUpdate();
                this.imgPattern = this.imgPattern || context.createPattern(this.auxCanvas || this.image, this.repeat);
                context.fillStyle = this.imgPattern;
                // context.save();
                switch (this.repeat) {
                    case "repeat-x":
                        context.translate(this.rollPosition.x, this.rollPosition.y);
                        context.fillRect(-this.rollPosition.x, 0, this.w, this.h);
                        context.translate(-this.rollPosition.x, -this.rollPosition.y);
                        break;
                    case "repeat-y":
                        context.translate(this.rollPosition.x, this.rollPosition.y);
                        context.fillRect(0, -this.rollPosition.y, this.w, this.h);
                        context.translate(-this.rollPosition.x, -this.rollPosition.y);
                        break;
                    default:
                    case "repeat":
                        context.translate(this.rollPosition.x, this.rollPosition.y);
                        context.fillRect(-this.rollPosition.x, -this.y, this.w, this.h);
                        context.translate(-this.rollPosition.x, -this.rollPosition.y);
                        break;
                }
                // context.restore();
            };
            RollSprite.prototype.updatePosition = function () {
                _super.prototype.updatePosition.call(this, this.rollPosition);
            };
            return RollSprite;
        })(Objects.BaseObject);
        Objects.RollSprite = RollSprite;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=RollSprite.js.map