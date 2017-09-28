import { BaseObject } from './BaseObjects';
var GameTS;
(function (GameTS) {
    var Objects;
    (function (Objects) {
        class DragableRectangle extends BaseObject {
            constructor(width, height, x = 10, y = 10) {
                super();
                this.w = width;
                this.h = height;
                this.x = x;
                this.y = y;
                this.color = "black";
            }
            init() {
            }
            render(context) {
                context.strokeStyle = this.color;
                context.strokeRect(this.x, this.y, this.w, this.h);
            }
            onUpdate() {
            }
            onMouseDown(mouse) {
                return false;
            }
            onMouseUp(mouse) {
                return false;
            }
            onMouseMove(x, y) {
            }
        }
        Objects.DragableRectangle = DragableRectangle;
    })(Objects = GameTS.Objects || (GameTS.Objects = {}));
})(GameTS || (GameTS = {}));
//# sourceMappingURL=DragableRectangle.js.map