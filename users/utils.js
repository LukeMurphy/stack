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

function getRGBA(obj) {
	return "rgba(" + obj.r + "," + obj.g + "," + obj.b + "," + obj.a + ")";
}