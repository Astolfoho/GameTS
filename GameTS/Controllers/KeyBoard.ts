

module GameTS.Controllers {

    export class KeyBoard {

        constructor(public canvas:HTMLCanvasElement) {
            canvas.addEventListener("keydown", (ev) => this.canvas_KeyDown(ev));
            canvas.addEventListener("keyup", (ev) => this.canvas_KeyUp(ev));
        }

        private canvas_KeyDown(event:KeyboardEvent) {
            this[KeyCodes[event.keyCode]] = true;
        }

        private canvas_KeyUp(event: KeyboardEvent) {
            this[KeyCodes[event.keyCode]] = false;
        }

        public backspace: boolean;
        public tab: boolean;
        public enter: boolean;
        public shift: boolean;
        public ctrl: boolean;
        public alt: boolean;
        public pauseBreak: boolean;
        public capsLock: boolean;
        public escape: boolean;
        public pageUp: boolean;
        public pageDown: boolean;
        public end: boolean;
        public home: boolean;
        public leftArrow: boolean;
        public upArrow: boolean;
        public rightArrow: boolean;
        public downArrow: boolean;
        public insert: boolean;
        public delete: boolean;
        public num0: boolean;
        public num1: boolean;
        public num2: boolean;
        public num3: boolean;
        public num4: boolean;
        public num5: boolean;
        public num6: boolean;
        public num7: boolean;
        public num8: boolean;
        public num9: boolean;
        public a: boolean;
        public b: boolean;
        public c: boolean;
        public d: boolean;
        public e: boolean;
        public f: boolean;
        public g: boolean;
        public h: boolean;
        public i: boolean;
        public j: boolean;
        public k: boolean;
        public l: boolean;
        public m: boolean;
        public n: boolean;
        public o: boolean;
        public p: boolean;
        public q: boolean;
        public r: boolean;
        public s: boolean;
        public t: boolean;
        public u: boolean;
        public v: boolean;
        public w: boolean;
        public x: boolean;
        public y: boolean;
        public z: boolean;
        public leftWindowKey: boolean;
        public rightWindowKey: boolean;
        public selectKey:boolean;
        public numpad0: boolean;
        public numpad1: boolean;
        public numpad2: boolean;
        public numpad3: boolean;
        public numpad4: boolean;
        public numpad5: boolean;
        public numpad6: boolean;
        public numpad7: boolean;
        public numpad8: boolean;
        public numpad9: boolean;
        public multiply: boolean;
        public add: boolean;
        public subtract: boolean;
        public decimalPoint:boolean;
        public divide: boolean;
        public f1: boolean;
        public f2: boolean;
        public f3: boolean;
        public f4: boolean;
        public f5: boolean;
        public f6: boolean;
        public f7: boolean;
        public f8: boolean;
        public f9: boolean;
        public f10: boolean;
        public f11: boolean;
        public f12: boolean;
        public numLock: boolean;
        public scrollLock: boolean;
        public semiColon: boolean;
        public equalSign: boolean;
        public comma: boolean;
        public dash: boolean;
        public period: boolean;
        public forwardSlash: boolean;
        public graveAccent: boolean;
        public openBracket: boolean;
        public backSlash: boolean;
        public closeBraket: boolean;
        public singleQuote: boolean;



    }

    enum KeyCodes {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pauseBreak = 19,
        capsLock = 20,
        escape = 27,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        leftArrow = 37,
        upArrow = 38,
        rightArrow = 39,
        downArrow = 40,
        insert = 45,
        delete = 46,
        num0 = 48,
        num1 = 49,
        num2 = 50,
        num3 = 51,
        num4 = 52,
        num5 = 53,
        num6 = 54,
        num7 = 55,
        num8 = 56,
        num9 = 57,
        a = 65,
        b = 66,
        c = 67,
        d = 68,
        e = 69,
        f = 70,
        g = 71,
        h = 72,
        i = 73,
        j = 74,
        k = 75,
        l = 76,
        m = 77,
        n = 78,
        o = 79,
        p = 80,
        q = 81,
        r = 82,
        s = 83,
        t = 84,
        u = 85,
        v = 86,
        w = 87,
        x = 88,
        y = 89,
        z = 90,
        leftWindowKey = 91,
        rightWindowKey = 92,
        selectKey = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimalPoint = 110,
        divide = 111,
        f1 = 112,
        f2 = 113,
        f3 = 114,
        f4 = 115,
        f5 = 116,
        f6 = 117,
        f7 = 118,
        f8 = 119,
        f9 = 120,
        f10 = 121,
        f11 = 122,
        f12 = 123,
        numLock = 144,
        scrollLock = 145,
        semiColon = 186,
        equalSign = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        openBracket = 219,
        backSlash = 220,
        closeBraket = 221,
        singleQuote = 222
    } 

} 