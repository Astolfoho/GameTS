
declare interface NumberConstructor {
    EPSILON: number;
}

module GameTS.Objects {

    export interface IPosition {
        x: number;
        y: number;
    }

    export interface ISize {
        w: number;
        h: number;
    }

    export abstract class BaseObject implements IPosition, ISize {
        public game: Game;
        public w: number;
        public h: number;
        public isTouchingGround: boolean;
        public collision: Physics.BasicCollisionHandler;
        public isAlive: boolean;
        public cacheKey: string;

        get x(): number { return this._x; };
        get y(): number { return this._y; };

        set x(value) {
            if (!(value - this._x === 0)){
                this._xold = this._x
                this._x = value;
                if (this.collision) {
                    this.collision.update();
                }
            }         
        };

        set y(value) {
            if (!(value - this._y === 0)) {
                this._yold = this._y
                this._y = value;
                if (this.collision) {
                   this.collision.update();
                }
            }
        };

        private _xold: number;
        private _yold: number;

        private _x: number;
        private _y: number;

        protected velocity: Velocity;
        protected timestep: number;

        constructor(private _useCollisionHandler = true) {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.velocity = new Velocity();
        }

        public preRender(context: GameTS.Graphics.IDrawingContext, timestep: number): void {
            this.timestep = timestep / 1000;
            this.render(context);
        }

        protected updatePosition(objToUpdate: IPosition = this) {

            objToUpdate.y += (this.velocity.y * this.timestep)
            objToUpdate.x += (this.velocity.x * this.timestep)
        }

        public kill(): void {
            this.isAlive = false;
        }


        protected updatePositionWithGravity() {
            this.updatePosition();
            if (this.collision && this.collision.bottom && this.velocity.y > 0) {
                this.rollBackPositionY();
                this.velocity.y = 0;
                this.y += 1;
            } else if (this.collision && !this.collision.bottom){
                var acceleration = 980;
                this.velocity.y += this.timestep * acceleration;
            }       
        }

        public rollBackPosition() {
            this.rollBackPositionY();
            this.x = this._xold;
        }

        private rollBackPositionY() {
            this.y = this._yold;
        }

        public colide(otherObj): void {
            if (this._useCollisionHandler){
                if (!this.collision)
                    this.collision = new Physics.BasicCollisionHandler(this);

                this.collision.add(otherObj);
            }
        }

        public isMouseOver() {
            return this.game.mouse.x >= this.x &&
                this.game.mouse.x <= this.x + this.w &&
                this.game.mouse.y >= this.y &&
                this.game.mouse.y <= this.y + this.h;
        }


        public onGameStart() {
            if (this._useCollisionHandler){
                if (!this.collision)
                    this.collision = new Physics.BasicCollisionHandler(this);
           
               
            }
        }

        init(): void {
            if (this._useCollisionHandler) {
                this.collision.init();
            }
        }

        
        

        abstract render(context: GameTS.Graphics.IDrawingContext): void;
        abstract onUpdate(): void;
    }
}