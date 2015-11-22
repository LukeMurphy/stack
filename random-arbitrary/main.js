$(function() {
	$("#start,#print,#controlsButton,#progressive,#animate").button().click(function(event) {
		event.preventDefault();
		if (this.id == "start")
			redraw();
		if (this.id == "print")
			dl();
		if (this.id == "progressive") {
			useProgressiveSize = (useProgressiveSize) ? false : true;
			redraw();
		}
		if (this.id == "controlsButton") {
			$("#bottomControlPanel").fadeToggle(100);
		}
		if (this.id == "animate") {
			animate = (animate) ? false : true;
			$("#animate").button('option', 'label', (!animate) ? 'Animate' : 'Still');
		}

		$("#progressive").button('option', 'label', (!useProgressiveSize) ? 'Make Progress' : 'Make Uniform');
		if (useProgressiveSize) {
			//$("#sizeSlider").button('disable');
		}

	});

	$("#spacingSlider").slider({
		value : 1,
		min : 0,
		max : 50,
		step : 1,
		slide : function(event, ui) {
			$("#spacing_amount").val("" + ui.value);
			chordLengthIncrease = ui.value;
			redraw();
		}
	});
	$("#spacing_amount").val("" + $("#spacingSlider").slider("value"));

	$("#ringspacingSlider").slider({
		value : 10,
		min : 0,
		max : 50,
		step : 1,
		slide : function(event, ui) {
			$("#ringspacing_amount").val("" + ui.value);
			radiusLengthIncrease = ui.value;
			redraw();
		}
	});
	$("#ringspacing_amount").val("" + $("#ringspacingSlider").slider("value"));

	$("#sizeSlider").slider({
		value : 2,
		min : 0,
		max : 20,
		step : 1,
		slide : function(event, ui) {
			$("#size_amount").val("" + ui.value);
			diceSizeIncrease = ui.value;
			redraw();
		}
	});
	$("#size_amount").val("" + $("#sizeSlider").slider("value"));

	$("#initsizeSlider").slider({
		value : 30,
		min : 5,
		max : 80,
		step : 1,
		slide : function(event, ui) {
			$("#initsize_amount").val("" + ui.value);
			chordLength = ui.value;
			redraw();
		}
	});
	$("#initsize_amount").val("" + $("#initsizeSlider").slider("value"));

	$("#ringsSlider").slider({
		value : 10,
		min : 5,
		max : 80,
		step : 1,
		slide : function(event, ui) {
			$("#rings_amount").val("" + ui.value);
			numberOfRings = ui.value;
			redraw();
		}
	});
	$("#rings_amount").val("" + $("#ringsSlider").slider("value"));

});

$(function() {
	var wd = $(window).width();
	$('#post').css("width", wd);
	$('#entry').css("width", wd);
	$('#topControlPanel').css("width", wd);
	$('#bottomControlPanel').css("width", wd);
	$('#canvas').attr("width", wd);
	$('#canvasview').attr("width", wd);
	$('#canvasoverlay').attr("width", wd);
	var ht = $(window).height();
	$('#canvas').attr("height", ht);
	$('#canvasview').attr("height", ht);
	$('#canvasoverlay').attr("height", ht);

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
