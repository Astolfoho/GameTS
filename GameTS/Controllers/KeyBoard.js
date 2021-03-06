export class KeyBoard {
    constructor(canvas) {
        this.canvas = canvas;
        canvas.addEventListener("keydown", (ev) => this.canvas_KeyDown(ev));
        canvas.addEventListener("keyup", (ev) => this.canvas_KeyUp(ev));
    }
    canvas_KeyDown(event) {
        this[KeyCodes[event.keyCode]] = true;
    }
    canvas_KeyUp(event) {
        this[KeyCodes[event.keyCode]] = false;
    }
}
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["backspace"] = 8] = "backspace";
    KeyCodes[KeyCodes["tab"] = 9] = "tab";
    KeyCodes[KeyCodes["enter"] = 13] = "enter";
    KeyCodes[KeyCodes["shift"] = 16] = "shift";
    KeyCodes[KeyCodes["ctrl"] = 17] = "ctrl";
    KeyCodes[KeyCodes["alt"] = 18] = "alt";
    KeyCodes[KeyCodes["pauseBreak"] = 19] = "pauseBreak";
    KeyCodes[KeyCodes["capsLock"] = 20] = "capsLock";
    KeyCodes[KeyCodes["escape"] = 27] = "escape";
    KeyCodes[KeyCodes["pageUp"] = 33] = "pageUp";
    KeyCodes[KeyCodes["pageDown"] = 34] = "pageDown";
    KeyCodes[KeyCodes["end"] = 35] = "end";
    KeyCodes[KeyCodes["home"] = 36] = "home";
    KeyCodes[KeyCodes["leftArrow"] = 37] = "leftArrow";
    KeyCodes[KeyCodes["upArrow"] = 38] = "upArrow";
    KeyCodes[KeyCodes["rightArrow"] = 39] = "rightArrow";
    KeyCodes[KeyCodes["downArrow"] = 40] = "downArrow";
    KeyCodes[KeyCodes["insert"] = 45] = "insert";
    KeyCodes[KeyCodes["delete"] = 46] = "delete";
    KeyCodes[KeyCodes["num0"] = 48] = "num0";
    KeyCodes[KeyCodes["num1"] = 49] = "num1";
    KeyCodes[KeyCodes["num2"] = 50] = "num2";
    KeyCodes[KeyCodes["num3"] = 51] = "num3";
    KeyCodes[KeyCodes["num4"] = 52] = "num4";
    KeyCodes[KeyCodes["num5"] = 53] = "num5";
    KeyCodes[KeyCodes["num6"] = 54] = "num6";
    KeyCodes[KeyCodes["num7"] = 55] = "num7";
    KeyCodes[KeyCodes["num8"] = 56] = "num8";
    KeyCodes[KeyCodes["num9"] = 57] = "num9";
    KeyCodes[KeyCodes["a"] = 65] = "a";
    KeyCodes[KeyCodes["b"] = 66] = "b";
    KeyCodes[KeyCodes["c"] = 67] = "c";
    KeyCodes[KeyCodes["d"] = 68] = "d";
    KeyCodes[KeyCodes["e"] = 69] = "e";
    KeyCodes[KeyCodes["f"] = 70] = "f";
    KeyCodes[KeyCodes["g"] = 71] = "g";
    KeyCodes[KeyCodes["h"] = 72] = "h";
    KeyCodes[KeyCodes["i"] = 73] = "i";
    KeyCodes[KeyCodes["j"] = 74] = "j";
    KeyCodes[KeyCodes["k"] = 75] = "k";
    KeyCodes[KeyCodes["l"] = 76] = "l";
    KeyCodes[KeyCodes["m"] = 77] = "m";
    KeyCodes[KeyCodes["n"] = 78] = "n";
    KeyCodes[KeyCodes["o"] = 79] = "o";
    KeyCodes[KeyCodes["p"] = 80] = "p";
    KeyCodes[KeyCodes["q"] = 81] = "q";
    KeyCodes[KeyCodes["r"] = 82] = "r";
    KeyCodes[KeyCodes["s"] = 83] = "s";
    KeyCodes[KeyCodes["t"] = 84] = "t";
    KeyCodes[KeyCodes["u"] = 85] = "u";
    KeyCodes[KeyCodes["v"] = 86] = "v";
    KeyCodes[KeyCodes["w"] = 87] = "w";
    KeyCodes[KeyCodes["x"] = 88] = "x";
    KeyCodes[KeyCodes["y"] = 89] = "y";
    KeyCodes[KeyCodes["z"] = 90] = "z";
    KeyCodes[KeyCodes["leftWindowKey"] = 91] = "leftWindowKey";
    KeyCodes[KeyCodes["rightWindowKey"] = 92] = "rightWindowKey";
    KeyCodes[KeyCodes["selectKey"] = 93] = "selectKey";
    KeyCodes[KeyCodes["numpad0"] = 96] = "numpad0";
    KeyCodes[KeyCodes["numpad1"] = 97] = "numpad1";
    KeyCodes[KeyCodes["numpad2"] = 98] = "numpad2";
    KeyCodes[KeyCodes["numpad3"] = 99] = "numpad3";
    KeyCodes[KeyCodes["numpad4"] = 100] = "numpad4";
    KeyCodes[KeyCodes["numpad5"] = 101] = "numpad5";
    KeyCodes[KeyCodes["numpad6"] = 102] = "numpad6";
    KeyCodes[KeyCodes["numpad7"] = 103] = "numpad7";
    KeyCodes[KeyCodes["numpad8"] = 104] = "numpad8";
    KeyCodes[KeyCodes["numpad9"] = 105] = "numpad9";
    KeyCodes[KeyCodes["multiply"] = 106] = "multiply";
    KeyCodes[KeyCodes["add"] = 107] = "add";
    KeyCodes[KeyCodes["subtract"] = 109] = "subtract";
    KeyCodes[KeyCodes["decimalPoint"] = 110] = "decimalPoint";
    KeyCodes[KeyCodes["divide"] = 111] = "divide";
    KeyCodes[KeyCodes["f1"] = 112] = "f1";
    KeyCodes[KeyCodes["f2"] = 113] = "f2";
    KeyCodes[KeyCodes["f3"] = 114] = "f3";
    KeyCodes[KeyCodes["f4"] = 115] = "f4";
    KeyCodes[KeyCodes["f5"] = 116] = "f5";
    KeyCodes[KeyCodes["f6"] = 117] = "f6";
    KeyCodes[KeyCodes["f7"] = 118] = "f7";
    KeyCodes[KeyCodes["f8"] = 119] = "f8";
    KeyCodes[KeyCodes["f9"] = 120] = "f9";
    KeyCodes[KeyCodes["f10"] = 121] = "f10";
    KeyCodes[KeyCodes["f11"] = 122] = "f11";
    KeyCodes[KeyCodes["f12"] = 123] = "f12";
    KeyCodes[KeyCodes["numLock"] = 144] = "numLock";
    KeyCodes[KeyCodes["scrollLock"] = 145] = "scrollLock";
    KeyCodes[KeyCodes["semiColon"] = 186] = "semiColon";
    KeyCodes[KeyCodes["equalSign"] = 187] = "equalSign";
    KeyCodes[KeyCodes["comma"] = 188] = "comma";
    KeyCodes[KeyCodes["dash"] = 189] = "dash";
    KeyCodes[KeyCodes["period"] = 190] = "period";
    KeyCodes[KeyCodes["forwardSlash"] = 191] = "forwardSlash";
    KeyCodes[KeyCodes["graveAccent"] = 192] = "graveAccent";
    KeyCodes[KeyCodes["openBracket"] = 219] = "openBracket";
    KeyCodes[KeyCodes["backSlash"] = 220] = "backSlash";
    KeyCodes[KeyCodes["closeBraket"] = 221] = "closeBraket";
    KeyCodes[KeyCodes["singleQuote"] = 222] = "singleQuote";
})(KeyCodes || (KeyCodes = {}));
//# sourceMappingURL=KeyBoard.js.map