var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gobalVars = {
    baseVelocity: 300,
    meters: 0
};
var Square = (function (_super) {
    __extends(Square, _super);
    function Square() {
        _super.apply(this, arguments);
    }
    Square.prototype.init = function () {
    };
    Square.prototype.render = function (context) {
        context.fillStyle = "red";
        context.fillRect(10, 10, 200, 200);
    };
    Square.prototype.onUpdate = function () {
    };
    return Square;
})(GameTS.Objects.BaseObject);
var Clock = (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        _super.call(this);
    }
    Clock.prototype.init = function () {
    };
    Clock.prototype.render = function (context) {
        var now = new Date();
        context.fillStyle = "black";
        context.fillText(now.toTimeString(), 30.5, 50, 300);
    };
    Clock.prototype.onUpdate = function () {
    };
    return Clock;
})(GameTS.Objects.BaseObject);
var Diamond = (function (_super) {
    __extends(Diamond, _super);
    function Diamond(x, y) {
        _super.call(this, "/assets/diamond.png", x, y);
        this.value = 1;
        this.cacheKey = "diamond";
    }
    Diamond.prototype.onUpdate = function () {
        this.velocity.x = -gobalVars.baseVelocity;
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity;
        //} else {
        //    this.velocity.x = 0;
        //}
        this.updatePosition();
        if (this.x < -100) {
            this.kill();
        }
    };
    Diamond.prototype.onLoadComplete = function () {
        var _this = this;
        this.collision.onCollision = function (obj) {
            if (obj instanceof Dude) {
                obj.diamonds += _this.value;
                _this.kill();
            }
        };
    };
    return Diamond;
})(GameTS.Objects.Sprite);
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y) {
        _super.call(this, "/assets/ground-block.jpg", x, y);
        this.value = 1;
        this.cacheKey = "diamond";
    }
    Enemy.prototype.onUpdate = function () {
        this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
        if (this.x < -100) {
            this.kill();
        }
    };
    Enemy.prototype.onLoadComplete = function () {
        var _this = this;
        this.collision.onCollision = function (obj) {
            if (obj instanceof Dude) {
                obj.kill();
                _this.game.stop();
            }
        };
    };
    return Enemy;
})(GameTS.Objects.Sprite);
var RedDiamond = (function (_super) {
    __extends(RedDiamond, _super);
    function RedDiamond(x, y) {
        _super.call(this, "/assets/red-diamond.png", x, y);
        this.value = 10;
        this.cacheKey = "diamond";
    }
    RedDiamond.prototype.onUpdate = function () {
        this.velocity.x = -gobalVars.baseVelocity;
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity;
        //} else {
        //    this.velocity.x = 0;
        //}
        this.updatePosition();
        if (this.x < -100) {
            this.kill();
        }
    };
    RedDiamond.prototype.onLoadComplete = function () {
        var _this = this;
        this.collision.onCollision = function (obj) {
            if (obj instanceof Dude) {
                obj.diamonds += _this.value;
                _this.kill();
            }
        };
    };
    return RedDiamond;
})(GameTS.Objects.Sprite);
var GreenDiamond = (function (_super) {
    __extends(GreenDiamond, _super);
    function GreenDiamond(x, y) {
        _super.call(this, "/assets/green-diamond.png", x, y);
        this.value = 100;
        this.cacheKey = "diamond";
    }
    GreenDiamond.prototype.onUpdate = function () {
        this.velocity.x = -gobalVars.baseVelocity;
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity;
        //} else {
        //    this.velocity.x = 0;
        //}
        this.updatePosition();
        if (this.x < -100) {
            this.kill();
        }
    };
    GreenDiamond.prototype.onLoadComplete = function () {
        var _this = this;
        this.collision.onCollision = function (obj) {
            if (obj instanceof Dude) {
                obj.diamonds += _this.value;
                _this.kill();
            }
        };
    };
    return GreenDiamond;
})(GameTS.Objects.Sprite);
var GoldenDiamond = (function (_super) {
    __extends(GoldenDiamond, _super);
    function GoldenDiamond(x, y) {
        _super.call(this, "/assets/golden-diamond.png", x, y);
        this.value = 100;
        this.cacheKey = "diamond";
    }
    GoldenDiamond.prototype.onUpdate = function () {
        this.velocity.x = -gobalVars.baseVelocity;
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity;
        //} else {
        //    this.velocity.x = 0;
        //}
        if (this.x < -100) {
            this.kill();
        }
        this.updatePosition();
    };
    GoldenDiamond.prototype.onLoadComplete = function () {
        var _this = this;
        this.collision.onCollision = function (obj) {
            if (obj instanceof Dude) {
                obj.diamonds += _this.value;
                _this.kill();
            }
        };
    };
    return GoldenDiamond;
})(GameTS.Objects.Sprite);
var DiamondsLabel = (function (_super) {
    __extends(DiamondsLabel, _super);
    function DiamondsLabel() {
        _super.call(this, "0");
    }
    DiamondsLabel.prototype.init = function () {
        this.iconUrl = "/assets/diamond.png";
        this.y = 5;
        this.x = this.game.w - 100;
        this.iconSize = { h: 20, w: 20 };
        _super.prototype.init.call(this);
    };
    DiamondsLabel.prototype.onUpdate = function () {
        if (window["dude"]) {
            this.text = window["dude"].diamonds.toString();
        }
    };
    return DiamondsLabel;
})(GameTS.Objects.Label);
var MetersLabel = (function (_super) {
    __extends(MetersLabel, _super);
    function MetersLabel() {
        _super.call(this, "0");
    }
    MetersLabel.prototype.init = function () {
        this.y = 5;
        this.x = 20;
        _super.prototype.init.call(this);
    };
    MetersLabel.prototype.onUpdate = function () {
        this.text = gobalVars.meters.toString() + " Metros";
    };
    return MetersLabel;
})(GameTS.Objects.Label);
var Back = (function (_super) {
    __extends(Back, _super);
    function Back() {
        _super.call(this, "/assets/platformer_background_M.png", 0, 0);
    }
    Back.prototype.init = function () {
        this.w = 0;
        this.h = this.game.h;
        _super.prototype.init.call(this);
    };
    Back.prototype.onUpdate = function () {
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity/2;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity/2;
        //} else {
        //    this.velocity.x = 0;
        //}
        this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
    };
    return Back;
})(GameTS.Objects.RollSprite);
var Dude = (function (_super) {
    __extends(Dude, _super);
    function Dude() {
        _super.call(this, "/assets/dude.png", 300, 70, 31, 5);
        this.diamonds = 0;
        this.addAnimation("left", [0, 1, 2, 3]);
        this.addAnimation("stopped", [4]);
        this.addAnimation("right", [5, 6, 7, 8]);
    }
    Dude.prototype.onLoadComplete = function () {
        var _this = this;
        this.collision.onCollision = function (obj) {
            if (obj instanceof Diamond) {
                _this.diamonds++;
                obj.kill();
            }
        };
    };
    Dude.prototype.onUpdate = function () {
        this.setAnimation("right");
        this.velocity.x = 0;
        if (this.game.keyboard.rightArrow) {
            this.setAnimation("right");
            this.velocity.x = 250;
        }
        else if (this.game.keyboard.leftArrow) {
            this.setAnimation("left");
            this.velocity.x = -250;
        }
        if (this.collision.bottom && (this.game.keyboard.upArrow)) {
            this.velocity.y = -1000;
        }
        ////console.log(this.checkCollision());
        this.updatePositionWithGravity();
    };
    return Dude;
})(GameTS.Objects.TileSprite);
var Pos = (function (_super) {
    __extends(Pos, _super);
    function Pos() {
        _super.call(this, "");
        this.x = 50;
        this.y = 50;
        this.color = "black";
        this.w = 100;
    }
    Pos.prototype.onUpdate = function () {
        this.updatePosition();
        this.text = this.game.mouse.x + " X " + this.game.mouse.y;
        if (this.game.keyboard.rightArrow || this.game.keyboard.d) {
            this.velocity.x = 1;
        }
        else if (this.game.keyboard.leftArrow || this.game.keyboard.a) {
            this.velocity.x = -1;
        }
        else {
            this.velocity.x = 0;
        }
        if (this.game.keyboard.upArrow || this.game.keyboard.w) {
            this.velocity.y = -1;
        }
        else if (this.game.keyboard.downArrow || this.game.keyboard.s) {
            this.velocity.y = 1;
        }
        else {
            this.velocity.y = 0;
        }
    };
    return Pos;
})(GameTS.Objects.Label);
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        _super.call(this, "/assets/ground-block.jpg", 0, 0, 0, 0, true, "repeat-x");
    }
    Ground.prototype.init = function () {
        this.collision.fullCollision = false;
        this.w = this.game.w;
        this.h = 32;
        this.y = this.game.h - this.h;
        _super.prototype.init.call(this);
        this.collision.onUpdate = function () { return window["dude"].collision.update(); };
    };
    Ground.prototype.onUpdate = function () {
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity;  
        //} else {
        //    this.velocity.x = 0;
        //}
        this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
    };
    return Ground;
})(GameTS.Objects.RollSprite);
var Luffy = (function (_super) {
    __extends(Luffy, _super);
    function Luffy() {
        _super.call(this, "/assets/luffy.png", "/assets/luffy.json");
        this.x = 100;
        this.y = 100;
        this.h = 50;
        this.setAnimation("stopedright", 5);
    }
    Luffy.prototype.onUpdate = function () {
        this.updatePositionWithGravity();
        if (this.game.keyboard.d) {
            this.setAnimation("running-right", 6);
            this.velocity.x = 2;
        }
        else if (this.game.keyboard.a) {
            this.setAnimation("running-left", 6);
            this.velocity.x = -2;
        }
        else {
            this.velocity.x = 0;
            this.setAnimation("stopedright", 6);
        }
        if (this.isTouchingGround && (this.game.keyboard.w)) {
            this.velocity.y = -10;
        }
    };
    return Luffy;
})(GameTS.Objects.AtlasSprite);
//# sourceMappingURL=tests.js.map