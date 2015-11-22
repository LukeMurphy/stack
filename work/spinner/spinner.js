//glitch
var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth;
var ctxHeigth;
var blockArray = new Array();
var rate = 22;
var rows = 5;
var cols = 5;
var sW = 20;
var sH = 20;
var verticalChangeFactor = 6;
var vOffset = 0;
var hOffset = 0;

window.onload = init;

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 2;

	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	
	setUp();
	
	var t =  setInterval(function() {draw()}, 31);
}

function draw()
{
n = 0;
	var lastHt = 0;
	for (ii = 0; ii < rows; ii++) {
		for (i = 0; i < cols; i++) {
			res = calculate(blockArray, n);
			ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
			var ht = sH - ii / verticalChangeFactor;
			var wd = sW;
			var xPos = ctxWidth / 2 - cols * sW / 2 + sW * i + hOffset;
			var yPos = lastHt + vOffset;
			ctx.fillRect(xPos, yPos, wd, ht);
			blockArray[n].xPos = xPos;
			blockArray[n].yPos = yPos;
			n++;
		}
		lastHt += ht;
	}
}

function randomRate(dir, rateVal) {
	var newDirection = 1;
	var newRate = Math.round(rateVal * Math.random());
	if (dir != 0) {
		newRate *= -1;
	}
	return newRate;
}

function setUp()
{
	for (ii = 0; ii < rows; ii++) {
		for (i = 0; i < cols; i++) {
			var r = Math.round(255 * Math.random());
			var g = Math.round(255 * Math.random());
			var b = Math.round(255 * Math.random());
			g = r;
			var rRate = randomRate(0, rate);
			blockArray.push({
				r : r,
				g : g,
				b : b,
				rRate : rRate,
				gRate : rRate,
				bRate : randomRate(0, rate),
				rMin : 200,
				gMin : 0,
				bMin : 0,
				rMax : 255,
				gMax : 255,
				bMax : 0
			});
		}
	}
}

function calculate(arrayRef, n) {
	var r = arrayRef[n].r + arrayRef[n].rRate;
	var g = arrayRef[n].g + arrayRef[n].gRate;
	var b = arrayRef[n].b + arrayRef[n].bRate;

	if (r >= arrayRef[n].rMax || r <= arrayRef[n].rMin) {
		arrayRef[n].rRate *= -1;
		if (r <= arrayRef[n].rMin)
			r = arrayRef[n].rMin;
		if (r >= arrayRef[n].rMax)
			r = arrayRef[n].rMax;
	}
	if (g >= arrayRef[n].gMax || g <= arrayRef[n].gMin) {
		arrayRef[n].gRate *= -1;
		if (g <= arrayRef[n].gMin)
			g = arrayRef[n].gMin;
		if (g >= arrayRef[n].gMax)
			g = arrayRef[n].gMax;
	}
	if (b >= arrayRef[n].bMax || b <= arrayRef[n].bMin) {
		arrayRef[n].bRate *= -1;
		if (b <= arrayRef[n].bMin)
			b = arrayRef[n].bMin;
		if (b >= arrayRef[n].bMax)
			b = arrayRef[n].bMax;
	}
	
	arrayRef[n].r = r;
	arrayRef[n].g = g;
	arrayRef[n].b = b;

	return {
		r : r,
		g : g,
		b : b
	};
}