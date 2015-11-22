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

function getNewColor() {
	var r = Math.round(255 * Math.random());
	var g = Math.round(255 * Math.random());
	var b = Math.round(255 * Math.random());

	return "rgba(" + r + "," + g + "," + b + ", .5)";
}

function Log(arg) {
	console.log("===>  " + arg);
}


function startTimer() {
	timerDraw = setInterval(function() {
		draw();
	}, 8);
}

function stopTimer() {
	clearInterval(timerDraw);
}

function drawingDone() {

	ctx.strokeStyle = traceLineColor;
	ctx.lineWidth = .8;
	pointsArray = new Array({
		x : w / 2,
		y : h / 2
	});

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

	//console.log(angle, meanderRange,segmentLength);
}

function restartDrawing() {
	clearInterval(timerDraw);
	erase();
	setNewParams();
	startTimer();
}

function erase() {
	ctx.restore();
	//ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = newCanvasColor;
	//canvasColor;
	//ctx.drawImage(img, 0, 0, 800, 640, 0, 0, 800, 640);
	ctx.fillRect(0, 0, w, h);
	ctx.save();
}
