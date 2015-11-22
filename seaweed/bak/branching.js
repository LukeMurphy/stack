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
var path = "/projects/stack/branching/";

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
	//contsructImagesArrays(prefix, imageNames);
	
	var prefix  = "images/9_big-s-b_";
	imageNames = new Array('01', '02', '04', '06', '09', '17', '20', '22', '25', '35', '38');
	//contsructImagesArrays(prefix, imageNames);

	//var prefix = "images/";
	//imageNames = new Array('silhouette-copy');

}


// Base angle that the line turns every segement
var angle = 90;
// Deviation range from base angle the line turns each segment
// higher = more curved. curly
var meanderRange = 3;
var reflection = 90;
var splitNumber = 7;
// Length drawn each time - shorter is slower, longer is more jagged
var segmentLength = 7;
// Radius for continuous change in angle
var radius = 20;
// Direction the line takes
var direction = 1;
// Affects the amount of angle used
var angleFactor = 1;
// The default amount of error used to calculate in the next point is taken
var buffer = 2;
// The split counter - has limits set
var splits = 0;
// l-sys direction
var lDirection = 1;
// Total number of segments drawn - for l-sys
var stepCount = 0;
// Total number of segments drawn - for l-sys
var stepCountLimit = 0;
// Total number of segments drawn - for l-sys
var stepCountLimit1 = 5;
// Total number of segments drawn - for l-sys
var stepCountLimit2 = 10;
// Rough way to add more error buffer to calculating if the next point is taken
// -- allows for more overlaps
var overLapLevel = 0;
var pointArray;
// The function called when the line reaches its end point - can be the boundry
// or another line / point taken
var callBack;
// Decides if the angle is being modified each time
var useAngleFactor = true;
// Line is done
// Use l-sys rules - should be extended
var lsys = false;
var midSplit = false;
// using a meandering line
var meanderingLine = true;

// The boundries of all drawings
var limitPoint = {
	x : 500,
	y : 500
};
// The array of all points that have been used
var limitArray;

var lines = 7;

var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth;
var ctxHeigth;
var linesArray = new Array();
var tmr;
var clr;

function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 3;

	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	pointArray = new Array({
		x : 0,
		y : 0
	});

	limitPoint = {
		x : ctxWidth,
		y : ctxHeight
	};

	stepCount = 0;
	angle = Math.random() * 360;

	buffer = 2;

	for (var i = 0; i < lines; i++) {
		var line = getLineFeatures();
		linesArray.push(line);
	}

	clearInterval(tmr)
	tmr = setInterval(draw, 10, 0);

}

function getLineFeatures() {
	return {
		width : 7,
		color : getNewColor(),
		done : false,
		level : 0,
		angle : angle,
		direction : 1, 
		lDirection : 1, 
		stepCountLimit : stepCountLimit, 
		stepCount : 0, 
		lastPoint : {
			x : ctxWidth * Math.random(),
			y : ctxHeight * Math.random()
		},
		nextPoint : {
			x : 0,
			y : 0
		},
		pointArray:new Array(),
	}
}

function getNewColor() {
	var r = Math.round(255 * Math.random());
	var g = Math.round(255 * Math.random());
	var b = Math.round(255 * Math.random());
	return "rgba(" + r + "," + g + "," + b + ", .5)";
}

function Point() {
	return {
		x : 0,
		y : 0
	};
}

function timerListener(e) {
	draw();
}

function draw() {
	for (var i = 0; i < linesArray.length; i++) {
		var line = linesArray[i];
		if (!line.done) {
		
		//document.getElementById('debug').value += (line.lastPoint.x) +" -- ";
			line.nextPoint = (lsys) ? calculateNextPointLsys(line) : calculateNextPoint(line);

			ctx.beginPath();
			// ctx.lineJoin = "round";
			// ctx.shadowColor = 'black';
			// ctx.shadowBlur = 10;
			ctx.lineCap= "butt";
			ctx.strokeStyle = line.color;
			ctx.lineWidth = line.width;
			ctx.moveTo(line.lastPoint.x, line.lastPoint.y);
			ctx.lineTo(line.nextPoint.x, line.nextPoint.y);
			ctx.stroke();
			/* Checks if the next point is "occupied" already */
			if (!calculateEnd(line.nextPoint)) {
				line.done = true;
				var splitPoint= {x:line.lastPoint.x, y:line.lastPoint.y};
				var angle1 =  line.angle + reflection;
				var angle2 =  line.angle - reflection;
				
				if(midSplit || lsys) {
					var pt1 = Math.round(line.pointArray.length/2);
					
					if(pt1 > 1) {
						
					splitPoint = line.pointArray[pt1];
					//document.getElementById('debug').value += (pt1) +"\n";
					if(line.pointArray.length > 2) {
					var splitAngle = Math.atan2(	-line.pointArray[pt1-1].y + line.pointArray[pt1].y, 
								-line.pointArray[pt1-1].x + line.pointArray[pt1].x)
								}
					splitAngle *= 180/Math.PI;
					angle1 = splitAngle + 90;
					angle2 = splitAngle - 90;
					}
				}
				
				var newLine = getLineFeatures();
				newLine.lastPoint = splitPoint;
				newLine.level = line.level + 1;
				newLine.color = line.color;
				newLine.width = line.width - 1;
				newLine.angle = angle1;
				if (newLine.level < splitNumber) {
					linesArray.push(newLine);
				}

				newLine = getLineFeatures();
				newLine.lastPoint = splitPoint;
				newLine.level = line.level + 1;
				newLine.color = line.color;
				newLine.width = line.width - 1;
				newLine.angle = angle2;
				if (newLine.level < splitNumber) {
					linesArray.push(newLine);
				}

			} else {
				line.lastPoint = line.nextPoint;
				pointArray.push(line.nextPoint);
				line.pointArray.push(line.nextPoint);
			}
		}
	}
}

function calculateNextPoint(line) {
	var nextPoint = Point();
	nextPoint.x = Math.round(line.lastPoint.x + segmentLength * Math.cos(line.angle / 180 * Math.PI) * line.direction);
	nextPoint.y = Math.round(line.lastPoint.y + segmentLength * Math.sin(line.angle / 180 * Math.PI) * line.direction);
	var angleChange;
	if (meanderingLine) {
		angleChange = meanderRange - Math.random() * meanderRange * 2;
		line.angle += angleChange;
		if (useAngleFactor)
			line.angle += angleFactor;
	} else {
		angleChange = meanderRange;
		angleChange *= 1.01
		line.angle += angleChange;
		angleChange = meanderRange - meanderRange * 2;
		meanderRange += .1 * direction;
	}
	return nextPoint;
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

context.rect(0, 0, canvas.width, canvas.height);
var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);

grd.addColorStop(0.14, '#FF0000'); 
grd.addColorStop(0.285714286, '#FF7F00'); 
grd.addColorStop(0.428571429, '#FFFF00'); 
grd.addColorStop(0.571428571, '#00FF00'); 
grd.addColorStop(0.714285714, '#0000FF'); 
grd.addColorStop(0.857142857, '#4B0082'); 
grd.addColorStop(1.0, '#8F00FF'); 

context.fillStyle = grd;
context.fill();


function load() {
	count = 0;
	position();
	//var t = setInterval(position, 33);
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



function dl() {
	canvas = document.getElementById("canvas");
	img = canvas.toDataURL("image/jpg");
	window.open(img,"image.jpg");
}

window.onload = init;