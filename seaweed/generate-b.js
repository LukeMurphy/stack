var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth;
var ctxHeigth;

// Tree variations
var angle = 75;
var branchLength = 190;
var generationLimit = 6;
var branchMax = 4;
var branchDecreaseFactor = 1.8;
var count = 0;

// Assets
var imageNames;
var path = "/projects/stack/seaweed/images/";
var img;
var imgDimx;
var imgDimy;

// Variation controls
var scaleFactor = 1;
var scaleFactorMax = 7.5;
var scaleFactorMin = 1.5;
var mutationPossibility = 1;
var reversal = false;
var animate = true;
var animateTimer;

var imageSets;
var blendSets = false;
var override = false;
var overrideSet = 0;

var activeCount = 0;
var active = true;

// start
//window.onload = init;

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 2;

	fillRect();

	imageSets = new Array();

	setUpImages('gun-', 24, 400, 210, 1.5, 7.5);
	setUpImages('shell-', 2, 400, 210, 1.5, 7.5);
	//setUpImages('body-', 26, 400, 300, 1.5, 7.5);
	//setUpImages('head_', 16, 485, 485, 1.0, 12.5);

	scaleFactor = scaleFactorMin;

	if (ctxWidth > 1000 && ctxHeight > 1000) {
		scaleFactorMax = 5.5;
		scaleFactorMin = 2;
	}

	var lastSet = imageSets[imageSets.length - 1].set;
	var lastImage = lastSet[lastSet.length - 1];

	lastImage.onload = load;

	//ctx.drawImage(images[0],0,0,400,210,0,0,400,210);

	/*
	 img.src = path + "noides4b.png";
	 imgDimx = 400;
	 imgDimy = 700;
	 scaleFactor = .8;
	 */

}

function setUpImages(prefix, imageCount, imgDimx, imgDimy, scaleFactor, sfMax) {
	var imagesArray = new Array();
	for (var i = 0; i < imageCount; i++) {
		var imgn = new Image();
		imgn.src = path + prefix + i + ".png";
		imagesArray.push(imgn);
	}

	imageSets.push({
		set : imagesArray,
		imgDimx : imgDimx,
		imgDimy : imgDimy,
		count : imageCount,
		scaleFactorMin : scaleFactor,
		scaleFactorMax : sfMax
	});
}

function load() {
	//ctx.drawImage(images[0],srcX,srcY,srcW,srcH,destX,destY,destW,destH);
	//ctx.drawImage(images[0],0,0,400,210,0,0,400,210);
	var branch = Branch();
	//createBranch(branch);
	redraw();
}

function fillRect() {
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillStyle = "rgb(180,180,180)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
}

function redraw() {
	fillRect();
	scaleFactor = (reversal) ? scaleFactorMax : scaleFactorMin;
	var branch = Branch();
	createBranch(branch);

	if (animate) {
		clearInterval(animateTimer);
		animateTimer = setInterval(function() {
			if (activeCount > 5) {
				if (Math.random() > .5) {
					setTimeout(function() {
						activeCount = 0;
						ctx.fillStyle = "rgba(180,180,180,.015)";
						ctx.fillRect(0, 0, ctxWidth, ctxHeight);
						var branch = Branch();
						createBranch(branch);
					}, 2000);
				} else {
					activeCount = 0;
					ctx.fillStyle = "rgba(180,180,180,.015)";
					ctx.fillRect(0, 0, ctxWidth, ctxHeight);
					var branch = Branch();
					createBranch(branch);
				}
			}
		}, 500);
	}

}

function createBranch(startBranch) {
	var branch = Branch();
	var imagesObj;
	var images;

	if (startBranch.generation < generationLimit) {

		var angleRange = angle;
		var destinationAngle;
		var destinationBranchLength;
		var secondaryBranches = Math.ceil(branchMax * Math.random());

		if (startBranch.generation == 0) {
			// initial type

			var setToUse;
			if(blendSets){
				setToUse = Math.floor(imageSets.length * Math.random());
			} else {
				setToUse =overrideSet;
			}
			imagesObj = imageSets[setToUse];

			images = imagesObj.set;
			branch.imagesObj = imagesObj;
			branch.startPoint = startBranch.startPoint;
			//branch.width = startBranch.width - 3;
			destinationAngle = -Math.PI / 2;
			destinationBranchLength = branchLength / (startBranch.generation + 1);
			destinationBranchLength = 1;

			var unit = Math.floor(images.length * Math.random());
			branch.unit = unit;

		} else {
			branch.startPoint = startBranch.endPoint;
			branch.width = startBranch.width - 3;
			destinationAngle = (Math.random() * angleRange - 90 - angleRange / 2) / 180 * Math.PI;

			destinationBranchLength = branchLength / (startBranch.generation + 1);
			destinationBranchLength += 1.5 * destinationBranchLength * Math.random();

			branch.type = startBranch.type;
			branch.imagesObj = startBranch.imagesObj;
			images = branch.imagesObj.set;
			branch.unit = startBranch.unit;

			// variations
			if (startBranch.parentBranches == 1) {
				//secondaryBranches = 3;
				//destinationAngle = -Math.PI/8;
				destinationBranchLength = branchLength / branchDecreaseFactor;
			}
		}

		// SET the inheritance
		branch.parentBranches = secondaryBranches;
		branch.generation = startBranch.generation + 1;
		
		// Set the next point
		branch.endPoint.x = Math.round(Math.cos(destinationAngle) * destinationBranchLength) + branch.startPoint.x;
		branch.endPoint.y = Math.round(Math.sin(destinationAngle) * destinationBranchLength) + branch.startPoint.y;

		// Draw the line
		ctx.beginPath();
		// ctx.lineJoin = "round";
		// ctx.shadowColor = 'black';
		// ctx.shadowBlur = 10;
		ctx.lineCap = "round";
		ctx.lineWidth = branch.width;

		var dx = branch.endPoint.x - branch.startPoint.x;
		var dy = branch.endPoint.y - branch.startPoint.y;
		var lineLength = Math.sqrt(dx * dx + dy * dy);

		// Create Linear Gradients
		var lingrad = ctx.createLinearGradient(branch.startPoint.x, branch.startPoint.y, branch.endPoint.x, branch.endPoint.y);
		//lingrad.addColorStop(0, 'rgba(255,10,0,.85)');
		//lingrad.addColorStop(1, 'rgba(0,255,0,.5)');
		lingrad.addColorStop(1, 'rgba(172,147,31,.85)');
		lingrad.addColorStop(0, 'rgba(0,0,0,.1)');

		// assign gradients to fill and stroke styles
		ctx.strokeStyle = lingrad;
		ctx.moveTo(branch.startPoint.x, branch.startPoint.y);
		ctx.lineTo(branch.endPoint.x, branch.endPoint.y);
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		ctx.stroke();
		ctx.restore();

		xPos = branch.endPoint.x;
		yPos = branch.endPoint.y;

		// "inherit" the type
		var img = images[branch.unit];

		/****** Set new type possibly ********/
		if (branch.generation == 2) {
			//branch.type = (Math.random() > .5) ? 1 : 0;
		}
		//if(Math.random() > (10 - mutationPossibility) / 10 ) branch.type = (branch.type == 0) ? 1 : 0;
		if (Math.random() > (10 - mutationPossibility) / 10) {
			branch.type = 1;

			if (Math.random() > (10 - mutationPossibility / 2) / 10) {
				//set new type
				/*
				 */
				if(blendSets) {
					branch.imagesObj = imageSets[Math.floor(imageSets.length * Math.random())];
					images = branch.imagesObj.set;
				}
			}
		}

		if (branch.type == 0) {
			//var img = images[branch.unit];
		} else {
			var unit = Math.floor(images.length * Math.random());
			branch.unit = unit;
			img = images[branch.unit];
		}

		var rads = Math.random() * Math.PI;
		var rotation = Math.random() * Math.PI;
		scaleFactor = branch.imagesObj.scaleFactorMin;

		var scale = scaleFactor / branch.generation / 1.0;

		if (reversal) {
			scaleFactor = branch.imagesObj.scaleFactorMax;
			scale = scaleFactor / branch.generation / 1.0;
			scale = 1 / scale
		}

		ctx.translate(xPos, yPos);
		ctx.scale(scale, scale);
		ctx.rotate(rads + rotation);

		//ctx.save();
		//ctx.globalCompositeOperation = "darker";

		ctx.drawImage(img, 0, 0, branch.imagesObj.imgDimx, branch.imagesObj.imgDimy, -branch.imagesObj.imgDimx / 2, -branch.imagesObj.imgDimy / 2, branch.imagesObj.imgDimx, branch.imagesObj.imgDimy);

		//ctx.restore();
		ctx.rotate(-rads - rotation);
		ctx.scale(1 / scale, 1 / scale);
		ctx.translate(-xPos, -yPos);

		// spawn daughter branches
		for (var i = 0; i < secondaryBranches; i++) {
			setTimeout(function() {
				createBranch(branch)
			}, 200 * Math.random());
		}
	} else {
		activeCount++;
	}
}

function Branch() {
	return {
		generation : 0,
		done : false,
		angle : 90,
		width : 10,
		type : 0,
		imagesObj : {},
		parentBranches : 1,
		unit : 0,
		startPoint : {
			x : ctxWidth / 2,
			y : ctxHeight - 30
		},
		endPoint : {
			x : 0,
			y : 0
		},
		pointArray : new Array(),
	}
}