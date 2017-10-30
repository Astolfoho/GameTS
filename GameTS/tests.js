import { BaseObject } from './Objects/BaseObjects';
import { Sprite } from './Objects/Sprite';
import { RollSprite } from './Objects/RollSprite';
import { Label } from './Objects/Label';
import { TileSprite } from './Objects/TileSprite';
import { AtlasSprite } from './Objects/AtlasSprite';
var gobalVars = {
    baseVelocity: 300,
    meters: 0
};
class Square extends BaseObject {
    init() {
    }
    render(context) {
        context.fillStyle = "red";
        context.fillRect(10, 10, 200, 200);
    }
    onUpdate() {
    }
}
export class Clock extends BaseObject {
    constructor() {
        super();
    }
    init() {
    }
    render(context) {
        var now = new Date();
        context.fillStyle = "black";
        context.fillText(now.toTimeString(), 30.5, 50, 300);
    }
    onUpdate() {
    }
}
export class Diamond extends Sprite {
    constructor(x, y) {
        super("/assets/diamond.png", x, y);
        this.value = 1;
        this.cacheKey = "diamond";
    }
    onUpdate() {
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
    }
    onLoadComplete() {
        this.collision.onCollision = (obj) => {
            if (obj instanceof Dude) {
                var dude = obj;
                dude.diamonds += this.value;
                this.kill();
            }
        };
    }
}
export class Enemy extends Sprite {
    constructor(x, y) {
        super("/assets/ground-block.jpg", x, y);
        this.value = 1;
        this.cacheKey = "diamond";
    }
    onUpdate() {
        this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
        if (this.x < -100) {
            this.kill();
        }
    }
    onLoadComplete() {
        this.collision.onCollision = (obj) => {
            if (obj instanceof Dude) {
                obj.kill();
                this.game.stop();
            }
        };
    }
}
export class RedDiamond extends Sprite {
    constructor(x, y) {
        super("/assets/red-diamond.png", x, y);
        this.value = 10;
        this.cacheKey = "diamond";
    }
    onUpdate() {
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
    }
    onLoadComplete() {
        this.collision.onCollision = (obj) => {
            if (obj instanceof Dude) {
                obj.diamonds += this.value;
                this.kill();
            }
        };
    }
}
export class GreenDiamond extends Sprite {
    constructor(x, y) {
        super("/assets/green-diamond.png", x, y);
        this.value = 100;
        this.cacheKey = "diamond";
    }
    onUpdate() {
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
    }
    onLoadComplete() {
        this.collision.onCollision = (obj) => {
            if (obj instanceof Dude) {
                obj.diamonds += this.value;
                this.kill();
            }
        };
    }
}
export class GoldenDiamond extends Sprite {
    constructor(x, y) {
        super("/assets/golden-diamond.png", x, y);
        this.value = 100;
        this.cacheKey = "diamond";
    }
    onUpdate() {
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
    }
    onLoadComplete() {
        this.collision.onCollision = (obj) => {
            if (obj instanceof Dude) {
                obj.diamonds += this.value;
                this.kill();
            }
        };
    }
}
export class DiamondsLabel extends Label {
    constructor() {
        super("0");
    }
    init() {
        this.iconUrl = "/assets/diamond.png";
        this.y = 5;
        this.x = this.game.w - 100;
        this.iconSize = { h: 20, w: 20 };
        super.init();
    }
    onUpdate() {
        if (window["dude"]) {
            this.text = window["dude"].diamonds.toString();
        }
    }
}
export class MetersLabel extends Label {
    constructor() {
        super("0");
    }
    init() {
        this.y = 5;
        this.x = 20;
        super.init();
    }
    onUpdate() {
        this.text = gobalVars.meters.toString() + " Metros";
    }
}
export class Back extends RollSprite {
    constructor() {
        super("/assets/platformer_background_M.png", 0, 0);
    }
    init() {
        this.w = 0;
        this.h = this.game.h;
        super.init();
    }
    onUpdate() {
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity/2;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity/2;
        //} else {
        //    this.velocity.x = 0;
        //}
        this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
    }
}
export class SolidColorBack extends BaseObject {
    constructor() {
        super(false);
    }
    init() {
        this.w = this.game.w;
        this.h = this.game.h;
        super.init();
    }
    render(context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.w, this.h);
    }
    onUpdate() {
    }
}
export class Dude extends TileSprite {
    constructor() {
        super("/assets/dude.png", 300, 70, 31, 5);
        this.diamonds = 0;
        this.addAnimation("left", [0, 1, 2, 3]);
        this.addAnimation("stopped", [4]);
        this.addAnimation("right", [5, 6, 7, 8]);
    }
    onLoadComplete() {
        this.collision.onCollision = (obj) => {
            if (obj instanceof Diamond) {
                this.diamonds++;
                obj.kill();
            }
        };
    }
    onUpdate() {
        this.setAnimation("stopped");
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
    }
}
export class Pos extends Label {
    constructor() {
        super("");
        this.x = 50;
        this.y = 50;
        this.color = "black";
        this.w = 100;
    }
    onUpdate() {
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
    }
}
export class Ground extends RollSprite {
    constructor() {
        super("/assets/ground-block.jpg", 0, 0, 0, 0, true, "repeat-x");
        this.baseVelocity = 100;
    }
    init() {
        this.collision.fullCollision = false;
        this.w = this.game.w;
        this.h = 32;
        this.y = this.game.h - this.h;
        super.init();
        //this.collision.onUpdate = () => window["dude"].collision.update();
    }
    onUpdate() {
        if (this.game.keyboard.rightArrow) {
        }
        else if (this.game.keyboard.leftArrow) {
        }
        else {
            this.velocity.x = 0;
        }
        //this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
    }
}
export class Luffy extends AtlasSprite {
    constructor() {
        super("/assets/luffy.png", "/assets/luffy.json", true);
        this._isRight = true;
        this.x = 100;
        this.y = 100;
        this.h = 50;
        this.setAnimation("stopedright", 7);
    }
    onUpdate() {
        this.updatePositionWithGravity();
        var animation = "";
        if (this.game.keyboard.d) {
            this._isRight = true;
            animation = "running-right";
            this.velocity.x = 250;
        }
        else if (this.game.keyboard.a) {
            this._isRight = false;
            animation = "running-left";
            this.velocity.x = -250;
        }
        else {
            if (this._isRight) {
                animation = "stopedright";
            }
            else {
                animation = "stopedleft";
            }
            this.velocity.x = 0;
        }
        if (animation && this.collision.bottom) {
            this.setAnimation(animation, 7);
        }
        if (this.collision.bottom && (this.game.keyboard.w)) {
            if (this._isRight) {
                this.setAnimation("jump-right", 10);
            }
            else {
                this.setAnimation("jump-left", 10);
            }
            this.velocity.y = -450;
        }
    }
}
//# sourceMappingURL=tests.js.map