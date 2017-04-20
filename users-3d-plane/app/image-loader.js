var imageArray = new Array();
var imageArraySVG = new Array();
var hLinesArraySVG = new Array();
var vLinesArraySVG = new Array();
var d1LinesArraySVG = new Array();
var d2LinesArraySVG = new Array();
var s2LinesArraySVG = new Array();
var s1LinesArraySVG = new Array();
var s3LinesArraySVG = new Array();
var usersArrayPNG = new Array();
var drawingsLoaded = new Array();

var imagesCount = 0;
var hLinesCount = 0;
var vLinesCount = 0;
var d1LinesCount = 0;
var d2LinesCount = 0;
var drawingsCheck = 0;
var allLoaded = 0;
var s1LinesCount =0;
var s2LinesCount =0;
var s3LinesCount =0;
var usersCount =0;

var lastxPos =0;
var lastyPos =0;
var lastyPosIncr = 0;
var drawingScaling = .65

		
// R  G  B
// O  Y  P
var clrArray = ["215,0,0,.7", "0,200,0,.7", "0,0,255,.8",
				"255,125,0,.85","255,210,0, .9","100,0,210,.8"]
var clrArrayOB = ["0,0,255,.8",
				"255,125,0,.85"]

function load(img) {
	var ratio = .5;
	ctx.save();
	ctx.globalCompositeOperation = "darken";
	ratio = img.height / canvas.height;
	//console.log("loaded " + ratio);
	ctx.drawImage(img, -0, -0, img.width * 1 / ratio, img.height * 1 / ratio);
	ctx.drawImage(img, img.width * 1 / ratio, -0, img.width * 1 / ratio, img.height * 1 / ratio);
	ctx.drawImage(img, img.width * 2 / ratio, -0, img.width * 1 / ratio, img.height * 1 / ratio);
	texture1.needsUpdate = true;
	ctx.restore();
}

function loadElement(img, xPos, yPos, scale, alpha, ctxref, colorizeImg) {
	if(ctxref == null) ctxref = ctx1;
	if(colorizeImg ==  null) colorizeImg = false;
	//console.log(ctxref)
	var ratio = 1;
	var posOffset = 0;
	var w  = 70;
	ctxref.globalCompositeOperation = "darken";

	ctxref.beginPath();
	ctxref.fillStyle = "red";
	ctxref.arc(xPos, yPos, 6, 0, 2 * Math.PI);
	//ctx.fill();
	

	ctxref.save();
	try {
		if (alpha != null) {
			ctxref.globalAlpha = alpha;
		}
	} catch(err) {

	}
	try {
		if (scale != null) {
			var trans = -(w * scale / 2);
			ctxref.scale(scale, scale);
			ctxref.translate(xPos / scale, yPos / scale);
			xPos = yPos = -w / 2 + w / scale / 2;
		}
	} catch(err) {

	}

	ctxref.beginPath();
	ctxref.fillStyle = "blue";
	ctxref.arc(xPos - img.width * ratio/2, yPos-img.height * ratio/2, 3, 0, 2 * Math.PI);
	//ctxref.fill();

	// Really need a temp canvas to do this - just puts an overlay on the main
	// canvas

	if(colorizeImg) {
		var clrIndex = Math.floor(Math.random() * 4) + 0;
		var clr = 'rgba(' +clrArray[clrIndex]+ ')';
		buffer.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
		buffer.drawImage(img,0,0,img.width * ratio, img.height * ratio);
		colorize(clr, buffer, 0,0);
		ctxref.globalCompositeOperation = "source-over";
		ctxref.drawImage(bufferCanvas, xPos, yPos);
	} else {
		//ctxref.drawImage(img, xPos, yPos, img.width * ratio, img.height * ratio);
		var clrIndex = Math.floor(Math.random() * 4);
		clrIndex = 2;
		var clr = 'rgba(' +clrArray[clrIndex]+ ')';
		//var clr = 'rgba(50,50,50,.87)';
		buffer.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
		buffer.drawImage(img,0,0,img.width * ratio, img.height * ratio);
		colorize(clr, buffer, 0,0);
		ctxref.globalCompositeOperation = "source-over";
		ctxref.drawImage(bufferCanvas, xPos, yPos);
	}

	if(updateTextures) {
		texture1.needsUpdate = true;
		texture2.needsUpdate = true;
	}

	ctxref.restore();
}

  function colorize(color, context, xPos, yPos) {
    context.globalCompositeOperation = "source-atop";
   //context.globalAlpha = 0.3; // you may want to make this an argument
    context.fillStyle   = color;
    context.fillRect(0, 0, 400, 400);
    // reset
    context.globalCompositeOperation = "source-over";
    //context.globalAlpha = 1.0;
  }

function loadCheck(counter, iVal, limit) {
	var counterVal;
	if (counter == "images") {
		counterVal = imagesCount;
		imagesCount++;
	}
	if (counter == "vLines") {
		counterVal = vLinesCount;
		vLinesCount++;
	}
	if (counter == "hLines") {
		counterVal = hLinesCount;
		hLinesCount++;
	}
	if (counter == "d1") {
		counterVal = d1LinesCount;
		d1LinesCount++;
	}
	if (counter == "d2") {
		counterVal = d2LinesCount;
		d2LinesCount++;
	}
	if (counter == "s1") {
		counterVal = s1LinesCount;
		s1LinesCount++;
	}
	if (counter == "s2") {
		counterVal = s2LinesCount;
		s2LinesCount++;
	}
	if (counter == "s3") {
		counterVal = s3LinesCount;
		s3LinesCount++;
	}	
	if (counter == "users") {
		counterVal = usersCount;
		usersCount++;
	}

	if (counter == "drawingsCheck") {
		counterVal = drawingsCheck;
		drawingsCheck++;
	}
	counterVal += 1;
	if (counterVal >= limit) {
		allLoaded++;
	}

	//console.log(allLoaded, counter, counterVal, iVal, limit);
	if (allLoaded >= 4) {
		startDrawingTimer();
		loadTiledDrawings();
	}
}

function loadTiledDrawings() {

	for (var i = 0; i < drawingsLoaded.length; i++) {
			var element = drawingsLoaded[i];
			loadElement(element,lastxPos,lastyPos,drawingScaling,1,ctx2);
			lastxPos += element.width * drawingScaling;
			if(element.height*drawingScaling > lastyPosIncr) lastyPosIncr = element.height*drawingScaling;
			if(lastxPos > canvas.width * drawingScaling) {
				lastyPos += lastyPosIncr;
				lastxPos = 0;
				lastyPosIncr = 0;
			}
			//console.log(element);
	}
}

function preloader() {
	for (var i = 1; i < 112; i++) {
		var img = new Image();
		var prefix = "tester_";
		if (i < 10)
			prefix += "0";
		img.src = "assets/png/" + prefix + i + ".png";
		imageArray.push(img);
		img.onload = function() {
			loadCheck("images", i, 111);
		};
	}
	for (var i = 1; i < 31; i++) {
		var img = new Image();
		var prefix = "lines-h-";
		if (i < 10)
			prefix += "0";
		img.src = "assets/svg/" + prefix + i + ".svg";
		hLinesArraySVG.push(img);
		img.onload = function() {
			loadCheck("hLines", i, 31);
		};
	}
	for (var i = 1; i < 27; i++) {
		var img = new Image();
		var prefix = "vlines-";
		if (i < 10)
			prefix += "0";
		img.src = "assets/svg/" + prefix + i + ".svg";
		vLinesArraySVG.push(img);
		img.onload = function() {
			loadCheck("vLines", i, 27);
		};
	}
	for (var i = 1; i < 11; i++) {
		var img = new Image();
		var prefix = "diagsl_";
		if (i < 10)
			prefix += "0";
		img.src = "assets/png/" + prefix + i + ".png";
		d1LinesArraySVG.push(img);
		img.onload = function() {
			loadCheck("d1", i, 10);
		};
	}
	for (var i = 1; i < 11; i++) {
		var img = new Image();
		var prefix = "diags_";
		if (i < 10)
			prefix += "0";
		img.src = "assets/png/" + prefix + i + ".png";
		d2LinesArraySVG.push(img);
		img.onload = function() {
			loadCheck("d2", i, 10);
		};
	for (var i = 1; i < 11; i++) {
		var img = new Image();
		var prefix = "hstrikes_";
		if (i < 10)
			prefix += "0";
		img.src = "assets/png/" + prefix + i + ".png";
		s1LinesArraySVG.push(img);
		img.onload = function() {
			loadCheck("s1", i, 10);
		};
	}
	for (var i = 1; i < 11; i++) {
		var img = new Image();
		var prefix = "vstrikes_";
		if (i < 10)
			prefix += "0";
		img.src = "assets/png/" + prefix + i + ".png";
		s2LinesArraySVG.push(img);
		img.onload = function() {
			loadCheck("s2", i, 10);
		};
	}
	for (var i = 1; i < 11; i++) {
		var img = new Image();
		var prefix = "strikes_";
		if (i < 10)
			prefix += "0";
		img.src = "assets/png/" + prefix + i + ".png";
		s3LinesArraySVG.push(img);
		img.onload = function() {
			loadCheck("s3", i, 10);
		};
	}
	for (var i = 1; i < 11; i++) {
		var img = new Image();
		var prefix = "users_";
		if (i < 10)
			prefix += "0";
		img.src = "assets/png/" + prefix + i + ".png";
		usersArrayPNG.push(img);
		img.onload = function() {
			loadCheck("users", i, 10);
		};
	}
	}

	var drawings = ["fragment-whiteboard.jpeg",
	"panic-anx-calm.jpeg",
	"2015-01-24 15.24.42.png",
	"s1.png",
	"s2.png",
	"s3.png",
	"Sketch1949538.png",
	"Sketch36165518.jpg"];

	drawings =[
	"draw_0000.png",
	"draw_0001.png",
	"draw_0002.png",
	"draw_0003.png",
	"draw_0004.png",
	"draw_0005.png",
	"draw_0006.png",
	"draw_0007.png",
	"draw_0008.png",
	"draw_0009.png",
	"draw_0010.png",
	"draw_0011.png",
	"draw_0013.png",
	"draw_0014.png",
	"draw_0015.png",
	"draw_0016.png",


	]

	for (var i = 0; i < drawings.length; i++) {
		if(updateTextures) {
		var img = new Image();	
		img.src = "assets/source/" + drawings[i];
		drawingsLoaded.push(img);
		img.onload = function() {
			loadCheck("drawingsCheck", i, drawings.length);
		};
		}
	}

	/*
	 for (var i = 1; i < 93; i++) {
	 var img = new Image();
	 var prefix = "tester2-";
	 if (i < 10)
	 prefix += "0";
	 img.src = "assets/svg/" + prefix + i + ".svg";
	 imageArraySVG.push(img);
	 }
	 */
}