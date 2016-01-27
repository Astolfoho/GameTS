module GameTS.Objects {

    export abstract class Sprite extends BaseObject {

        public game: Game;
        private image: HTMLImageElement;
        private repeat: string;
        private pattern: CanvasPattern;

        constructor(url: string, x: number, y: number, width?: number, height?: number, repeat?:string) {
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

        private onImageLoad():void {
            this.w = this.w || this.image.width;
            this.h = this.h || this.image.height;
            this.collision.init();
            this.onLoadComplete();
        }

        public init(): void {
            super.init();
        }

        public render(context: Graphics.IDrawingContext): void {
            this.onUpdate();
            
            if (!this.repeat) {
                context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.w, this.h);
            } else {
                var ptrn = this.pattern || context.createPattern(this.image, this.repeat);
                context.fillStyle = ptrn;
                context.translate(this.x, this.y);
                context.fillRect(-this.x, -this.y, this.w, this.h);
                context.translate(-this.x, -this.y);
            }
        }

        abstract onLoadComplete(): void;   

    } 
}  