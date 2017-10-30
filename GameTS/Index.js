import Game from './Game';
import { Luffy, SolidColorBack, Ground, Dude } from './tests';
import { PropertiesView } from './Objects/PropertiesView';
window["gobalVars"] = {};
var canvas = document.getElementById("theCanvas");
var game = new Game(canvas);
var back = new SolidColorBack();
back.color = "cornflowerblue";
game.addObject(back);
var ground = new Ground();
game.addObject(ground);
var luffy = new Luffy();
luffy.colide(ground);
game.addObject(luffy);
var dude = new Dude();
dude.colide(ground);
game.addObject(dude);
game.start();
dude.colide(luffy);
var pv = new PropertiesView(luffy.collision, 10, 10);
game.addObject(pv);
var pv = new PropertiesView(dude.collision, 300, 10);
game.addObject(pv);
//# sourceMappingURL=Index.js.map