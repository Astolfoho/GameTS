var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../_references.ts" />
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var AtlasSprite = (function (_super) {
            __extends(AtlasSprite, _super);
            function AtlasSprite(imageUrl, atlasJsonUrl) {
                _super.call(this);
                this.imageUrl = imageUrl;
                this.atlasJsonUrl = atlasJsonUrl;
                this.animations = {};
            }
            AtlasSprite.prototype.init = function () {
                this.image = document.createElement("img");
                this.image.src = this.imageUrl;
                var animRegex = /^([0-9a-z-]*)\/(.*)$/i;
                var json = this.game.getJsonSync(this.atlasJsonUrl);
                this.atlasObj = JSON.parse(json);
                for (var key in this.atlasObj.frames) {
                    var it = this.atlasObj.frames[key];
                    if (animRegex.test(it.filename)) {
                        var mat = animRegex.exec(it.filename);
                        var name = mat[1];
                        var index = parseInt(mat[2]) - 1;
                        if (isNaN(index)) {
                            continue;
                        }
                        if (this.animations[name]) {
                            this.animations[name]["frames"][index] = this.atlasObj.frames[key];
                        }
                        else {
                            this.animations[name] = new AtlasAnimation();
                            this.animations[name]["frames"][index] = this.atlasObj.frames[key];
                        }
                    }
                }
                if (this.currentAnimationName) {
                    this.setAnimation(this.currentAnimationName, this.currentAnimationDuration);
                }
            };
            AtlasSprite.prototype.setAnimation = function (name, duration) {
                if (duration === void 0) { duration = 0; }
                this.currentAnimationName = name;
                this.currentAnimationDuration = duration;
                if (this.animations[name] && this.currentAnimation != this.animations[name]) {
                    this.currentAnimation = this.animations[name];
                    this.currentAnimation.durationPerFrame = duration;
                    this.currentAnimation.reset();
                }
            };
            AtlasSprite.prototype.render = function (context) {
                this.onUpdate();
                if (this.currentAnimation) {
                    var fr = this.currentAnimation.getNextFrame();
                    this.w = fr.sourceSize.w;
                    this.h = fr.sourceSize.h;
                    context.drawImage(this.image, fr.frame.x, fr.frame.y, fr.frame.w, fr.frame.h, this.x, this.y, fr.frame.w, fr.frame.h);
                }
            };
            return AtlasSprite;
        })(Objects.BaseObject);
        Objects.AtlasSprite = AtlasSprite;
        var AtlasAnimation = (function () {
            function AtlasAnimation() {
                this.frames = [];
                this.position = -1;
                this.durationCount = 0;
            }
            AtlasAnimation.prototype.getNextFrame = function () {
                this.durationCount--;
                if (this.durationCount < 1) {
                    this.position++;
                    if (this.position > this.frames.length - 1) {
                        this.position = 0;
                    }
                    this.durationCount = this.durationPerFrame;
                }
                return this.frames[this.position];
            };
            AtlasAnimation.prototype.reset = function () {
                this.position = -1;
                this.durationCount = 0;
            };
            return AtlasAnimation;
        })();
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=AtlasSprite.js.map