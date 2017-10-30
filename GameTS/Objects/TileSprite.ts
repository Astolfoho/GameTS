import { BaseObject } from './BaseObjects'
import { IDrawingContext } from '../Graphics/IDrawingContext'



export abstract class TileSprite extends BaseObject {

    private image: HTMLImageElement;
    private imageUrl: string;

    public duration: number;

    private numberOfSprites: number;
    private nextSprite: number;
    private drawnFrames: number;
    private animations: any;
    private currentAnimation: string;
    private lastRederedAnimation: string;

    constructor(url: string, x: number, y: number, width: number, duraion: number, height?: number) {
        super();
        this.image = document.createElement("img");
        this.image.src = url;

        this.x = x;
        this.y = y;
        this.image.onload = () => this.onImageLoad();
        this.w = width;
        this.h = height;
        this.duration = duraion;
        document.createElement('canvas').getContext("2d").drawImage(this.image, 0, 0);
    }

    private onImageLoad(): void {
        this.w = this.w || this.image.width;
        this.h = this.h || this.image.height;
        this.numberOfSprites = Math.floor(this.image.width / this.w);
        this.nextSprite = 0;
        if (this.currentAnimation) {
            this.resetAnimation();
        }
        //this.collision = new Physics.BasicCollisionHandler(this);
        //this.collision.add(<any>this['objsToCollide'][0]);
        this.drawnFrames = 0;
        this.collision.init();
        this.onLoadComplete();
    }

    public init(): void {

    }


    public addAnimation(name: string, sprites: Array<number>): void {
        if (!this.animations) {
            this.animations = {};
        };
        this.animations[name] = sprites;
    }

    public setAnimation(name: string) {
        if (this.currentAnimation != name) {
            this.currentAnimation = name;    
        }
    }

    public resetAnimation() {
        this.numberOfSprites = this.animations[this.currentAnimation].length;
        this.drawnFrames = 0;
        this.nextSprite = 0;
    }

    public render(context: IDrawingContext): void {

        if (this.currentAnimation != this.lastRederedAnimation || !this.lastRederedAnimation) {
            this.resetAnimation();
        }

        var spriteX = Math.floor(this.w * this.nextSprite) + this.nextSprite;
        if (this.currentAnimation) {
            this.lastRederedAnimation = this.currentAnimation;
            spriteX = Math.floor(this.w * this.animations[this.currentAnimation][this.nextSprite]) + this.animations[this.currentAnimation][this.nextSprite];
        }
        context.drawImage(this.image, spriteX, 0, this.w, this.image.height, this.x, this.y, this.w, this.h);
        if (this.drawnFrames >= this.duration) {
            this.nextSprite++;
            if (this.nextSprite >= this.numberOfSprites) {
                this.nextSprite = 0;
            }
            this.drawnFrames = 0;
        }
        this.drawnFrames++;

        //context.strokeStyle = "black";
        //context.strokeRect(this.x, this.y, this.width, this.height);
    }

    abstract onLoadComplete(): void;
}
