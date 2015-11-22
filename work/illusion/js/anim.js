var canvas;
var ctx;
var centerX;
var centerY;
var ctxWidth = 800;
var ctxHeigth = 600;
var img;
var count = 0;
var tmr;
var fillColor = "rgb(151,164,76)";

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctxWidth = canvas.width;
	ctxHeight = canvas.height;
	centerX = ctxWidth / 2;
	centerY = ctxHeight / 3;

	fillColor = "rgb(151,164,76)";
	ctx.fillStyle = "rgb(255,255,255)";
	//fillColor = "rgb(255,100,30)";
	
	redraw();

	var radius = 11;
	var spacing = 18;
	var calc = spacing / 2 + 2 * radius;
	var columns = Math.floor(ctxWidth / spacing / 2);
	var rows = Math.floor(ctxHeight / spacing / 2);

	var c = "rgb(255,255,255)";
	var s = "rgb(255,255,255)";
	drawGrid(columns, rows, spacing * 2, radius, 1, c, s)

	var c = "rgb(0,0,255)";
	var c = "rgb(94,51,97)";
	var s = "rgb(4,1,7)";
	drawGrid(columns, rows, spacing * 2, radius, -1, c, s)

}

function drawGrid(columns, rows, spacing, r, v, c, s) {
	var fac = 4
	var hRads = fac * Math.PI / columns;
	var vRads = fac * Math.PI / rows;
	for (var cols = 0; cols < columns; cols++) {
		for (var row = 0; row < rows; row++) {
			ctx.fillStyle = c;
			ctx.strokeStyle = s;
			ctx.lineWidth = 3;
			ctx.beginPath();

			var xPos = spacing / 2 + cols * spacing + (v - 2 * Math.random() * v);
			var yPos = spacing / 2 + row * spacing + (v - 2 * Math.random() * v);

			xPos = spacing / 2 + cols * spacing + Math.cos(hRads * cols) * v //+ (v - 2 * Math.random() * v);;
			yPos = spacing / 2 + row * spacing + Math.sin(vRads * row) * v //+ (v - 2 * Math.random() * v);;

			var dx = ctxWidth / 2 - xPos;
			var dy = ctxHeight / 2 - yPos;
			var dis = Math.sqrt(dx * dx + dy * dy) / 360;
			
			xPos += Math.cos(hRads * cols) * v/3 * dis;
			//yPos += Math.sin(vRads * row) * v/3 * dis;

			ctx.arc(xPos, yPos, r, 0, 2 * Math.PI, false);
			ctx.stroke();
			ctx.fill();
		}
	}
}

function redraw() {
	ctx.fillStyle = fillColor;
	ctx.fillRect(0, 0, ctxWidth, ctxHeight);
}

function dl() {
	canvas = document.getElementById("canvas");
	img = canvas.toDataURL("image/jpg");
	window.open(img, "image.jpg");
}

window.onload = init;
