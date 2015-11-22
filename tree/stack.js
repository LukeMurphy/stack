var canvas;
var ctx;
var sW = 7;
var sH = 17;
var rows = 33;
var cols = 7;
var w = 500;
var vOffset = 28;
var hOffset = 0;
var blockArray = new Array();
var circleArray = new Array();
var pointArray = new Array();
var rate = 22;
var uniform = true;
var done = false;
var centerX;
var centerY;
var radius = 70;
var circles = 12;
var points = 403;
var verticalChangeFactor = 6;
var pointSize = 2;

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
	var n = 0;
	var res;
	var radius = w / 2;
	var radialIncrements = radius / circles;
	for ( var q = 0; q < circles; q++) {
		// var rad = radius - (q+1) * radialIncrements;
		var rad = radius - q * q * q / 10 + 1;
		res = calculate(circleArray, q);
		// ctx.beginPath();
		// ctx.arc(centerX, centerY, rad, 0, 2 * Math.PI, true);
		// ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
		// ctx.fill();

	}

	// cleanups
	for ( var q = 0; q < points * 5; q++) {
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(Math.round(Math.random() * canvas.width), Math.round(Math
				.random()
				* canvas.height), 8, 4);
	}

	for ( var q = 0; q < points; q++) {
		res = calculate(pointArray, q);
		ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
		ctx.fillRect(pointArray[q].xPos, pointArray[q].yPos, pointSize,
				pointSize);

		var dx = canvas.width / 2 - pointArray[q].xPos;
		var dy = canvas.height - pointArray[q].yPos;
		var angle = Math.atan(dy / dx);

		if (angle < 0)
			angle += Math.PI;

		pointArray[q].yPos -= 2 * Math.sin(angle);
		pointArray[q].xPos -= 2 * Math.cos(angle);

		if (res.r == 0 && res.g == 0) {
			pointArray[q].xPos = Math.random() * canvas.width,
					pointArray[q].yPos = Math.random() * canvas.height
		}
	}

	n = 0;
	var lastHt = 0;
	for (ii = 0; ii < rows; ii++) {
		var colsShown = 2.0 * (ii + 1);
		for (i = 0; i < colsShown; i++) {
			res = calculate(blockArray, n);
			ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
			var ht = sH - ii / verticalChangeFactor;
			var wd = sW;
			var xPos = w / 2 - colsShown * sW / 2 + sW * i + hOffset;
			var yPos = lastHt + vOffset;
			ctx.fillRect(xPos, yPos, wd, ht);
			blockArray[n].xPos = xPos;
			blockArray[n].yPos = yPos;
			n++;
		}
		lastHt += ht;
	}

	var score = 0;
	for ( var q = 0; q < blockArray.length; q++) {
		if (blockArray[q].rRate == 0)
			score++;
	}
	if (score >= blockArray.length - 1) {
		pointSize = 50;
	}
}

function finish() {
	// done = (done) ? false : true;
	// done = true;
}

function track(mousePos) {
	for ( var q = 0; q < pointArray.length; q++) {
		var dx = pointArray[q].xPos - mousePos.x;
		var dy = pointArray[q].yPos - mousePos.y;
		var d = Math.sqrt(dx * dx + dy * dy);
		if (d < 200) {
			pointArray[q].xPos = mousePos.x;
			pointArray[q].yPos = mousePos.y;
		}
	}
	for ( var q = 0; q < blockArray.length; q++) {
		var dx = blockArray[q].xPos - mousePos.x;
		var dy = blockArray[q].yPos - mousePos.y;
		var d = Math.sqrt(dx * dx + dy * dy);
		if (d < 30) {
			blockArray[q].rRate = 0// (Math.random() > .5) ?
			// blockArray[q].rRate * 2 :
			// blockArray[q].rRate /2;
			blockArray[q].gRate = 0// (Math.random() > .5) ?
			// blockArray[q].gRate * 2 :
			// blockArray[q].gRate /2;
			blockArray[q].bRate = 0// (Math.random() > .5) ?
			// blockArray[q].bRate * 2 :
			// blockArray[q].bRate /2;
			// blockArray[q].gRate = 2;
			// blockArray[q].bRate = 2;
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

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x : evt.clientX - rect.left,
		y : evt.clientY - rect.top
	};
}

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	centerX = canvas.width / 2;
	centerY = canvas.height / 3;

	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, w, w);

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		track(mousePos);
	}, false);

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
			xPos : Math.random() * canvas.width,
			yPos : Math.random() * canvas.height
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

	for (ii = 0; ii < rows; ii++) {
		var colsShown = 2.0 * (ii + 1);
		for (i = 0; i < colsShown; i++) {
			var r = Math.round(255 * Math.random());
			var g = Math.round(255 * Math.random());
			var b = Math.round(255 * Math.random());
			// r=g=b=0
			// ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			// ctx.fillRect(w/2 - colsShown * sW /2 + sW * i + hOffset, sH * ii
			// + vOffset, sW,
			// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
			// ctx.fillRect (30, 30, 55, 50);
			blockArray.push({
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
		}
	}
	var t = setInterval(draw, 33);
}

window.onload = init;