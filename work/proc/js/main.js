// Create an image object.
var image = new Image();

// Can't do anything until the image loads.
// Hook its onload event before setting the src property.
image.onload = function() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 2;

	canvasoverlay = document.getElementById('canvasoverlay');
	ctxoverlay = canvasoverlay.getContext('2d');
	// Get the width/height of the image and set
	// the canvas to the same size.
	var width = image.width;
	var height = image.height;

	canvas.width = width;
	canvas.height = height;

	// Draw the image to the canvas.
	ctx.drawImage(image, 0, 0);

	var squareSize = 576;

	var hUnits = (width / squareSize);
	var vUnits = (height / squareSize);

	var grayPanels = 12;
	
	for (var i = 0; i < grayPanels; i++) {

		// Get the image data from the canvas, which now
		// contains the contents of the image.
		//var imageData = ctx.getImageData(0, 0, width, height);
		var hUnit = Math.floor(Math.random() * hUnits) * squareSize;
		var vUnit = Math.floor(Math.random() * vUnits) * squareSize;
		var imageData = ctx.getImageData(hUnit, vUnit, squareSize, squareSize);
		//var imageData = ctx.getImageData(0, 0, width, height);

		// The actual RGBA values are stored in the data property.
		var pixelData = imageData.data;

		// 4 bytes per pixels - RGBA
		var bytesPerPixel = 4;

		//document.getElementById('debug').innerHTML += width + "x" + height + " " + hUnit + " " + vUnit + "<br>";

		// Loop through every pixel - this could be slow for huge images.
		for (var y = 0; y < (squareSize); y++) {
			for (var x = 0; x < (squareSize); x++) {
				// Get the index of the first byte of the pixel.
				var startIdx = (y * bytesPerPixel * squareSize) + (x * bytesPerPixel);

				// Get the RGB values.
				var red = pixelData[startIdx];
				var green = pixelData[startIdx + 1];
				var blue = pixelData[startIdx + 2];

				// Convert to grayscale.  An explanation of the ratios
				// can be found here: http://en.wikipedia.org/wiki/Grayscale
				var grayScale = (red * 0.6) + (green * 0.59) + (blue * .11);

				// Set each RGB value to the same grayscale value.
				pixelData[startIdx] = grayScale;
				pixelData[startIdx + 1] = grayScale;
				pixelData[startIdx + 2] = grayScale;
			}
		}

		// Draw the converted image data back to the canvas.
		ctx.putImageData(imageData, hUnit, vUnit);
	}
};

// Load an image to convert.
image.src = "/projects/stack/proc/img/h2.png";

function dl() {
	canvas = document.getElementById("canvas");
	var dlimg = canvas.toDataURL("image/jpg");
	window.open(dlimg, "image.jpg");
}

