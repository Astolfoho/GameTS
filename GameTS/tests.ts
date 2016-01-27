

var gobalVars = {

    baseVelocity: 300,
    meters:0
}

class Square extends GameTS.Objects.BaseObject {

    public game: GameTS.Game;

    public init(): void {

    }

    public render(context: CanvasRenderingContext2D): void {

        context.fillStyle = "red";
        context.fillRect(10, 10, 200, 200);
    }

    public onUpdate() {

    }
}


class Clock extends GameTS.Objects.BaseObject {

    constructor() {
        super();
    }

    public game: GameTS.Game;
    public init(): void {

    }

    public render(context: CanvasRenderingContext2D): void {
        var now = new Date();

        context.fillStyle = "black";
        context.fillText(now.toTimeString(), 30.5, 50, 300);

    }

    public onUpdate() {

    }
}




class Diamond extends GameTS.Objects.Sprite {

    constructor(x: number, y: number) {
        super("/assets/diamond.png", x, y);
        this.cacheKey = "diamond";
    }

    public value:number = 1;

    public onUpdate() {

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
            this.kill()
        }
    }

    public onLoadComplete(): void {
        this.collision.onCollision = (obj: GameTS.Objects.BaseObject) => {
            if (obj instanceof Dude) {
                obj.diamonds+=this.value;
                this.kill();
            }
        }
    }

}


class Enemy extends GameTS.Objects.Sprite {

    constructor(x: number, y: number) {
        super("/assets/ground-block.jpg", x, y);
        this.cacheKey = "diamond";
    }

    public value: number = 1;

    public onUpdate() {

        this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
        if (this.x < -100) {
            this.kill()
        }
    }

    public onLoadComplete(): void {
        this.collision.onCollision = (obj: GameTS.Objects.BaseObject) => {
            if (obj instanceof Dude) {
                obj.kill();
                this.game.stop();
            }
        }
    }

}


class RedDiamond extends GameTS.Objects.Sprite {

    constructor(x: number, y: number) {
        super("/assets/red-diamond.png", x, y);
        this.cacheKey = "diamond";
    }

    public value: number = 10;

    public onUpdate() {

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
            this.kill()
        }
    }

    public onLoadComplete(): void {
        this.collision.onCollision = (obj: GameTS.Objects.BaseObject) => {
            if (obj instanceof Dude) {
                obj.diamonds += this.value;
                this.kill();
            }
        }
    }

}

class GreenDiamond extends GameTS.Objects.Sprite {

    constructor(x: number, y: number) {
        super("/assets/green-diamond.png", x, y);
        this.cacheKey = "diamond";
    }

    public value: number = 100;

    public onUpdate() {
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
            this.kill()
        }
    }

    public onLoadComplete(): void {
        this.collision.onCollision = (obj: GameTS.Objects.BaseObject) => {
            if (obj instanceof Dude) {
                obj.diamonds += this.value;
                this.kill();
            }
        }
    }

}


class GoldenDiamond extends GameTS.Objects.Sprite {

    constructor(x: number, y: number) {
        super("/assets/golden-diamond.png", x, y);
        this.cacheKey = "diamond";
    }

    public value: number = 100;

    public onUpdate() {

        this.velocity.x = -gobalVars.baseVelocity;

        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity;
        //} else {
        //    this.velocity.x = 0;
        //}
        if (this.x < -100) {
            this.kill()
        }
        this.updatePosition();
    }

    public onLoadComplete(): void {
        this.collision.onCollision = (obj: GameTS.Objects.BaseObject) => {
            if (obj instanceof Dude) {
                obj.diamonds += this.value;
                this.kill();
            }
        }
    }

}

class DiamondsLabel extends GameTS.Objects.Label {

    constructor() {
        super("0");
    }

    public init(): void {
        this.iconUrl = "/assets/diamond.png";
        this.y = 5;
        this.x = this.game.w - 100;
        this.iconSize = { h: 20, w: 20 };
        super.init();
    }

    public onUpdate() {
        if (window["dude"]) {
            this.text = window["dude"].diamonds.toString();
        }
    }
}

class MetersLabel extends GameTS.Objects.Label {

    constructor() {
        super("0");
    }

    public init(): void {
        this.y = 5;
        this.x = 20;
        super.init();
    }

    public onUpdate() {
        this.text = gobalVars.meters.toString() + " Metros";
    }
}





class Back extends GameTS.Objects.RollSprite {

    constructor() {
        super("/assets/platformer_background_M.png", 0, 0);
    }

    public init(): void {
        this.w = 0;
        this.h = this.game.h;
        super.init();
    }

    public onUpdate() {

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

class Dude extends GameTS.Objects.TileSprite {

    constructor() {
        super("/assets/dude.png", 300, 70, 31, 5);
        this.addAnimation("left", [0, 1, 2, 3]);
        this.addAnimation("stopped", [4]);
        this.addAnimation("right", [5, 6, 7, 8]);
    }

    public diamonds: number = 0;

    public onLoadComplete(): void {
        this.collision.onCollision = (obj: GameTS.Objects.BaseObject) => {
            if (obj instanceof Diamond) {
                this.diamonds++;
                obj.kill();
             }
        }

    }

    public onUpdate() {

        this.setAnimation("right");
        this.velocity.x = 0;

        if (this.game.keyboard.rightArrow) {
            this.setAnimation("right");
            this.velocity.x = 250;
        } else if (this.game.keyboard.leftArrow) {
            this.setAnimation("left");
            this.velocity.x = - 250;
        }

        if (this.collision.bottom && (this.game.keyboard.upArrow)) {
            this.velocity.y = -1000;
        }
        ////console.log(this.checkCollision());
        this.updatePositionWithGravity();


    }

}

class Pos extends GameTS.Objects.Label {

    constructor() {
        super("");
        this.x = 50;
        this.y = 50;
        this.color = "black";
        this.w = 100;
    }


    public onUpdate() {
        this.updatePosition();
        this.text = this.game.mouse.x + " X " + this.game.mouse.y;
        if (this.game.keyboard.rightArrow || this.game.keyboard.d) {
            this.velocity.x = 1;
        } else if (this.game.keyboard.leftArrow || this.game.keyboard.a) {
            this.velocity.x = -1;
        } else {
            this.velocity.x = 0;
        }

        if (this.game.keyboard.upArrow || this.game.keyboard.w) {
            this.velocity.y = -1;
        } else if (this.game.keyboard.downArrow || this.game.keyboard.s) {
            this.velocity.y = 1;
        } else {
            this.velocity.y = 0;
        }
    }

}

class Ground extends GameTS.Objects.RollSprite {

    constructor() {
        super("/assets/ground-block.jpg", 0, 0, 0, 0,true,"repeat-x");
    }

    public init(): void{
        this.collision.fullCollision = false;
        this.w = this.game.w;
        this.h = 32;
        this.y = this.game.h - this.h;
        super.init();

        this.collision.onUpdate = () => window["dude"].collision.update();

    }

    public onUpdate() {
        //if (this.game.keyboard.rightArrow) {
        //    this.velocity.x = -config.baseVelocity;
        //} else if (this.game.keyboard.leftArrow) {
        //    this.velocity.x = config.baseVelocity;  
        //} else {
        //    this.velocity.x = 0;
        //}
        this.velocity.x = -gobalVars.baseVelocity;
        this.updatePosition();
    }
}




class Luffy extends GameTS.Objects.AtlasSprite {

    constructor() {
        super("/assets/luffy.png", "/assets/luffy.json");
        this.x = 100;
        this.y = 100;
        this.h = 50;
        this.setAnimation("stopedright", 5);
    }

    public onUpdate() {
        this.updatePositionWithGravity();

        if (this.game.keyboard.d) {
            this.setAnimation("running-right", 6);
            this.velocity.x = 2;
        } else if (this.game.keyboard.a) {
            this.setAnimation("running-left", 6);
            this.velocity.x = -2;
        } else {
            this.velocity.x = 0;
            this.setAnimation("stopedright", 6);
        }

        if (this.isTouchingGround && (this.game.keyboard.w)) {
            this.velocity.y = -10;
        }

    }

}

