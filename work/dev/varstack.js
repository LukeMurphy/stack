var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth = 500;
var ctxHeigth = 500;

var sW = 7;
var sH = 17;

var rows = 33;
var cols = 7;

var xMax, xMin;
var vOffset = 28;
var hOffset = 0;
var blockArray = new Array();
var circleArray = new Array();
var pointArray = new Array();
var rate = 22;
var uniform = true;
var done = false;
var radius = 70;
var circles = 12;
var points = 403;
var verticalChangeFactor = 6;
var pointSize = 2;
var radialStream = false;
var preserveCenter = false;

function calculate(arrayRef, n) {
	var r = arrayRef[n].r + arrayRef[n].rRate;
	var g = arrayRef[n].g + arrayRef[n].gRate;
	var b = arrayRef[n].b + arrayRef[n].bRate;

	if (done) {
		arrayRef[n].rRate = arrayRef[n].gRate = arrayRef[n].bRate = 10;
	} else {
		if (r >= arrayRef[n].rMax || r <= arrayRef[n].rMin) {
			if (uniform) {
				arrayRef[n].rRate *= -1;
			} else {
				arrayRef[n].rRate = randomRate(arrayRef[n].rRate);
			}
			if (r <= arrayRef[n].rMin)
				r = arrayRef[n].rMin;
			if (r >= arrayRef[n].rMax)
				r = arrayRef[n].rMax;
		}
		if (g >= arrayRef[n].gMax || g <= arrayRef[n].gMin) {
			if (uniform) {
				arrayRef[n].gRate *= -1;
			} else {
				arrayRef[n].gRate = randomRate(arrayRef[n].gRate);
			}
			if (g <= arrayRef[n].gMin)
				g = arrayRef[n].gMin;
			if (g >= arrayRef[n].gMax)
				g = arrayRef[n].gMax;
		}
		if (b >= arrayRef[n].bMax || b <= arrayRef[n].bMin) {
			if (uniform) {
				arrayRef[n].bRate *= -1;
			} else {
				arrayRef[n].bRate = randomRate(arrayRef[n].bRate);
			}
			if (b <= arrayRef[n].bMin)
				b = arrayRef[n].bMin;
			if (b >= arrayRef[n].bMax)
				b = arrayRef[n].bMax;
		}
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

function draw() {
	// redrawCircles();
	cleanUps();
	redrawPoints();
	redrawBlocks();
}

function cleanUps() {
	// cleanups
	var cleanupBlockWidth = 8;
	var cleanupBlockHeight = 4;

	cleanupBlockWidth = 2;
	cleanupBlockHeight = 8;

	for ( var q = 0; q < points * 5; q++) {
		ctx.fillStyle = "rgb(0,0,255)";
		var xPos = Math.round(Math.random() * ctxWidth);
		var yPos = Math.round(Math.random() * ctxHeight);
		if(xPos > xMax || xPos < xMin){
			ctx.fillRect(xPos,yPos, cleanupBlockWidth, cleanupBlockHeight);
		}
	}
}

function redrawCircles() {
	var n = 0;
	var res;
	var radius = w / 2;
	var radialIncrements = radius / circles;
	for ( var q = 0; q < circles; q++) {
		// var rad = radius - (q+1) * radialIncrements;
		var rad = radius - q * q * q / 10 + 1;
		res = calculate(circleArray, q);
		ctx.beginPath();
		ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
		ctx.arc(centerX, centerY, rad, 0, 2 * Math.PI, true);
		ctx.fill();

	}
}

function redrawPoints() {
	for ( var q = 0; q < points; q++) {
		res = calculate(pointArray, q);
		ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
		ctx.fillRect(pointArray[q].xPos, pointArray[q].yPos, pointSize,
				pointSize);

		if (radialStream) {

			var dx = ctxWidth / 2 - pointArray[q].xPos;
			var dy = ctxHeight - pointArray[q].yPos;
			var angle = Math.atan(dy / dx);

			if (angle < 0)
				angle += Math.PI;

			pointArray[q].yPos -= 2 * Math.sin(angle);
			pointArray[q].xPos -= 2 * Math.cos(angle);

		} else {
			pointArray[q].yPos -= 2;
		}

		// resets postion when element fades out
		if (res.r == 0 && res.g == 0) {
			pointArray[q].xPos = Math.random() * ctxWidth,
					pointArray[q].yPos = Math.random() * ctxHeight
		}
	}
}

function redrawBlocks() {
	var n = 0;
	var res;
	for (ii = 0; ii < rows; ii++) {
		var colsShown = 2.0 * (ii + 1);
		for (i = 0; i < colsShown; i++) {
			res = calculate(blockArray, n);
			ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
			ctx.fillRect(blockArray[n].xPos, blockArray[n].yPos,
					blockArray[n].wd, blockArray[n].ht);
			blockArray[n].yPos += blockArray[n].rate;
			if (blockArray[n].yPos > ctxHeight) {
				blockArray[n].yPos = 0;
				blockArray[n].rate = 10;
			}

			if (blockArray[n].yPos >= blockArray[n].yPosOrig
					&& blockArray[n].rate == 10) {
				blockArray[n].yPos = blockArray[n].yPosOrig;
				blockArray[n].rate = Math.random() * 2 + .2;
			}

			n++;
		}
	}
}

function randomRate(dir, rateVal) {
	var newDirection = 1;
	;
	var newRate = Math.round(rateVal * Math.random());
	if (dir != 0) {
		newRate *= -1;
	}
	return newRate;
}

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 3;

	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	sW = 7;
	sH = 30;
	vOffset = 30;
	rows = 33;
	xMax = xMin = ctxWidth/2;

	for ( var q = 0; q < points; q++) {
		var rateForPoint = Math.round(Math.random() * 30);
		pointArray.push({
			r : 0,
			g : 0,
			b : 0,
			rRate : rateForPoint,
			gRate : rateForPoint,
			bRate : rateForPoint,
			rMin : 0,
			gMin : 0,
			bMin : 255,
			rMax : 255,
			gMax : 255,
			bMax : 255,
			xPos : Math.random() * ctxWidth,
			yPos : Math.random() * ctxHeight
		});
	}

	for ( var q = 0; q < circles; q++) {
		var r = Math.round(200 + 55 * Math.random());
		var g = Math.round(200 + 55 * Math.random());
		var b = Math.round(0 * Math.random());
		circleArray.push({
			r : r,
			g : g,
			b : b,
			rRate : randomRate(0, rate / 10),
			gRate : randomRate(0, rate / 10),
			bRate : randomRate(0, rate / 10),
			rMin : 0,
			gMin : 0,
			bMin : 100,
			rMax : 10,
			gMax : 10,
			bMax : 255
		});
	}

	n = 0;
	var lastHt = 0;
	for (ii = 0; ii < rows; ii++) {
		var colsShown = 2.0 * (ii + 1);
		for (i = 0; i < colsShown; i++) {
			var r = Math.round(255 * Math.random());
			var g = Math.round(255 * Math.random());
			var b = Math.round(255 * Math.random());

			var ht = sH - ii / verticalChangeFactor;
			var wd = sW;
			var xPos = ctxWidth / 2 - colsShown * sW / 2 + sW * i + hOffset;
			var yPos = lastHt + vOffset;

			// xPos = ctxWidth * Math.random();
			// yPos = ctxHeight * Math.random();
			
			if(xPos > xMax) xMax = xPos;
			if(xPos < xMin) xMin = xPos;
			

			blockArray.push({
				xPos : xPos,
				yPos : yPos,
				xPosOrig : xPos,
				yPosOrig : yPos,
				ht : ht,
				wd : wd,
				rate : Math.random() * 2 + .2,
				r : r,
				g : g,
				b : b,
				rRate : randomRate(0, rate),
				gRate : randomRate(0, rate),
				bRate : randomRate(0, rate),
				rMin : 0,
				gMin : 0,
				bMin : 0,
				rMax : 255,
				gMax : 255,
				bMax : 255
			});
			res = calculate(blockArray, n);
			ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
			// ctx.fillRect(xPos, yPos, wd, ht);
			n++;
		}
		lastHt += ht;
	}
	
	if(!preserveCenter)xMax = 0; xMin = ctxWidth;
	
	var t = setInterval(draw, 33);
}

window.onload = init;