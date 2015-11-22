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
var tmr;
var fadeInPlace = true;
var timerSpeed = 33;
var initialized = false;

// Dark Theme
var gray = "0";
var lineVal = 1;
var rInit1 = 255;
var gInit1 = 150;
var bInit1 = 0;
var rInit2 = 200;
var gInit2 = 150;
var bInit2 = 0;


var bgColor = "rgba(" + gray + "," + gray + "," + gray + ",1)";
var bgColorOverlay = "rgba(" + gray + "," + gray + "," + gray + ",.9)";
var lineStartColor = 'rgba(255,155,0,' + lineVal + ')';
var lineColors = new Array();

// size of users
var maxLength = 25;
var minLength = 20;

// animation
var amplitude = 2;
var speed = Math.PI / 25;

var userCount = 233;
// cluster tightness
var rangeLevel = 1;

//cluster radius (higher --> more clustered)
var oval = .92;
var probabilityOfNewUser = .999;

// arrows & lines
var minRange = 10;
var maxRange = 200;

// line length proportinal
var f = .2;

var userArray = new Array();


var drawConnectorRelationships = true
var arrowHeads = true
var theme = "light"

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 2;

	if (theme  ==  "light") {
		gray = "255";
		lineVal = 1;
		rInit1 = 50;
		gInit1 = 50;
		bInit1 = 50;
		rInit2 = 0;
		gInit2 = 0;
		bInit2 = 255;
		bgColor = "rgba(" + gray + "," + gray + "," + gray + ",1)";
		bgColorOverlay = "rgba(" + gray + "," + gray + "," + gray + ",.9)";
	}

	canvasoverlay = document.getElementById('canvasoverlay');
	ctxoverlay = canvasoverlay.getContext('2d');

	fillRect();

	setUp();
	clearInterval(tmr);
	tmr = setInterval(reRender, timerSpeed);

}

//Change base values
function change() {
	if (Math.random() > .99) {
		speed = Math.random() * Math.PI / 5;
		amplitude = .5 + Math.random() * 5;
		speed = Math.PI / (Math.random() * 25 + 1);
		oval = Math.random() * 2;
		maxRange = Math.random() * 400 + 100;
		minRange = 100 + Math.random();
	}
}

// Creates the initial set of marks or lines
function setUp() {
	userArray = new Array();
	for (var i = 0; i < userCount; i++) {
		var line = setPoints();
		ctx.beginPath();
		ctx.moveTo(line.xPos, line.yPos);
		ctx.lineTo(line.xPos2, line.yPos2);
		ctx.closePath();
		//	ctx.stroke();

		var user = makeUser(line.xPos, line.yPos);
		userArray.push(user);
	}
	renderUsers();
}

function renderUsers() {
	var l = userArray.length;
	for (var i = 0; i < l; i++) {
		var user = userArray[i];
		renderUser(user);
	}

	if (fadeInPlace) {
		for (var i = 0; i < l; i++) {
			var user = userArray[i];
			if (Math.random() > probabilityOfNewUser && user.state != 3) {
				// Start fading this user
				user.state = 1;

				// Create a new user
				var line = setPoints();
				var newuser = makeUser(line.xPos, line.yPos);
				userArray.push(newuser);
				break;
			}
		}

		if (userArray.length > userCount + 5) {
			userArray.shift();
		}
	}
}

// draw lines to users that are close by
function drawLines() {
	//minRange += 1;
	//maxRange -= 1;
	if (minRange > maxRange)
		minRange = 0;
	if (maxRange < minRange)
		maxRange = 700;

	var l = userArray.length;
	for (var i = 0; i < l; i++) {
		var user = userArray[i];
		for (var ii = i + 0; ii < l; ii++) {
			var user2 = userArray[ii];
			var dy = user.yPos - user2.yPos;
			var dx = user.xPos - user2.xPos;
			var d = Math.sqrt(dx * dx + dy * dy);
			var slope = dy / dx;

			/******* NOTE - atan2 gives results from 0 to 2PI not -PI/2 to PI/2 ******/
			var angle = Math.atan2(dy, dx);

			var dxp = f * dx;
			var dyp = f * dy;
			var endLength = 10;

			var ptA = {
				x : user.xPos - dxp,
				y : user.yPos - dyp
			};
			var ptB = {
				x : user2.xPos + dxp,
				y : user2.yPos + dyp
			};

			var arrowPtA = {
				x : 0,
				y : 0
			};
			var arrowPtB = {
				x : 0,
				y : 0
			};

			var sAngle = Math.PI / 2;
			endPtx = ptB.x + Math.sin(sAngle - angle + Math.PI / 4) * endLength;
			endPty = ptB.y + Math.cos(sAngle - angle + Math.PI / 4) * endLength;
			endPt2x = ptB.x + Math.sin(sAngle - angle + -Math.PI / 4) * endLength;
			endPt2y = ptB.y + Math.cos(sAngle - angle + -Math.PI / 4) * endLength;

			if (d > user.minRange && d < user.maxRange && user.redraw == 0 && user2.redraw == 0 && !isInArray(ii, user.attachedArray)) {
				var colorRef = user.outBoundLineColor;
				// shorter lines are darker
				var trans = (user.maxRange - d) / user.maxRange + .5;
				// Longer lines are darker
				//var trans = (d - minRange)/minRange;
				//trans = .85;
				var lineColor = "rgba(" + colorRef.r + "," + colorRef.g + "," + colorRef.b + "," + trans + ")";
				ctx.lineWidth = 2;
				ctx.strokeStyle = lineColor;

				// origin
				//ctx.rect(ptA.x-5,ptA.y-5,10,10);

				ctx.beginPath();
				ctx.moveTo(ptA.x, ptA.y);
				ctx.lineTo(ptB.x, ptB.y);
				
				//arrow

				if(arrowHeads) {
					ctx.lineTo(endPtx, endPty);
					ctx.lineTo(ptB.x, ptB.y);
					ctx.lineTo(endPt2x, endPt2y);
					ctx.moveTo(ptB.x, ptB.y);
				}

				ctx.closePath();
				ctx.stroke();
			}
		}
	}
}

function isInArray(arg, arr) {
	var val = false;
	for (var i = 0; i < arr.length; i++) {
		if (arg == arr[i]) {
			val = true;
			break;
		}
	}
	return val;
}

// All User properties of the object user
function makeUser(xPos, yPos) {
	//yPos = 900;
	var baseRadius = maxLength / 10 * Math.random() + 3 + minLength / 10;

	baseRadius = maxLength / (Math.random() + 1);
	if(baseRadius < minLength) baseRadius = minLength;

	lineVal = (Math.random() > .6) ? .7 : 1;
	lineStartColor = (Math.random() > .5 ) ? {
		r : rInit1,
		g : gInit1,
		b : bInit1,
		a : lineVal
	} : {
		r : rInit2,
		g : gInit2,
		b : bInit2,
		a : lineVal
	};

	var outBoundLineColor = {
		r : (Math.random() > .5) ? 255 : 0,
		g : (Math.random() > .5) ? 255 : 0,
		b : (Math.random() > .5) ? 255 : 0
	};

	var outBoundLineColor = {
		r : Math.floor(Math.random() * 255),
		g : Math.floor(Math.random() * 255),
		b : Math.floor(Math.random() * 255)
	};

	var yPosInit = (Math.random() > .5) ? (ctxHeight + 500 * Math.random()) : (-200 * Math.random());

	var userObj = {
		baseRadius : baseRadius,
		lineStartColor : lineStartColor,
		bgColorOverlay : bgColorOverlay,
		outBoundLineColor : outBoundLineColor,
		xPosFinal : xPos,
		yPosFinal : yPos,
		arrived : false,
		xPos : xPos,
		yPos : yPosInit,
		yPosInit : yPosInit,
		speed : speed, //* Math.random(),
		amplitude : amplitude, //* Math.random(),
		maxRange : maxRange,
		minRange : minRange,
		angle : Math.random() * Math.PI * 2,
		fade : 0,
		state : Math.random() > .99 ? 1 : 0,
		hasMouth : Math.random() > .7 ? 1 : 0,
		redraw : 0,
		lineWidth : 4,
		attachedArray : []
	};
	return userObj;
}

function renderUser(user) {
	if (user.arrived) {
		user.angle += user.speed;
		user.yPos += Math.cos(user.angle) * user.amplitude;
		user.hasMouth = (Math.random() > .5) ? true : false;
	} else {
		if (user.yPosInit > 0) {
			user.yPos -= 10;
			if (user.yPos <= user.yPosFinal) {
				user.arrived = true;
			}
		}
		if (user.yPosInit <= 0) {
			user.yPos += 10;
			if (user.yPos >= user.yPosFinal) {
				user.arrived = true;
			}
		}
	}

	if (user.redraw == 0) {
		ctx.strokeStyle = getRGBA(user.lineStartColor);

		var colorRef = user.outBoundLineColor;
		var fillColor = "rgba(" + colorRef.r + "," + colorRef.g + "," + colorRef.b + "," + .75 + ")";
		ctx.fillStyle = fillColor;

		// No color
		ctx.fillStyle = bgColorOverlay;

		ctx.lineWidth = user.lineWidth;

		ctx.beginPath();
		ctx.arc(user.xPos, user.yPos + user.baseRadius * 3, user.baseRadius * 2.4, 0, Math.PI, true);
		ctx.stroke();
		ctx.closePath();
		if (user.state < 1)
			ctx.fill();

		ctx.beginPath();
		ctx.arc(user.xPos, user.yPos, user.baseRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		// Mouth
		var mRadius = user.baseRadius / (2 + 4 * Math.random());
		mRadius = user.baseRadius / 4;
		if (user.hasMouth) {
			ctx.beginPath();
			ctx.lineWidth = 1;
			if (Math.random() > .9) {
				ctx.arc(user.xPos, user.yPos + user.baseRadius / 2.3 - mRadius / 8, mRadius, 0, Math.PI * 2, true);
			} else {
				ctx.moveTo(user.xPos - user.baseRadius / 2.9, user.yPos + user.baseRadius / 2.3);
				ctx.lineTo(user.xPos + user.baseRadius / 2.9, user.yPos + user.baseRadius / 2.3);
			}
			ctx.closePath();
			ctx.stroke();
		}
	}

	if (user.state == 1 && fadeInPlace == true) {
		user.lineStartColor.a -= .05;
		user.lineWidth = 2;
		//user.bgColorOverlay = "rgba(" + gray + "," + gray + "," + gray + ",.1)";
		user.fade += 1;
	}

	if (user.fade > 10) {
		// remove from array
		user.redraw = 1;
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
	var ellipseA = ctxWidth / 2 / oval;
	var ellipseB = ctxHeight / 2 / oval;
	var maxRadius;
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

function fillRect() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, -100, ctxWidth, ctxHeight + 100);
}

function reRender() {
	if (animate) {
		fillRect();
		if(drawConnectorRelationships) { drawLines(); }
		renderUsers();
		change();
	}
}

function reSet() {
	fillRect();
	setUp();
}

function redraw() {
	reSet();
	renderUsers();
}

