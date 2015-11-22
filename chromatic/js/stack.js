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
var rotationAngle = 0;

var num = 100;
var rads = 2 * Math.PI / num;
var radius = 200;
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

var toggle = false;
var rMin = 100;
var spokeLength = 100;

var offset_x;
var offset_y;

window.onload = init;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;

	offset_x = ctxWidth / 2;
	offset_y = ctxHeight / 2;

	canvasview = document.getElementById('canvasview');
	ctxview = canvasview.getContext('2d');
	ctxview.font = '10px duchamp';
	//ctxview.font = '10px sans-serif';

	ctxview.fillStyle = "rgb(0,0,0)";
	ctxview.fillRect(0, 0, ctxWidth, ctxHeight);
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	/*
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
	 */

	var t = setInterval(function() {
		createLines();
	}, 33);
	/*
	createLines();
	*/

	/*
	var t = setInterval(function() {
	createLines()
	}, 11);
	*/
	//radius = ctxWidth / 4 + 100;

}

function createLines() {
	//ctx.globalCompositeOperation = "lighter";
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgb(0,0,0,.5)";
	//if (Math.random() > .0)
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	ctx.globalCompositeOperation = "lighter";

	ctx.translate(offset_x, offset_y);
	//ctx.rotate(rotationAngle);
	var spokes = Math.ceil(Math.random() * 96) + 6;
	//spokes = 96;

	/*
	 xP = -50;
	 yP = 0;
	 drawGlory(spokes, xP, yP, 200, 0);

	 var spokes = Math.ceil(Math.random() * 96) + 6;
	 xP = 50;
	 yP = 0;
	 drawGlory(spokes, xP, yP, 200, 0);

	 var spokes = Math.ceil(Math.random() * 96) + 6;
	 xP = 0;
	 yP = -50;
	 drawGlory(spokes, xP, yP, 200, 0);
	 */
	var spokes = Math.ceil(100 + Math.random() * 60);
	xP = 0;
	yP = -50;
	drawGlory(spokes, xP, yP, 200, 0);

	var grad = "rgba(100,100,100,.2)";
	ctx.lineWidth = 5;
	ctx.strokeStyle = grad;
	ctx.beginPath();
	ctx.moveTo(xP, yP);
	ctx.lineTo(xP,ctxHeight);
	ctx.stroke();

	//ctx.rotate(-rotationAngle);
	ctx.translate(-offset_x, -offset_y);
}

function drawGlory(spokes, xP, yP, radius, gen) {

	if (gen < 2) {

		var rads = 2 * Math.PI / spokes;
		radius = radius - (radius / 2 * Math.random());

		rotationAngle += Math.PI / 100;

		for (var i = 0; i < spokes; i++) {
			rMin = 10 * Math.random();
			if (gen == 1)
				rMin = 0;
			var r1 = rMin//- rMin * Math.random();
			var r2 = radius * Math.random();

			//var xPos = Math.random() * ctxWidth;
			//var yPos = Math.random() * ctxHeight;
			var length = spokeLength + Math.random() * spokeLength;
			var angle = rads * i;
			//Math.random() * Math.PI;

			var xPos = r1 * Math.cos(angle) + xP;
			var yPos = r1 * Math.sin(angle) + yP;

			var xPos2 = xPos + r2 * Math.cos(angle);
			var yPos2 = yPos + r2 * Math.sin(angle);

			var grad = ctx.createLinearGradient(xPos, yPos, xPos2, yPos2);
			//toggle = false;

			if (toggle) {
				grad = "rgba(0,0,0,.015)";

				var xPos2 = xPos + spokeLength * 2 * Math.cos(angle);
				var yPos2 = yPos + spokeLength * 2 * Math.sin(angle);
				ctx.lineWidth = 4;
				//ctx.fillStyle = "rgb(0,0,0,.015)";
				//ctx.fillRect(0, 0, ctxWidth, ctxHeight);

			} else {

				var stops = 9;
				grad.addColorStop(0 / stops, 'black')
				grad.addColorStop(1 / stops, 'red')
				grad.addColorStop(2 / stops, 'orange');
				grad.addColorStop(3 / stops, 'yellow');
				grad.addColorStop(4 / stops, 'green');
				grad.addColorStop(5 / stops, 'aqua');
				grad.addColorStop(6 / stops, 'blue');
				grad.addColorStop(7 / stops, 'purple');
				grad.addColorStop(8 / stops, 'black');
				ctx.lineWidth = 1;
			}

			//ctx.fillStyle = grad;
			//ctx.fillRect(xPos,yPos,xPos2,yPos2);
			grad = "rgba(255,100,0,.2)";
			ctx.lineWidth = 3 - gen;
			ctx.strokeStyle = grad;
			ctx.beginPath();
			ctx.moveTo(xPos, yPos);
			ctx.lineTo(xPos2, yPos2);
			ctx.stroke();

			grad = "rgba(255,255,255,.5)";
			ctx.lineWidth = 2 - gen;
			ctx.strokeStyle = grad;
			ctx.beginPath();
			ctx.moveTo(xPos, yPos);
			ctx.lineTo(xPos2, yPos2);
			ctx.stroke();

			var newSpokes = Math.round(3 + Math.random() * 5);
			drawGlory(newSpokes, xPos2, yPos2, 50, gen + 1);
		}
	}
	//toggle = (toggle) ? false : true;
}

function dl() {
	canvas = document.getElementById("canvas");
	imgDl = canvas.toDataURL("image/jpg");
	window.open(imgDl, "image.jpg");
}

