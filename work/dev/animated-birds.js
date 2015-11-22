 var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth = 500;
var ctxHeigth = 500;
var img;
var rotation = 0;
// -Math.PI / 2
var n = 3;
var increment = 1;
var _radius = 100;
var rLimit = 800;
var totalElementsAllowed = 6;
var count = 0;
var imageNames;
var images;
var rotationDirection = 1;
var slots = new Array();
var activeElements = new Array();
var rate = 20;
var speed = 30;
var countLimit = 6400;
var countLimitBase = 300;
var maxRadius  = 900;

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 3;

	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	imageNames = new Array('01', '03', '04', '08', '11', '16', '17', '19');
	images = new Array();
	for ( var i = 0; i < imageNames.length; i++) {
		img = new Image();
		img.src = "images/birds-shades-b_" + imageNames[i] + ".png";
		if (i == imageNames.length - 1) {
			img.onload = load;
		}
		images.push(img);
	}

}

function drawCurves() {
	var points = new Array();
	points.push({
		x : 10,
		y : 10
	});
	points.push({
		x : 500 * Math.random(),
		y : 10
	});
	points.push({
		x : 500 * Math.random(),
		y : 300 * Math.random()
	});
	points.push({
		x : 10,
		y : 300 * Math.random()
	});
	points.push({
		x : 10,
		y : 10
	});
	ctx.beginPath();

	ctx.moveTo(points[0].x, points[0].y);
	for (i = 1; i < points.length - 2; i++) {
		var xc = (points[i].x + points[i + 1].x) / 2;
		var yc = (points[i].y + points[i + 1].y) / 2;
		ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
	}

	// curve through the last two points
	var xc = (points[i + 1].x + points[0].x) / 2;
	var yc = (points[i + 1].y + points[0].y) / 2;
	ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
	ctx.closePath();
	ctx.stroke();

	points.pop();
	drawSpline(ctx, points, .5, true)
}

function load() {
	// 

	// draw();
	setUp();
	var t = setInterval(listener, 31);
}

function setUp() {
	countLimit = countLimitBase;
	if (n < 2) {
		increment = 1;
		n = 2;
		var imgUsed = Math.floor(images.length * Math.random());
		img = images[imgUsed];
	} else if (n > totalElementsAllowed) {
		increment = -1
		n = totalElementsAllowed;
		countLimit = countLimitBase/2;
	} 
	if(_radius == maxRadius ){
		n += increment;
	}
	if(_radius == rLimit) {
	 	_radius = maxRadius;
	 	countLimit = countLimitBase/2;
	 	rate = 20;
	 } else {
		 _radius = rLimit;
	 	rate = 50;
	 }
	
	if(n == 1) _radius = maxRadius+100;
	
	var previousArray  = new Array();
	for ( var i = 0; i < activeElements.length; i++) {
		previousArray.push(activeElements[i]);
	}
	//alert(n)
	activeElements = new Array();
	rotationDirection = (Math.random() > .5) ? 1 :-1;
	var len  = previousArray.length;
	
	// if adding a new one
	if(n > len && len != 0) {
		previousArray.push({img:img, x:previousArray[len-1].x,y:previousArray[len-1].y});
		//previousArray.push({img:img, x:Math.random() * maxRadius,y:Math.random() * maxRadius});
	} 
	for ( var i = 0; i < n; i++) {
		var xPos = -ctxWidth + 2 * ctxWidth * Math.random();
		var yPos = -ctxHeight + 2 * ctxHeight * Math.random();
		if(len == 0 ) {
			xPos = yPos = 0;
		} else {
			//xPos = previousArray[i].x;
			//yPos = previousArray[i].y;
			//xPos = Math.random() * maxRadius;
			//yPos = Math.random() * maxRadius;
			//xPos = yPos = 0;
		}
		activeElements.push({
			img : img,
			x : xPos,
			y : yPos,
			speed: speed - speed * Math.random()/5
		});
	}
	draw();
}

function listener() {
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	draw();
	rotation += Math.PI / rate * rotationDirection;
	count++;
	if (count >= countLimit) {
		// rotation = 0;
		count = 0;
		setUp();
	}
}

function position() {

}

function render() {
	for ( var i = 0; i < n; i++) {
		var dx = (activeElements[i].x - slots[i].x)/ activeElements[i].speed;
		var dy = (activeElements[i].y - slots[i].y)/ activeElements[i].speed;
		
		var xPos = activeElements[i].x - dx;
		var yPos = activeElements[i].y - dy;
		activeElements[i].x = xPos;
		activeElements[i].y = yPos;
		var rads = slots[i].rads;
		ctx.translate(xPos, yPos);
		ctx.rotate(rads * i + rotation);
		ctx.drawImage(activeElements[i].img, -200, -200);
		ctx.rotate(-rads * i - rotation);
		ctx.translate(-xPos, -yPos);
	}
}

function draw() {
	var rads = 2 * Math.PI / n;
	ctx.save();
	ctx.translate(ctxWidth / 2, ctxHeight / 2);
	var xOffset = 0;
	var yOffset = 0;

	for ( var i = 0; i < n; i++) {
		var xPos = _radius * Math.cos(rads * i + rotation) + xOffset;
		var yPos = _radius * Math.sin(rads * i + rotation) + yOffset;
		slots[i] = {
			x : xPos,
			y : yPos,
			rads : rads
		}
	}
	render();
	ctx.restore();
}

window.onload = init;
