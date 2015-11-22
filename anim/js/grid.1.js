var canvas;
var ctx;
var w = 600;
var vOffset = 0;
var hOffset = 0;
var blockArray = new Array();
var circleArray = new Array();
var pointArray = new Array();
var gridSize;
var grid = 80;
var limit = 3;
var points;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	w = canvas.width / 2;
	gridSize = w / grid
	// ctx.fillRect(50, 50, 50, 50);
	
	points = grid * grid;
	
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

	var t = setInterval(draw, 33);
	draw();
}


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

	var isTrue = false;
	var isNextTrue = false;

	var trueCount = 0;
	var notTrueCount = 0;

	var n = 0;
	for ( var rows = 0; rows < grid; rows++) {
		for ( var cols = 0; cols < grid; cols++) {
			
			var ref =  pointArray[n];

			if (Math.random() >= .5) {
				isTrue = true;
			} else {
				isTrue = false;
			}
			if (isTrue) {
				ctx.fillStyle = "rgb(0,0,0)";
			} else {
				ctx.fillStyle = "rgb(255,255,255)";
			}
			ctx.fillRect(cols * gridSize, rows * gridSize, gridSize, gridSize);
			n++;
		}
	}

	// No more than n true (black) or n blank in a row
	for ( var rows = 0; rows < grid; rows++) {
		for ( var cols = 0; cols < grid; cols++) {

			if (Math.random() >= .5) {
				isTrue = true;
				trueCount++;
			} else {
				isTrue = false;
				notTrueCount++;
			}

			if (isTrue && trueCount < limit) {
				ctx.fillStyle = "rgb(0,0,0)";
				ctx.fillRect(w + cols * gridSize, rows * gridSize, gridSize,
						gridSize);
			} else {
				ctx.fillStyle = "rgb(255,255,255)";
				ctx.fillRect(w + cols * gridSize, rows * gridSize, gridSize,
						gridSize);
			}
			if (notTrueCount >= limit) {
				// isNextTrue = false;
				ctx.fillStyle = "rgb(0,0,0)";
				ctx.fillRect(w + cols * gridSize, rows * gridSize, gridSize,
						gridSize);
			} else {
				ctx.fillStyle = "rgb(255,255,255)";
				// ctx.fillRect(w + cols * gridSize, rows * gridSize,
				// gridSize,gridSize);
			}

			if (trueCount >= limit) {
				trueCount = 0;
				// isNextTrue = true;
			}
			if (notTrueCount >= limit) {
				notTrueCount = 0;
				// isNextTrue = true;
			}
		}
	}
}