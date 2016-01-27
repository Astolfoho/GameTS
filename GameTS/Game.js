/// <reference path="controllers/keyboard.ts" />
var GameTS;
(function (GameTS) {
    var Game = (function () {
        function Game(canvas) {
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
        Object.defineProperty(Game.prototype, "numberOfObjects", {
            get: function () { return this.gameObjects.length; },
            enumerable: true,
            configurable: true
        });
        ;
        Game.prototype.initVars = function () {
            this.gameObjects = [];
            this.context = new GameTS.Graphics.DrawingContext2D(this.canvas);
            this.keyboard = new GameTS.Controllers.KeyBoard(this.canvas);
            this.mouse = new GameTS.Controllers.MouseEventHandler(this.canvas);
            this.w = this.canvas.width;
            this.h = this.canvas.height;
            this._junk = [];
        };
        Game.prototype.initSprites = function () {
            this.gameObjects.forEach(function (f) { return f.init(); });
        };
        Game.prototype.draw = function () {
            var _this = this;
            var run = this.isRunning;
            var time = new Date().getTime();
            var timestep = time - this._lastDraw || 0;
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameObjects.forEach(function (f) {
                if (f.isAlive) {
                    _this.context.save();
                    if (f.collision)
                        f.collision.update();
                    f.preRender(_this.context, timestep);
                    _this.context.restore();
                }
                else {
                    _this._junk.push(f);
                }
            });
            if (run) {
                this.getNextFrame();
            }
            this._lastDraw = time;
        };
        Game.prototype.collectGarbage = function () {
            var _this = this;
            this._junk.forEach(function (f) {
                var i = _this.gameObjects.indexOf(f);
                if (i > -1) {
                    _this.gameObjects.splice(_this.gameObjects.indexOf(f), 1);
                }
            });
            this._junk = [];
            setTimeout(function () { return _this.collectGarbage(); }, 100);
        };
        Game.prototype.addObject = function (obj) {
            obj.game = this;
            if (this.isRunning) {
                obj.init();
                obj.isAlive = true;
                obj.onGameStart();
            }
            this.gameObjects.push(obj);
        };
        Game.prototype.getNextFrame = function () {
            var _this = this;
            this.cancelAnimationToken = window.requestAnimationFrame(function (time) { return _this.draw(); });
        };
        Game.prototype.stop = function () {
            this.isRunning = false;
        };
        Game.prototype.start = function () {
            this.gameObjects.forEach(function (f) { f.isAlive = true; f.onGameStart(); });
            this.gameObjects.forEach(function (f) { f.init(); });
            this.isRunning = true;
            this.collectGarbage();
            this.getNextFrame();
        };
        Game.prototype.getJsonSync = function (url) {
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
        };
        Game.prototype.getImageSync = function (url, callback) {
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
            xhr.onload = function (e) {
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
        };
        return Game;
    })();
    GameTS.Game = Game;
})(GameTS || (GameTS = {}));
//# sourceMappingURL=game.js.map