$(function() {
	$("#start,#print,#controlsButton,#progressive,#animate").button().click(function(event) {
		event.preventDefault();
		if (this.id == "start")
			redraw();
		if (this.id == "print")
			dl();
		if (this.id == "progressive") {
			redraw();
		}
		if (this.id == "controlsButton") {
			$("#bottomControlPanel").fadeToggle(100);
		}
		if (this.id == "animate") {
			animate = (animate) ? false : true;
			$("#animate").button('option', 'label', (!animate) ? 'Animate' : 'Still');
		}

	});

	$("#s_minLength").slider({
		value : 1,
		min : 1,
		max : 100,
		step : 1,
		slide : function(event, ui) {
			$("#minLength").val("" + ui.value);
			minLength = ui.value;
			redraw();
		}
	});
	//$("#minLength").val("" + $("#minLength").slider("value"));

	$("#s_maxLength").slider({
		value : 10,
		min : 1,
		max : 100,
		step : 1,
		slide : function(event, ui) {
			$("#maxLength").val("" + ui.value);
			maxLength = ui.value;
			redraw();
		}
	});
	//$("#maxLength").val("" + $("#maxLength").slider("value"));

	$("#s_lineCount").slider({
		value : 10,
		min : 5,
		max : 5000,
		step : 1,
		slide : function(event, ui) {
			$("#lineCount").val("" + ui.value);
			lineCount = ui.value;
			redraw();
		}
	});
	//	$("#rings_amount").val("" + $("#ringsSlider").slider("value"));

	$("#s_rangeLevel").slider({
		value : 1.1,
		min : 1,
		max : 10,
		step : .01,
		slide : function(event, ui) {
			$("#rangeLevel").val("" + ui.value);
			rangeLevel = ui.value;
			redraw();
		}
	});
	//	$("#rings_amount").val("" + $("#ringsSlider").slider("value"));

	$("#s_oval").slider({
		value : 1,
		min : .2,
		max : 10,
		step : .1,
		slide : function(event, ui) {
			$("#oval").val("" + ui.value);
			oval = ui.value;
			redraw();
		}
	});
});

$(function() {
	var wd = $(window).width();
	var ht = $(window).height();
	if (ht < 600)
		ht = 600;

	$('#post').css("width", wd);
	$('#entry').css("width", wd);
	//$('#topControlPanel').css("width", wd);
	//$('#bottomControlPanel').css("width", wd);

	//$('#topControlPanel').css("display", "none");
	$('#bottomControlPanel').css("display", "none");
	$('#allControls').css("display", "none");

	$('#canvas').attr("width", wd);
	$('#canvas').attr("height", ht);

	userCount = wd/10;
	//maxLength = wd / 50;
	//minLength = maxLength *.85;

	//$('#canvasview').attr("height", ht);
	//$('#canvasview').attr("width", wd);

	//$('#canvasoverlay').attr("height", ht);
	//$('#canvasoverlay').attr("width", wd);

	$("body").css("background-color", bgColor);
	$("#canvas").css("background-color", bgColor);

	init();

});

function dl() {
	canvas = document.getElementById("canvas");
	var dlimg = canvas.toDataURL("image/jpg");
	window.open(dlimg, "image.jpg");
}

function deBug(obj) {
	for (props in obj) {
		document.getElementById("debug").innerHTML += props + ": " + obj[props] + "<br>";
	}
}
