
module GameTS.Graphics {

    export interface IDrawingContext {
        clearRect(x: number, y: number, w: number, h: number): void;
        fillRect(x: number, y: number, w: number, h: number): void;
        strokeRect(x: number, y: number, w: number, h: number): void;
        fillText(text: string, x: number, y: number, maxW?: number): void;
        strokeText(text: string, x: number, y: number, maxW?: number): void;
        measureText(text: string): TextMetrics;
        drawImage(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeigh: number): void;

        translate(x: number, y: number): void;
        createPattern(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, repetition: string): CanvasPattern;

        save(): void;
        restore(): void;

        strokeStyle: any;
        fillStyle: any;
        font: string;
    }

}



var canvas = document.createElement("canvas");
var gl = canvas.getContext("experimental-webgl");
 
// setup a GLSL program
var program = gl.createProgram()// createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);

gl.useProgram(program);
 
// look up where the vertex data needs to go.
var positionLocation = gl.getAttribLocation(program, "a_position");
 
// Create a buffer and put a single clipspace rectangle in
// it (2 triangles)
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0]),
    gl.STATIC_DRAW);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
 
// draw
gl.drawArrays(gl.TRIANGLES, 0, 6);