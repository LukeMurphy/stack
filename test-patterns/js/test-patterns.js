/**
 *
 */

var count = 2;
var rows = 10;
var cols = 10;
var blockWidth = 64;
var blockHeight = 48;
var limit = blockHeight * 10;

var blockArray = new Array();
var block = new Object();
var lastBlock = new Object();
var colors = new Array();
var colorArray = new Array();
var rgbColorArray = new Array();
var initialized = false;

var getsBetter = .999;
var goesBad = .9998;
var goesBlankColor = .7;
var restartThreshold = .9999;
var tmr;
var factor = 30;
var altColorAlpha = 1;

function init() {
	ctx = document.getElementById('canvas').getContext('2d');
	canvasref = document.getElementById('canvas');

	canvasWidth = canvasref.width;
	canvasHeight = canvasref.height;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	rows = 10;
	cols = 10;
	blockWidth = canvasWidth / cols;
	blockHeight = canvasHeight / rows;
	limit = blockHeight * 10;

	//ctx.rotate(5.1 * Math.random() / 180 * Math.PI);
	ctx.translate(0, 0);

	//drawTableau(canvasWidth, canvasHeight, "black", "black");
	ctx.shadowColor = null;
	ctx.shadowBlur = 0;

	setUp();
	createBlockArrays();
	tmr = setInterval(drawBlock, 2);
}

function setUp() {

	// red
	colorArray.push("#ff3a1d");
	rgbColorArray.push({
		r : 255,
		g : 58,
		b : 29
	});

	// yellow
	// colorArray.push(0xffc15d);
	colorArray.push("#ffdd11");
	rgbColorArray.push({
		r : 255,
		g : 221,
		b : 17
	});
	// rgb(255, 221, 17)

	// lt blue
	colorArray.push("#6ce2e3");
	rgbColorArray.push({
		r : 108,
		g : 226,
		b : 227
	});
	// rgb(108, 226, 227)

	// pink
	colorArray.push("#ff6dff");
	rgbColorArray.push({
		r : 255,
		g : 109,
		b : 255
	});
	// rgb(255, 109, 255)

	// lt pink
	colorArray.push("#ffe4f8");
	rgbColorArray.push({
		r : 255,
		g : 228,
		b : 248
	});
	// rgb(255, 228, 248)

	// drk pink
	colorArray.push("#b69ea6");
	rgbColorArray.push({
		r : 182,
		g : 158,
		b : 166
	});
	// rgb(182, 158, 166)

	// drk red
	colorArray.push("#d81e1a");
	rgbColorArray.push({
		r : 216,
		g : 30,
		b : 26
	});
	// rgb(216, 30, 26)

	// green
	colorArray.push("#1baa57");
	rgbColorArray.push({
		r : 27,
		g : 170,
		b : 87
	});
	// rgb(27, 170, 87)

	// drk blue
	colorArray.push("#2f47d7");
	rgbColorArray.push({
		r : 47,
		g : 71,
		b : 215
	});
	// rgb(47, 71, 215)

	// lt green
	colorArray.push("#27e36d");
	rgbColorArray.push({
		r : 39,
		g : 227,
		b : 109
	});
	// rgb(39, 227, 109)

	// purple
	colorArray.push("#7456ff");
	rgbColorArray.push({
		r : 116,
		g : 86,
		b : 255
	});
	// rgb(116, 86, 255)

	colors.push("rgba(0,0,0,.5)", "rgba(100,200,0,.5)", "rgba(100,200,90,.5)", "rgba(100,200,240,.5)");
}

function drawTableau(w, h, eraseColor, canvasColor) {
	// Set table points on to which drawing is drawn
	// there are 6 points

	var leftInit = 50 * Math.random();
	var tableWidth = w * .9;
	var tableHeight = h * .92;
	var legHeight = h / 5 * .85;
	var buffer = 50;

	var tablePoints = new Array();

	tablePoints.push({
		x : leftInit * Math.random(),
		y : h - (buffer * Math.random())
	});
	tablePoints.push({
		x : leftInit * Math.random(),
		y : h - legHeight * Math.random()
	});

	tablePoints.push({
		x : leftInit * Math.random(),
		y : h - tableHeight - buffer * Math.random()
	});
	tablePoints.push({
		x : tablePoints[2].x + tableWidth + 100 * Math.random(),
		y : h - tableHeight - buffer * Math.random()
	});

	tablePoints.push({
		x : tablePoints[3].x + buffer * Math.random(),
		y : h - tableHeight * Math.random()
	});
	tablePoints.push({
		x : tablePoints[3].x + buffer * Math.random(),
		y : h
	});

	ctx.strokeStyle = canvasColor;
	ctx.fillStyle = eraseColor;
	ctx.fillRect(0, 0, w, h);

	ctx.shadowColor = eraseColor;
	ctx.shadowBlur = 3;
	ctx.strokeStyle = eraseColor;
	ctx.lineWidth = 3;
	ctx.beginPath();

	ctx.moveTo(0, h);
	ctx.moveTo(tablePoints[0].x, tablePoints[0].y);
	for (var i = 1; i < 5; i++) {
		ctx.lineTo(tablePoints[i + 1].x, tablePoints[i + 1].y);
	}
	ctx.lineTo(tablePoints[0].x, tablePoints[0].y);
	ctx.closePath();
	ctx.stroke();
	ctx.clip();

	ctx.fillStyle = canvasColor;
	ctx.fill();

}

function createBlockArrays() {
	count = 2;
	getsBetter = .8;
	goesBad = .998;
	goesBlankColor = .7;
	restartThreshold = .9999;

	blockArray = new Array();

	for (var i = 0; i < (rows * cols); i++) {
		var isBlank = false;
		var color = "#000000";
		var limitToUse = limit;
		if (i == 0) {
			blockArray.push({
				c : 0,
				color : 0,
				start : true,
				pause : false,
				count : 0,
				isBlank : isBlank,
				limit : limitToUse
			});
		} else {
			if (Math.random() > .988) {
				isBlank = true;
				limitToUse = blockHeight * 2;
			} else {
				limitToUse = limit;
			}
			blockArray.push({
				c : 0,
				color : color,
				start : false,
				pause : false,
				count : 0,
				isBlank : isBlank,
				limit : limitToUse,
				init : false
			});
		}
	}
	lastBlock = blockArray[0];
}

function drawBlock() {
	if (doLoop) {

		var counter = 0;
		var alt = false;

		for (var r = rows; r > 0; r--) {
			for (var c = cols; c > 0; c--) {
				var block = blockArray[counter];
				var currentColorIndex = block.c;
				if (block.start) {
					var yOffset = (r - 1) * blockHeight;
					var xOffset = (c - 1) * blockWidth;

					if (alt) {
						xOffset = cols * blockWidth - xOffset - blockWidth;
					}

					// Only change color after a certain count
					if (!block.pause) {

						var altColor = "rgba(" + (rgbColorArray[block.c].r - factor) + "," + (rgbColorArray[block.c].g - factor) + "," + (rgbColorArray[block.c].b - factor) + "," + altColorAlpha + ")";

						if (!block.isBlank) {
							block.color = colorArray[block.c];
						} else {
							altColor = "rgba(0,0,0,.8)";
						}

						/***************************************/
						// Draw the lines that make up each block
						/***************************************/

						/*
						 ctx.fillStyle = block.color;
						 ctx.fillRect(xOffset, yOffset + block.count, blockWidth, 1);
						 ctx.fillStyle = altColor;
						 ctx.fillRect(xOffset, yOffset + block.count + 1, blockWidth, 1);
						 */
						ctx.beginPath();
						ctx.strokeStyle = block.color;
						ctx.moveTo(xOffset, yOffset + block.count);
						ctx.lineTo(xOffset + blockWidth, yOffset + block.count);
						ctx.closePath();
						ctx.stroke();

						//ctx.beginPath();
						//altColor = "rgba(0,0,255,.9)";
						ctx.strokeStyle = altColor;
						ctx.moveTo(xOffset, yOffset + block.count + 1);
						ctx.lineTo(xOffset + blockWidth, yOffset + block.count + 1);
						ctx.closePath();
						ctx.stroke();

						/***************************************/
					}

					block.count += count;
					if (block.count >= blockHeight) {
						block.pause = true;
						if (block.count > block.limit) {
							block.c += 1;
							block.count = 0;
							if (block.c >= colorArray.length) {
								block.c = 0;
							}
							block.pause = false;

							if (block.isBlank) {
								if (Math.random() > goesBlankColor) {
									block.color = colorArray[Math.floor(Math.random() * colorArray.length)];
									block.limit = Math.random() * blockHeight + 40;
								} else {
									block.color = "#000000";
								}
								// block gets better
								if (Math.random() > getsBetter) {
									block.color = colorArray[currentColorIndex];
									block.limit = limit;
									block.isBlank = false;
									block.count = 0;
								}
							}
							// block goes bad
							if (Math.random() > goesBad) {
								block.color = "#000000";
								block.limit = Math.random() * blockHeight * 10 + 40;
								block.isBlank = true;
							}

						}
					}

					// only used at start
					// changes length of each block bar
					if (block.count > blockHeight * .67 && !block.init) {
						var nextBlock = counter + 1;
						if (counter == blockArray.length) {
							nextBlock = 0;
						}
						if (nextBlock < blockArray.length) {
							var nextBlockRef = blockArray[nextBlock];
							if (nextBlockRef != null)
								nextBlockRef.start = true;
							block.init = true;
						}
					}

				}
				counter++;
			}
			alt = (alt) ? false : true;
		}
		lastBlock = block;

		if (Math.random() > restartThreshold) {
			createBlockArrays();
		}
	}
}

window.onload = init;
