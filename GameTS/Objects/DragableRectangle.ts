import { Mouse, IMouseObserver } from '../Controllers/Mouse';

import { BaseObject } from './BaseObjects'
import { IDrawingContext } from '../Graphics/IDrawingContext'


module GameTS.Objects {

    export class DragableRectangle extends BaseObject implements IMouseObserver {

        public color: string;


        constructor(width: number, height: number, x: number = 10, y: number = 10) {
            super();
            this.w = width;
            this.h = height;
            this.x = x;
            this.y = y;
            this.color = "black"
        }


        public init(): void {

        }
        public render(context: CanvasRenderingContext2D): void {          
            context.strokeStyle = this.color;
            context.strokeRect(this.x, this.y, this.w, this.h);
        }

        public onUpdate(): void {

        }


        onMouseDown(mouse: Mouse): boolean {
            return false;
        }

        onMouseUp(mouse: Mouse): boolean {
            return false;
        }

        onMouseMove(x: number, y: number) {

        }
    }

} 