class DrawingContext2D {
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
    }
    set strokeStyle(value) { this._ctx.strokeStyle = value; }
    ;
    set fillStyle(value) { this._ctx.fillStyle = value; }
    ;
    set font(value) { this._ctx.font = value; }
    ;
    get strokeStyle() { return this._ctx.strokeStyle; }
    ;
    get fillStyle() { return this._ctx.fillStyle; }
    ;
    get font() { return this._ctx.font; }
    ;
    clearRect(x, y, w, h) {
        this._ctx.clearRect(x, y, w, h);
    }
    fillRect(x, y, w, h) {
        this._ctx.fillRect(x, y, w, h);
    }
    strokeRect(x, y, w, h) {
        this._ctx.strokeRect(x, y, w, h);
    }
    fillText(text, x, y, maxW) {
        this._ctx.fillText(text, x, y, maxW);
    }
    strokeText(text, x, y, maxW) {
        this._ctx.strokeText(text, x, y, maxW);
    }
    measureText(text) {
        return this._ctx.measureText(text);
    }
    drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
        this._ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    translate(x, y) {
        this._ctx.translate(x, y);
    }
    createPattern(image, repetition) {
        return this._ctx.createPattern(image, repetition);
    }
    save() {
        this._ctx.save();
    }
    restore() {
        this._ctx.restore();
    }
}

var MouseFlags;
(function (MouseFlags) {
    MouseFlags[MouseFlags["Left"] = 1] = "Left";
    MouseFlags[MouseFlags["Right"] = 2] = "Right";
    MouseFlags[MouseFlags["Middle"] = 4] = "Middle";
    MouseFlags[MouseFlags["Back"] = 8] = "Back";
    MouseFlags[MouseFlags["Foward"] = 16] = "Foward";
})(MouseFlags || (MouseFlags = {}));
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Left"] = 0] = "Left";
    MouseButton[MouseButton["Right"] = 1] = "Right";
    MouseButton[MouseButton["Middle"] = 2] = "Middle";
})(MouseButton || (MouseButton = {}));
class Mouse {
    constructor(buttons) {
        this.buttons = buttons;
    }
    get left() { return this.isPressed(MouseFlags.Left); }
    ;
    get right() { return this.isPressed(MouseFlags.Right); }
    ;
    get middle() { return this.isPressed(MouseFlags.Middle); }
    ;
    get back() { return this.isPressed(MouseFlags.Middle); }
    ;
    get foward() { return this.isPressed(MouseFlags.Middle); }
    ;
    isPressed(btn) {
        return (this.buttons & btn) > 0;
    }
}
class MouseEventHandler extends Mouse {
    constructor(_canvas) {
        super(0);
        this._canvas = _canvas;
        this._observers = [];
        this.initEvents();
    }
    initEvents() {
        this._canvas.addEventListener("mousedown", (ev) => this.onMouseDown(ev));
        this._canvas.addEventListener("mouseup", (ev) => this.onMouseUp(ev));
        this._canvas.addEventListener("mousemove", (ev) => this.onMouseOver(ev));
    }
    onMouseDown(ev) {
        this.buttons = ev.buttons;
        var evArg = new Mouse(this.buttons);
        evArg.eventButton = ev.button;
        for (var key in this._observers) {
            this._observers[key].onMouseDown(evArg);
        }
    }
    onMouseUp(ev) {
        this.buttons = ev.buttons;
        var evArg = new Mouse(this.buttons);
        evArg.eventButton = ev.button;
        for (var key in this._observers) {
            this._observers[key].onMouseUp(evArg);
        }
    }
    onMouseOver(ev) {
        var rect = this._canvas.getBoundingClientRect();
        var x = (ev.clientX - rect.left) - this.x;
        var y = (ev.clientY - rect.top) - this.y;
        x = x || 0;
        y = y || 0;
        this.x = (ev.clientX - rect.left);
        this.y = (ev.clientY - rect.top);
        for (var key in this._observers) {
            this._observers[key].onMouseMove(x, y);
        }
    }
    addObserver(obs) {
        if (!obs || this._observers.indexOf(obs) > -1) {
            return;
        }
        this._observers.push(obs);
    }
}

class KeyBoard {
    constructor(canvas) {
        this.canvas = canvas;
        canvas.addEventListener("keydown", (ev) => this.canvas_KeyDown(ev));
        canvas.addEventListener("keyup", (ev) => this.canvas_KeyUp(ev));
    }
    canvas_KeyDown(event) {
        this[KeyCodes[event.keyCode]] = true;
    }
    canvas_KeyUp(event) {
        this[KeyCodes[event.keyCode]] = false;
    }
}
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["backspace"] = 8] = "backspace";
    KeyCodes[KeyCodes["tab"] = 9] = "tab";
    KeyCodes[KeyCodes["enter"] = 13] = "enter";
    KeyCodes[KeyCodes["shift"] = 16] = "shift";
    KeyCodes[KeyCodes["ctrl"] = 17] = "ctrl";
    KeyCodes[KeyCodes["alt"] = 18] = "alt";
    KeyCodes[KeyCodes["pauseBreak"] = 19] = "pauseBreak";
    KeyCodes[KeyCodes["capsLock"] = 20] = "capsLock";
    KeyCodes[KeyCodes["escape"] = 27] = "escape";
    KeyCodes[KeyCodes["pageUp"] = 33] = "pageUp";
    KeyCodes[KeyCodes["pageDown"] = 34] = "pageDown";
    KeyCodes[KeyCodes["end"] = 35] = "end";
    KeyCodes[KeyCodes["home"] = 36] = "home";
    KeyCodes[KeyCodes["leftArrow"] = 37] = "leftArrow";
    KeyCodes[KeyCodes["upArrow"] = 38] = "upArrow";
    KeyCodes[KeyCodes["rightArrow"] = 39] = "rightArrow";
    KeyCodes[KeyCodes["downArrow"] = 40] = "downArrow";
    KeyCodes[KeyCodes["insert"] = 45] = "insert";
    KeyCodes[KeyCodes["delete"] = 46] = "delete";
    KeyCodes[KeyCodes["num0"] = 48] = "num0";
    KeyCodes[KeyCodes["num1"] = 49] = "num1";
    KeyCodes[KeyCodes["num2"] = 50] = "num2";
    KeyCodes[KeyCodes["num3"] = 51] = "num3";
    KeyCodes[KeyCodes["num4"] = 52] = "num4";
    KeyCodes[KeyCodes["num5"] = 53] = "num5";
    KeyCodes[KeyCodes["num6"] = 54] = "num6";
    KeyCodes[KeyCodes["num7"] = 55] = "num7";
    KeyCodes[KeyCodes["num8"] = 56] = "num8";
    KeyCodes[KeyCodes["num9"] = 57] = "num9";
    KeyCodes[KeyCodes["a"] = 65] = "a";
    KeyCodes[KeyCodes["b"] = 66] = "b";
    KeyCodes[KeyCodes["c"] = 67] = "c";
    KeyCodes[KeyCodes["d"] = 68] = "d";
    KeyCodes[KeyCodes["e"] = 69] = "e";
    KeyCodes[KeyCodes["f"] = 70] = "f";
    KeyCodes[KeyCodes["g"] = 71] = "g";
    KeyCodes[KeyCodes["h"] = 72] = "h";
    KeyCodes[KeyCodes["i"] = 73] = "i";
    KeyCodes[KeyCodes["j"] = 74] = "j";
    KeyCodes[KeyCodes["k"] = 75] = "k";
    KeyCodes[KeyCodes["l"] = 76] = "l";
    KeyCodes[KeyCodes["m"] = 77] = "m";
    KeyCodes[KeyCodes["n"] = 78] = "n";
    KeyCodes[KeyCodes["o"] = 79] = "o";
    KeyCodes[KeyCodes["p"] = 80] = "p";
    KeyCodes[KeyCodes["q"] = 81] = "q";
    KeyCodes[KeyCodes["r"] = 82] = "r";
    KeyCodes[KeyCodes["s"] = 83] = "s";
    KeyCodes[KeyCodes["t"] = 84] = "t";
    KeyCodes[KeyCodes["u"] = 85] = "u";
    KeyCodes[KeyCodes["v"] = 86] = "v";
    KeyCodes[KeyCodes["w"] = 87] = "w";
    KeyCodes[KeyCodes["x"] = 88] = "x";
    KeyCodes[KeyCodes["y"] = 89] = "y";
    KeyCodes[KeyCodes["z"] = 90] = "z";
    KeyCodes[KeyCodes["leftWindowKey"] = 91] = "leftWindowKey";
    KeyCodes[KeyCodes["rightWindowKey"] = 92] = "rightWindowKey";
    KeyCodes[KeyCodes["selectKey"] = 93] = "selectKey";
    KeyCodes[KeyCodes["numpad0"] = 96] = "numpad0";
    KeyCodes[KeyCodes["numpad1"] = 97] = "numpad1";
    KeyCodes[KeyCodes["numpad2"] = 98] = "numpad2";
    KeyCodes[KeyCodes["numpad3"] = 99] = "numpad3";
    KeyCodes[KeyCodes["numpad4"] = 100] = "numpad4";
    KeyCodes[KeyCodes["numpad5"] = 101] = "numpad5";
    KeyCodes[KeyCodes["numpad6"] = 102] = "numpad6";
    KeyCodes[KeyCodes["numpad7"] = 103] = "numpad7";
    KeyCodes[KeyCodes["numpad8"] = 104] = "numpad8";
    KeyCodes[KeyCodes["numpad9"] = 105] = "numpad9";
    KeyCodes[KeyCodes["multiply"] = 106] = "multiply";
    KeyCodes[KeyCodes["add"] = 107] = "add";
    KeyCodes[KeyCodes["subtract"] = 109] = "subtract";
    KeyCodes[KeyCodes["decimalPoint"] = 110] = "decimalPoint";
    KeyCodes[KeyCodes["divide"] = 111] = "divide";
    KeyCodes[KeyCodes["f1"] = 112] = "f1";
    KeyCodes[KeyCodes["f2"] = 113] = "f2";
    KeyCodes[KeyCodes["f3"] = 114] = "f3";
    KeyCodes[KeyCodes["f4"] = 115] = "f4";
    KeyCodes[KeyCodes["f5"] = 116] = "f5";
    KeyCodes[KeyCodes["f6"] = 117] = "f6";
    KeyCodes[KeyCodes["f7"] = 118] = "f7";
    KeyCodes[KeyCodes["f8"] = 119] = "f8";
    KeyCodes[KeyCodes["f9"] = 120] = "f9";
    KeyCodes[KeyCodes["f10"] = 121] = "f10";
    KeyCodes[KeyCodes["f11"] = 122] = "f11";
    KeyCodes[KeyCodes["f12"] = 123] = "f12";
    KeyCodes[KeyCodes["numLock"] = 144] = "numLock";
    KeyCodes[KeyCodes["scrollLock"] = 145] = "scrollLock";
    KeyCodes[KeyCodes["semiColon"] = 186] = "semiColon";
    KeyCodes[KeyCodes["equalSign"] = 187] = "equalSign";
    KeyCodes[KeyCodes["comma"] = 188] = "comma";
    KeyCodes[KeyCodes["dash"] = 189] = "dash";
    KeyCodes[KeyCodes["period"] = 190] = "period";
    KeyCodes[KeyCodes["forwardSlash"] = 191] = "forwardSlash";
    KeyCodes[KeyCodes["graveAccent"] = 192] = "graveAccent";
    KeyCodes[KeyCodes["openBracket"] = 219] = "openBracket";
    KeyCodes[KeyCodes["backSlash"] = 220] = "backSlash";
    KeyCodes[KeyCodes["closeBraket"] = 221] = "closeBraket";
    KeyCodes[KeyCodes["singleQuote"] = 222] = "singleQuote";
})(KeyCodes || (KeyCodes = {}));

/// <reference path="controllers/keyboard.ts" />
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.tabIndex = 1;
        this.initVars();
        this.initSprites();
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback) {
                return setTimeout(callback, 16);
            };
        }
    }
    get numberOfObjects() { return this.gameObjects.length; }
    ;
    initVars() {
        this.gameObjects = [];
        this.context = new DrawingContext2D(this.canvas);
        this.keyboard = new KeyBoard(this.canvas);
        this.mouse = new MouseEventHandler(this.canvas);
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this._junk = [];
    }
    initSprites() {
        this.gameObjects.forEach(f => f.init());
    }
    draw() {
        var run = this.isRunning;
        var time = new Date().getTime();
        var timestep = time - this._lastDraw || 0;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameObjects.forEach(f => {
            if (f.isAlive) {
                this.context.save();
                if (f.collision)
                    f.collision.update();
                f.preRender(this.context, timestep);
                this.context.restore();
            }
            else {
                this._junk.push(f);
            }
        });
        if (run) {
            this.getNextFrame();
        }
        this._lastDraw = time;
    }
    collectGarbage() {
        this._junk.forEach(f => {
            var i = this.gameObjects.indexOf(f);
            if (i > -1) {
                this.gameObjects.splice(this.gameObjects.indexOf(f), 1);
            }
        });
        this._junk = [];
        setTimeout(() => this.collectGarbage(), 100);
    }
    addObject(obj) {
        obj.game = this;
        if (this.isRunning) {
            obj.init();
            obj.isAlive = true;
            obj.onGameStart();
        }
        this.gameObjects.push(obj);
    }
    getNextFrame() {
        this.cancelAnimationToken = window.requestAnimationFrame((time) => this.draw());
    }
    stop() {
        this.isRunning = false;
    }
    start() {
        this.gameObjects.forEach(f => { f.isAlive = true; f.onGameStart(); });
        this.gameObjects.forEach(f => { f.init(); });
        this.isRunning = true;
        this.collectGarbage();
        this.getNextFrame();
    }
    getJsonSync(url) {
        var xhr;
        if (typeof XMLHttpRequest !== 'undefined')
            xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch (e) { }
            } // end for
        }
        xhr.open('GET', url, false);
        xhr.send('');
        return xhr.responseText;
    }
    getImageSync(url, callback) {
        var xhr = new XMLHttpRequest();
        if (typeof XMLHttpRequest !== 'undefined')
            xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch (e) { }
            } // end for
        }
        xhr.onload = (e) => {
            var arr = new Uint8Array(xhr.response);
            // Convert the int array to a binary string
            // We have to use apply() as we are converting an *array*
            // and String.fromCharCode() takes one or more single values, not
            // an array.
            var raw = String.fromCharCode.apply(null, arr);
            // This works!!!
            var b64 = btoa(raw);
            var dataURL = "data:image/png;base64," + b64;
            callback(dataURL);
        };
        xhr.open('GET', url, true);
        // Must include this line - specifies the response type we want
        xhr.responseType = 'arraybuffer';
        xhr.send();
    }
}

class BasicCollisionHandler {
    constructor(obj) {
        this.fullCollision = false;
        this.obj = obj;
        this._cells = [];
        this._objsToCollide = [];
        this.current = 0;
    }
    get left() { return this.colPosition(CollisionResult.left); }
    ;
    get right() { return this.colPosition(CollisionResult.right); }
    ;
    get top() { return this.colPosition(CollisionResult.top); }
    ;
    get bottom() { return this.colPosition(CollisionResult.bottom); }
    ;
    colPosition(col) {
        return (this.current & col) > 0;
    }
    init() {
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
    }
    update() {
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
    }
    add(otherObj) {
        this._objsToCollide.push(otherObj);
    }
    isColliding(otherObj) {
        var res = this.firstPhase(otherObj);
        if (res && (!this.fullCollision || this.secondPhase(otherObj))) {
            return res;
        }
        return CollisionResult.none;
    }
    firstPhase(otherObj) {
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
    }
    secondPhase(otherObj) {
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
    }
    confirmCollision(cell) {
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
    }
}
BasicCollisionHandler.cache = {};
class CollisionCell {
    constructor(x, y, w, h, parent) {
        this._baseX = x * w;
        this._baseY = y * h;
        this.w = w;
        this.h = h;
        this._cells = [];
        this.parent = parent;
        this.topCell = this.parent.topCell || this;
        this.init();
    }
    //private static _cache = {};
    get x() { return this.parent.x + this._baseX; }
    ;
    get y() { return this.parent.y + this._baseY; }
    ;
    init() {
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
    }
    isTransparent() {
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
    }
    isColliding(otherObj) {
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
    }
    setDebug(ctx) {
        this.ctx = ctx;
        this._cells.forEach((c) => c.setDebug(this.ctx));
    }
}
var CollisionResult;
(function (CollisionResult) {
    CollisionResult[CollisionResult["none"] = 0] = "none";
    CollisionResult[CollisionResult["left"] = 1] = "left";
    CollisionResult[CollisionResult["right"] = 2] = "right";
    CollisionResult[CollisionResult["top"] = 4] = "top";
    CollisionResult[CollisionResult["bottom"] = 8] = "bottom";
})(CollisionResult || (CollisionResult = {}));

class BaseObject {
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
class Velocity {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

class Sprite extends BaseObject {
    constructor(url, x, y, width, height, repeat) {
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
    onImageLoad() {
        this.w = this.w || this.image.width;
        this.h = this.h || this.image.height;
        this.collision.init();
        this.onLoadComplete();
    }
    init() {
        super.init();
    }
    render(context) {
        if (!this.repeat) {
            context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.w, this.h);
        }
        else {
            var ptrn = this.pattern || context.createPattern(this.image, this.repeat);
            context.fillStyle = ptrn;
            context.translate(this.x, this.y);
            context.fillRect(-this.x, -this.y, this.w, this.h);
            context.translate(-this.x, -this.y);
        }
    }
}

class RollSprite extends BaseObject {
    constructor(url, x, y, width, height, useCollision = false, repeat = "repeat") {
        super(useCollision);
        this.image = document.createElement("img");
        this.image.src = url;
        this.x = x;
        this.y = y;
        this.image.onload = () => this.onImageLoad();
        this.w = width;
        this.h = height;
        this.repeat = repeat;
    }
    onImageLoad() {
        var tcanvas = document.createElement("canvas");
        var tctx = tcanvas.getContext("2d");
        if (this.h && !this.w) {
            var percent = this.h / this.image.height;
            tcanvas.height = this.image.height * percent;
            tcanvas.width = this.image.width * percent;
            this.w = this.image.width > this.game.w ? this.game.w : this.image.width;
        }
        else if (this.w && !this.h) {
            var percent = this.w / this.image.width;
            tcanvas.height = this.image.height * percent;
            tcanvas.width = this.image.width * percent;
            this.w = this.image.height > this.game.h ? this.game.h : this.image.height;
        }
        else {
            return;
        }
        tctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, tcanvas.width, tcanvas.height);
        this.auxCanvas = tcanvas;
    }
    init() {
        super.init();
        this.rollPosition = { x: this.x, y: this.y };
    }
    render(context) {
        this.imgPattern = this.imgPattern || context.createPattern(this.auxCanvas || this.image, this.repeat);
        context.fillStyle = this.imgPattern;
        // context.save();
        switch (this.repeat) {
            case "repeat-x":
                context.translate(this.rollPosition.x, this.rollPosition.y);
                context.fillRect(-this.rollPosition.x, 0, this.w, this.h);
                context.translate(-this.rollPosition.x, -this.rollPosition.y);
                break;
            case "repeat-y":
                context.translate(this.rollPosition.x, this.rollPosition.y);
                context.fillRect(0, -this.rollPosition.y, this.w, this.h);
                context.translate(-this.rollPosition.x, -this.rollPosition.y);
                break;
            default:
            case "repeat":
                context.translate(this.rollPosition.x, this.rollPosition.y);
                context.fillRect(-this.rollPosition.x, -this.y, this.w, this.h);
                context.translate(-this.rollPosition.x, -this.rollPosition.y);
                break;
        }
        // context.restore();
    }
    updatePosition() {
        super.updatePosition(this.rollPosition);
    }
}

//declare interface HTMLImageElement {
//    isReady: boolean;
//}

class TileSprite extends BaseObject {
    constructor(url, x, y, width, duraion, height) {
        super();
        this.image = document.createElement("img");
        this.image.src = url;
        this.x = x;
        this.y = y;
        this.image.onload = () => this.onImageLoad();
        this.w = width;
        this.h = height;
        this.duration = duraion;
        document.createElement('canvas').getContext("2d").drawImage(this.image, 0, 0);
    }
    onImageLoad() {
        this.w = this.w || this.image.width;
        this.h = this.h || this.image.height;
        this.numberOfSprites = Math.floor(this.image.width / this.w);
        this.nextSprite = 0;
        if (this.currentAnimation) {
            this.resetAnimation();
        }
        //this.collision = new Physics.BasicCollisionHandler(this);
        //this.collision.add(<any>this['objsToCollide'][0]);
        this.drawnFrames = 0;
        this.collision.init();
        this.onLoadComplete();
    }
    init() {
    }
    addAnimation(name, sprites) {
        if (!this.animations) {
            this.animations = {};
        }
        
        this.animations[name] = sprites;
    }
    setAnimation(name) {
        if (this.currentAnimation != name) {
            this.currentAnimation = name;
        }
    }
    resetAnimation() {
        this.numberOfSprites = this.animations[this.currentAnimation].length;
        this.drawnFrames = 0;
        this.nextSprite = 0;
    }
    render(context) {
        if (this.currentAnimation != this.lastRederedAnimation || !this.lastRederedAnimation) {
            this.resetAnimation();
        }
        var spriteX = Math.floor(this.w * this.nextSprite) + this.nextSprite;
        if (this.currentAnimation) {
            this.lastRederedAnimation = this.currentAnimation;
            spriteX = Math.floor(this.w * this.animations[this.currentAnimation][this.nextSprite]) + this.animations[this.currentAnimation][this.nextSprite];
        }
        context.drawImage(this.image, spriteX, 0, this.w, this.image.height, this.x, this.y, this.w, this.h);
        if (this.drawnFrames >= this.duration) {
            this.nextSprite++;
            if (this.nextSprite >= this.numberOfSprites) {
                this.nextSprite = 0;
            }
            this.drawnFrames = 0;
        }
        this.drawnFrames++;
        //context.strokeStyle = "black";
        //context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class AtlasSprite extends BaseObject {
    constructor(imageUrl, atlasJsonUrl, useCollisionHandler = false) {
        super(useCollisionHandler);
        this.imageUrl = imageUrl;
        this.atlasJsonUrl = atlasJsonUrl;
        this.animations = {};
    }
    init() {
        this.image = document.createElement("img");
        this.image.src = this.imageUrl;
        var animRegex = /^([0-9a-z-]*)\/(.*)$/i;
        var json = this.game.getJsonSync(this.atlasJsonUrl);
        this.atlasObj = JSON.parse(json);
        for (var key in this.atlasObj.frames) {
            var it = this.atlasObj.frames[key];
            if (animRegex.test(it.filename)) {
                var mat = animRegex.exec(it.filename);
                var name = mat[1];
                var index = parseInt(mat[2]) - 1;
                if (isNaN(index)) {
                    continue;
                }
                if (this.animations[name]) {
                    this.animations[name]["frames"][index] = this.atlasObj.frames[key];
                }
                else {
                    this.animations[name] = new AtlasAnimation();
                    this.animations[name]["frames"][index] = this.atlasObj.frames[key];
                }
            }
        }
        if (this.currentAnimationName) {
            this.setAnimation(this.currentAnimationName, this.currentAnimationDuration);
        }
    }
    setAnimation(name, duration = 0) {
        this.currentAnimationName = name;
        this.currentAnimationDuration = duration;
        if (this.animations[name] && this.currentAnimation != this.animations[name]) {
            this.currentAnimation = this.animations[name];
            this.currentAnimation.durationPerFrame = duration;
            this.currentAnimation.reset();
        }
    }
    render(context) {
        if (this.currentAnimation) {
            var fr = this.currentAnimation.getNextFrame();
            this.w = fr.sourceSize.w;
            this.h = fr.sourceSize.h;
            context.drawImage(this.image, fr.frame.x, fr.frame.y, fr.frame.w, fr.frame.h, this.x, this.y, fr.frame.w, fr.frame.h);
        }
    }
}
class AtlasAnimation {
    constructor() {
        this.frames = [];
        this.position = -1;
        this.durationCount = 0;
    }
    getNextFrame() {
        this.durationCount--;
        if (this.durationCount < 1) {
            this.position++;
            if (this.position > this.frames.length - 1) {
                this.position = 0;
            }
            this.durationCount = this.durationPerFrame;
        }
        return this.frames[this.position];
    }
    reset() {
        this.position = -1;
        this.durationCount = 0;
    }
}

var gobalVars = {
    baseVelocity: 300,
    meters: 0
};

class Diamond extends Sprite {
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







class SolidColorBack extends BaseObject {
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
class Dude extends TileSprite {
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

class Ground extends RollSprite {
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
class Luffy extends AtlasSprite {
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

class PropertiesView extends BaseObject {
    constructor(obj, x, y) {
        super(false);
        this._lineH = 12;
        this._obj = obj;
        this.x = x;
        this.y = y;
    }
    render(context) {
        var i = 1;
        var keys = Object.getOwnPropertyNames(this._obj);
        context.strokeStyle = "white";
        context.strokeRect(this.x - 7, this.y, 250, keys.length * this._lineH + 7);
        context.fillStyle = "rgba(255,255,255,.4)";
        context.fillRect(this.x - 7, this.y, 250, keys.length * this._lineH + 7);
        for (var i = 0; i < keys.length; i++) {
            var iplus = i + 1;
            var lineY = iplus * this._lineH + this.y;
            context.fillStyle = "black";
            context.fillText(`${keys[i]}:${this._obj[keys[i]]}`, this.x, lineY);
        }
    }
    onUpdate() {
    }
}

window["gobalVars"] = {};
var canvas = document.getElementById("theCanvas");
var game = new Game(canvas);
var back = new SolidColorBack();
back.color = "cornflowerblue";
game.addObject(back);
var ground = new Ground();
game.addObject(ground);
var luffy = new Luffy();
luffy.colide(ground);
game.addObject(luffy);
var dude = new Dude();
dude.colide(ground);
game.addObject(dude);
game.start();
dude.colide(luffy);
var pv = new PropertiesView(luffy.collision, 10, 10);
game.addObject(pv);
var pv = new PropertiesView(dude.collision, 300, 10);
game.addObject(pv);
