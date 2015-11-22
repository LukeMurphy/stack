var canvas;
var ctx;
var sW = 7;
var sH = 17;
var rows = 33;
var cols = 7;
var w = 500;
var vOffset = 28;
var hOffset = 0;
var blockArray = new Array();
var circleArray = new Array();
var pointArray = new Array();
var rate = 11;
var uniform = true;
var done = false;
var centerX;
var centerY;
var radius = 70;
var circles = 12;
var points = 403;
var verticalChangeFactor = 6;
var pointSize = 2;
var console;

var destinationColor = {
	r : 255,
	g : 2,
	b : 2
};
var easingRate = .05;

function calculateIncrement(arrayRef, n) {
	var r = arrayRef[n].r + arrayRef[n].rRate;
	var g = arrayRef[n].g + arrayRef[n].gRate;
	var b = arrayRef[n].b + arrayRef[n].bRate;

	if (done) {
		arrayRef[n].rRate = arrayRef[n].gRate = arrayRef[n].bRate = 10;
	} else {
		if (r >= arrayRef[n].rMax || r <= arrayRef[n].rMin) {
			if (uniform) {
				arrayRef[n].rRate *= -1;
			} else {
				arrayRef[n].rRate = randomRate(arrayRef[n].rRate);
			}
			if (r <= arrayRef[n].rMin)
				r = arrayRef[n].rMin;
			if (r >= arrayRef[n].rMax)
				r = arrayRef[n].rMax;
		}
		if (g >= arrayRef[n].gMax || g <= arrayRef[n].gMin) {
			if (uniform) {
				arrayRef[n].gRate *= -1;
			} else {
				arrayRef[n].gRate = randomRate(arrayRef[n].gRate);
			}
			if (g <= arrayRef[n].gMin)
				g = arrayRef[n].gMin;
			if (g >= arrayRef[n].gMax)
				g = arrayRef[n].gMax;
		}
		if (b >= arrayRef[n].bMax || b <= arrayRef[n].bMin) {
			if (uniform) {
				arrayRef[n].bRate *= -1;
			} else {
				arrayRef[n].bRate = randomRate(arrayRef[n].bRate);
			}
			if (b <= arrayRef[n].bMin)
				b = arrayRef[n].bMin;
			if (b >= arrayRef[n].bMax)
				b = arrayRef[n].bMax;
		}
	}
	arrayRef[n].r = r;
	arrayRef[n].g = g;
	arrayRef[n].b = b;

	return {
		r : r,
		g : g,
		b : b
	};
}

function calculateDiff(arrayRef, n) {

	var rDiff = (arrayRef[n].destinationColor.r - arrayRef[n].r)
			* arrayRef[n].rRate;
	var gDiff = (arrayRef[n].destinationColor.g - arrayRef[n].g)
			* arrayRef[n].gRate;
	var bDiff = (arrayRef[n].destinationColor.b - arrayRef[n].b)
			* arrayRef[n].bRate;

	// if (arrayRef[n].r < destinationColor.r)
	// rDiff *= -1;
	// if (arrayRef[n].g < destinationColor.g)
	// gDiff *= -1;
	// if (arrayRef[n].b < destinationColor.b)
	// bDiff *= -1;

	var r = arrayRef[n].r + rDiff;
	var g = arrayRef[n].g + gDiff;
	var b = arrayRef[n].b + bDiff;

	// console.warn(arrayRef[n].r + " " + arrayRef[n].g + " " + arrayRef[n].b);
	// console.warn(rDiff + " " + gDiff + " " + bDiff);
	// console.warn(r + " " + g + " " + b);
	// console.warn("-----------");

	if (r < 0) {
		r = 0;
		arrayRef[n].rRate = randomRate(0, rate);
	}
	if (g < 0) {
		g = 0;
		arrayRef[n].gRate = randomRate(0, rate);
	}
	if (b < 0) {
		b = 0;
		arrayRef[n].bRate = randomRate(0, rate);
	}
	if (r > 255) {
		r = 255;
		arrayRef[n].rRate = randomRate(0, rate);
	}
	if (g > 255) {
		g = 255;
		arrayRef[n].gRate = randomRate(0, rate);
	}
	if (b > 255) {
		b = 255;
		arrayRef[n].bRate = randomRate(0, rate);
	}

	arrayRef[n].r = Math.round(r);
	arrayRef[n].g = Math.round(g);
	arrayRef[n].b = Math.round(b);

	if (Math.random() > .995) {
		arrayRef[n].destinationColor.r = Math.round(255 * Math.random());
		arrayRef[n].destinationColor.g = Math.round(255 * Math.random());
		arrayRef[n].destinationColor.b = Math.round(255 * Math.random());
	}

	return {
		r : Math.round(r),
		g : Math.round(g),
		b : Math.round(b)
	};
}

function drawRings() {
	n = 0;
	var lastHt = 0;

	var segments = 12;
	var radius = 1;
	var rads = Math.PI / segments;
	var rings = 16;
	var p1, p2, p3, p4;
	var ringWidth = 30;

	for (i = 0; i < rings; i++) {
		for ( var ii = 0; ii < segments; ii++) {
			rads = 2 * Math.PI / segments;
			res = calculate(blockArray, n);
			var angle = rads * ii;
			p1 = {
				x : radius * Math.cos(angle) + centerX,
				y : radius * Math.sin(angle) + centerY
			};
			p2 = {
				x : (radius + ringWidth) * Math.cos(angle) + centerX,
				y : (radius + ringWidth) * Math.sin(angle) + centerY
			};
			p3 = {
				x : (radius + ringWidth) * Math.cos(angle + rads) + centerX,
				y : (radius + ringWidth) * Math.sin(angle + rads) + centerY
			};
			p4 = {
				x : (radius) * Math.cos(angle + rads) + centerX,
				y : (radius) * Math.sin(angle + rads) + centerY
			};
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.lineTo(p3.x, p3.y);

			// ctx.arc(centerX, centerY, radius + ringWidth, angle, angle+rads,
			// false);
			ctx.lineTo(p4.x, p4.y);
			// ctx.arc(centerX, centerY, radius, angle, angle+rads, true);
			ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
			ctx.fill();
			n++;
		}
		radius += ringWidth;
		segments += 8;
		ringWidth -= 2;
	}
}

function testEase() {
	n = 0;
	res = calculate(blockArray, n);
	// console.log(res.r)
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(10, 10, 200, 200);
	ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
	ctx.fillRect(10, 10, 200, 200);
}

function drawSpiral() {
	n = 0;
	var lastHt = 0;

	var segments = 7;
	var radius = -5;
	var rads = Math.PI / segments;
	var rings = 600;
	var p1, p2, p3, p4;
	var ringWidth = 30;
	var angle = rads;
	rads = Math.PI / 44;

	for (i = 0; i < rings; i++) {
		res = calculate(blockArray, n);
		angle += rads;
		p1 = {
			x : radius * Math.cos(angle) + centerX,
			y : radius * Math.sin(angle) + centerY
		};
		p2 = {
			x : (radius + ringWidth) * Math.cos(angle) + centerX,
			y : (radius + ringWidth) * Math.sin(angle) + centerY
		};

		p3 = {
			x : (radius + ringWidth) * Math.cos(angle + rads) + centerX,
			y : (radius + ringWidth) * Math.sin(angle + rads) + centerY
		};
		p4 = {
			x : (radius) * Math.cos(angle + rads) + centerX,
			y : (radius) * Math.sin(angle + rads) + centerY
		};

		ringWidth += .008;
		radius += .44;

		ctx.beginPath();
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
		ctx.lineTo(p3.x, p3.y);

		// ctx.arc(centerX, centerY, radius + ringWidth, angle, angle+rads,
		// false);
		ctx.lineTo(p4.x, p4.y);
		// ctx.arc(centerX, centerY, radius, angle, angle+rads, true);
		ctx.fillStyle = "rgb(" + res.r + "," + res.g + "," + res.b + ")";
		ctx.fill();
		n++;
		rads += rads / 2000;
		// segments += 8;
		// ringWidth += 4;
	}
}

function draw() {
	var n = 0;
	var res;

	 drawRings();
	//drawSpiral();
	// testEase();

	if (Math.random() > .995) {
		var sets = [ [ 255, 0, 0 ], [ 255, 255, 0 ], [ 0, 0, 255 ],
				[ 0, 255, 255 ], [ 0, 255, 255 ], [ 0, 255, 0 ] ];
		var set = sets[Math.floor(Math.random() * sets.length)];
		var r = Math.round(255 * Math.random());
		var g = Math.round(255 * Math.random());
		var b = Math.round(255 * Math.random());

		// if(Math.random() > .9)r = set[0];
		// if(Math.random() > .9)g = set[1];
		// if(Math.random() > .9)b = set[2];

		destinationColor = {
			r : r,
			g : g,
			b : b
		};
		for ( var i = 0; i < blockArray.length; i++) {
			if (Math.random() > .995)
				blockArray[i].destinationColor = destinationColor;
		}
	}
}

function randomRate(dir, rateVal) {
	var newDirection = 1;
	var newRate = (rateVal * Math.random()) + .01;
	if (dir != 0) {
		newRate *= -1;
	}
	return newRate;
}

function calculate(arrayRef, n) {
	// return calculateDiff(arrayRef, n);
	return calculateIncrement(arrayRef, n);
}

function init() {

	if (!window.console)
		console = {};
	console.log = console.log || function() {
	};
	console.warn = console.warn || function() {
	};
	console.error = console.error || function() {
	};
	console.info = console.info || function() {
	};

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	centerX = canvas.width / 2;
	centerY = canvas.height / 2;

	ctx.fillStyle = "rgb(200,200,200)";
	ctx.fillRect(0, 0, w, w);

	// rate = .8;
	for (ii = 0; ii < rows; ii++) {
		var colsShown = rows;// 2.0 * (ii + 1);
		for (i = 0; i < colsShown; i++) {
			var r = Math.round(255 * Math.random());
			var g = Math.round(255 * Math.random());
			var b = Math.round(255 * Math.random());
			blockArray.push({
				r : r,
				g : g,
				b : b,
				destinationColor : {
					r : destinationColor.r,
					g : destinationColor.g,
					b : destinationColor.b
				},
				rRate : Math.round(randomRate(0, rate)),
				gRate : Math.round(randomRate(0, rate)),
				bRate : Math.round(randomRate(0, rate)),
				rMin : 0,
				gMin : 0,
				bMin : 0,
				rMax : 255,
				gMax : 255,
				bMax : 255
			});
		}
	}

	var t = setInterval(draw, 2);

	canvas.addEventListener('mousedown', function(evt) {
		draw();
	}, false);

}
