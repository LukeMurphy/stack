var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth;
var ctxHeigth;
var increment = 1;
var radius = 100;
var angle = 90;
var branchLength = 200;
var generationLimit = 7;
var branchMax = 4;
var count = 0;
var imageNames;
var images;
var slots = new Array();
var activeElements = new Array();
var path = "/projects/stack/seaweed/images/";
var img;
var imgDimx = 86;
var imgDimy = 145;
var scaleFactor = 1;
var mutationPossibility = 1;

window.onload = init;

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2; 
	centerY = ctxHeight / 2;

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);

	images = new Array();
	
	img = new Image();
	img.src = path + "noides4.png";
	
	images.push(img);
	
	for(var i = 0; i < 12; i++) {
		img = new Image();
		img.src = path + "gun_0000" + ".png";
		images.push(img);
	}
	
	/*
	img.src = path + "noides4b.png";
	imgDimx = 400;
	imgDimy = 700;
	scaleFactor = .8;
	*/
	images[images.length-1].onload = load;
}

function load() 
{
	//ctx.drawImage(sprites,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
	var branch  = Branch();
	createBranch(branch);
}

function redraw()
{
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
	var branch  = Branch();
	createBranch(branch);
}

function createBranch(startBranch)
{
	var branch  = Branch();
	
	if(startBranch.generation < generationLimit) {
	
		var angleRange = angle;
		var destinationAngle;
		var destinationBranchLength;
		var secondaryBranches = Math.ceil(branchMax * Math.random());
		
		if(startBranch.generation == 0) {
			branch.startPoint = startBranch.startPoint;
			//branch.width = startBranch.width - 3;
			destinationAngle = -Math.PI/2;
			destinationBranchLength = branchLength / (startBranch.generation + 1);
			destinationBranchLength = 1;

		} else {
			branch.startPoint = startBranch.endPoint;
			branch.width = startBranch.width - 3;
			destinationAngle = (Math.random() * angleRange -90 - angleRange/2) / 180 * Math.PI;
			
			destinationBranchLength = branchLength / (startBranch.generation + 1);
			destinationBranchLength += 1.5 * destinationBranchLength * Math.random();
			
			// variations
			if(startBranch.parentBranches == 1) {
				secondaryBranches = 3;
				//destinationAngle = -Math.PI/8;
				destinationBranchLength = branchLength/2;
			}
		}
		
		
		branch.parentBranches = secondaryBranches;
		
		branch.endPoint.x =  Math.round(Math.cos(destinationAngle) * destinationBranchLength) + branch.startPoint.x;
		branch.endPoint.y =  Math.round(Math.sin(destinationAngle) * destinationBranchLength) + branch.startPoint.y;
		
		ctx.beginPath();
		// ctx.lineJoin = "round";
		// ctx.shadowColor = 'black';
		// ctx.shadowBlur = 10;
		ctx.lineCap= "round";
		ctx.lineWidth = branch.width;
		
		var dx = branch.endPoint.x - branch.startPoint.x;
		var dy = branch.endPoint.y - branch.startPoint.y;
		var lineLength = Math.sqrt(dx*dx + dy*dy);
		
		// Create Linear Gradients
		var lingrad = ctx.createLinearGradient(branch.startPoint.x, branch.startPoint.y,branch.endPoint.x,branch.endPoint.y);
		lingrad.addColorStop(0, 'rgba(172,147,31,.85)');
		lingrad.addColorStop(1, 'rgba(0,0,0,.5)');
	
		// assign gradients to fill and stroke styles
		ctx.strokeStyle = lingrad;
		
		ctx.moveTo(branch.startPoint.x, branch.startPoint.y);
		ctx.lineTo(branch.endPoint.x, branch.endPoint.y);
		ctx.stroke();
		
		branch.generation  = startBranch.generation + 1;
		xPos = branch.endPoint.x;
		yPos = branch.endPoint.y;
		
		// "inherit" the type
		branch.type = startBranch.type;
		if(branch.generation  == 2) {
			branch.type = (Math.random() > .5) ? 1 : 0;
		}
		if(Math.random() > (10 - mutationPossibility) / 10 ) branch.type = (branch.type == 0) ? 1 : 0;
		
		var rads = Math.random() * Math.PI;
		var rotation = Math.random() * Math.PI;
		var scale = scaleFactor/branch.generation/1.0;
		
		ctx.translate(xPos, yPos);
		ctx.scale(scale,scale);
		ctx.rotate(rads + rotation);
		
		
		if(branch.type == 0) {
			ctx.drawImage(img,0,0,imgDimx,imgDimy,-imgDimx/2,-imgDimy/2,imgDimx,imgDimy);
		} else {
			ctx.drawImage(img,0,imgDimy,imgDimx,imgDimy,-imgDimx/2,-imgDimy/2,imgDimx,imgDimy);
		}
		
		ctx.rotate(-rads - rotation);
		ctx.scale(1/scale,1/scale);
		ctx.translate(-xPos, -yPos);
		
		// spawn daughter branches		
		for(var i = 0; i < secondaryBranches; i++) {
			setTimeout(function(){createBranch(branch)},200*Math.random());
		}
	}
}


function Branch() {
	return {
		generation : 0,
		done : false,
		angle : 90,
		width:15,
		type:0,
		parentBranches:1,
		startPoint : {
			x : ctxWidth/2,
			y : ctxHeight - 30
		},
		endPoint : {
			x : 0,
			y : 0
		},
		pointArray:new Array(),
	}
}