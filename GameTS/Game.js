/// <reference path="controllers/keyboard.ts" />
import { DrawingContext2D } from './Graphics/DrawingContext2D';
import { MouseEventHandler } from './Controllers/Mouse';
import { KeyBoard } from './Controllers/KeyBoard';
export default class Game {
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
//# sourceMappingURL=Game.js.map