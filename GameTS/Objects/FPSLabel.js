var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var FPSLabel = (function (_super) {
            __extends(FPSLabel, _super);
            function FPSLabel() {
                _super.call(this, "");
                this.x = 20;
                this.y = 20;
                this.w = 100;
                this.lastDraw = new Date();
                this.fps = 0;
                this.fontSize = 10;
            }
            FPSLabel.prototype.onUpdate = function () {
                var now = new Date();
                if ((now.getTime() - this.lastDraw.getTime()) >= 1000) {
                    this.computedFps = this.fps;
                    this.lastDraw = now;
                    this.fps = 0;
                    this.text = this.computedFps + " FPS";
                }
                this.color = "black";
                this.fps++;
            };
            return FPSLabel;
        })(Objects.Label);
        Objects.FPSLabel = FPSLabel;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=fpslabel.js.map