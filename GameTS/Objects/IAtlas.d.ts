
export interface IAtlas {

    frames: Array<IAtlasFrame>;

}

export interface IAtlasFrame {
    filename: string,
    frame: IAtlasBounds,
    rotate: boolean,
    trimmed: boolean,
    spriteSourceSize: IAtlasBounds,
    sourceSize: IAtlasSize
}

export interface IAtlasBounds {
    x: number,
    y: number,
    w: number,
    h: number
}

export interface IAtlasSize {
    w: number,
    h: number
}

