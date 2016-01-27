var GameTS;
(function (GameTS) {
    var Graphics;
    (function (Graphics) {
        var DrawingContext = (function () {
            function DrawingContext() {
                this._ctx = clearRect(x, Number, y, Number, w, number, h, number);
                this.piblic = fillRect(x, number, y, number, w, number, h, number);
                this.piblic = strokeRect(x, number, y, number, w, number, h, number);
                this.piblic = fillText(text, string, x, number, y, number);
                this.piblic = strokeText(text, string, x, number, y, number);
                this.piblic = measureText(text, string);
                this.piblic = drawImage(image, HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, sx, number, sy, number, sWidth, number, sHeight, number, dx, number, dy, number, dWidth, number, dHeigh, number);
                this.piblic = save();
                this.piblic = restore();
            }
            return DrawingContext;
        })();
        Graphics.DrawingContext = DrawingContext;
    })(Graphics = GameTS.Graphics || (GameTS.Graphics = {}));
})(GameTS || (GameTS = {}));
