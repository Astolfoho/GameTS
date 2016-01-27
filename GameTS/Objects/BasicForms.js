var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var Square = (function (_super) {
            __extends(Square, _super);
            function Square(width, height, x, y) {
                if (x === void 0) { x = 10; }
                if (y === void 0) { y = 10; }
                _super.call(this);
                this.useGravity = true;
                this.w = width;
                this.h = height;
                this.x = x;
                this.y = y;
                this.color = "black";
            }
            Square.prototype.init = function () {
            };
            Square.prototype.render = function (context) {
                if (this.useGravity) {
                    this.updatePositionWithGravity();
                }
                else {
                    this.updatePosition();
                }
                context.strokeStyle = this.color;
                context.strokeRect(this.x, this.y, this.w, this.h);
            };
            Square.prototype.onUpdate = function () {
            };
            return Square;
        })(Objects.BaseObject);
        Objects.Square = Square;
        var Square2 = (function (_super) {
            __extends(Square2, _super);
            function Square2(width, height, x, y) {
                if (x === void 0) { x = 10; }
                if (y === void 0) { y = 10; }
                _super.call(this);
                this.useGravity = true;
                this.w = width;
                this.h = height;
                this.x = x;
                this.y = y;
                this.color = "black";
            }
            Square2.prototype.init = function () {
            };
            Square2.prototype.render = function (context) {
                if (this.useGravity) {
                    this.updatePositionWithGravity();
                }
                else {
                    this.updatePosition();
                }
                //var R = 20;
                //var x = R * Math.cos(angle - angle0);
                //var y = R * Math.sin(angle - angle0);
                //var angle = deg * Math.PI / 180;
                //var angle0 = Math.atan(y0 / x0);
                context.strokeStyle = this.color;
                //context.rotate(20 * Math.PI / 180);
                context.strokeRect(this.x, this.y, this.w, this.h);
                //context.setTransform(1, 0, 0, 1, 0, 0);
                //context.save();
                // move to the center of the canvas
                //context.translate(this.game.width / 2, this.game.height / 2);
                // rotate the canvas to the specified degrees
                //context.rotate(20 * Math.PI / 180);
                // draw the image
                // since the context is rotated, the image will be rotated also
                //context.strokeRect(this.x, this.y, this.width, this.height);
                // we’re done with the rotating so restore the unrotated context
                //context.restore();
            };
            Square2.prototype.onUpdate = function () {
            };
            return Square2;
        })(Objects.BaseObject);
        Objects.Square2 = Square2;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=BasicForms.js.map