var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var GameObjects;
    (function (GameObjects) {
        var ColisionDebugger = (function (_super) {
            __extends(ColisionDebugger, _super);
            function ColisionDebugger() {
                _super.call(this);
                this.x = 100;
                this.y = 100;
                this.width = 15;
                this.height = 15;
            }
            ColisionDebugger.prototype.init = function () {
                this.game.mouse.addObserver(this);
                this._btn = new GameObjects.Square(15, 15, this.x, this.y);
                this._btn.game = this.game;
            };
            ColisionDebugger.prototype.render = function (context) {
                this.onUpdate();
                this._btn.render(context);
            };
            ColisionDebugger.prototype.onUpdate = function () {
                this._btn.x = this.x;
                this._btn.y = this.y;
            };
            ColisionDebugger.prototype.onMouseDown = function (mouse) {
                if (mouse.eventButton === GameTS.Controllers.MouseButton.Left) {
                    if (this._btn.isMouseOver()) {
                        this._isDragging = true;
                    }
                }
                return false;
            };
            ColisionDebugger.prototype.onMouseUp = function (mouse) {
                if (mouse.eventButton === GameTS.Controllers.MouseButton.Left) {
                    this._isDragging = false;
                }
                return false;
            };
            ColisionDebugger.prototype.onMouseMove = function (x, y) {
                if (this._isDragging) {
                    this.x += x;
                    this.y += y;
                }
            };
            return ColisionDebugger;
        })(GameObjects.BaseObject);
        GameObjects.ColisionDebugger = ColisionDebugger;
    })(GameObjects = GameTS.GameObjects || (GameTS.GameObjects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=ColisionDebugger.js.map