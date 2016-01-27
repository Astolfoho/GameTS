module GameTS.Physics {

    export class BasicCollisionHandler implements ICollisionHandler {


        public obj: GameObjects.BaseObject;
        private ctx: CanvasRenderingContext2D;
        private isDebugging: boolean;
        public cellSize: number;

        private _cells: Array<CollisionCell>;

        constructor(obj: GameObjects.BaseObject) {
            this.obj = obj;
            this._cells = [];

            var resolution = 50;

            var xs = Math.floor(this.obj.width / resolution);
            var ys = Math.floor(this.obj.height / resolution);


            for (var x = 0; x < xs; x++) {

                for (var y = 0; y < ys; y++) {
                    this._cells.push(new CollisionCell(x, y, resolution, this.obj));
                }

            }


        }

        public isColliding(otherObj: GameObjects.BaseObject): boolean {


            if (this.firstPhase(otherObj)) {
                if (this.secondPhase(otherObj)) {
                    this.printDebug();
                }
            }

            return false;
        }

        public printDebug() {
            if (this.isDebugging) {
                this.ctx.fillStyle = "rgba(0,255,0,0.1)";
                this.ctx.fillRect(this.obj.x, this.obj.y, this.obj.width, this.obj.height);
            }
        }


        private firstPhase(otherObj: GameObjects.BaseObject): number {
            var cLeft = ((this.obj.x - otherObj.x) - (this.obj.width / 2 - otherObj.width / 2));
            var cRight = (((otherObj.x + otherObj.width) - (this.obj.x + this.obj.width)) - (this.obj.width / 2 - otherObj.width / 2));
            var cUp = ((this.obj.y - otherObj.y) - (this.obj.height / 2 - otherObj.height / 2));
            var cBottom = (((otherObj.y + otherObj.height) - (this.obj.y + this.obj.height)) - (this.obj.height / 2 - otherObj.height / 2));



            //this.ctx.fillText(cLeft.toString(), 100, 120, 100);
            //this.ctx.fillText(cRight.toString(), 100, 130, 100);
            //this.ctx.fillText(cUp.toString(), 100, 100, 140);
            //this.ctx.fillText(cBottom.toString(), 100, 150, 100);



            //if (cRight < 0 && cLeft < 0 && cUp < 0 && cBottom < 0) {
            //    return 2;
            //}



            return 0;
        }

        private secondPhase(otherObj: GameObjects.BaseObject): boolean {


            for (var key in this._cells) {
                var cell = this._cells[key];
                //cell.printDebug(this.ctx);
                if (cell.isColliding(otherObj,this.ctx)) {
                    cell.printDebug(this.ctx);
                }
            }





            return true;
        }

        public setDebug(ctx: CanvasRenderingContext2D): void {
            this.isDebugging = true;
            this.ctx = ctx;
        }



    }

    class Point {

        constructor(x = 0, y=0) {
            this.x = x;
            this.y = y;

        }

        public x:number;
        public y:number;
    }

    class CollisionCell {

        get tl(): Point { return new Point(this.x, this.y);};
        get tr(): Point { return new Point(this.x + this.size, this.y); };
        get bl(): Point { return new Point(this.x, this.y + this.size); };
        get br(): Point { return new Point(this.x + this.size, this.y + this.size); };

        get x(): number { return this.parent.x + this._baseX; };
        get y(): number { return this.parent.y + this._baseY; };


        public size: number;

        private _baseX: number;
        private _baseY: number;

        public parent: GameObjects.BaseObject;

        constructor(x:number, y:number, size:number,baseObj:GameObjects.BaseObject) {
            this._baseX = x * size;
            this._baseY = y * size;
            this.size = size;
            this.parent = baseObj;
        }

        public isColliding(otherObj: GameObjects.BaseObject, ctx:any): boolean {

//            var cLeft = ((this.x - otherObj.x) - (this.size / 2 - otherObj.width / 2));
//            var cRight = (((otherObj.x + otherObj.width) - (this.x + this.size)) - (this.size / 2 - otherObj.width / 2));
//            var cUp = ((this.y - otherObj.y) - (this.size / 2 - otherObj.height / 2));
//            var cBottom = (((otherObj.y + otherObj.height) - (this.y + this.size)) - (this.size / 2 - otherObj.height / 2));

//            ctx.fillText(cLeft.toString(), 100, 120, 100);
//            ctx.fillText(cRight.toString(), 100, 130, 100);
//            ctx.fillText(cUp.toString(), 100, 100, 140);
//            ctx.fillText(cBottom.toString(), 100, 150, 100);


////            return true;

//            if (cRight < 0 && cLeft < 0 && cUp < 0 && cBottom < 0) {
//                return true;
//            }


            var denom = ((LineB2.Y – LineB1.Y) * (LineA2.X – LineA1.X)) –
             ((LineB2.X – lineB1.X) * (LineA2.Y - LineA1.Y))


            return false;
        }

        public printDebug(ctx:CanvasRenderingContext2D) {
            ctx.fillStyle = "rgba(255,0,0,0.3)";
            ctx.fillRect(this.x, this.y, this.size, this.size);
        } 

    }

    enum Position {
        left = 1,
        right = 2,
        top = 3,
        bottom = 4
    }

}