/*
 * Globals
 */
var ctx;
var canvasref;
var allIntervals = new Array();
var intervalSelection = 0;
var rMinimum = -101;
var t;
var canvas;

var gyres = new Array();
var canvasColor = "rgba(0,0,0,1)";
var textColor = "rgba(225,225,225,.4)";
var w;
var h;
var xOffset;
var yOffset;
var radiusFactor = 6;
var radius;
var angle;
var unitAngle;
var segments;
var angleIncrement;
var radiusIncrement;
var rotationIncrement;
var unitAngleIncrement;
var countLimit = 800;
var multiplier = 5;
var D = 900;
var count = 0;

var radiusMode = false;
var gyreMode = true;
var force = false;
var mode = "external";

window.onload = init;

function init() {
	ctx = document.getElementById('canvas').getContext('2d');
	canvasref = document.getElementById('canvas');
	w = canvasref.width;
	h = canvasref.height;
	xOffset = w / 2;
	yOffset = h / 2;

	if (Math.random() > 1) {
		canvasColor = "rgba(220,220,220,1)";
		textColor = "rgba(255,255,255,.8)";
	} else {
		canvasColor = "rgba(0,0,0,1)";
		textColor = "rgba(225,225,225,.4)";
	}

	ctx.fillStyle = canvasColor;
	ctx.fillRect(0, 0, w, h);

	gyres = new Array();

	countLimit = 300 + Math.random() * 1200;
	D = 200 + Math.random() * 900;

	var gyre = {};
	gyre.radius = 1;
	gyre.count = 0;
	gyre.angle = 0;
	gyre.unitAngle = 0;
	gyre.yOffset = h;
	gyre.xOffset = w / 2;

	gyre.angleIncrement = -Math.PI / (Math.random() * 50);
	gyre.unitAngleIncrement = Math.PI / (Math.random() * 50);
	if (gyre.angleIncrement >= (2 * Math.PI)) {
		gyre.angleIncrement -= (2 * Math.PI);
	}
	gyre.radiusIncrement = (Math.random() * 20);
	gyre.rotationIncrement = (Math.random() * Math.PI / 20);
	gyre.radiusIncrement = 5;
	gyre.radius = 100;
	gyre.direction = 1;
	gyre.particleColor = "rgba(255,200,50,.5)";
	gyres.push(gyre);

	var gyre = {};
	gyre.radius = 1;
	gyre.count = 0;
	gyre.angle = 0;
	gyre.unitAngle = 0;
	gyre.yOffset = 0;
	gyre.xOffset = w / 2;

	gyre.angleIncrement = Math.PI / (Math.random() * 50);
	gyre.unitAngleIncrement = Math.PI / (Math.random() * 50);
	if (gyre.angleIncrement >= (2 * Math.PI)) {
		gyre.angleIncrement -= (2 * Math.PI);
	}
	gyre.radiusIncrement = (Math.random() * 20);
	gyre.rotationIncrement = (Math.random() * Math.PI / 20);
	gyre.radiusIncrement = 5;
	gyre.radius = 100;
	gyre.direction = -1;
	gyre.particleColor = "rgba(0,100,255,.5)";
	gyres.push(gyre);

	t = setInterval(enterFrame, 11);
}

function returnPerspectiveRation(z) {
	// gyreMode always returns mock perspective ratio
	var perspective_ratio = 1;
	if (gyreMode) {
		perspective_ratio = D / (D + z);
	} else {
		perspective_ratio = 1;
	}
	return perspective_ratio;
}

function returnPoint(angle, radius, dir) {
	var x, y, z;
	if (radiusMode) {
		x = Math.sin(angle) * radius;
		y = dir * radius / 2;
		z = Math.cos(angle) * radius;
	} else {

		x = Math.sin(angle) * (w - Math.sqrt(radius) * radiusFactor) + Math.sin(angle);
		z = Math.cos(angle) * (h - Math.sqrt(radius) * radiusFactor) + Math.cos(angle);

		y = dir * -radius / 4;
		x = Math.sin(angle) * Math.sqrt(radius) * radius / 400;
		z = Math.cos(angle) * Math.sqrt(radius) * radius / 400;
	}

	return {
		x : x,
		y : y,
		z : z
	};
}

function draw(e) {

	var pts = new Array();

	for (var i = 0; i < 2; i++) {

		var gyre = gyres[i];

		gyre.angle += gyre.angleIncrement;
		gyre.unitAngle += gyre.unitAngleIncrement;

		if (radiusMode) {
			var diff = (gyreMode) ? 2 : 10;
			gyre.radius += gyre.radiusIncrement / diff;
		} else {
			gyre.radius += gyre.radiusIncrement;
		}
		var pt = returnPoint(gyre.angle, gyre.radius, gyre.direction);

		var ran = Math.random() * multiplier;
		var pr = returnPerspectiveRation(pt.z);
		var yPos;
		if (gyreMode) {
			yPos = pt.y;
		} else {
			yPos = pt.z;
		}

		//document.getElementById('debug').innerHTML+=""+pt.z;
		var txt = (Math.random() < .1) ? "shame" : setText();

		if (i == 1) {
			txt = setConfictText(mode);
		}

		pts.push({
			x : pt.x + gyre.xOffset,
			y : yPos + gyre.yOffset
		});

		ctx.save();
		ctx.translate(pt.x + gyre.xOffset, yPos + gyre.yOffset);
		ctx.scale(pr, pr);
		ctx.fillStyle = textColor;
		ctx.mozTextStyle = "10px sans-serif";
		ctx.font = "11px LAM, sans-serif";
		ctx.textAlign = "left";
		ctx.rotate(gyre.unitAngle);
		ctx.fillText(txt, -5, -5);
		ctx.strokeStyle = gyre.particleColor;
		ctx.fillStyle = "rgba(0,0,0,.5)";
		ctx.beginPath();
		ctx.arc(-5, -5, ran, 0, Math.PI * 2, true);
		ctx.closePath();
		//ctx.fill();
		ctx.stroke();
		ctx.rotate(-gyre.angle);
		ctx.restore();

		gyre.count += 1;
	}
	if (gyre.count > countLimit || yPos + h < 0 || yPos + h > h) {
		//window.clearInterval(t);
	}
	if (gyre.count > countLimit) {
		window.clearInterval(t);
		//reDraw();
	}

	ctx.save();
	ctx.strokeStyle = "rgba(255,0,0," + gyre.count / countLimit / 5 + ")";
	if (Math.random() > .5)
		ctx.strokeStyle = "rgba(" + Math.floor(Math.random() * 255) + " ," + Math.floor(Math.random() * 255) + " ," + Math.floor(Math.random() * 255) + " , " + gyre.count / countLimit / 5 + ")";
	ctx.beginPath();
	ctx.moveTo(pts[0].x, pts[0].y);
	ctx.lineTo(pts[1].x, pts[1].y);
	ctx.stroke();

}

function reDraw() {
	window.clearInterval(t);
	init();
}

function enterFrame(event) {
	draw();
}

function getRandomNumber(arg) {
	var rn = Math.random();
	return rn;
}

function randomBetween(a, b) {
	var r = Math.random() * (b - a) + a;
	return r;
}

function dl() {
	canvas = document.getElementById("canvas");
	imgDl = canvas.toDataURL("image/jpg");
	window.open(imgDl, "image.jpg");
}

