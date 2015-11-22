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
var angle = 75;
var count = 0;

// Variation controls
var scaleFactor = 1;
var scaleFactorMax = 8.5;
var scaleFactorMin = 1.5;
var mutationPossibility = 1;
var animate = true;
var animateTimer;

var activeCount = 0;
var active = true;

var bgColor = "rgba(255,255,255,1)";
var bgColorOverlay = "rgba(255,255,255,1)";
var bgColor = "rgba(0,0,0,1)";
var bgColorOverlay = "rgba(0,0,0,1)";
var lineStartColor = 'rgba(255,255,0,.1)';

var startNumber = 0;
var numberOfRings = 16;

var radiusBase = 0;
var chordLength = 20;
var chordLengthIncrease = 1;
var radiusLengthIncrease = 10;
var diceSizeIncrease = 2;
var useProgressiveSize = true;

var tmr;
var animate = true;
var circleRotation = 0;
var diceProperties = new Array();
var initialized = false;
var diceCount = 0;

// start
//window.onload = init;

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

	scaleFactor = scaleFactorMin;

	if (ctxWidth > 1000 && ctxHeight > 1000) {
		//scaleFactorMax = 5.5;
		//scaleFactorMin = 2;
	}

	clearInterval(tmr);
	tmr = setInterval(reRender, 10);

	//drawConcentricDice();
}

function drawConcentricDice() {

	var radiusCumulative = 0;
	var diceSizeCumulative = chordLength;
	var radius;
	var chordLengthToUse = chordLength;
	diceCount = 0;

	ctx.globalCompositeOperation = 'destination-out';
	ctx.globalCompositeOperation = 'source-over';
	//ctx.globalCompositeOperation = 'darker';
	ctx.globalAlpha = 0.5;
	//drawGradientGray(ctxoverlay)
	ctx.drawImage(canvasoverlay, 0, 0);
	ctx.globalAlpha = 1;
	////ctx.globalCompositeOperation = 'source-over';

	for (var n = startNumber; n < numberOfRings; n++) {

		// approximation
		radius = radiusBase + n * chordLengthToUse;
		chordLengthToUse += chordLengthIncrease;

		N = Math.floor(Math.PI / (Math.asin(chordLengthToUse / (2 * radius))));

		if (useProgressiveSize) {
			radiusCumulative += diceSizeCumulative + radiusLengthIncrease;
			diceSizeCumulative += diceSizeIncrease;
			chordLengthToUse = diceSizeCumulative + chordLengthIncrease;
			radius = radiusCumulative;
		}

		/*********** Calculate the number of dice per ring   *************/

		N = Math.floor(Math.PI / (Math.asin(chordLengthToUse / (2 * radius))));
		drawCircle(N, centerX, centerY, radius, diceSizeCumulative);
		/*****************************************************************/
		circleRotation += Math.PI / 50;
	}

	if (initialized == false)
		initialized = true;
}

function drawCircle(N, xOffSet, yOffSet, radius, diceSize) {
	rads = Math.PI * 2 / N;
	//var chordLength  = (chord==0) ? 2 * radius * Math.sin(Math.PI / N) :  chord;

	var init = Math.round((N + 1) / 2);
	init = 1;
	var alt = (Math.random() > .5 ) ? 1 : 0;
	var rCount = 0;

	for (var i = init; i <= N; i++) {
		var xPos = radius * Math.cos(rads * i + circleRotation / N) + xOffSet;
		var yPos = radius * Math.sin(rads * i + circleRotation / N) + yOffSet;

		//if (xPos < (xOffSet + ctxWidth + diceSize) && xPos > (xOffSet) && yPos > (yOffSet - ctxHeight - diceSize) && yPos < yOffSet) {
		rCount++;

		var p1 = {
			x : radius * Math.cos(rads * (i + 0)),
			y : radius * Math.sin(rads * (i + 0))
		};
		var p2 = {
			x : radius * Math.cos(rads * (i - 1)),
			y : radius * Math.sin(rads * (i - 1))
		};

		var dx = p1.x - p2.x;
		var dy = p1.y - p2.y;
		var dis = Math.sqrt(dx * dx + dy * dy);
		var angle = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) + circleRotation / N;

		if (i > (N + 1) / 2) {
			angle += Math.PI
		}
		var alpha = .9;
		ctx.fillStyle = "#09f";
		ctx.fillStyle = "#0000ff";
		var col = "rgba(" + Math.floor(Math.random() * 255) + " ," + Math.floor(Math.random() * 255) + " ," + Math.floor(Math.random() * 255) + " , " + alpha + ")";
		var diceDibs = Math.ceil(Math.random() * 6);

		if (initialized == false) {
			diceProperties[diceCount] = ( {
				color : col,
				number : diceDibs
			})
		} else {
			diceDibs = diceProperties[diceCount].number;
			col = diceProperties[diceCount].color;
		}

		ctx.fillStyle = col;
		//ctx.fillStyle = hslColor(Math.random() * 360, 60, 40);
		//ctx.fillStyle = hslColor( 90,100,50);

		ctx.save();
		ctx.translate(xPos, yPos);
		ctx.rotate(angle);
		//ctx.fillRect(0, 0, diceSize * 1.1, diceSize * 1.1);
		ctx.roundRect(0, 0, diceSize, diceSize, 5).stroke();
		drawDice(diceDibs, 0, 0, diceSize);
		ctx.restore();

		diceCount++;
	}

}

function hslColor(h, s, l) {
	return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
	if (w < 2 * r)
		r = w / 2;
	if (h < 2 * r)
		r = h / 2;
	this.beginPath();
	this.moveTo(x + r, y);
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	this.closePath();
	this.fill()
	return this;
}

function drawDice(arg, xPos, yPos, diceSize) {
	diceDibSize = diceSize / 9;

	var dibOffset = diceSize / 4;
	var dibOffset2 = dibOffset * 3;

	var markShape = "";
	if (arg == 1) {
		drawMark(markShape, diceSize / 2, diceSize / 2, diceDibSize);
	}

	if (arg == 2) {
		drawMark(markShape, dibOffset, dibOffset, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset2, diceDibSize);
	}

	if (arg == 3) {
		drawMark(markShape, dibOffset, dibOffset, diceDibSize);
		drawMark(markShape, diceSize / 2, diceSize / 2, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset2, diceDibSize);
	}

	if (arg == 4) {
		drawMark(markShape, dibOffset, dibOffset, diceDibSize);
		drawMark(markShape, dibOffset, dibOffset2, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset2, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset, diceDibSize);
	}

	if (arg == 5) {
		drawMark(markShape, dibOffset, dibOffset, diceDibSize);
		drawMark(markShape, dibOffset, dibOffset2, diceDibSize);
		drawMark(markShape, diceSize / 2, diceSize / 2, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset2, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset, diceDibSize);
	}

	if (arg == 6) {
		drawMark(markShape, dibOffset, dibOffset, diceDibSize);
		drawMark(markShape, dibOffset, diceSize / 2, diceDibSize);
		drawMark(markShape, dibOffset, dibOffset2, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset, diceDibSize);
		drawMark(markShape, dibOffset2, diceSize / 2, diceDibSize);
		drawMark(markShape, dibOffset2, dibOffset2, diceDibSize);
	}

}

function drawMark(markShape, xPos, yPos, r) {
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.arc(xPos, yPos, r, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}

function fillRect() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
}

function reRender() {
	if (animate) {
		fillRect();
		drawConcentricDice();
	}
}

function redraw() {
	initialized = false;
	diceProperties = new Array();
	fillRect();
	drawConcentricDice();
}

function debug(arg) {
	document.getElementById("debug").innerHTML += "\n " + arg;
}

function drawGradientGray(arg) {
	var grad = arg.createLinearGradient(0, 0, 0, ctxHeight);
	var rad = ctxHeight / 1.7;
	var rad1 = ctxWidth / 1.1;
	var grad = arg.createRadialGradient(ctxWidth / 2, ctxHeight / 2, rad, ctxWidth / 2, ctxHeight / 2, rad1);
	var stops = 3;
	grad.addColorStop(0, 'gray');
	grad.addColorStop(1 / stops, 'black');

	//grad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
	//grad.addColorStop(1, "rgba(255, 0, 0, 1.0)");
	//grad.addColorStop(2 / stops, 'black');

	arg.fillStyle = grad;
	arg.fillRect(0, 0, ctxWidth, ctxHeight);
	arg.fill();
}
