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
var maxRadius = 900;
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

	var radius = 300;
	var rings = 12;
	var segmentArc = 120;
	var arc = 1 * Math.PI / rings;
	var d = 2 * radius / rings;

	for (var ring = 0; ring < rings; ring++) {

		var angle = arc * ring //- Math.PI / 2;
		//if(ring > rings/2) angle = arc * ring + Math.PI/2;

		//alert(Math.round(angle * 180/Math.PI));

		var r = Math.sin(angle) * radius;
		var yDis = Math.cos(angle) * radius + 300;

		var unitsPerRing = Math.round(Math.PI * 2 * r / segmentArc);
		var rads = 2 * Math.PI / unitsPerRing;

		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(r + 300, yDis, 10, 10);

		for (var i = 0; i < unitsPerRing; i++) {

		}

	}

}

init();
