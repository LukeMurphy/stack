function save() {
	canvas = document.getElementById("canvas");
	var dlimg = canvas.toDataURL("image/jpg");
	window.open(dlimg, "image.jpg");
	return true;
}

function Point() {
	return {
		x : 0,
		y : 0
	};
}

function getNewColor() {
	var r = Math.round(255 * Math.random());
	var g = Math.round(255 * Math.random());
	var b = Math.round(255 * Math.random());
	return "rgba(" + r + "," + g + "," + b + ", .5)";
}