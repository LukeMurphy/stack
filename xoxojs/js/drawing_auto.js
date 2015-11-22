
window.onload = init;

function init() {
	Log("Started");

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

	pointsArray = new Array();
	linesArray = new Array();
	linesArray.push(getLineFeatures(true));

	setNewParams();
	useMultiColor = false;
	startTimer();
}


function drawX() {
	var marksArray = [];
	marksArray.push([[0, 0], [2, 2]], [[2, 0], [0, 2]]);
	return marksArray;
}

function draw() {
	var rect = canvas.getBoundingClientRect();
	var line = linesArray[0];

	var mark = drawX();
	var segmentLength = 50;
	for ( i = 0; i < mark.length; i++) {

		line.target = {
			x : Math.random() * rect.width,
			y : Math.random() * rect.height
		};
		line.nextPoint = calculateNextPoint(line);
		//console.log(line.nextPoint.y);

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

		/*
		 if (Math.random() > .7) {
		 ctx.shadowColor = 'blue';
		 ctx.shadowBlur = 3;
		 } else {
		 ctx.shadowColor = 'grey';
		 ctx.shadowBlur = 2;
		 }
		 */
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
		useMultiColor = false;
		if (Math.random() > .3) {
			//r = g = b = 50;
		}
	}

	//console.log(points, startPoint, endPoint)
	for (var n = startPoint; n < endPoint; n++) {
		ctx.beginPath();
		ctx.strokeStyle = "rgba(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ",.1)";
		ctx.lineWidth = .1;
		ctx.lineCap = 'round';

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

	/*** Reaches max number of points or lines to draw, i.e. "Drawing" is finished  ***/
	if (points > pointLimitForSave) {
		drawingDone();
	}
}


function calculateNextPoint(line) {

	var nextPoint = Point();
	nextPoint.x = (line.lastPoint.x + segmentLength * Math.cos(line.angle / 180 * Math.PI) * line.direction);
	nextPoint.y = (line.lastPoint.y + segmentLength * Math.sin(line.angle / 180 * Math.PI) * line.direction);

	nextPoint.x = line.target.x;
	nextPoint.y = line.target.y;

	var reduceFactor = .9;
	if (nextPoint.x > w * reduceFactor || nextPoint.x < 0 || nextPoint.y > h * reduceFactor || nextPoint.y < 0 || Math.random() > .8) {
		var splitPoint = {
			x : line.lastPoint.x,
			y : line.lastPoint.y
		};
		var angle1 = line.angle + reflection;
		var angle2 = line.angle - reflection;

		line.angle = (Math.random() > .5) ? angle1 : angle2;
		if (nextPoint.x > w)
			nextPoint.x = w * reduceFactor * Math.random();
		if (nextPoint.x < 0)
			nextPoint.x = w * reduceFactor * Math.random();
		if (nextPoint.y > h)
			nextPoint.y = h * reduceFactor * Math.random();
		if (nextPoint.y < 0)
			nextPoint.y = h * reduceFactor * Math.random();
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

function _calculateNextPoint(line) {
	var nextPoint = Point();
	nextPoint.x = (line.lastPoint.x + segmentLength * Math.cos(line.angle / 180 * Math.PI) * line.direction);
	nextPoint.y = (line.lastPoint.y + segmentLength * Math.sin(line.angle / 180 * Math.PI) * line.direction);
	var reduceFactor = .9;
	if (nextPoint.x > w * reduceFactor || nextPoint.x < 0 || nextPoint.y > h * reduceFactor || nextPoint.y < 0 || Math.random() > .8) {
		var splitPoint = {
			x : line.lastPoint.x,
			y : line.lastPoint.y
		};
		var angle1 = line.angle + reflection;
		var angle2 = line.angle - reflection;

		line.angle = (Math.random() > .5) ? angle1 : angle2;
		if (nextPoint.x > w)
			nextPoint.x = w * reduceFactor * Math.random();
		if (nextPoint.x < 0)
			nextPoint.x = w * reduceFactor * Math.random();
		if (nextPoint.y > h)
			nextPoint.y = h * reduceFactor * Math.random();
		if (nextPoint.y < 0)
			nextPoint.y = h * reduceFactor * Math.random();
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

/** Determine all the points between each set **/
function interpolate(p1, p2) {

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