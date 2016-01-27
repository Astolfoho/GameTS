

declare module GameTS.Physics {

    export interface ICollisionHandler {
        update(): void;
        onCollision: CollisionCallback;
        onUpdate: UpdateCallback;
        isColliding(otherObj: Objects.BaseObject): CollisionResult
        confirmCollision(info: ICollisionInfo): boolean;
        add(otherObj: Objects.BaseObject): void;
        left: boolean;
        right:boolean
        top: boolean;
        bottom: boolean;
        current: CollisionResult;
        init(): void;
    }

    export interface CollisionCallback {
        (obj:Objects.BaseObject) : void
    }

    export interface UpdateCallback {
        (): void
    }

    export interface ICollisionInfo {

    }

}