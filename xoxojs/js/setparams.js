/*
 * Globals
 */

var ctx, canvasRef;
var ctxBuffer, canvasRefBuffer;
var timerDraw;
var canvas;
var canvasColor = "rgba(210,207,199,1)";
var canvasColor = "rgba(210,220,220,1)";
var newCanvasColor = "rgba(210,220,220,.51)";
var eraseColor = "rgba(10,10,10,1)";
var textColor = "rgb(255,255,255)";
var strokeStyle = "rgba(50,50,50, .1)";
var traceLineColor = "rgba(100,100,100,.51)";
var w;
var h;
var r, g, b;
var rIncr, gIncr, bIncr;

var linesArray;
var pointsArray;
var intermediatePoints;
var trailingPoints;

var intermediatePointsFactor = 300;
var intermediatePointsLimit = 2;

var trailingPointsFactor = .642;
var trailingPointsLimit = 80;

var lineDistranceFactor = 500;
var lineDistranceFactorLimit = .1;

var useMultiColor = false;
var saving = false;

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

/******************************/

function setStraightParams() {
	angle = 90;
	meanderRange = 0;
	reflection = 90;
	segmentLength = 20;
	radius = 2;
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
	pointLimitForSave = 500;
	if (w > 1200) {
		segmentLength = 24;
		intermediatePointsFactor = 400;
		trailingPointsFactor = .642;
		trailingPointsLimit = 80;
		lineDistranceFactor = 640;
		pointLimitForSave = 500 + 100 + 120 * Math.random();
	}
}

function setEraseParams() {
	angle = 10;
	meanderRange = .5;
	reflection = 30;
	segmentLength = 300;
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
	pointLimitForSave = 100;
	eraseLineWidth = 500;

	if (w > 1200) {
		eraseLineWidth = 600;
	}
}

function setNewParams() {
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
	delayTime = 3000;
	//1000 + Math.floor(Math.random() * 5000);
	if (w > 1200) {
		segmentLength = 22 * Math.random() + 2;
		intermediatePointsFactor = 360;
		trailingPointsLimit = 300 * Math.random();
		lineDistranceFactor = 600;
		pointLimitForSave = 100 + 3000 * Math.random() + 500 * Math.random();
	}

	if (Math.random() > .8)
		setStraightParams();
}

function setInitials() {
	var setInitVals = false;
	if (setInitVals) {
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
}

/*******  Dependent Functions ***/

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

function getLineFeatures(init) {
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
		target : new Array(),
	};
}