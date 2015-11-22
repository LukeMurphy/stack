window.onload = init;
var ref;
var svgdoc;
var xhr = new XMLHttpRequest;
var svg;

function init() {

	ref = document.getElementById("div3");
	ref = document.getElementById("mySVG");
	ref.currentScale = 1;

	xhr.open('get', "assets/other.svg", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4)
			return;
		svgItem = xhr.responseXML.documentElement;
		ref.appendChild(svgItem);
		svgItem.setAttribute("fill", "lime");
		//svgItem.setAttribute("height", "100px");
		//svgItem.setAttribute("width", "600px");
		//svgItem.setAttribute("transform", "translate(300) rotate(45 50 50)");

		//var matrix = ref.createSVGMatrix();
		//matrix = matrix.translate(1000, -200);
		//ref.transform.baseVal.getItem(0).setMatrix(matrix);

		var svg = svgItem.getSVGDocument();
		console.log(svg);
		console.log(ref);
		console.log(svgItem);

	};
	xhr.send();

	var svgNS = "http://www.w3.org/2000/svg";
	var myCircle = document.createElementNS(svgNS, "circle");
	myCircle.setAttributeNS(null, "id", "mycircle");
	myCircle.setAttributeNS(null, "cx", 250);
	myCircle.setAttributeNS(null, "cy", 250);
	myCircle.setAttributeNS(null, "r", 250);
	myCircle.setAttributeNS(null, "fill", "black");
	myCircle.setAttributeNS(null, "fill-opacity", "10%");
	myCircle.setAttributeNS(null, "stroke", "none");
	ref.appendChild(myCircle);

	myCircle.setAttribute("transform", "scale(1.2)");

	//var rect = document.createElementNS(svgNS, "rect");
	//<rect width="100" height="300" x="25" y="25" fill="orange" />

	/*
	 //document.getElementById('debug').style.visibility = "hidden";
	 canvas = document.getElementById('canvas');
	 ctx = canvas.getContext("2d");
	 //ctx.rotate(6 / 180 * Math.PI);

	 w = canvas.width;
	 h = canvas.height;
	 ctx.fillRect(0, 0, w, h);
	 ctx.save();
	 */
	pointsArray = new Array();
	linesArray = new Array();

}

function startTimer() {
	var t = setInterval(function() {
		zoom();
	}, 10);
}

function zoom() {
	ref.currentScale += .01;

	if (ref.currentScale > 4)
		ref.currentScale = .1;

}

