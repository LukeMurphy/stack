function calculateNextPoint(line) {
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
