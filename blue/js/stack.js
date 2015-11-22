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
var textColor = "rgb(255,255,255)";
var textStrokeColor = "rgb(0,0,0)";

var centerX;
var centerY;
var count = 100;
var tmr;
var fillColor = "rgb(0,0,255)";
var gridSpacing = 4;

window.onload = init;
var txtLayer;

function init() {

	txtLayer = document.getElementById("textLayer");
	//txtLayer.style.top = '600px';
	txtLayer.style.padding = '20px';

	var t = setInterval(function() {
		animate();
	}, 11);
}

function _init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;

	canvasoverlay = document.getElementById('canvasoverlay');
	ctxoverlay = canvasoverlay.getContext('2d');
	//ctxview.font = '10px sans-serif';

	//ctxoverlay.beginPath();
	ctxoverlay.fillStyle = "rgb(0,0,255)";
	ctxoverlay.fillRect(0, 0, ctxWidth, ctxHeight);
	//ctxoverlay.stroke();
	//ctxoverlay.closePath();

	var imgData = ctxoverlay.getImageData(0, 0, ctxWidth, ctxHeight);
	ctx.putImageData(imgData, 0, 0);

	// translate context to center of canvas
	//ctx.translate(ctxWidth / 8, ctxHeight / 2);
	//ctx.scale(2, 2);

	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	// scale y component
	txt = "Pain/suffering";
	ctx.font = " 52px Courier";
	//, sans-serif";
	ctx.lineWidth = 2.5;
	ctx.fillStyle = textColor;
	ctx.strokeStyle = textStrokeColor;
	//ctx.mozTextStyle = "20px sans-serif";
	ctx.textAlign = "left";
	//ctx.translate(0.5,0.5);
	ctx.strokeText(txt, 0, 50);
	ctx.fillText(txt, 0, 50);

	//ctx.moveTo(100,10);
	//ctx.lineTo(200, 300);

	//ctx.strokeStyle = "rgba(0,0,0,1)";
	//ctx.fillStyle = "rgba(0,0,0,1)";
	//ctx.stroke();

	/********************/
	/********************/
	/********************/

	//setUp();

	/********************/
	/********************/
	/********************/
}

function setUp() {
	//drawGradientGray(ctxoverlay);
	ctx.globalCompositeOperation = 'source-over';
	//
	var t = setInterval(function() {
		animate();
	}, 11);
}

function animate() {
	var t = new Date();
	var d = new Date(1963, 05, 27, 19);

	var dDiff = t.getFullYear() - d.getFullYear();
	var mDiff = t.getMonth() - d.getMonth();
	var hDiff = t.getHours() - d.getHours();
	var minDiff = t.getMinutes() - d.getMinutes();
	var sDiff = t.getSeconds() - d.getSeconds();

	var t1 = new Date(2043, 05, 27, 19, 0, 0, 0);
	var dif = t1.getTime() - t.getTime();

	var Seconds_from_T1_to_T2 = dif / 1000;
	var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
	txtLayer.innerHTML = " PAIN " + " : " + Seconds_Between_Dates;
}

function dl() {
	canvas = document.getElementById("canvas");
	imgDl = canvas.toDataURL("image/jpg");
	window.open(imgDl, "image.jpg");
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
}