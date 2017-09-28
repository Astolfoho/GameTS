
import { BaseObject } from './BaseObjects'
import { IDrawingContext } from '../Graphics/IDrawingContext'

import { IAtlas, IAtlasFrame } from './IAtlas'

export abstract class AtlasSprite extends BaseObject {

    private imageUrl: string;
    private atlasJsonUrl: string;
    private atlasObj: IAtlas;
    private image: HTMLImageElement;
    private animations: Object;
    private currentAnimation: AtlasAnimation;
    private currentAnimationName: string;
    private currentAnimationDuration: number;

    constructor(imageUrl: string, atlasJsonUrl: string) {
        super();
        this.imageUrl = imageUrl;
        this.atlasJsonUrl = atlasJsonUrl;
        this.animations = {};
    }


    public init(): void {

        this.image = document.createElement("img");
        this.image.src = this.imageUrl;

        var animRegex = /^([0-9a-z-]*)\/(.*)$/i;
        var json: string = this.game.getJsonSync(this.atlasJsonUrl);
        this.atlasObj = JSON.parse(json);

        for (var key in this.atlasObj.frames) {
            var it = this.atlasObj.frames[key];

            if (animRegex.test(it.filename)) {
                var mat = animRegex.exec(it.filename);
                var name = mat[1];
                var index = parseInt(mat[2]) - 1;

                if (isNaN(index)) {
                    continue;
                }

                if (this.animations[name]) {
                    this.animations[name]["frames"][index] = this.atlasObj.frames[key];
                } else {
                    this.animations[name] = new AtlasAnimation();
                    this.animations[name]["frames"][index] = this.atlasObj.frames[key];
                }
            }
        }

        if (this.currentAnimationName) {
            this.setAnimation(this.currentAnimationName, this.currentAnimationDuration);
        }
    }

    public setAnimation(name: string, duration: number = 0) {
        this.currentAnimationName = name;
        this.currentAnimationDuration = duration;
        if (this.animations[name] && this.currentAnimation != this.animations[name]) {
            this.currentAnimation = this.animations[name];
            this.currentAnimation.durationPerFrame = duration;
            this.currentAnimation.reset();
        }
    }

    public render(context: IDrawingContext): void {
        this.onUpdate();


        if (this.currentAnimation) {
            var fr = this.currentAnimation.getNextFrame();
            this.w = fr.sourceSize.w;
            this.h = fr.sourceSize.h;
            context.drawImage(this.image, fr.frame.x, fr.frame.y, fr.frame.w, fr.frame.h, this.x, this.y, fr.frame.w, fr.frame.h);
        }
    }

}

class AtlasAnimation {

    public frames: Array<IAtlasFrame>;
    public durationPerFrame: number;
    private position: number;
    private durationCount: number;

    constructor() {
        this.frames = [];
        this.position = -1;
        this.durationCount = 0;
    }

    public getNextFrame(): IAtlasFrame {
        this.durationCount--;
        if (this.durationCount < 1) {
            this.position++;
            if (this.position > this.frames.length - 1) {
                this.position = 0;
            }
            this.durationCount = this.durationPerFrame;
        }
        return this.frames[this.position];
    }

    public reset() {
        this.position = -1;
        this.durationCount = 0;
    }

}

