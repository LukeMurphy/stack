var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth = 500;
var ctxHeigth = 500;
var img;
var count = 0;
var imageNames;
var images;
var path = "/projects/stack/anim/";
var numImages = 32;
var tmr;
var prefix = "layers/a_";
var extension = ".png";

var rate = 60;
var randomPause = .0005;
var rndChoice = true;

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 3;

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	images = new Array();

	// LED's'
	/*
	numImages = 10;
	prefix = "layers/l-";
	extension = ".jpg";
	randomPause = .15;
	rate = 60;
	numImages = 6;
	prefix = "frames/p";
	extension = ".jpg";
	rate = 80;
	randomPause = .05;
	*/
	/*
	*/
	contsructImagesArrays();
}

function redraw() {
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	count = 0;
	position();
}

function contsructImagesArrays() {
	for (var i = 0; i < numImages; i++) {
		img = new Image();
		img.src = path + prefix + i + extension;
		if (i == numImages - 1) {
			img.onload = load;
		}
		images.push(img);
	}
}

function load() {
	tmr = setInterval(function() {
		render(Math.floor(Math.random() * numImages))
	}, rate)
}

function render(i) {
	if(!rndChoice) i = count;
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	ctx.drawImage(images[i], -0, -0);
	
	if (Math.random() > (1 - randomPause)) {
		clearInterval(tmr);
		var rate = Math.round(Math.random() * 60 + 10);
		count = Math.floor(Math.random() * numImages);
		rndChoice =(rndChoice) ? false : true;
		load();
	}
	
	count ++;
	if(count >= numImages) count = 0;
}

function dl() {
	canvas = document.getElementById("canvas");
	img = canvas.toDataURL("image/jpg");
	window.open(img, "image.jpg");
}

window.onload = init;
