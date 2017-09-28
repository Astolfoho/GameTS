import Game from '../Game'
import { BaseObject, IPosition } from './BaseObjects'
import { IDrawingContext } from '../Graphics/IDrawingContext'

export abstract class RollSprite extends BaseObject {

    public game: Game;
    private image: HTMLImageElement;
    private auxCanvas: HTMLCanvasElement;
    private imgPattern: CanvasPattern;
    private repeat: string;

    constructor(url: string, x: number, y: number, width?: number, height?: number, useCollision: boolean = false, repeat: string = "repeat") {
        super(useCollision);
        this.image = document.createElement("img");
        this.image.src = url;
        this.x = x;
        this.y = y;

        this.image.onload = () => this.onImageLoad();
        this.w = width;
        this.h = height;
        this.repeat = repeat;

    }

    private onImageLoad(): void {
        var tcanvas = document.createElement("canvas");
        var tctx = tcanvas.getContext("2d");

        if (this.h && !this.w) {
            var percent = this.h / this.image.height;
            tcanvas.height = this.image.height * percent;
            tcanvas.width = this.image.width * percent;
            this.w = this.image.width > this.game.w ? this.game.w : this.image.width;
        } else if (this.w && !this.h) {
            var percent = this.w / this.image.width;
            tcanvas.height = this.image.height * percent;
            tcanvas.width = this.image.width * percent;
            this.w = this.image.height > this.game.h ? this.game.h : this.image.height;
        } else {
            return;
        }

        tctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, tcanvas.width, tcanvas.height);
        this.auxCanvas = tcanvas;
    }

    public init(): void {
        super.init();
        this.rollPosition = <IPosition>{ x: this.x, y: this.y };
    }

    public render(context: IDrawingContext): void {
        this.onUpdate();
        this.imgPattern = this.imgPattern || context.createPattern(this.auxCanvas || this.image, this.repeat);

        context.fillStyle = this.imgPattern;

        // context.save();

        switch (this.repeat) {

            case "repeat-x":
                context.translate(this.rollPosition.x, this.rollPosition.y);
                context.fillRect(-this.rollPosition.x, 0, this.w, this.h);
                context.translate(-this.rollPosition.x, -this.rollPosition.y);
                break;

            case "repeat-y":
                context.translate(this.rollPosition.x, this.rollPosition.y);
                context.fillRect(0, -this.rollPosition.y, this.w, this.h);
                context.translate(-this.rollPosition.x, -this.rollPosition.y);
                break;


            default:
            case "repeat":
                context.translate(this.rollPosition.x, this.rollPosition.y);
                context.fillRect(-this.rollPosition.x, -this.y, this.w, this.h);
                context.translate(-this.rollPosition.x, -this.rollPosition.y);
                break;
        }
        // context.restore();
    }
    public rollPosition: IPosition;
    public updatePosition() {
        super.updatePosition(this.rollPosition);
    }
}
