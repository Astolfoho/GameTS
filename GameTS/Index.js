import Game from './Game';
import { Back, DiamondsLabel, Ground, Dude, Diamond, RedDiamond, GreenDiamond, GoldenDiamond, Enemy } from './tests';
window["gobalVars"] = {};
var canvas = document.getElementById("theCanvas");
var game = new Game(canvas);
var back = new Back();
game.addObject(back);
var dl = new DiamondsLabel();
game.addObject(dl);
var ground = new Ground();
game.addObject(ground);
var dude = new Dude();
game.addObject(dude);
dude.colide(ground);
game.start();
var lastAdd = null;
function addDiamonds() {
    if ((lastAdd == null || (-ground.rollPosition.x - lastAdd) > 100)) {
        var y = getRandomInt(10, this.game.h - 120);
        var x = game.w + 10;
        var d = new Diamond(x, y);
        d.colide(dude);
        game.addObject(d);
        var d = new RedDiamond(x + 50, y);
        d.colide(dude);
        game.addObject(d);
        var d = new GreenDiamond(x, y + 50);
        d.colide(dude);
        game.addObject(d);
        var d = new GoldenDiamond(x + 50, y + 50);
        d.colide(dude);
        game.addObject(d);
        lastAdd = -ground.rollPosition.x;
        gobalVars.baseVelocity += 2;
        y = getRandomInt(10, this.game.h - 120);
        x = game.w + 10;
        var d = new Enemy(x, y);
        d.colide(dude);
        game.addObject(d);
    }
    gobalVars.meters = Math.floor((-ground.rollPosition.x) / 100);
}
addDiamonds();
setInterval(addDiamonds, 100);
var d = new Diamond(10, 550);
d.colide(dude);
game.addObject(d);
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//var a = new FPSLabel();
//game.addObject(a);
//var a = new NumberOfObjects();
//game.addObject(a);
//var a = new MetersLabel();
//game.addObject(a); 
//# sourceMappingURL=Index.js.map