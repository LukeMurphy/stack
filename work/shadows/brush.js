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
var countLimit = 1200;
var countLimitBase = 300;
var maxRadius  = 900;
var vOffset = 0;
var overlayCount = 1200;
var scaleRange = .5;
var scaleMinimum = .5;
var path = "/projects/stack/shadows/";

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 3;

	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	images = new Array();
	
	var prefix = "images/birds-shades-b_";
	imageNames = new Array('01', '03', '04', '08', '11', '16', '17', '19');
	contsructImagesArrays(prefix, imageNames);
	
	var prefix  = "images/9_big-s-b_";
	imageNames = new Array('01', '02', '04', '06', '09', '17', '20', '22', '25', '35', '38');
	//contsructImagesArrays(prefix, imageNames);

	//var prefix = "images/";
	//imageNames = new Array('silhouette-copy');

}


function redraw() {
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	count = 0;
	position();
	//background();
	//drawGradients();
	}

function contsructImagesArrays(prefix,imageNames) 
{
	for ( var i = 0; i < imageNames.length; i++) {
		img = new Image();
		img.src = path + prefix + imageNames[i] + ".png";
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
	// draw();
	//setUp();
	//var t = setInterval(listener, 31);
	count = 0;
	position();
	//var t = setInterval(position, 33);
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

function background()
{
	var left_margin = 0;
	var top_margin = 0;
	var w = ctxWidth - left_margin*2;
	var h = ctxHeight - top_margin*2;
	var lines = 1120;
	var offset = 180;
	
	lines = ctxHeight;
	h *=4;
	for (var i = 0; i < lines ; ++i) {
		var ratio = i/h;
		var hue = Math.floor(360*ratio + offset);
		var sat = 100;
		var lum = 50;
		var outerRad = ctxWidth*.7;
		
		//arch(ctx, hslColor(hue,sat,lum), ctxWidth/2, ctxHeight/2, outerRad-i/2);
		//line(ctx, hslColor(hue,sat,lum), left_margin, top_margin+i, left_margin+w, top_margin+i);
	}
  
  	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
  }

function hslColor(h,s,l)
{
	return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

function line(dc,color,x1,y1,x2,y2)
{
	dc.strokeStyle = color;
	dc.beginPath();
	dc.moveTo(x1,y1);
	dc.lineTo(x2,y2);
	dc.stroke();
}

function arch(dc,color,cx,cy,rad)
  {
	dc.strokeStyle = color;
	dc.beginPath();
	dc.arc(cx, cy, rad, 0, 2*Math.PI, false);
	dc.stroke();
  }

function drawGradients() 
{
	var grad = ctx.createLinearGradient(0, 0, 0, ctxHeight);
	var rad = 10;
	var rad1 = ctxWidth/1.3;
	var grad = ctx.createRadialGradient(ctxWidth/2, ctxHeight/1, rad, ctxWidth/2, ctxHeight/2, rad1);
	var stops = 7;
	grad.addColorStop(0, 'red');
	grad.addColorStop(1.5 / stops, 'orange');
	grad.addColorStop(2 / stops, 'yellow');
	grad.addColorStop(3 / stops, 'green')
	grad.addColorStop(4 / stops, 'aqua');
	grad.addColorStop(5 / stops, 'blue');
	grad.addColorStop(6/stops, 'purple');
	grad.addColorStop(7/stops, 'purple');
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	ctx.fill();
}
  
function position() {
	count++;
	if(count > 12) {
		//background();
		drawGradients();
		count= 0;
		vOffset = 0;
		overlayCount = 10;
	}
	overlayCount += 2;
	//ctx.globalCompositeOperation = "lighter";
	for ( var q = 0; q < overlayCount; q++) {
	vOffset +=.01;

		var xPos = -ctxWidth + 2 * ctxWidth * Math.random();
		var yPos = -ctxHeight + 2 * ctxHeight * Math.random() - vOffset;
		var i = Math.floor(Math.random() * images.length);
		var rads = Math.random() * Math.PI;
		var rotation = Math.random() * Math.PI;
		var scale = Math.random() * scaleRange + scaleMinimum;
		ctx.translate(xPos, yPos);
		ctx.rotate(rads * i + rotation);
		if(scaleRange != 0) ctx.scale(scale,scale);
		ctx.drawImage(images[i], -200, -200);
		if(scaleRange != 0) ctx.scale(1/scale,1/scale);
		ctx.rotate(-rads * i - rotation);
		ctx.translate(-xPos, -yPos);
	}
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

function dl() {
	canvas = document.getElementById("canvas");
	img = canvas.toDataURL("image/jpg");
	window.open(img,"image.jpg");
}

window.onload = init;