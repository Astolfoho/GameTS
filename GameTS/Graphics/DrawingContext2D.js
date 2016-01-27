var GameTS;
(function (GameTS) {
    var Graphics;
    (function (Graphics) {
        var DrawingContext2D = (function () {
            function DrawingContext2D(canvas) {
                this._canvas = canvas;
                this._ctx = canvas.getContext("2d");
            }
            Object.defineProperty(DrawingContext2D.prototype, "strokeStyle", {
                get: function () { return this._ctx.strokeStyle; },
                set: function (value) { this._ctx.strokeStyle = value; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(DrawingContext2D.prototype, "fillStyle", {
                get: function () { return this._ctx.fillStyle; },
                set: function (value) { this._ctx.fillStyle = value; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(DrawingContext2D.prototype, "font", {
                get: function () { return this._ctx.font; },
                set: function (value) { this._ctx.font = value; },
                enumerable: true,
                configurable: true
            });
            ;
            ;
            ;
            ;
            DrawingContext2D.prototype.clearRect = function (x, y, w, h) {
                this._ctx.clearRect(x, y, w, h);
            };
            DrawingContext2D.prototype.fillRect = function (x, y, w, h) {
                this._ctx.fillRect(x, y, w, h);
            };
            DrawingContext2D.prototype.strokeRect = function (x, y, w, h) {
                this._ctx.strokeRect(x, y, w, h);
            };
            DrawingContext2D.prototype.fillText = function (text, x, y, maxW) {
                this._ctx.fillText(text, x, y, maxW);
            };
            DrawingContext2D.prototype.strokeText = function (text, x, y, maxW) {
                this._ctx.strokeText(text, x, y, maxW);
            };
            DrawingContext2D.prototype.measureText = function (text) {
                return this._ctx.measureText(text);
            };
            DrawingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
                this._ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
            };
            DrawingContext2D.prototype.translate = function (x, y) {
                this._ctx.translate(x, y);
            };
            DrawingContext2D.prototype.createPattern = function (image, repetition) {
                return this._ctx.createPattern(image, repetition);
            };
            DrawingContext2D.prototype.save = function () {
                this._ctx.save();
            };
            DrawingContext2D.prototype.restore = function () {
                this._ctx.restore();
            };
            return DrawingContext2D;
        })();
        Graphics.DrawingContext2D = DrawingContext2D;
    })(Graphics = GameTS.Graphics || (GameTS.Graphics = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=DrawingContext2D.js.map