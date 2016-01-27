var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Controllers;
    (function (Controllers) {
        (function (MouseFlags) {
            MouseFlags[MouseFlags["Left"] = 1] = "Left";
            MouseFlags[MouseFlags["Right"] = 2] = "Right";
            MouseFlags[MouseFlags["Middle"] = 4] = "Middle";
            MouseFlags[MouseFlags["Back"] = 8] = "Back";
            MouseFlags[MouseFlags["Foward"] = 16] = "Foward";
        })(Controllers.MouseFlags || (Controllers.MouseFlags = {}));
        var MouseFlags = Controllers.MouseFlags;
        (function (MouseButton) {
            MouseButton[MouseButton["Left"] = 0] = "Left";
            MouseButton[MouseButton["Right"] = 1] = "Right";
            MouseButton[MouseButton["Middle"] = 2] = "Middle";
        })(Controllers.MouseButton || (Controllers.MouseButton = {}));
        var MouseButton = Controllers.MouseButton;
        var Mouse = (function () {
            function Mouse(buttons) {
                this.buttons = buttons;
            }
            Object.defineProperty(Mouse.prototype, "left", {
                get: function () { return this.isPressed(MouseFlags.Left); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Mouse.prototype, "right", {
                get: function () { return this.isPressed(MouseFlags.Right); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Mouse.prototype, "middle", {
                get: function () { return this.isPressed(MouseFlags.Middle); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Mouse.prototype, "back", {
                get: function () { return this.isPressed(MouseFlags.Middle); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Mouse.prototype, "foward", {
                get: function () { return this.isPressed(MouseFlags.Middle); },
                enumerable: true,
                configurable: true
            });
            ;
            Mouse.prototype.isPressed = function (btn) {
                return (this.buttons & btn) > 0;
            };
            return Mouse;
        })();
        Controllers.Mouse = Mouse;
        var MouseEventHandler = (function (_super) {
            __extends(MouseEventHandler, _super);
            function MouseEventHandler(_canvas) {
                _super.call(this, 0);
                this._canvas = _canvas;
                this._observers = [];
                this.initEvents();
            }
            MouseEventHandler.prototype.initEvents = function () {
                var _this = this;
                this._canvas.addEventListener("mousedown", function (ev) { return _this.onMouseDown(ev); });
                this._canvas.addEventListener("mouseup", function (ev) { return _this.onMouseUp(ev); });
                this._canvas.addEventListener("mousemove", function (ev) { return _this.onMouseOver(ev); });
            };
            MouseEventHandler.prototype.onMouseDown = function (ev) {
                this.buttons = ev.buttons;
                var evArg = new Mouse(this.buttons);
                evArg.eventButton = ev.button;
                for (var key in this._observers) {
                    this._observers[key].onMouseDown(evArg);
                }
            };
            MouseEventHandler.prototype.onMouseUp = function (ev) {
                this.buttons = ev.buttons;
                var evArg = new Mouse(this.buttons);
                evArg.eventButton = ev.button;
                for (var key in this._observers) {
                    this._observers[key].onMouseUp(evArg);
                }
            };
            MouseEventHandler.prototype.onMouseOver = function (ev) {
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
            };
            MouseEventHandler.prototype.addObserver = function (obs) {
                if (!obs || this._observers.indexOf(obs) > -1) {
                    return;
                }
                this._observers.push(obs);
            };
            return MouseEventHandler;
        })(Mouse);
        Controllers.MouseEventHandler = MouseEventHandler;
    })(Controllers = GameTS.Controllers || (GameTS.Controllers = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=Mouse.js.map