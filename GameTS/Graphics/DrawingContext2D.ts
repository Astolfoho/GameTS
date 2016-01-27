module GameTS.Graphics {

    export class DrawingContext2D implements IDrawingContext {

        private _ctx: CanvasRenderingContext2D;
        private _canvas: HTMLCanvasElement;



        set strokeStyle(value: any) { this._ctx.strokeStyle = value };
        set fillStyle(value: any) { this._ctx.fillStyle = value };
        set font(value: any) { this._ctx.font = value };

        get strokeStyle(): any { return this._ctx.strokeStyle; };
        get fillStyle(): any { return this._ctx.fillStyle; };
        get font(): any { return this._ctx.font; };



        constructor(canvas: HTMLCanvasElement) {
            this._canvas = canvas;
            this._ctx = canvas.getContext("2d");
        }



        public clearRect(x: number, y: number, w: number, h: number): void {
            this._ctx.clearRect(x, y, w, h);
        }

        public fillRect(x: number, y: number, w: number, h: number): void {
            this._ctx.fillRect(x, y, w, h);

        }

        public strokeRect(x: number, y: number, w: number, h: number): void {
            this._ctx.strokeRect(x, y, w, h);

        }

        public fillText(text: string, x: number, y: number, maxW?: number): void {
            this._ctx.fillText(text, x, y, maxW);

        }

        public strokeText(text: string, x: number, y: number, maxW?: number): void {
            this._ctx.strokeText(text, x, y, maxW);

        }

        public measureText(text: string): TextMetrics {
            return this._ctx.measureText(text);
        }

        public drawImage(
            image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
            sx: number,
            sy: number,
            sw: number,
            sh: number,
            dx: number,
            dy: number,
            dw: number,
            dh: number): void {
            this._ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        }

        public translate(x: number, y: number): void {
            this._ctx.translate(x,y);
        }

        public createPattern(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, repetition: string): CanvasPattern {
            return this._ctx.createPattern(image, repetition);
        }

        public save(): void {
            this._ctx.save();
        }

        public restore(): void {
            this._ctx.restore();
        }

    }

}