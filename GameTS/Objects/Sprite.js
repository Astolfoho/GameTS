import { BaseObject } from './BaseObjects';
export class Sprite extends BaseObject {
    constructor(url, x, y, width, height, repeat) {
        super();
        this.image = document.createElement("img");
        this.image.src = url;
        this.x = x;
        this.y = y;
        this.image.onload = () => this.onImageLoad();
        this.w = width;
        this.h = height;
        this.repeat = repeat;
    }
    onImageLoad() {
        this.w = this.w || this.image.width;
        this.h = this.h || this.image.height;
        this.collision.init();
        this.onLoadComplete();
    }
    init() {
        super.init();
    }
    render(context) {
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
    }
}
//# sourceMappingURL=Sprite.js.map