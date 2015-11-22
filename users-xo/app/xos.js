var grid = new Array();

var gameCount = 0;
var rowCount = 0;
var colCount = 0;

var gameColumns = 7;
var gameRows = 7;
var gameCountLimit = gameColumns * gameRows;

var placeHolder = -1;
// Width of each hash
var gridSpace = 50;
// mean width of each game
var gameWidth = 3 * gridSpace;
var gameOffset = -gameWidth / 2;
var gap = (gameWidth + 90); //150

// x y offset variations
var placementVariation  = false;
var rndScale = false;
var rndRotate = false;
var rndSkip = false;

// maximum rotation factor (as in PI/rotationFactor)
var rotationFactor = 6;

// relative scaling limits
var scaleFactor = 2;

// % of games to draw or skip
var skipThreshold = .86;

// hashes for game transparency
var hashAlpha = .78;

var stopDraw = false;
var tmr;

function initXOS() {

	if(updateTextures) {
		gap = (gameWidth + 90);
		placementVariation  = true;
		rndScale = true;
 		rndRotate = true;
		rndSkip = true;
		gameColumns = 20; //Math.floor(w / gameWidth);
    	gameRows = 12; //Math.floor(h / gameWidth / 2);
    	gameCountLimit = gameColumns * gameRows;
    	scaleFactor = 2;
    	console.log(gameColumns + " " + gameRows );
	} else {
		placementVariation  = true;
		rndScale = true;
 		rndRotate = true;
		rndSkip = true;
	}

	// To create the lookup grid
	createLookupGrid();

	// Pre-Load images
	preloader();
}

function reDrawCanvas() {
	stopDraw = false;
	gameCount = 0;
	rowCount = 0;
	colCount = 0;
	ctx1.clearRect(0, 0, canvas.width, canvas.height);
	startDrawingTimer();
}

function draw() {
	if (!stopDraw) {
		drawGame(ctx1);
	}
}

function drawGame(ctx) {

	/// Game drawing
	gameCount++;

	if (gameCount > gameCountLimit) {
		clearInterval(tmr);
		stopDraw = true;
	}

	var skip = (rndSkip) ? (Math.random() > skipThreshold) ? true : false : false;
	var xOffset = (gameWidth - 2 * gameWidth * Math.random());
	var yOffset = (gameWidth - 2 * gameWidth * Math.random());
	if(!placementVariation) xOffset = yOffset  = 0;

	var xPos = colCount * gap + gameWidth / 2 + xOffset;
	var yPos = rowCount * gap + gameWidth / 2 + yOffset;


	colCount++;

	if (colCount > gameColumns) {
		colCount = 0;
		rowCount++;
	}

	ctx.save();
	ctx.translate(xPos, yPos);

	// Game center marker
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(0, 0, 6, 0, 2 * Math.PI);
	//ctx.fill();

	if (!skip) {

		// Scale / rotate
		var scale = scaleFactor - Math.random() * scaleFactor * .8;
		var rotate = Math.PI / (rotationFactor * 2) - Math.PI / rotationFactor * Math.random();

		if (rndScale) {
			ctx.scale(scale, scale);
		}

		if (rndRotate) {
			ctx.rotate(rotate);
		}

		// Draw the 4 line grid
		for (var h = 0; h < 2; h++) {
			var imageIndex = Math.floor(hLinesArraySVG.length * Math.random());
			var mark = hLinesArraySVG[imageIndex];
			loadElement(mark, gameOffset, h * gridSpace + gridSpace / 2 + gameOffset, 1, hashAlpha);
			var imageIndex = Math.floor(vLinesArraySVG.length * Math.random());
			var mark = vLinesArraySVG[imageIndex];
			loadElement(mark, h * gridSpace + gridSpace / 2 + gameOffset, 0 + gameOffset, 1, hashAlpha);
		}

		var currentGameGrid = new Array(placeHolder, placeHolder, placeHolder, placeHolder, placeHolder, placeHolder, placeHolder, placeHolder, placeHolder);

		// Get a random sequence for spots on the grid
		var randomSpots = makeRandom(1, 9);
		// choice XorO first
		var choice = (Math.random() > .5) ? 1 : 0;
		// X's go first
		choice = 1;

		//console.log("\n--- next game --- ");

		// total marks limit is 9, but stop short sometimes
		var totalSpaces = 9; //Math.ceil(Math.random() * 2) + 7;

		for (var i = 0; i < totalSpaces; i++) {
			var unit = randomSpots[i] - 1;
			var gridSpot = grid[unit];

			var xSpot = gridSpot[0] * gridSpace;
			var ySpot = gridSpot[1] * gridSpace;
			// determine an X or an O
			var imageIndex = 0;
			// 1 - 56 are X's
			// 57 - 111 are O's

			if (choice == 1) {
				imageIndex = Math.ceil(Math.random() * 56);
				currentGameGrid[unit] = 1;
			}
			if (choice == 0) {
				imageIndex = Math.ceil(Math.random() * 56) + 54;
				currentGameGrid[unit] = 0;
			}
			var mark = imageArray[imageIndex];

			/// X O ///////
			loadElement(mark, xSpot + gameOffset, ySpot + gameOffset, 1, 1);

			choice = (choice == 1) ? 0 : 1;

			//////////////////////////////
			var res = checkForWin(currentGameGrid, i);
			var colorizeImg = false;
			if (res[0]) {
				xSpot = vSpot = 0;
				if (res[1] == "row")
					strikeArray = s1LinesArraySVG, vSpot = res[2], xSpot = 0, colorizeImg = true;
				if (res[1] == "col")
					strikeArray = s2LinesArraySVG, xSpot = res[2], vSpot = 0, colorizeImg = true;
				if (res[1] == "d1")
					strikeArray = s3LinesArraySVG, xSpot = 0, vSpot = 0, colorizeImg = true;
				if (res[1] == "d2")
					strikeArray = s3LinesArraySVG, xSpot = 0, vSpot = 0, colorizeImg = true;

				var imageIndex = Math.floor(strikeArray.length * Math.random());

				var mark = strikeArray[imageIndex];
				//////////////////////////////
				// Draw the wining strike line, last arg is strike alpha
				// img, xPos, yPos, scale, alpha, ctxref, colorizeImg
				loadElement(mark, (xSpot * gridSpace + gameOffset), (vSpot * gridSpace + gameOffset), 1, .95, null, colorizeImg);
				//if (res[1] == "d1") colorize('rgba(255,0,0,1)', ctx);
				
				var imageIndex = Math.floor(usersArrayPNG.length * Math.random());

				var mark = usersArrayPNG[imageIndex];
				loadElement(mark, (xSpot * gridSpace + gameOffset), (vSpot * gridSpace + gameOffset), 1, .95, null, colorizeImg);

				break;
			}

		}
		//console.log("--- end game --- " + gameCount);
	}
	ctx.restore();
}

function checkForWin(gameGrid, i) {
	var rows = 3;
	var cols = 3;
	var score = 0;
	var u = 0;
	// Test rows
	for (var r = 0; r < rows; r++) {
		if (gameGrid[u] == gameGrid[u + 1] && gameGrid[u + 1] == gameGrid[u + 2] && gameGrid[u] != placeHolder) {
			//console.log("Row WIn --> " + r + " : " + gameGrid[u] + " " + gameGrid[u + 1] + " " + gameGrid[u + 2]);
			return [true, "row", r];
			break;
		}
		u += 3;
	}
	// Test cols
	u = 0;
	for (var c = 0; c < rows; c++) {
		if (gameGrid[u] == gameGrid[u + 3] && gameGrid[u + 3] == gameGrid[u + 6] && gameGrid[u] != placeHolder) {
			//console.log("Col WIn --> " + r + " : " + gameGrid[u] + " " + gameGrid[u + 3] + " " + gameGrid[u + 6]);
			return [true, "col", c];
			break;
		}
		u += 1;
	}
	// Test diags
	u = 0;
	if (gameGrid[u] == gameGrid[u + 4] && gameGrid[u + 4] == gameGrid[u + 8] && gameGrid[u] != placeHolder) {
		//console.log("diag WIn --> " + r + " : " + gameGrid[u] + " " + gameGrid[u + 3] + " " + gameGrid[u + 6]);
		return [true, "d1"];
	}
	u = 2;
	if (gameGrid[u] == gameGrid[u + 2] && gameGrid[u + 2] == gameGrid[u + 4] && gameGrid[u] != placeHolder) {
		//console.log("diag WIn --> " + r + " : " + gameGrid[u] + " " + gameGrid[u + 3] + " " + gameGrid[u + 6]);
		return [true, "d2"];
	}

	return [false, ""];
}

function createLookupGrid() {
	var rows = 3;
	var cols = 3;
	for (var r = 0; r < rows; r++) {
		for (var c = 0; c < cols; c++) {
			grid.push([c, r]);
		}
	}
}
