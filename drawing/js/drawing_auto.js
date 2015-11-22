/*
 * Globals
 */

var ctx, canvasRef;
var ctxBuffer, canvasRefBuffer;
var timerDraw;
var canvas;
var canvasColor = "rgba(210,207,199,1)";
var canvasColor = "rgba(210,220,220,1)";
var eraseColor = "rgba(10,10,10,1)";
var textColor = "rgb(255,255,255)";
var strokeStyle = "rgba(50,50,50, .1)";
var traceLineColor = "rgba(100,100,100,.51)";
var w;
var h;
var count = 0;
var grayLevel = 2;
var pointsArray;
var intermediatePoints;
var trailingPoints;
var flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;
var x = "black", y = 2;
var r, g, b;
var rIncr, gIncr, bIncr;
var useTableau = true;
var eraseLineWidth =  500;

// Base angle that the line turns every segement
var angle = 90;
// Deviation range from base angle the line turns each segment
// higher = more curved. curly
var meanderRange = 0;
var reflection = 90;
// Length drawn each time - shorter is slower, longer is more jagged
var segmentLength = 20;
// Radius for continuous change in angle
var radius = 2;
// Direction the line takes
var direction = 1;
// Affects the amount of angle used
var angleFactor = .5;
// The default amount of error used to calculate in the next point is taken
var buffer = 2;
// Rough way to add more error buffer to calculating if the next point is taken
// Decides if the angle is being modified each time
var useAngleFactor = true;
var meanderingLine = true;

var intermediatePointsFactor = 300;
var intermediatePointsLimit = 2;

var trailingPointsFactor = .642;
var trailingPointsLimit = 80;

var lineDistranceFactor = 500;
var lineDistranceFactorLimit = .1;

var useMultiColor = true;
var useVariableDist = false;
var usePenMode = true;
var lightMode = false;

var pointLimitForSave = 500;
var saving = false;
var delayTime = 5000;
var eraseMode = false;
var img = new Image();

window.onload = init;

function init() {

	//document.getElementById('debug').style.visibility = "hidden";
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	//ctx.rotate(6 / 180 * Math.PI);

	w = canvas.width;
	h = canvas.height;
	canvasColor = canvasColor;
	ctx.fillStyle = canvasColor;
	ctx.fillRect(0, 0, w, h);
	ctx.save();

	angle = Math.random() * 360;
	buffer = 2;

	//ctx.translate(1000, 0);
	/*
	 img = new Image();
	 img.src = "bg.png";
	 img.onload = start;
	 */
	pointsArray = new Array();
	linesArray = new Array();
	linesArray.push(getLineFeatures());
	var line = linesArray[0];

	currX = 0;
	currY = 0;
	prevX = 200;
	prevY = 200;

	setStraightParams();

	drawTableau();
}

function start() {
	//ctx.drawImage(img, 0, 0, 800, 640, 0, 0, 800, 640);
}

function startTimer() {
	timerDraw = setInterval(function() {
		draw();
	}, 8);
}

function stopTimer() {
	clearInterval(timerDraw);
}

function drawTableau() {
	// Set table points on to which drawing is drawn
	// there are 6 points

	var leftInit = 50 * Math.random();
	var tableWidth = w * .9;
	var tableHeight = h * .92;
	var legHeight = h / 5 * .85;
	var buffer = 50;

	var tablePoints = new Array();

	tablePoints.push({
		x : leftInit * Math.random(),
		y : h - (buffer * Math.random())
	});
	tablePoints.push({
		x : leftInit * Math.random(),
		y : h - legHeight * Math.random()
	});

	tablePoints.push({
		x : leftInit * Math.random(),
		y : h - tableHeight - buffer * Math.random()
	});
	tablePoints.push({
		x : tablePoints[2].x + tableWidth + 100 * Math.random(),
		y : h - tableHeight - buffer * Math.random()
	});

	tablePoints.push({
		x : tablePoints[3].x + buffer * Math.random(),
		y : h - tableHeight * Math.random()
	});
	tablePoints.push({
		x : tablePoints[3].x + buffer * Math.random(),
		y : h
	});

	if (!useTableau) {
		tablePoints = new Array();
		tablePoints.push({
			x : 0,
			y : 0
		});
		tablePoints.push({
			x : 0,
			y : 0
		});
		tablePoints.push({
			x : w,
			y : 0
		});
		tablePoints.push({
			x : w,
			y : h
		});
		tablePoints.push({
			x : 0,
			y : h
		});

	}
	ctx.strokeStyle = canvasColor;
	ctx.fillStyle = eraseColor;
	ctx.fillRect(0, 0, w, h);

	ctx.shadowColor = eraseColor;
	ctx.shadowBlur = 3;
	ctx.strokeStyle = eraseColor;
	ctx.lineWidth = 3;
	ctx.beginPath();

	ctx.moveTo(0, h);
	ctx.moveTo(tablePoints[0].x, tablePoints[0].y);
	for (var i = 1; i < tablePoints.length - 1; i++) {
		ctx.lineTo(tablePoints[i + 1].x, tablePoints[i + 1].y);
	}
	ctx.lineTo(tablePoints[0].x, tablePoints[0].y);
	ctx.closePath();
	ctx.stroke();
	ctx.clip();

	ctx.fillStyle = canvasColor;
	ctx.fill();

	startTimer();
}

function draw() {
	if (doLoop) {
		var line = linesArray[0];
		line.nextPoint = calculateNextPoint(line);

		//console.log(line.nextPoint.y);
		var rect = canvas.getBoundingClientRect();
		currX = line.nextPoint.x - rect.left;
		currY = line.nextPoint.y - rect.top;
		prevX = line.lastPoint.x - rect.left;
		prevY = line.lastPoint.y - rect.top;

		interpolate({
			x : prevX,
			y : prevY
		}, {
			x : currX,
			y : currY
		});

		// trace line
		ctx.strokeStyle = traceLineColor;
		ctx.lineWidth = .8;

		if (Math.random() > .7) {
			ctx.shadowColor = 'blue';
			ctx.shadowBlur = 3;
		} else {
			ctx.shadowColor = 'grey';
			ctx.shadowBlur = 2;
		}

		/** Erase Drawing **/
		if (eraseMode) {
			ctx.strokeStyle = eraseColor;
			ctx.lineWidth = eraseLineWidth;
		}

		ctx.moveTo(prevX, prevY);
		ctx.lineTo(currX, currY);
		ctx.stroke();

		/** Draw all the points in between  **/
		pointsDraw();

		line.lastPoint = line.nextPoint;
	}
}

function pointsDraw() {

	var points = pointsArray.length - 1;
	var endPoint = points - 1;
	var startPoint = 0;

	startPoint = (endPoint - trailingPoints > 0) ? endPoint - trailingPoints : 0;
	var pointsToDraw = endPoint - startPoint - 1;

	//sets the new colors continuously
	if (useMultiColor) {
		setNewColors();
		if (Math.random() > .3) {
			r = g = b = 50;
		}
	}

	if (!eraseMode) {
		//console.log(points, startPoint, endPoint)
		for (var n = startPoint; n < endPoint; n++) {
			ctx.beginPath();
			ctx.strokeStyle = "rgba(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ",.1)";
			ctx.lineWidth = .1;

			//ctx.shadowColor = 'blue';
			//ctx.shadowBlur = 10;
			ctx.lineCap = 'round';

			if (eraseMode) {
				ctx.strokeStyle = canvasColor;
				ctx.lineWidth = 500;
				ctx.lineCap = 'square';
			}

			var pointsRemaining = endPoint - n;

			if (pointsArray[n] != null) {

				for (var i = 0; i < (pointsRemaining); i++) {

					var pt1 = {
						x : pointsArray[n].x,
						y : pointsArray[n].y
					};
					var pt2 = {
						x : pointsArray[n + i].x,
						y : pointsArray[n + i].y
					};
					var dx = pt2.x - pt1.x;
					var dy = pt2.y - pt1.y;
					var slope = dy / dx;
					var d = Math.sqrt(dx * dx + dy * dy);

					f = d / lineDistranceFactor;
					if (f < lineDistranceFactorLimit) {
						f = lineDistranceFactorLimit;
					}
					if (f > 1) {
						f = 1.1;
					}

					if (Math.random() > .99) {
						f *= -1;
					}

					// overrides
					if (!useVariableDist)
						f = lineDistranceFactorLimit;

					var dxp = f * dx;
					var dyp = f * dy;

					var ptA = {
						x : pt1.x + dxp,
						y : pt1.y + dyp
					};

					var ptB = {
						x : pt2.x - dxp,
						y : pt2.y - dyp
					};

					//ptB.y = slope * ptB.x;
					if (!pointsArray[n + i].drawn) {
						ctx.moveTo(ptA.x, ptA.y);
						ctx.lineTo(ptB.x, ptB.y);
						if (lightMode)
							pointsArray[n].drawn = true;
					}
				}
			}
			ctx.stroke();
		}
	}

	/*** Reaches max number of points or lines to draw, i.e. "Drawing" is finished  ***/
	if (points > pointLimitForSave) {
		drawingDone();
	}
}

function drawingDone() {

	if (eraseMode) {
		/********** // restarts drawing as normal ********/
		eraseMode = false;
		// trace line
		ctx.strokeStyle = traceLineColor;
		ctx.lineWidth = .8;
		if (saving) {
			if (save()) {
				/** give the browser time to save  **/
				var delay = setTimeout(function() {
					restartDrawing();
				}, 3000);
			}
		} else {
			restartDrawing();
		}
	} else {
		eraseMode = true;
		setEraseParams();
		clearInterval(timerDraw);
		var delay = setTimeout(function() {
			/** Will restart the timer but this time as an eraser  **/
			startTimer();
		}, delayTime);
	}

	pointsArray = new Array({
		x : w / 2,
		y : h / 2
	});

	//console.log(angle, meanderRange,segmentLength);
}

function restartDrawing() {
	clearInterval(timerDraw);
	erase();
	setNewParams();
	drawTableau();
}

function erase() {
	ctx.restore();
	//ctx.clearRect(0, 0, w, h);
	canvasColor = canvasColor;
	ctx.fillStyle = "green";
	//canvasColor;
	if (!eraseMode) {
		//ctx.drawImage(img, 0, 0, 800, 640, 0, 0, 800, 640);
	}
	ctx.fillRect(0, 0, w, h);
	ctx.save();
}

