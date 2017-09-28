export class DrawingContext2D {
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
//# sourceMappingURL=DrawingContext2D.js.map