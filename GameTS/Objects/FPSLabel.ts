

module GameTS.Objects {

    export class FPSLabel extends Label {

        private fps: number;
        private lastDraw: Date;
        private computedFps: number;

        constructor() {
            super("");
            this.x = 20;
            this.y = 20;
            this.w = 100;
            this.lastDraw = new Date();    
            this.fps = 0;
            this.fontSize = 10;        
        }

        public onUpdate() {
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
} 