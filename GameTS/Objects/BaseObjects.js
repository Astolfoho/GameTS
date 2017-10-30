import { BasicCollisionHandler } from '../Physics/BasicCollisionHandler';
export class BaseObject {
    constructor(_useCollisionHandler = true) {
        this._useCollisionHandler = _useCollisionHandler;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.velocity = new Velocity();
    }
    get x() { return this._x; }
    ;
    get y() { return this._y; }
    ;
    set x(value) {
        if (!(value - this._x === 0)) {
            this._xold = this._x;
            this._x = value;
            if (this.collision) {
                this.collision.update();
            }
        }
    }
    ;
    set y(value) {
        if (!(value - this._y === 0)) {
            this._yold = this._y;
            this._y = value;
            if (this.collision) {
                this.collision.update();
            }
        }
    }
    ;
    preRender(context, timestep) {
        this.timestep = timestep / 1000;
        this.onUpdate();
        this.render(context);
    }
    updatePosition(objToUpdate = this) {
        objToUpdate.y += (this.velocity.y * this.timestep);
        objToUpdate.x += (this.velocity.x * this.timestep);
    }
    kill() {
        this.isAlive = false;
    }
    updatePositionWithGravity() {
        this.updatePosition();
        if (this.collision && this.collision.bottom && this.velocity.y > 0) {
            this.rollBackPositionY();
            this.velocity.y = 0;
            this.y += 1;
        }
        else if (this.collision && !this.collision.bottom) {
            var acceleration = 980;
            this.velocity.y += this.timestep * acceleration;
        }
    }
    rollBackPosition() {
        this.rollBackPositionY();
        this.x = this._xold;
    }
    rollBackPositionY() {
        this.y = this._yold;
    }
    colide(otherObj) {
        if (this._useCollisionHandler) {
            if (!this.collision)
                this.collision = new BasicCollisionHandler(this);
            this.collision.add(otherObj);
        }
    }
    isMouseOver() {
        return this.game.mouse.x >= this.x &&
            this.game.mouse.x <= this.x + this.w &&
            this.game.mouse.y >= this.y &&
            this.game.mouse.y <= this.y + this.h;
    }
    onGameStart() {
        if (this._useCollisionHandler) {
            if (!this.collision)
                this.collision = new BasicCollisionHandler(this);
        }
    }
    init() {
        if (this._useCollisionHandler) {
            this.collision.init();
        }
    }
}
export class Velocity {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
//# sourceMappingURL=BaseObjects.js.map