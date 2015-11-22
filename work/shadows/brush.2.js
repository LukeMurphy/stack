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
var baseRadius = 160;
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
var countLimit = 400;
var countLimitBase = 300;
var maxRadius  = 900;
var vOffset = 0;
var overlayCount = 300;
var scaleRange = 1;
var scaleMinimum = 1;
var path = "/projects/stack/shadows/";


function init() {
	// local
	//path = "";
	
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

function load() {
	background();
	drawGradients();
	scaleRange = .5;
	scaleMinimum = .5;
	position();
}

function redraw() {
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	background();
	drawGradients();
	count = 0;
	position();
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
	}
  
  	ctx.fillStyle = "rgb(0,0,255)";
  	if(Math.random() > .5)ctx.fillStyle = "rgb(255,255,255)";
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
	var rad1 = 50 * Math.random();
	var rad2 = 100 * 5* Math.random();
	var grad = ctx.createRadialGradient(ctxWidth/2, ctxHeight, rad1, ctxWidth/2, ctxHeight/2, rad2);
	var stops = 8;
	grad.addColorStop(0, 'white');
	grad.addColorStop(.7/stops, 'green');
	grad.addColorStop(1.5 / stops, 'blue');
	grad.addColorStop(2 / stops, 'purple');
	grad.addColorStop(3 / stops, 'red')
	grad.addColorStop(5 / stops, 'aqua');
	grad.addColorStop(4 / stops, 'orange');
	grad.addColorStop(6/stops, 'yellow');
	grad.addColorStop(8/stops, 'white');
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
	var radians  = 2*Math.PI / overlayCount;
	for ( var q = 0; q < overlayCount; q++) {
		vOffset +=.01;

		var xPos = -ctxWidth + 2 * ctxWidth * Math.random();
		var yPos = -ctxHeight + 2 * ctxHeight * Math.random() - vOffset;
		var radius = Math.random() * baseRadius + Math.random() * ctxHeight/2 + baseRadius/10;
		
		xPos = ctxWidth/2 +  radius * Math.cos(radians * q);
		yPos = ctxHeight/4 +  radius * Math.sin(radians * q);
		
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

function dl() {
	canvas = document.getElementById("canvas");
	imgDl = canvas.toDataURL("image/jpg");
	window.open(imgDl,"image.jpg");
}

window.onload = init;