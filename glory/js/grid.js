var canvas;
var ctx;
var w = 600;
var vOffset = 0;
var hOffset = 0;
var pointArrayRnd = new Array();
var pointArray = new Array();
var gridSize;
var grid = 50;
var limit = 3;
var points;
var baseRate = 60;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	w = canvas.width / 2;
	gridSize = w / grid
	// ctx.fillRect(50, 50, 50, 50);

	points = grid * grid;

	setUp();

	draw();
	var t = setInterval(draw, 33);
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

function calculate(arrayRef, n) {
	var r = arrayRef[n].r + arrayRef[n].rRate;
	var g = arrayRef[n].g + arrayRef[n].gRate;
	var b = arrayRef[n].b + arrayRef[n].bRate;
	var done = false;

	if (r >= arrayRef[n].rMax || r <= arrayRef[n].rMin) {
		arrayRef[n].rRate *= -1;
		if (r <= arrayRef[n].rMin) {
			r = arrayRef[n].rMin;
		}
		if (r >= arrayRef[n].rMax) {
			r = arrayRef[n].rMax;
		}
		done = true;
	}
	if (g >= arrayRef[n].gMax || g <= arrayRef[n].gMin) {
		arrayRef[n].gRate *= -1;
		if (g <= arrayRef[n].gMin) {
			g = arrayRef[n].gMin;
		}
		if (g >= arrayRef[n].gMax) {
			g = arrayRef[n].gMax;
		}
	}
	if (b >= arrayRef[n].bMax || b <= arrayRef[n].bMin) {
		arrayRef[n].bRate *= -1;
		if (b <= arrayRef[n].bMin) {
			b = arrayRef[n].bMin;
		}
		if (b >= arrayRef[n].bMax) {
			b = arrayRef[n].bMax;
		}
	}

	arrayRef[n].r = r;
	arrayRef[n].g = g;
	arrayRef[n].b = b;

	return {
		r : r,
		g : g,
		b : b,
		done : done
	};
}

function draw() {
	for ( var q = 0; q < points; q++) {
		res = calculate(pointArrayRnd, q);
		ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
		ctx.fillRect(pointArrayRnd[q].xPos, pointArrayRnd[q].yPos, gridSize,
				gridSize);

		if (res.done) {
			if (Math.random() >= .5) {
				if (pointArrayRnd[q].r > 254) {
					pointArrayRnd[q].r = pointArrayRnd[q].g = pointArrayRnd[q].b = 0;
				} else {
					// pointArrayRnd[q].r = pointArrayRnd[q].g
					// =pointArrayRnd[q].b = 255;
				}
			}
		}

		res = calculate(pointArray, q);
		ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
		ctx.fillRect(pointArray[q].xPos, pointArray[q].yPos, gridSize,
				gridSize);

		if (res.done) {
			if (Math.random() >= .5) {
				if (pointArray[q].r > 254) {
					if(q > 2){
						if(pointArray[q-1].r <100 && pointArray[q-2].r <100 )
						pointArray[q].r = pointArray[q].g = pointArray[q].b = 255;
					}
				} else {
					// pointArrayRnd[q].r = pointArrayRnd[q].g
					// =pointArrayRnd[q].b = 255;
				}
			}
		}
	}
}

function setUp() {

	var isTrue = false;
	var isNextTrue = false;

	var trueCount = 0;
	var notTrueCount = 0;

	var r, g, b;

	var rateForPoint;
	points = 0;

	for ( var rows = 0; rows < grid; rows++) {
		for ( var cols = 0; cols < grid; cols++) {

			if (Math.random() >= .5) {
				isTrue = true;
			} else {
				isTrue = false;
			}
			if (isTrue) {
				r = g = b = 0;
				rateForPoint = Math.round(Math.random() * baseRate)
			} else {
				r = g = b = 255;
				rateForPoint = -Math.round(Math.random() * baseRate);
			}

			pointArrayRnd.push({
				r : r,
				g : g,
				b : b,
				rRate : rateForPoint,
				gRate : rateForPoint,
				bRate : rateForPoint,
				rMin : 0,
				gMin : 0,
				bMin : 0,
				rMax : 255,
				gMax : 255,
				bMax : 255,
				xPos : cols * gridSize,
				yPos : rows * gridSize
			});

			// ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			// ctx.fillRect(cols * gridSize, rows * gridSize, gridSize,
			// gridSize);

			points++;
		}
	}

	// points = 0;
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
				r = g = b = 0;
				rateForPoint = Math.round(Math.random() * baseRate);
			} else {
				r = g = b = 255;
				rateForPoint = -Math.round(Math.random() * baseRate);
			}
			if (notTrueCount >= limit) {
				// isNextTrue = false;
				r = g = b = 0;
				rateForPoint = Math.round(Math.random() * baseRate);
			} else {
				// r = g = b = 255;
			}

			if (trueCount >= limit) {
				trueCount = 0;
				// isNextTrue = true;
			}
			if (notTrueCount >= limit) {
				notTrueCount = 0;
				// isNextTrue = true;
			}

			pointArray.push({
				r : r,
				g : g,
				b : b,
				rRate : rateForPoint,
				gRate : rateForPoint,
				bRate : rateForPoint,
				rMin : 0,
				gMin : 0,
				bMin : 0,
				rMax : 255,
				gMax : 255,
				bMax : 255,
				xPos : w + cols * gridSize,
				yPos : rows * gridSize
			});

			// ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			// ctx.fillRect(w + cols * gridSize, rows * gridSize,
			// gridSize,gridSize);

		}
	}
}