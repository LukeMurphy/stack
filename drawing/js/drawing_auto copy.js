/*
 * Globals
 */

var ctx, canvasRef;
var ctxBuffer, canvasRefBuffer;
var t;
var canvas;
var canvasColor = "rgba(210,207,199,1)";
var textColor = "rgb(255,255,255)";
var strokeStyle = "rgba(50,50,50, .1)";
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

var drawEnabled = true;

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

	document.getElementById('debug').style.visibility = "hidden";
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;
	canvasColor = canvasColor;
	ctx.fillStyle = canvasColor;
	ctx.fillRect(0, 0, w, h);
	angle = Math.random() * 360;
	buffer = 2;

	img = new Image();
	img.src = "bg.png";
	img.onload = start;

}

function start() {
	pointsArray = new Array();
	linesArray = new Array();
	linesArray.push(getLineFeatures());
	var line = linesArray[0];

	currX = 0;
	currY = 0;
	prevX = 200;
	prevY = 200;

	if (false) {
		angle = 90;
		meanderRange = 30;
		reflection = 90;
		segmentLength = 10;
		radius = 10;
		direction = 1;
		angleFactor = .5;
		buffer = 2;
		useAngleFactor = true;
		meanderingLine = true;
		intermediatePointsFactor = 300;
		intermediatePointsLimit = 2;
		trailingPointsFactor = .642;
		trailingPointsLimit = 80;
		lineDistranceFactor = 500;
		lineDistranceFactorLimit = .1;
		useMultiColor = true;
		useVariableDist = false;
		usePenMode = true;
		lightMode = false;
		pointLimitForSave = 1000;
	}
	//ctx.drawImage(img, 0, 0, 800, 640, 0, 0, 800, 640);

	t = setInterval(function() {
		draw();
	}, 10);

}

function setEraseParams() {
	angle = 10;
	meanderRange = .5;
	reflection = 30;
	segmentLength = 100;
	radius = 5;
	direction = 1;
	angleFactor = .5;
	buffer = 2;
	useAngleFactor = true;
	meanderingLine = true;
	intermediatePointsFactor = 300;
	intermediatePointsLimit = 1;
	trailingPointsFactor = .642;
	trailingPointsLimit = 80;
	lineDistranceFactor = 500;
	lineDistranceFactorLimit = .1;
	useMultiColor = true;
	useVariableDist = false;
	usePenMode = true;
	lightMode = false;
	pointLimitForSave = 500;
}

function getLineFeatures() {
	return {
		width : 1,
		done : false,
		level : 0,
		angle : angle,
		direction : 1,
		stepCount : 0,
		lastPoint : {
			x : w * Math.random(),
			y : h * Math.random()
		},
		nextPoint : {
			x : 0,
			y : 0
		},
		pointArray : new Array(),
	}
}

function calculateNextPoint(line) {
	var nextPoint = Point();
	nextPoint.x = (line.lastPoint.x + segmentLength * Math.cos(line.angle / 180 * Math.PI) * line.direction);
	nextPoint.y = (line.lastPoint.y + segmentLength * Math.sin(line.angle / 180 * Math.PI) * line.direction);

	if (nextPoint.x > w || nextPoint.x < 0 || nextPoint.y > h || nextPoint.y < 0 || Math.random() > .8) {
		var splitPoint = {
			x : line.lastPoint.x,
			y : line.lastPoint.y
		};
		var angle1 = line.angle + reflection;
		var angle2 = line.angle - reflection;

		line.angle = (Math.random() > .5) ? angle1 : angle2;
		if (nextPoint.x > w)
			nextPoint.x = w * Math.random();
		if (nextPoint.x < 0)
			nextPoint.x = w * Math.random();
		if (nextPoint.y > h)
			nextPoint.y = h * Math.random();
		if (nextPoint.y < 0)
			nextPoint.y = h * Math.random();
	}

	//console.log(nextPoint.x)
	var angleChange;
	if (meanderingLine) {
		angleChange = meanderRange - Math.random() * meanderRange * 2;
		line.angle += angleChange;
		if (useAngleFactor)
			line.angle += angleFactor;
	} else {
		angleChange = meanderRange;
		angleChange *= 1.01;
		line.angle += angleChange;
		angleChange = meanderRange - meanderRange * 2;
		meanderRange += .1 * direction;
	}

	return nextPoint;
}

function draw() {
	if (drawEnabled) {

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
		ctx.strokeStyle = "rgba(100,100,100,.01)";
		ctx.lineWidth = .8;

		if (eraseMode) {
			ctx.strokeStyle = canvasColor;
			//ctx.strokeStyle = "rgba(0,0,0,1)";
			ctx.lineWidth = 200;
		}

		ctx.moveTo(prevX, prevY);
		ctx.lineTo(currX, currY);
		ctx.stroke();

		pointsDraw();

		line.lastPoint = line.nextPoint;
	}
}

function interpolate(p1, p2) {
	// Interpolation

	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	var d = Math.sqrt(dx * dx + dy * dy);

	//Line speed adjustments
	intermediatePoints = Math.round(d / intermediatePointsFactor);
	if (intermediatePoints < 1)
		intermediatePoints = 2;

	trailingPoints = Math.round(d / trailingPointsFactor);

	if (trailingPoints < 10)
		trailingPoints = 10;
	if (trailingPoints > trailingPointsLimit)
		trailingPoints = trailingPointsLimit;

	//overrides
	//trailingPoints = trailingPointsLimit;
	//intermediatePoints = intermediatePointsLimit;

	for (var q = 0; q < intermediatePoints; q++) {
		var dxp = q * dx / intermediatePoints;
		var dyp = q * dy / intermediatePoints;
		var pt = {
			x : p1.x + dxp,
			y : p1.y + dyp
		};
		pointsArray.push({
			x : pt.x,
			y : pt.y,
			drawn : false
		});
	}

}

function pointsDraw() {

	var points = pointsArray.length - 1;
	var endPoint = points - 1;
	var startPoint = 0;

	if (points > pointLimitForSave) {
		drawingDone();
	}

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

			if (eraseMode) {
				ctx.strokeStyle = canvasColor;
				ctx.lineWidth = 200;
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
}

function drawingDone() {
	drawEnabled = false;
	angle = 90 * Math.random();
	meanderRange = 50 * Math.random();
	reflection = 90 * Math.random();
	segmentLength = 15 * Math.random() + 2;
	radius = 30 * Math.random();
	direction = 1;
	angleFactor = 10 * Math.random();
	buffer = 2;
	useAngleFactor = true;
	meanderingLine = true;
	intermediatePointsFactor = 300;
	intermediatePointsLimit = 2;
	trailingPointsFactor = Math.random();
	trailingPointsLimit = 200 * Math.random();
	lineDistranceFactor = 500;
	lineDistranceFactorLimit = Math.random();
	useMultiColor = true;
	useVariableDist = false;
	usePenMode = true;
	lightMode = false;
	pointLimitForSave = 3000 * Math.random();

	if (eraseMode) {
		eraseMode = false;
	} else {
		eraseMode = true;
		setEraseParams();
	}

	pointsArray = new Array({
		x : w / 2,
		y : h / 2
	});

	if (saving) {
		if (save()) {
			var delay = setTimeout(function() {
				erase();
				drawEnabled = true;
			}, delayTime);
		}
	} else {
		var delay = setTimeout(function() {
			erase();
			drawEnabled = true;
		}, 1000);
	}
	//console.log(angle, meanderRange,segmentLength);
}

function erase() {
	//ctx.clearRect(0, 0, w, h);
	canvasColor = canvasColor;
	ctx.fillStyle = canvasColor;
	if (!eraseMode) {
		//ctx.drawImage(img, 0, 0, 800, 640, 0, 0, 800, 640);
	}
	//ctx.fillRect(0, 0, w, h);
}

function save() {
	canvas = document.getElementById("canvas");
	var dlimg = canvas.toDataURL("image/jpg");
	window.open(dlimg, "image.jpg");
	return true;
}

function Point() {
	return {
		x : 0,
		y : 0
	};
}

function setNewColors() {
	// set the new start color
	r = Math.floor(Math.random() * 255);
	g = Math.floor(Math.random() * 255);
	b = Math.floor(Math.random() * 255);
	rIncr = gIncr = bIncr = .2;

	if (!useMultiColor)
		r = g = b = 50;
	// Pen mode
	if (usePenMode) {
		intermediatePointsLimit = 2;
		trailingPointsLimit = 110;
		lineDistranceFactorLimit = .31;
	} else {
		//intermediatePointsLimit = 3;
		//trailingPointsLimit = 30;
		//lineDistranceFactorLimit = .21;

	}
}

function incrementColors() {
	r += rIncr;
	g += rIncr;
	b += rIncr;
	if (r >= 255)
		r = 0;
	if (g >= 255)
		g = 0;
	if (b >= 255)
		b = 0;
}

function getNewColor() {
	var r = Math.round(255 * Math.random());
	var g = Math.round(255 * Math.random());
	var b = Math.round(255 * Math.random());
	return "rgba(" + r + "," + g + "," + b + ", .5)";
}