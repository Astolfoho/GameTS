import { Label } from './Label';
export class FPSLabel extends Label {
    constructor() {
        super("");
        this.x = 20;
        this.y = 20;
        this.w = 100;
        this.lastDraw = new Date();
        this.fps = 0;
        this.fontSize = 10;
    }
    onUpdate() {
        var now = new Date();
        if ((now.getTime() - this.lastDraw.getTime()) >= 1000) {
            this.computedFps = this.fps;
            this.lastDraw = now;
            this.fps = 0;
            this.text = this.computedFps + " FPS";
        }
        this.color = "black";
        this.fps++;
    }
}
//# sourceMappingURL=FPSLabel.js.map