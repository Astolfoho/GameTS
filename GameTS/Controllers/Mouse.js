export var MouseFlags;
(function (MouseFlags) {
    MouseFlags[MouseFlags["Left"] = 1] = "Left";
    MouseFlags[MouseFlags["Right"] = 2] = "Right";
    MouseFlags[MouseFlags["Middle"] = 4] = "Middle";
    MouseFlags[MouseFlags["Back"] = 8] = "Back";
    MouseFlags[MouseFlags["Foward"] = 16] = "Foward";
})(MouseFlags || (MouseFlags = {}));
export var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Left"] = 0] = "Left";
    MouseButton[MouseButton["Right"] = 1] = "Right";
    MouseButton[MouseButton["Middle"] = 2] = "Middle";
})(MouseButton || (MouseButton = {}));
export class Mouse {
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
export class MouseEventHandler extends Mouse {
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
//# sourceMappingURL=Mouse.js.map