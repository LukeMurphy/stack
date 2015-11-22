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

function hslColor(h, s, l) {
	return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

function getRGBA(obj) {
	return "rgba(" + obj.r + "," + obj.g + "," + obj.b + "," + obj.a + ")";
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


