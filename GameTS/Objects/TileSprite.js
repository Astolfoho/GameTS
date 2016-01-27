var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var TileSprite = (function (_super) {
            __extends(TileSprite, _super);
            function TileSprite(url, x, y, width, duraion, height) {
                var _this = this;
                _super.call(this);
                this.image = document.createElement("img");
                this.image.src = url;
                this.x = x;
                this.y = y;
                this.image.onload = function () { return _this.onImageLoad(); };
                this.w = width;
                this.h = height;
                this.duration = duraion;
                document.createElement('canvas').getContext("2d").drawImage(this.image, 0, 0);
            }
            TileSprite.prototype.onImageLoad = function () {
                this.w = this.w || this.image.width;
                this.h = this.h || this.image.height;
                this.numberOfSprites = Math.floor(this.image.width / this.w);
                this.nextSprite = 0;
                if (this.currentAnimation) {
                    this.resetAnimation();
                }
                //this.collision = new Physics.BasicCollisionHandler(this);
                //this.collision.add(<any>this['objsToCollide'][0]);
                this.drawnFrames = 0;
                this.collision.init();
                this.onLoadComplete();
            };
            TileSprite.prototype.init = function () {
            };
            TileSprite.prototype.addAnimation = function (name, sprites) {
                if (!this.animations) {
                    this.animations = {};
                }
                ;
                this.animations[name] = sprites;
            };
            TileSprite.prototype.setAnimation = function (name) {
                if (this.currentAnimation != name) {
                    this.currentAnimation = name;
                    this.resetAnimation();
                }
            };
            TileSprite.prototype.resetAnimation = function () {
                this.numberOfSprites = this.animations[this.currentAnimation].length;
                this.drawnFrames = 0;
                this.nextSprite = 0;
            };
            TileSprite.prototype.render = function (context) {
                this.onUpdate();
                var spriteX = Math.floor(this.w * this.nextSprite) + this.nextSprite;
                if (this.currentAnimation) {
                    spriteX = Math.floor(this.w * this.animations[this.currentAnimation][this.nextSprite]) + this.animations[this.currentAnimation][this.nextSprite];
                }
                context.drawImage(this.image, spriteX, 0, this.w, this.image.height, this.x, this.y, this.w, this.h);
                if (this.drawnFrames >= this.duration) {
                    this.nextSprite++;
                    if (this.nextSprite >= this.numberOfSprites) {
                        this.nextSprite = 0;
                    }
                    this.drawnFrames = 0;
                }
                this.drawnFrames++;
                //context.strokeStyle = "black";
                //context.strokeRect(this.x, this.y, this.width, this.height);
            };
            return TileSprite;
        })(Objects.BaseObject);
        Objects.TileSprite = TileSprite;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=tilesprite.js.map