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

var intermediatePoints;
var trailingPoints;

var intermediatePointsFactor = 100;
var intermediatePointsLimit = 2;

var trailingPointsFactor = .2;
var trailingPointsLimit = 30;

var lineDistranceFactor = 500;
var lineDistranceFactorLimit = .31;

var pointsArray;

var flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;

var x = "black", y = 2;

var r, g, b;
var rIncr, gIncr, bIncr;

var useMultiColor = false;
var useVariableDist = false;
var usePenMode = false;
var lightMode = false;

window.onload = init;

function init() {

	document.getElementById('debug').style.visibility = "hidden";
	pointsArray = new Array();

	canvasHolderDiv = document.getElementById('canvasHolder');
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth * .9;
	canvas.height = window.innerHeight * .7;
	canvasHolderDiv.appendChild(canvas);
	
	ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;
	canvasColor = canvasColor;
	ctx.fillStyle = canvasColor;
	ctx.fillRect(0, 0, w, h);
	

	canvas.addEventListener("mousemove", function(e) {
		findxy('move', e);
	}, false);
	canvas.addEventListener("mousedown", function(e) {
		findxy('down', e);
	}, false);
	canvas.addEventListener("mouseup", function(e) {
		findxy('up', e);
	}, false);
	canvas.addEventListener("mouseout", function(e) {
		findxy('out', e);
	}, false);
	
	canvas.addEventListener("touchmove", function(e) {
		findxyt('move', e);
	}, false);
	canvas.addEventListener("touchstart", function(e) {
		findxyt('down', e);
	}, false);
	canvas.addEventListener("touchend", function(e) {
		findxyt('up', e);
	}, false);
	canvas.addEventListener("touchleave", function(e) {
		findxyt('out', e);
	}, false);
}

function draw() {
	//ctx.beginPath();
	//ctx.strokeStyle = "rgba(255,0,0,.5)";
	ctx.lineWidth = 1;
	//ctx.moveTo(prevX, prevY);
	//ctx.lineTo(currX, currY);
	interpolate({
		x : prevX,
		y : prevY
	}, {
		x : currX,
		y : currY
	});

	/*
	ctx.fillStyle = "rgba(255,0,0,.3)";
	ctx.beginPath();
	ctx.arc(currX, currY, 10, 0, 2 * Math.PI);
	ctx.stroke();
	*/
	//ctx.closePath();
	//ctx.stroke();
	pointsDraw();
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
	trailingPoints = trailingPointsLimit;
	intermediatePoints = intermediatePointsLimit;

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
	var endPoint = points;
	var startPoint = 0;

	startPoint = (endPoint - trailingPoints > 0) ? endPoint - trailingPoints : 0;
	var pointsToDraw = endPoint - startPoint - 1;
	
	console.log(pointsToDraw);

	for (var n = startPoint; n < endPoint; n++) {
		ctx.beginPath();

		ctx.strokeStyle = "rgba(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ",.01)";
		ctx.lineWidth = 1;
		var pointsRemaining = endPoint - n;

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
		ctx.stroke();
		//ctx.closePath();
	}
}

function erase() {
	//var diag = confirm("New drawing?");
	//if (diag) {
	ctx.clearRect(0, 0, w, h);
	canvasColor = canvasColor;
	ctx.fillStyle = canvasColor;
	ctx.fillRect(0, 0, w, h);
	//}
}

function save() {
	canvas = document.getElementById("canvas");
	var dlimg = canvas.toDataURL("image/jpg");
	window.open(dlimg, "image.jpg");
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
		intermediatePointsLimit = 3;
		trailingPointsLimit = 30;
		lineDistranceFactorLimit = .21;

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

function findxy(res, e) {

	//keeps the arrow cursor in view
	canvas.style.cursor = "default";
	var rect = canvas.getBoundingClientRect();

	//sets the new colors continuously
	if (useMultiColor) {
		setNewColors();
		if (Math.random() > .7) {
			r = g = b = 50;
		}
	}

	if (res == 'down') {
		pointsArray = new Array();

		// sets new color each new stroke
		setNewColors();

		prevX = currX;
		prevY = currY;
		currX = e.clientX - rect.left;
		currY = e.clientY - rect.top;

		flag = true;
		dot_flag = true;
		if (dot_flag) {
			dot_flag = false;
		}
	}
	if (res == 'up' || res == "out") {
		flag = false;
	}
	if (res == 'move') {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - rect.left;
			currY = e.clientY - rect.top;
			//incrementColors();
			draw();
		}
	}
}
function findxyt(res, e) {

	//keeps the arrow cursor in view
	canvas.style.cursor = "default";
	var rect = canvas.getBoundingClientRect();
	e.preventDefault();

	//sets the new colors continuously
	if (useMultiColor) {
		setNewColors();
		if (Math.random() > .7) {
			r = g = b = 50;
		}
	}

	if (res == 'down') {
		pointsArray = new Array();

		// sets new color each new stroke
		setNewColors();

		prevX = currX;
		prevY = currY;
		currX = e.targetTouches[0].pageX - rect.left;
		currY = e.targetTouches[0].pageY - rect.top;

		flag = true;
		dot_flag = true;
		if (dot_flag) {
			dot_flag = false;
		}
	}
	if (res == 'up' || res == "out") {
		flag = false;
	}
	if (res == 'move') {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.targetTouches[0].pageX - rect.left;
			currY = e.targetTouches[0].pageY  - rect.top;
			//incrementColors();
			draw();
		}
	}
}
