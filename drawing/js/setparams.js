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
	};
}