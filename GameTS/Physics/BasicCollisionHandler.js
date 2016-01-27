var GameTS;
(function (GameTS) {
    var Physics;
    (function (Physics) {
        var BasicCollisionHandler = (function () {
            function BasicCollisionHandler(obj) {
                this.fullCollision = true;
                this.obj = obj;
                this._cells = [];
                this._objsToCollide = [];
                this.current = 0;
            }
            Object.defineProperty(BasicCollisionHandler.prototype, "left", {
                get: function () { return this.colPosition(CollisionResult.left); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(BasicCollisionHandler.prototype, "right", {
                get: function () { return this.colPosition(CollisionResult.right); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(BasicCollisionHandler.prototype, "top", {
                get: function () { return this.colPosition(CollisionResult.top); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(BasicCollisionHandler.prototype, "bottom", {
                get: function () { return this.colPosition(CollisionResult.bottom); },
                enumerable: true,
                configurable: true
            });
            ;
            BasicCollisionHandler.prototype.colPosition = function (col) {
                return (this.current & col) > 0;
            };
            BasicCollisionHandler.prototype.init = function () {
                if (this.fullCollision) {
                    if (!this.obj.cacheKey || !BasicCollisionHandler.cache[this.obj.cacheKey]) {
                        var xd = Math.floor(this.obj.w / 2);
                        var yd = Math.floor(this.obj.h / 2);
                        var xs = Math.floor(this.obj.w / xd);
                        var ys = Math.floor(this.obj.h / yd);
                        for (var x = 0; x < xs; x++) {
                            for (var y = 0; y < ys; y++) {
                                var cc = new CollisionCell(x, y, xd, yd, this.obj);
                                if (!cc.isTransparent()) {
                                    this._cells.push(cc);
                                }
                            }
                        }
                        if (this.obj.cacheKey && this._cells.length > 0) {
                            BasicCollisionHandler.cache[this.obj.cacheKey] = this._cells;
                        }
                    }
                    else {
                        this._cells = BasicCollisionHandler.cache[this.obj.cacheKey];
                    }
                }
            };
            BasicCollisionHandler.prototype.update = function () {
                this.current = 0;
                if (this.onUpdate) {
                    this.onUpdate();
                }
                for (var k in this._objsToCollide) {
                    if (this._objsToCollide[k].isAlive) {
                        var result = this.isColliding(this._objsToCollide[k]);
                        this.current = this.current | result;
                        if (result > 0 && this.onCollision) {
                            this.onCollision(this._objsToCollide[k]);
                        }
                    }
                    else {
                        var i = this._objsToCollide.indexOf(this._objsToCollide[k]);
                        if (i > -1) {
                            this._objsToCollide.splice(i, 1);
                        }
                    }
                }
            };
            BasicCollisionHandler.prototype.add = function (otherObj) {
                this._objsToCollide.push(otherObj);
            };
            BasicCollisionHandler.prototype.isColliding = function (otherObj) {
                var res = this.firstPhase(otherObj);
                if (res && (!this.fullCollision || this.secondPhase(otherObj))) {
                    return res;
                }
                return CollisionResult.none;
            };
            BasicCollisionHandler.prototype.firstPhase = function (otherObj) {
                var ret = CollisionResult.none;
                if (this.obj.x < otherObj.x + otherObj.w &&
                    this.obj.x + this.obj.w > otherObj.x &&
                    this.obj.h + this.obj.y > otherObj.y &&
                    this.obj.y < otherObj.y + otherObj.h) {
                    if ((this.obj.x < otherObj.x)) {
                        ret = CollisionResult.left | ret;
                    }
                    else {
                        ret = CollisionResult.right | ret;
                    }
                    if (this.obj.y > otherObj.y) {
                        ret = CollisionResult.top | ret;
                    }
                    else {
                        ret = CollisionResult.bottom | ret;
                    }
                }
                return ret;
            };
            BasicCollisionHandler.prototype.secondPhase = function (otherObj) {
                for (var key in this._cells) {
                    var cell = this._cells[key];
                    cell.parent = this.obj;
                    var cc = cell.isColliding(otherObj);
                    if (cc) {
                        if (otherObj.collision.confirmCollision(cc)) {
                            return true;
                        }
                    }
                }
                return false;
            };
            BasicCollisionHandler.prototype.confirmCollision = function (cell) {
                if (this.fullCollision) {
                    for (var key in this._cells) {
                        var cc = this._cells[key];
                        if (cc.isColliding(cell)) {
                            return true;
                        }
                    }
                }
                else {
                    return true;
                }
            };
            BasicCollisionHandler.cache = {};
            return BasicCollisionHandler;
        })();
        Physics.BasicCollisionHandler = BasicCollisionHandler;
        var CollisionCell = (function () {
            function CollisionCell(x, y, w, h, parent) {
                this._baseX = x * w;
                this._baseY = y * h;
                this.w = w;
                this.h = h;
                this._cells = [];
                this.parent = parent;
                this.topCell = this.parent.topCell || this;
                this.init();
            }
            Object.defineProperty(CollisionCell.prototype, "x", {
                //private static _cache = {};
                get: function () { return this.parent.x + this._baseX; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(CollisionCell.prototype, "y", {
                get: function () { return this.parent.y + this._baseY; },
                enumerable: true,
                configurable: true
            });
            ;
            CollisionCell.prototype.init = function () {
                var xd = Math.floor(this.w / 2);
                var yd = Math.floor(this.h / 2);
                var xs = Math.floor(this.w / xd);
                var ys = Math.floor(this.h / yd);
                if (xs !== Infinity && ys !== Infinity) {
                    for (var x = 0; x < xs; x++) {
                        for (var y = 0; y < ys; y++) {
                            var cc = new CollisionCell(x, y, xd, yd, this);
                            if (!cc.isTransparent()) {
                                this._cells.push(cc);
                            }
                        }
                    }
                }
            };
            CollisionCell.prototype.isTransparent = function () {
                if (!this.auxCtx) {
                    var can = document.createElement("canvas");
                    this.auxCtx = can.getContext("2d");
                    this.auxCtx.fillStyle = "rgba(1,2,3,1)";
                    this.auxCtx.fillRect(0, 0, 1000, 1000);
                    this.topCell.parent.preRender(this.auxCtx, 0);
                }
                for (var w = 0; w < this.w; w++) {
                    for (var h = 0; h < this.h; h++) {
                        var idata = this.auxCtx.getImageData(this.x + w, this.y + h, 1, 1);
                        if (idata.data[0] != 1
                            || idata.data[1] != 2
                            || idata.data[2] != 3
                            || idata.data[3] != 255) {
                            return false;
                        }
                    }
                }
                return true;
            };
            CollisionCell.prototype.isColliding = function (otherObj) {
                if (this.x < otherObj.x + otherObj.w &&
                    this.x + this.w > otherObj.x &&
                    this.y < otherObj.y + otherObj.h &&
                    this.h + this.y > otherObj.y) {
                    if (this._cells.length === 0) {
                        return this;
                    }
                    for (var key in this._cells) {
                        var cell = this._cells[key];
                        var cc = cell.isColliding(otherObj);
                        if (cc) {
                            return cc;
                        }
                    }
                }
                return null;
            };
            CollisionCell.prototype.setDebug = function (ctx) {
                var _this = this;
                this.ctx = ctx;
                this._cells.forEach(function (c) { return c.setDebug(_this.ctx); });
            };
            return CollisionCell;
        })();
        (function (CollisionResult) {
            CollisionResult[CollisionResult["none"] = 0] = "none";
            CollisionResult[CollisionResult["left"] = 1] = "left";
            CollisionResult[CollisionResult["right"] = 2] = "right";
            CollisionResult[CollisionResult["top"] = 4] = "top";
            CollisionResult[CollisionResult["bottom"] = 8] = "bottom";
        })(Physics.CollisionResult || (Physics.CollisionResult = {}));
        var CollisionResult = Physics.CollisionResult;
    })(Physics = GameTS.Physics || (GameTS.Physics = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=basiccollisionhandler.js.map