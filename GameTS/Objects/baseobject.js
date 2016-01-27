var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var BaseObject = (function () {
            function BaseObject(_useCollisionHandler) {
                if (_useCollisionHandler === void 0) { _useCollisionHandler = true; }
                this._useCollisionHandler = _useCollisionHandler;
                this.x = 0;
                this.y = 0;
                this.w = 0;
                this.h = 0;
                this.velocity = new Objects.Velocity();
            }
            Object.defineProperty(BaseObject.prototype, "x", {
                get: function () { return this._x; },
                set: function (value) {
                    if (!(value - this._x === 0)) {
                        this._xold = this._x;
                        this._x = value;
                        if (this.collision) {
                            this.collision.update();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(BaseObject.prototype, "y", {
                get: function () { return this._y; },
                set: function (value) {
                    if (!(value - this._y === 0)) {
                        this._yold = this._y;
                        this._y = value;
                        if (this.collision) {
                            this.collision.update();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            ;
            ;
            ;
            BaseObject.prototype.preRender = function (context, timestep) {
                this.timestep = timestep / 1000;
                this.render(context);
            };
            BaseObject.prototype.updatePosition = function (objToUpdate) {
                if (objToUpdate === void 0) { objToUpdate = this; }
                objToUpdate.y += (this.velocity.y * this.timestep);
                objToUpdate.x += (this.velocity.x * this.timestep);
            };
            BaseObject.prototype.kill = function () {
                this.isAlive = false;
            };
            BaseObject.prototype.updatePositionWithGravity = function () {
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
            };
            BaseObject.prototype.rollBackPosition = function () {
                this.rollBackPositionY();
                this.x = this._xold;
            };
            BaseObject.prototype.rollBackPositionY = function () {
                this.y = this._yold;
            };
            BaseObject.prototype.colide = function (otherObj) {
                if (this._useCollisionHandler) {
                    if (!this.collision)
                        this.collision = new GameTS.Physics.BasicCollisionHandler(this);
                    this.collision.add(otherObj);
                }
            };
            BaseObject.prototype.isMouseOver = function () {
                return this.game.mouse.x >= this.x &&
                    this.game.mouse.x <= this.x + this.w &&
                    this.game.mouse.y >= this.y &&
                    this.game.mouse.y <= this.y + this.h;
            };
            BaseObject.prototype.onGameStart = function () {
                if (this._useCollisionHandler) {
                    if (!this.collision)
                        this.collision = new GameTS.Physics.BasicCollisionHandler(this);
                }
            };
            BaseObject.prototype.init = function () {
                if (this._useCollisionHandler) {
                    this.collision.init();
                }
            };
            return BaseObject;
        })();
        Objects.BaseObject = BaseObject;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=baseobject.js.map