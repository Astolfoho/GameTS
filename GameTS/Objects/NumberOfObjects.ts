import { Label } from './Label'

export class NumberOfObjects extends Label {

    constructor() {
        super("");
        this.x = 20;
        this.y = 30;
        this.w = 100;
        this.fontSize = 10;

    }

    public onUpdate() {
        this.text = this.game.numberOfObjects.toString() + " Objects";
    }
}
