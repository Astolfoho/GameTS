

module GameTS.Objects {

    export class Square extends BaseObject {

        public color: string;

        public useGravity:boolean = true;

        constructor(width:number,height:number, x:number = 10, y:number=10) {
            super();
            this.w = width;
            this.h = height;
            this.x = x;
            this.y = y;
            this.color = "black"
        }


        public init(): void {

        }
        public render(context: CanvasRenderingContext2D): void {
            if (this.useGravity) {
                this.updatePositionWithGravity();
            } else {
                this.updatePosition();
            }
            context.strokeStyle = this.color;
            context.strokeRect(this.x, this.y, this.w, this.h);
        }

        public onUpdate(): void {
            
        }
    }


    export class Square2 extends BaseObject {

        public color: string;

        public useGravity: boolean = true;

        constructor(width: number, height: number, x: number = 10, y: number = 10) {
            super();
            this.w = width;
            this.h = height;
            this.x = x;
            this.y = y;
            this.color = "black"
        }


        public init(): void {

        }
        public render(context: Graphics.IDrawingContext): void {
            if (this.useGravity) {
                this.updatePositionWithGravity();
            } else {
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

        }

        public onUpdate(): void {

        }
    }
}