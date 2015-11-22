var canvas;
var ctx;
var canvasview;
var ctxview;
var canvasoverlay;
var ctxoverlay;

var ctxWidth = 600;
var ctxHeight = 600;
var colorGradient = false;
var animation = true;

var bgColor = "rgb(0,0,255)";
window.onload = init;

var centerX;
var centerY;
var count = 100;
var tmr;
var fillColor = "rgb(151,164,76)";
var gridSpacing = 1;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;

	canvasoverlay = document.getElementById('canvasoverlay');
	ctxoverlay = canvasoverlay.getContext('2d');
	//ctxview.font = '10px sans-serif';

	/********************/
	/********************/
	/********************/

	drawGrid(1 * ctxWidth / gridSpacing, 1 * ctxWidth / gridSpacing);
	drawArcs();

	setUp();

	//drawBox();
	/********************/
	/********************/
	/********************/
}

function setUp() {
	//drawGradientGray(ctxoverlay);
	ctx.globalCompositeOperation = 'source-over';
	var c = "rgb(0,0,255)";
	var c = "rgb(94,51,97)";
	var s = "rgb(4,1,7)";
	//
	var t = setInterval(function() {
		animate();
	}, 11);
}

function drawArcs() {
	var xPos = ctxWidth / 2;
	var yPos = ctxHeight / 2;
	var rIncrement = ctxWidth / count / 4;
	ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.strokeStyle = "rgba(0,0,200,1)";
	for (var i = 0; i < 350; i++) {
		var lw = 1;
		//(40 / (i + .01));
		var r = i * (rIncrement );
		ctx.lineWidth = lw;
		ctx.beginPath();
		ctx.arc(xPos, yPos, r, 0, 2 * Math.PI, true);
		ctx.closePath();
		ctx.stroke();
		rIncrement += .1;
	}
}

function position() {
	var xPos = -ctxWidth + 2 * ctxWidth * Math.random();
	var yPos = -ctxHeight + 2 * ctxHeight * Math.random() - vOffset;
	var i = Math.floor(Math.random() * images.length);
	var rads = Math.random() * Math.PI;
	var rotation = Math.random() * Math.PI;
	var scale = Math.random() * scaleRange + scaleMinimum;
	ctx.translate(xPos, yPos);
	ctx.rotate(rads * i + rotation);

	ctx.rotate(-rads * i - rotation);
	ctx.translate(-xPos, -yPos);
}

function drawBox() {

	var boxWidth = 200;
	var boxHeight = 100;
	var xtrans = ctxWidth / 2;
	var ytrans = ctxHeight / 2;
	var rads = Math.PI / 3;
	var rotation = Math.PI / 3 * Math.random();

	ctxoverlay.translate(xtrans, ytrans);
	ctxoverlay.rotate(rotation);

	ctxoverlay.fillStyle = "rgba(0,0,255,1)";
	ctxoverlay.strokeStyle = "rgba(100,0,0,1)";
	ctxoverlay.lineWidth = 2;
	ctxoverlay.beginPath();
	ctxoverlay.rect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
	ctxoverlay.stroke();
	//ctxoverlay.fillRect(0, 0, boxWidth, boxHeight);

	//ctxoverlay.rotate(-rotation);
	ctxoverlay.translate(-xtrans, -ytrans);

	var imgData = ctxoverlay.getImageData(0, 0, ctxWidth, ctxHeight);
	ctx.globalCompositeOperation = 'source-over';
	ctx.putImageData(imgData, 0, 0);
}

function drawGrid(columns, rows) {

	var hspacing = gridSpacing;
	var vspacing = gridSpacing;
	var totalWidth = hspacing * columns;
	var totalHeight = vspacing * rows;
	var xtrans = ctxWidth / 2;
	var ytrans = ctxHeight / 2;
	var rads = Math.PI / 3;
	var rotation = Math.PI / 3 * Math.random();
	ctxoverlay.translate(xtrans, ytrans);
	ctxoverlay.rotate(rotation);

	ctxoverlay.fillStyle = "rgba(255,255,255,1)";
	ctxoverlay.strokeStyle = "rgba(0,0,100,1)";
	ctxoverlay.lineWidth = 1;
	ctxoverlay.beginPath();


	var xPos, yPos;

	for (var cols = 0; cols < columns; cols++) {
		xPos = cols * hspacing - totalWidth / 2;
		yPos = -totalHeight / 2;
		ctxoverlay.moveTo(xPos, yPos);
		ctxoverlay.lineTo(xPos, yPos + rows * gridSpacing);
	}
	
	for (var row = 0; row < rows; row++) {
		xPos = - totalWidth / 2;
		yPos = row * vspacing - totalHeight / 2;
		ctxoverlay.moveTo(xPos, yPos);
		ctxoverlay.lineTo(xPos + cols * gridSpacing, yPos);
		//ctxoverlay.fill();
	}
	ctxoverlay.stroke();
	//ctxoverlay.rotate(-rotation);
	ctxoverlay.translate(-xtrans, -ytrans);

	var imgData = ctxoverlay.getImageData(0, 0, ctxWidth, ctxHeight);
	ctx.globalCompositeOperation = 'source-over';
	ctx.putImageData(imgData, 0, 0);
}

function animate() {
	count++;
	if (count > 300) {
		ctxoverlay.fillStyle = bgColor;
		ctxoverlay.fillRect(0, 0, ctxWidth, ctxHeight);
		drawGrid(4 * ctxWidth / gridSpacing, 4 * ctxWidth / gridSpacing);
		count = 50;
		gridSpacing += 1;

	}
	//ctx.fillStyle = bgColor;
	//ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	//drawGrid(2 * ctxWidth / gridSpacing, 2 * ctxWidth / gridSpacing);
	var imgData = ctxoverlay.getImageData(0, 0, ctxWidth, ctxHeight);
	ctx.globalCompositeOperation = 'darker';
	ctx.putImageData(imgData, 0, 0);
	drawArcs();
	//redraw();
	//drawOver();
}

function drawOver() {
	var x1 = ctxWidth * Math.random();
	var y1 = ctxHeight * Math.random();
	var x2 = ctxWidth * Math.random();
	var y2 = ctxHeight * Math.random();

	canvasoverlay.beginPath();
	canvasoverlay.fillStyle = "rgb(0,0,255)";
	canvasoverlay.moveTo(x1, y1);
	canvasoverlay.lineTo(x2, y2);
	canvasoverlay.lineTo(ctxWidth, ctxHeight);
	canvasoverlay.lineTo(ctxWidth, 0);
	canvasoverlay.stroke();
	canvasoverlay.endPath();
	var imgData = canvasoverlay.getImageData(0, 0, ctxWidth, ctxHeight);
	ctx.putImageData(imgData, 0, 0);

}

function dl() {
	canvas = document.getElementById("canvas");
	imgDl = canvas.toDataURL("image/jpg");
	window.open(imgDl, "image.jpg");
}

function drawGradients(arg) {
	arg.fillStyle = bgColor;
	arg.fillRect(0, 0, ctxWidth, ctxHeight);

	var grad = arg.createLinearGradient(0, 0, 0, ctxHeight);
	var rad = 10;
	var rad1 = ctxWidth / 1.3;
	var grad = arg.createRadialGradient(ctxWidth / 2, ctxHeight / 2, rad, ctxWidth / 2, ctxHeight / 2, rad1);
	var stops = 7;
	grad.addColorStop(0, 'red');
	grad.addColorStop(1.5 / stops, 'orange');
	grad.addColorStop(2 / stops, 'yellow');
	grad.addColorStop(3 / stops, 'green')
	grad.addColorStop(4 / stops, 'aqua');
	grad.addColorStop(5 / stops, 'blue');
	grad.addColorStop(6 / stops, 'purple');
	grad.addColorStop(7 / stops, 'purple');
	arg.fillStyle = grad;
	arg.fillRect(0, 0, ctxWidth, ctxHeight);
	arg.fill();
}

function drawGradientGray(arg) {
	arg.fillStyle = bgColor;
	arg.fillRect(0, 0, ctxWidth, ctxHeight);
	var grad = arg.createLinearGradient(0, 0, 0, ctxHeight);
	var rad = 300;
	var rad1 = ctxWidth / 1.1;
	var grad = arg.createRadialGradient(ctxWidth / 2, ctxHeight / 2, rad, ctxWidth / 2, ctxHeight / 2, rad1);
	var stops = 2;
	grad.addColorStop(0, 'transparent');
	grad.addColorStop(1 / stops, 'black');
	//grad.addColorStop(2 / stops, 'black');

	arg.fillStyle = grad;
	arg.fillRect(0, 0, ctxWidth, ctxHeight);
	arg.fill();
}

function redraw() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	ctx.globalCompositeOperation = 'source-over';
	//drawGradientGray(ctxview);

	var imgData = ctxview.getImageData(0, 0, ctxWidth, ctxHeight);
	ctx.globalCompositeOperation = 'darker';
	ctx.putImageData(imgData, 0, 0);
	ctx.globalCompositeOperation = 'source-over';
	/*
	 if (colorGradient) {
	 ctx.globalCompositeOperation = 'lighter';
	 //ctxoverlay.fillRec
	 drawGradients(ctxoverlay);
	 ctx.drawImage(canvasoverlay, 0, 0);
	 }
	 */

}