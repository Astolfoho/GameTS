import { BaseObject } from '../Objects/BaseObjects'

export class BasicCollisionHandler implements ICollisionHandler {


    public static cache: any = {};

    private _cells: Array<CollisionCell>;
    private obj: BaseObject;
    private _objsToCollide: Array<BaseObject>;

    public cellSize: number;
    public onCollision: CollisionCallback;

    get left(): boolean { return this.colPosition(CollisionResult.left); };
    get right(): boolean { return this.colPosition(CollisionResult.right); };
    get top(): boolean { return this.colPosition(CollisionResult.top); };
    get bottom(): boolean { return this.colPosition(CollisionResult.bottom); };


    public current: CollisionResult;

    public fullCollision: boolean = true;

    public onUpdate: UpdateCallback;

    private colPosition(col: CollisionResult): boolean {
        return (this.current & col) > 0;
    }

    constructor(obj: BaseObject) {
        this.obj = obj;
        this._cells = [];
        this._objsToCollide = [];
        this.current = 0;
    }

    public init(): void {
        if (this.fullCollision) {
            if (!this.obj.cacheKey || !BasicCollisionHandler.cache[this.obj.cacheKey]) {
                var xd = Math.floor(this.obj.w / 2);
                var yd = Math.floor(this.obj.h / 2);
                var xs = Math.floor(this.obj.w / xd);
                var ys = Math.floor(this.obj.h / yd);
                for (var x = 0; x < xs; x++) {
                    for (var y = 0; y < ys; y++) {
                        var cc = new CollisionCell(x, y, xd, yd, this.obj)
                        if (!cc.isTransparent()) {
                            this._cells.push(cc);
                        }
                    }
                }

                if (this.obj.cacheKey && this._cells.length > 0) {
                    BasicCollisionHandler.cache[this.obj.cacheKey] = this._cells;
                }
            } else {
                this._cells = BasicCollisionHandler.cache[this.obj.cacheKey];
            }
        }
    }

    public update(): void {
        this.current = 0;

        if (this.onUpdate) {
            this.onUpdate();
        }

        for (var k in this._objsToCollide) {
            if (this._objsToCollide[k].isAlive) {
                var result = this.isColliding(this._objsToCollide[k]);
                this.current = this.current | result;
                if (result > 0 && this.onCollision) {
                    this.onCollision(this._objsToCollide[k]);
                }
            } else {
                var i = this._objsToCollide.indexOf(this._objsToCollide[k]);
                if (i > -1) {
                    this._objsToCollide.splice(i, 1);
                }
            }
        }
    }

    public add(otherObj: BaseObject): void {
        this._objsToCollide.push(otherObj);
    }



    public isColliding(otherObj: BaseObject): CollisionResult {
        var res = this.firstPhase(otherObj);
        if (res && (!this.fullCollision || this.secondPhase(otherObj))) {
            return res;
        }
        return CollisionResult.none;
    }

    private firstPhase(otherObj: BaseObject): CollisionResult {
        var ret = CollisionResult.none;
        if (this.obj.x < otherObj.x + otherObj.w &&
            this.obj.x + this.obj.w > otherObj.x &&
            this.obj.h + this.obj.y > otherObj.y &&
            this.obj.y < otherObj.y + otherObj.h) {

            if ((this.obj.x < otherObj.x)) {
                ret = CollisionResult.left | ret;
            } else {
                ret = CollisionResult.right | ret;
            }

            if (this.obj.y > otherObj.y) {
                ret = CollisionResult.top | ret;
            } else {
                ret = CollisionResult.bottom | ret;
            }
        }
        return ret;
    }

    private secondPhase(otherObj: BaseObject): boolean {
        for (var key in this._cells) {
            var cell = this._cells[key];
            cell.parent = this.obj;
            var cc = cell.isColliding(otherObj);
            if (cc) {
                if (otherObj.collision.confirmCollision(cc)) {
                    return true;
                }
            }
        }
        return false;
    }

    public confirmCollision(cell: CollisionCell) {
        if (this.fullCollision) {
            for (var key in this._cells) {
                var cc = this._cells[key];
                if (cc.isColliding(cell)) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }
}

class CollisionCell implements ICollisionInfo {

    //private static _cache = {};


    get x(): number { return this.parent.x + this._baseX; };
    get y(): number { return this.parent.y + this._baseY; };

    private _baseX: number;
    private _baseY: number;
    private _cells: Array<CollisionCell>;
    private ctx: CanvasRenderingContext2D;

    public w: number;
    public h: number;
    public parent: BaseObject | CollisionCell;
    public topCell: CollisionCell;

    constructor(x: number, y: number, w: number, h: number, parent: BaseObject | CollisionCell) {
        this._baseX = x * w;
        this._baseY = y * h;
        this.w = w;
        this.h = h
        this._cells = [];
        this.parent = parent;
        this.topCell = (<CollisionCell>this.parent).topCell || this;
        this.init();
    }

    public init(): void {
        var xd = Math.floor(this.w / 2);
        var yd = Math.floor(this.h / 2);
        var xs = Math.floor(this.w / xd);
        var ys = Math.floor(this.h / yd);

        if (xs !== Infinity && ys !== Infinity) {
            for (var x = 0; x < xs; x++) {
                for (var y = 0; y < ys; y++) {
                    var cc = new CollisionCell(x, y, xd, yd, this);
                    if (!cc.isTransparent()) {
                        this._cells.push(cc);
                    }
                }
            }
        }
    }

    private auxCtx: CanvasRenderingContext2D;
    public isTransparent(): boolean {
        if (!this.auxCtx) {
            var can = document.createElement("canvas");
            this.auxCtx = can.getContext("2d");
            this.auxCtx.fillStyle = "rgba(1,2,3,1)";
            this.auxCtx.fillRect(0, 0, 1000, 1000);
            (<any>this.topCell.parent).preRender(this.auxCtx, 0);
        }

        for (var w = 0; w < this.w; w++) {
            for (var h = 0; h < this.h; h++) {
                var idata = this.auxCtx.getImageData(this.x + w, this.y + h, 1, 1);
                if (idata.data[0] != 1
                    || idata.data[1] != 2
                    || idata.data[2] != 3
                    || idata.data[3] != 255) {
                    return false;
                }
            }
        }

        return true;
    }

    public isColliding(otherObj: BaseObject | CollisionCell): CollisionCell {
        if (this.x < otherObj.x + otherObj.w &&
            this.x + this.w > otherObj.x &&
            this.y < otherObj.y + otherObj.h &&
            this.h + this.y > otherObj.y) {
            if (this._cells.length === 0) {
                return this;
            }
            for (var key in this._cells) {
                var cell = this._cells[key];
                var cc = cell.isColliding(otherObj);
                if (cc) {
                    return cc;
                }
            }
        }
        return null;
    }

    public setDebug(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx
        this._cells.forEach((c) => c.setDebug(this.ctx));
    }


}



export interface ICollisionHandler {
    update(): void;
    onCollision: CollisionCallback;
    onUpdate: UpdateCallback;
    isColliding(otherObj: BaseObject): CollisionResult
    confirmCollision(info: ICollisionInfo): boolean;
    add(otherObj: BaseObject): void;
    left: boolean;
    right: boolean
    top: boolean;
    bottom: boolean;
    current: CollisionResult;
    init(): void;
}

export interface CollisionCallback {
    (obj: BaseObject): void
}

export interface UpdateCallback {
    (): void
}

export interface ICollisionInfo {

}

export enum CollisionResult {
    none = 0,
    left = 1,
    right = 2,
    top = 4,
    bottom = 8
}


