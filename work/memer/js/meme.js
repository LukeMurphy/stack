/*
 * Globals
 */
var ctx, canvasRef;
var ctxBuffer, canvasRefBuffer;
var t;
var canvas;
var canvasColor = "rgba(100,100,100,1)";
var textColor = "rgb(255,255,255)";
var strokeStyle = "rgb(0,0,0)";
var w;
var h;
var xOffset;
var yOffset;
var count = 0;
var img;
var topText, bottomText;
var images;
var path;
var suffix;
var scale = .24;
var recursion = 2;

window.onload = init;

function init() {
	ctx = document.getElementById('canvas').getContext('2d');
	canvasRef = document.getElementById('canvas');

	ctxBuffer = document.getElementById('canvasBuffer').getContext('2d');
	canvasRefBuffer = document.getElementById('canvasBuffer');

	w = canvasRef.width;
	h = canvasRef.height;
	xOffset = w / 2;
	yOffset = h / 2;
	canvasColor = canvasColor;
	ctx.fillStyle = canvasColor;
	ctx.fillRect(0, 0, w, h);

	suffix = "";
	path = "/projects/stack/memer/imgs/";
	images = new Array("10_Treading (Conduct)_0.png", "10_Treading (Conduct)_1.png", "13_Fellowship with Men_0 (2).png", "13_Fellowship with Men_0.png", "14_Possession in Great Measure_0 (2).png", "14_Possession in Great Measure_0.png", "14_Possession in Great Measure_1.png", "16_Enthusiasm_0.png", "17_Following_0.png", "1_The Creative- Heaven_0.png", "1_The Creative- Heaven_1.png", "1_The Creative- Heaven_2-.png", "1_The Creative- Heaven_2.png", "20_Contemplation (View)_0.png", "20_Contemplation (View)_1.png", "25_Innocence (The Unexpected)_0 (2).png", "25_Innocence (The Unexpected)_0.png", "25_Innocence (The Unexpected)_1.png", "25_Innocence (The Unexpected)_2.png", "26_The Taming Power of the Great_0.png", "26_The Taming Power of the Great_1.png", "27_The Corners of the Mouth (Providing Nourishment)_0.png", "27_The Corners of the Mouth (Providing Nourishment)_1.png", "29_The Abysmal (Water)_0.png", "31_Influence (Wooing)_0.png", "32_Duration_0.png", "33_Retreat_0.png", "34_The Power of the Great_0.png", "34_The Power of the Great_1.png", "34_The Power of the Great_2.png", "36_Brilliance Injured_0.png", "37_The Family (The Clan)_0.png", "37_The Family (The Clan)_1.png", "38_Opposition_0.png", "39_Obstruction_0.png", "42_Increase_0.png", "43_Break-Through (Resoluteness)_0.png", "43_Break-Through (Resoluteness)_1.png", "43_Break-Through (Resoluteness)_2.png", "43_Break-Through (Resoluteness)_3.png", "43_Break-Through (Resoluteness)_4.png", "43_Break-Through (Resoluteness)_5.png", "44_Coming To Meet_0.png", "44_Coming To Meet_1.png", "46_Pushing Upward_0.png", "47_Oppression (Exhaustion)_0.png", "47_Oppression (Exhaustion)_1.png", "48_The Well_0.png", "49_Revolution (Molting)_0.png", "49_Revolution (Molting)_1.png", "49_Revolution (Molting)_2.png", "50_The Cauldron_0.png", "50_The Cauldron_1.png", "55_Abundance_0.png", "57_The Gentle (The Penetrating- Wind)_0.png", "57_The Gentle (The Penetrating- Wind)_1.png", "58_The Joyous- Lake_0.png", "5_Waiting_0.png", "62_Preponderance of the Small_0.png", "9_The Taming Power of the Small_0.png", "9_The Taming Power of the Small_1.png", "9_The Taming Power of the Small_2.png", "9_The Taming Power of the Small_3.png");

	topText = "THIS ";
	bottomText = "BOX ";

	if (document.getElementById("topText").value != "")
		topText = document.getElementById("topText").value;
	if (document.getElementById("bottomText").value != "")
		bottomText = document.getElementById("bottomText").value;

	img = new Image();

	img.onload = function() {
		loaded();
	}
		loaded();
	//img.src = path + images[Math.floor(images.length * Math.random())] + "." + suffix;
	//t = setInterval(enterFrame, 11);

}

function loaded() {
	ctx.scale(scale, scale);
	ctx.drawImage(img, 0, 0);
	ctxBuffer.drawImage(canvasRef, 0, 0);
	ctx.scale(1 / scale, 1 / scale);
	var txtSize = 90;
	wrapText(ctx, topText, w / 2, 0, 400, txtSize);
	wrapText(ctx, bottomText, w / 2, 1, 800, txtSize);
	recurse(document.getElementById("recursion").value);

}

function wrapText(context, text, x, o, maxWidth, lineHeight) {
	context.fillStyle = textColor;
	context.lineWidth = 4;
	context.strokeStyle = strokeStyle;
	context.mozTextStyle = "80px sans-serif";
	context.font = lineHeight + "px Impact, sans-serif";
	context.textAlign = "center";

	if (text.length > 1) {

		var words = text.split(' ');
		var line = '';
		var lineCount = 0;
		var linesArray = new Array();
		var y = 0;
		y = lineHeight;

		for (var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			line += words[n] + ' ';
			if (testWidth > maxWidth && n > 0 || n == words.length - 1) {
				linesArray.push(testLine);
				line = "";
			}
		}

		var offeset = (o == 1) ? h - lineHeight * linesArray.length - lineHeight / 4 : 0;
		for (var i = 0; i < linesArray.length; i++) {
			context.fillText(linesArray[i], x, offeset + y);
			context.strokeText(linesArray[i], x, offeset + y);
			y += lineHeight;
		}
	}
}

function recurse(n) {
	//ctxBuffer.drawImage(canvasRef, 0, 0);
	for (var i = 1; i < n; i++) {

		var scale = Math.pow(i + 1, 1.01);
		//scale = (i + 1 + 1 * i * i / 6);
		var trans_x = w / 2 + i * .2;
		var trans_y = h / 2 + i * .5;
		var offset_x = -0;

		ctx.translate(trans_x, trans_y);
		ctx.scale(1 / scale, 1 / scale);
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = 15 / scale
		ctx.rect(-w / 2, -h / 2 - offset_x, w, h);
		if (document.getElementById("hasBorder").value == 1)
			ctx.stroke();

		ctx.drawImage(canvasRefBuffer, -w / 2, -h / 2 - offset_x)
		ctx.scale(scale, scale)
		ctx.translate(-trans_x, -trans_y);
	}

}

function reDraw() {
	window.clearInterval(t);
	init();
}

function enterFrame(event) {
	draw();
}

function randomBetween(a, b) {
	var r = Math.random() * (b - a) + a;
	return r;
}

function dl() {
	canvas = document.getElementById("canvas");
	imgDl = canvas.toDataURL("image/jpg");
	window.open(imgDl, "image.jpg");
}

