var canvas;
var ctx;
var canvasoverlay;
var ctxoverlay;
var centerX;
var centerY;
var ctxWidth;
var ctxHeigth;
var xOffSet;
var yOffSet;

// Tree variations
var count = 0;

// Variation controls
var animate = true;
var animateTimer;

var activeCount = 0;
var active = true;

var gray = "110";
var lineVal = 1;
var bgColor = "rgba(" + gray + "," + gray + "," + gray + ",.9)";
var bgColorOverlay = "rgba(" + gray + "," + gray + "," + gray + ",.85)";
var lineStartColor = 'rgba(255,155,0,' + lineVal + ')';

var lineColors = new Array();

var tmr;
var animate = true;
var speed = 33;
var initialized = false;

var maxLength = 40;
var minLength = 40;
var lineCount = 200;
var rangeLevel = 2;
var oval = 1;

var userArray = new Array();

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 2;

	canvasoverlay = document.getElementById('canvasoverlay');
	ctxoverlay = canvasoverlay.getContext('2d');

	fillRect();

	setUp();
	clearInterval(tmr);
	tmr = setInterval(reRender, speed)

}

// Creates the initial set of marks or lines
function setUp() {
	userArray = new Array();
	for (var i = 0; i < lineCount; i++) {
		var line = setPoints();
		ctx.beginPath();
		ctx.moveTo(line.xPos, line.yPos);
		ctx.lineTo(line.xPos2, line.yPos2);
		ctx.closePath();
		//	ctx.stroke();

		var user = makeUser(line.xPos, line.yPos)
		userArray.push(user);
	}
	drawUsers();
}

function drawUsers() {
	var l = userArray.length;
	for (var i = 0; i < l; i++) {
		var user = userArray[i];
		drawUser(user);
	}

	for (var i = 0; i < l; i++) {
		var user = userArray[i];

		if (Math.random() > .99 && user.state != 1) {
			user.state = 1;
			//drawUser(user);
			var line = setPoints();
			var newuser = makeUser(line.xPos, line.yPos)
			userArray.push(newuser);
			break;
		}
	}
}

function setPoints() {

	var orientation = (Math.random() < .5) ? 1 : 0;
	var length = Math.round(Math.random() * maxLength);
	if (length < minLength)
		length = minLength;
	var xPos = Math.random() * ctxWidth;
	var yPos = Math.random() * ctxHeight;

	// Simulate normal distribution
	// 0 1 2 3 4
	var range = Math.floor(Math.random() * rangeLevel);
	var maxRadius = Math.sqrt(ctxWidth * ctxWidth + ctxHeight * ctxHeight) / 2.5;
	var maxRadius = Math.sqrt(oval * oval + oval * oval) / 2.5;

	//divide maxRadius into segments & choose where the lines start
	// parametric equation for ellipse...
	var ellipseA = ctxWidth / 2 / oval
	var ellipseB = ctxHeight / 2 / oval
	var maxRadius
	var rndVal = Math.random();
	//radius = Math.random() * maxRadius / (range);

	var angle = Math.random() * Math.PI * 2;

	xPos = ctxWidth / 2 + ellipseA * rndVal * Math.cos(angle);
	yPos = ctxHeight / 2 + ellipseB * rndVal * Math.sin(angle);
	yPos2 = yPos;
	xPos2 = xPos;

	if (orientation == 1) {
		xPos -= length / 2;
		xPos2 = xPos + length;
	} else {
		yPos -= length / 2;
		yPos2 = yPos + length;
	}

	var line = {
		o : orientation,
		l : length,
		xPos : xPos,
		yPos : yPos,
		xPos2 : xPos2,
		yPos2 : yPos2
	};

	return line;
}

function makeUser(xPos, yPos) {
	var baseRadius = maxLength / 10 * Math.random() + 3 + minLength / 10;
	lineVal = (Math.random() > .6) ? .7 : 1;
	lineStartColor = (Math.random() > .5 ) ? {
		r : 255,
		g : 200,
		b : 0,
		a : lineVal
	} : {
		r : 255,
		g : 150,
		b : 0,
		a : lineVal
	}
	return {
		baseRadius : baseRadius,
		lineStartColor : lineStartColor,
		xPos : xPos,
		yPos : yPos,
		fade : 0,
		state : 0,
		redraw : 0
	};
}

function getRGBA(obj) {
	return "rgba(" + obj.r + "," + obj.g + "," + obj.b + "," + obj.a + ")";
}

function drawUser(user) {

	if (user.redraw == 0 && user.fade < 10) {

		ctx.strokeStyle = getRGBA(user.lineStartColor);
		ctx.fillStyle = user.bgColorOverlay;
		ctx.lineWidth = 4;

		ctx.beginPath();
		ctx.arc(user.xPos, user.yPos + user.baseRadius * 3, user.baseRadius * 2.4, 0, Math.PI, true);
		ctx.stroke();
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(user.xPos, user.yPos, user.baseRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		user.redraw = 1;
		user.fade += 1;

	}

	if (user.state == 1) {
		user.lineStartColor = {
			r : gray,
			g : gray,
			b : gray,
			a : .3
		};
		//user.bgColorOverlay = "rgba(" + gray + "," + gray + "," + gray + ",.1)";
		user.state = 1;
		user.redraw = 0;
		//drawUser(user)
		//user.fade += 1;
	}

	if (user.fade > 10) {
		// remove from array
		userArray.shift();

	}
}

function fillRect() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
}

function reRender() {
	if (animate) {
		drawUsers();
	}
}

function reSet() {
	fillRect();
	setUp();
}

function redraw() {
	reSet();
	drawUsers();
}

