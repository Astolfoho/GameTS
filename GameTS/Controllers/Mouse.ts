

module GameTS.Controllers {

    export enum MouseFlags {
        Left = 1,
        Right = 2,
        Middle = 4,
        Back = 8,
        Foward = 16
    }

    export enum MouseButton {
        Left = 0,
        Right = 1,
        Middle = 2,
    }

    export class Mouse {

        get left(): boolean { return this.isPressed(MouseFlags.Left);};
        get right(): boolean { return this.isPressed(MouseFlags.Right); };
        get middle(): boolean { return this.isPressed(MouseFlags.Middle); };
        get back(): boolean { return this.isPressed(MouseFlags.Middle); };
        get foward(): boolean { return this.isPressed(MouseFlags.Middle); };

        public eventButton: MouseButton;
        public x: number;
        public y: number;


        protected buttons: MouseFlags;

        constructor(buttons:MouseFlags) {
            this.buttons = buttons;
        }

        private isPressed(btn:MouseFlags):boolean {
            return (this.buttons & btn) > 0;
        }

    }

    export class MouseEventHandler extends Mouse {

        private _observers: Array<IMouseObserver>;

        constructor(private _canvas: HTMLCanvasElement) {
            super(0);
            this._observers = [];
            this.initEvents();
        }

        private initEvents() {
            this._canvas.addEventListener("mousedown", (ev:MouseEvent) => this.onMouseDown(ev));
            this._canvas.addEventListener("mouseup", (ev: MouseEvent) => this.onMouseUp(ev));
            this._canvas.addEventListener("mousemove", (ev: MouseEvent) => this.onMouseOver(ev));
        }

        private onMouseDown(ev: MouseEvent) {
            this.buttons = ev.buttons;

            var evArg = new Mouse(this.buttons);
            evArg.eventButton = ev.button;

            for (var key in this._observers) {
                this._observers[key].onMouseDown(evArg);
            }
        }

        private onMouseUp(ev: MouseEvent) {
            this.buttons = ev.buttons;

            var evArg = new Mouse(this.buttons);
            evArg.eventButton = ev.button;

            for (var key in this._observers) {
                this._observers[key].onMouseUp(evArg);
            }
        }

        private onMouseOver(ev: MouseEvent) {
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

        public addObserver(obs:IMouseObserver):void  {
            if (!obs || this._observers.indexOf(obs) > -1) {
                return;
            }
            this._observers.push(obs);
        }
    }


    export interface IMouseObserver {
        onMouseDown(mouse:Mouse): boolean;
        onMouseUp(mouse: Mouse): boolean;
        onMouseMove(x: number, y:number); 
    }



} 