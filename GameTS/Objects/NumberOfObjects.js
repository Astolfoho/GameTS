var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        var NumberOfObjects = (function (_super) {
            __extends(NumberOfObjects, _super);
            function NumberOfObjects() {
                _super.call(this, "");
                this.x = 20;
                this.y = 30;
                this.w = 100;
                this.fontSize = 10;
            }
            NumberOfObjects.prototype.onUpdate = function () {
                this.text = this.game.numberOfObjects.toString() + " Objects";
            };
            return NumberOfObjects;
        })(Objects.Label);
        Objects.NumberOfObjects = NumberOfObjects;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=NumberOfObjects.js.map