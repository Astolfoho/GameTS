import { BaseObject } from './BaseObjects';
export class AtlasSprite extends BaseObject {
    constructor(imageUrl, atlasJsonUrl, useCollisionHandler = false) {
        super(useCollisionHandler);
        this.imageUrl = imageUrl;
        this.atlasJsonUrl = atlasJsonUrl;
        this.animations = {};
    }
    init() {
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
    }
    setAnimation(name, duration = 0) {
        this.currentAnimationName = name;
        this.currentAnimationDuration = duration;
        if (this.animations[name] && this.currentAnimation != this.animations[name]) {
            this.currentAnimation = this.animations[name];
            this.currentAnimation.durationPerFrame = duration;
            this.currentAnimation.reset();
        }
    }
    render(context) {
        if (this.currentAnimation) {
            var fr = this.currentAnimation.getNextFrame();
            this.w = fr.sourceSize.w;
            this.h = fr.sourceSize.h;
            context.drawImage(this.image, fr.frame.x, fr.frame.y, fr.frame.w, fr.frame.h, this.x, this.y, fr.frame.w, fr.frame.h);
        }
    }
}
class AtlasAnimation {
    constructor() {
        this.frames = [];
        this.position = -1;
        this.durationCount = 0;
    }
    getNextFrame() {
        this.durationCount--;
        if (this.durationCount < 1) {
            this.position++;
            if (this.position > this.frames.length - 1) {
                this.position = 0;
            }
            this.durationCount = this.durationPerFrame;
        }
        return this.frames[this.position];
    }
    reset() {
        this.position = -1;
        this.durationCount = 0;
    }
}
//# sourceMappingURL=AtlasSprite.js.map