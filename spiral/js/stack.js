var canvas;
var ctx;
var canvasview;
var ctxview;
var ctxWidth = 600;
var ctxHeight = 600;
var blockArray = new Array();
var circleArray = new Array();
var pointArray = new Array();
var img;
var img2;
var angle = 15;
var scale = 6;

var num = 100;
var rads = 2 * Math.PI / num;
var radius = 500;
var xOffset;
var yOffset;
var rings = 12;

// controls the overall diameter: larger ==> smaller
var scaleIncr = 5;
// controls scale
var scaleIncrementFactor = 1.3;
// packing - smaller more dense
var radiusfactor = 1.5;
// min num
var numBase = 2;

var usingAlternateImages = false;
var usePhi = true;

var scaleElements = false;
var rotateElements = true;
var inverse = true;
var alt = 0;
var multiplier = 44;
var scaleLimit = 2;
var numPhi = 460;
var phiScaleIncr = 3.5;
var phiValue = 5;
var rotationOffset = Math.PI / 2;

var renderOffsetX = 100;
var renderOffsetY = 100;
var primaryImage;

window.onload = init;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;

	canvasview = document.getElementById('canvasview');
	ctxview = canvasview.getContext('2d');
	ctxview.font = '10px duchamp';
	//ctxview.font = '10px sans-serif';
	drawWords();

	// ctx.fillRect(50, 50, 50, 50);

	//ctx.globalAlpha = 0.5

	img = new Image();
	img2 = new Image();

	primaryImage = img;

	renderOffsetX = renderOffsetY = 100;

	radius = ctxWidth / 2 + 100;

	img.onload = function() {

	}
	img2.onload = function() {
		redraw();
	}

	img2.src = "/projects/stack/glory/images/dove.png"
	img.src = "/projects/stack/glory/images/ambassador-b.png"
	//img2.src = "images/birds-shades-b_16.png"

	var t = setInterval(function() {
		animate()
	}, 11);

}

function animate() {
	rotationOffset += Math.PI / 250;
	redraw();
}

function Phi() {
	return (Math.sqrt(phiValue)) / 2;
}

function drawPhi() {
	xOffset = ctxWidth / 2 * phiScaleIncr;
	yOffset = ctxHeight / 2 * phiScaleIncr;
	ctx.scale(1 / phiScaleIncr, 1 / phiScaleIncr);
	if (inverse == true) {
		for (var i = 0; i < numPhi; i++) {
			calculatePhi(i);
		}

	} else {
		for (var i = numPhi; i > 0; i--) {
			calculatePhi(i);
		}
	}
	ctx.scale(phiScaleIncr, phiScaleIncr);
}

function calculatePhi(i) {
	var xPos = Math.sqrt(i) * Math.cos(Phi() * i) * multiplier;
	var yPos = Math.sqrt(i) * Math.sin(Phi() * i) * multiplier;
	var rot = Math.atan2(yPos, xPos);
	var dia = 900 / Math.sqrt(xPos * xPos + yPos * yPos);
	dia += .01;
	if (dia > scaleLimit)
		dia = scaleLimit;

	if (!rotateElements)
		rot = 0;
	if (!scaleElements)
		dia = 2;

	blockArray.push({
		scale : 0
	})
	render(xPos + xOffset, yPos + yOffset, rot + rotationOffset, dia);
}

function draw() {
	// ctx.setTransform(hscale, hskew, vskew, vscale, hmove, vmove);

	var usingAlternateImages = false;

	for (var ii = rings; ii >= 0; ii--) {
		//for ( var ii = 0; ii < rings; ii++) {

		_scaleIncr = scaleIncr / rings * ii + scaleIncrementFactor;
		ctx.scale(1 / _scaleIncr, 1 / _scaleIncr);

		var _radius = radius / rings * ii * radiusfactor;
		var _num = num / rings * ii + numBase;
		rads = 2 * Math.PI / _num;

		xOffset = ctxWidth / 2 * _scaleIncr;
		yOffset = ctxHeight / 2 * _scaleIncr;

		radOffset = 2 * Math.PI / rings * ii
		var dia = 1;

		for (var i = 0; i < _num; i++) {
			//for ( var i = _num; i > 0; i--) {
			var xPos = 2.5 * _radius * Math.cos(rads * i + radOffset);
			var yPos = 2.5 * _radius * Math.sin(rads * i + radOffset);
			render(xPos + xOffset, yPos + yOffset, rads * i + rotationOffset, dia);
		}

		ctx.scale(_scaleIncr, _scaleIncr);
	}
}

function drawWords() {

	ctxview.fillStyle = "rgb(0,0,255)";
	ctxview.fillRect(0, 0, ctxWidth, ctxHeight);

	var _radius = radius / radiusfactor;
	var _num = 98;
	var rads = 2 * Math.PI / _num;

	var xOffset = ctxWidth / 2 * 1;
	var yOffset = ctxHeight / 2 * 1;

	var radOffset = 0//2 * Math.PI / rings * ii

	for (var i = 0; i < _num; i++) {

		var _translateX = _radius * Math.cos(rads * i + radOffset) + xOffset;
		var _translateY = _radius * Math.sin(rads * i + radOffset) + yOffset;
		var _scale = 1;
		var _rotate = rads * i;

		ctxview.translate(_translateX, _translateY);
		ctxview.rotate(_rotate);
		ctxview.scale(_scale, _scale);

		renderOffsetX = renderOffsetY = 180;
		ctxview.fillStyle = "white";

		var demonLabelA = gatesModifier[Math.floor(Math.random() * 12)];
		var demonAngelGroup = demonGroups[Math.floor(Math.random()*4)][0][Math.floor(Math.random() * 7)];
		var spokeLabel = demonLabelA + " " + demonAngelGroup;

		var demonLabelB = gatesModifier[Math.floor(Math.random() * 12)];

		//spokeLabel = 	"☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷"
		ctxview.fillText(spokeLabel, 0, 0);

		ctxview.scale(1 / _scale, 1 / _scale);
		ctxview.rotate(-_rotate);
		ctxview.translate(-_translateX, -_translateY);

	}

}

function render(_translateX, _translateY, _rotate, _scale) {
	ctx.translate(_translateX, _translateY);
	ctx.rotate(_rotate);
	ctx.scale(_scale, _scale);

	if (primaryImage == img) {
		renderOffsetX = renderOffsetY = 103;
	} else {
		renderOffsetX = renderOffsetY = 103;
	}

	if (usingAlternateImages) {
		if (alt == 0) {
			ctx.drawImage(img, -renderOffsetX, -renderOffsetY);
			alt = 1;
		} else {
			ctx.drawImage(img2, -renderOffsetX, -renderOffsetY);
			alt = 0;
		}
	} else {
		ctx.drawImage(primaryImage, -renderOffsetX, -renderOffsetY);
	}

	ctx.scale(1 / _scale, 1 / _scale);
	ctx.rotate(-_rotate);
	ctx.translate(-_translateX, -_translateY);
}

function refresh() {
	drawWords();
}

function dl() {
	canvas = document.getElementById("canvas");
	imgDl = canvas.toDataURL("image/jpg");
	window.open(imgDl, "image.jpg");
}

function redraw() {
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	/*
	 ctxview.translate(ctxWidth / 2, ctxHeight / 2)
	 ctxview.rotate(Math.PI / 100);
	 ctxview.translate(-ctxWidth / 2, -ctxHeight / 2)
	 */
	if (Math.random() > 1)
		drawWords();
	var imgData = ctxview.getImageData(0, 0, ctxWidth, ctxHeight);
	ctx.globalCompositeOperation = 'lighter';
	ctx.putImageData(imgData, 0, 0);
	ctx.globalCompositeOperation = 'source-over';

	if (usePhi) {
		drawPhi();
	} else {
		draw();
	}

}