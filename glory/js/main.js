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

	$("#start,#print,#controlsButton,#anotherButton").button().click(function(event) {
		//event.preventDefault();
		if (this.id == "start")
			redraw();
		if (this.id == "print")
			dl();
		if (this.id == "controlsButton") {
			$("#bottomControlPanel").fadeToggle(100);
		}
		if (this.id == "anotherButton") {
			setUp();
		}
	});

	$("#inverse").button().click(function(event) {
		inverse = (inverse) ? false : true;
		//redraw();
	});

	$("#scale").button().click(function(event) {
		scaleElements = (scaleElements) ? false : true;
		//redraw();
	});
	$("#format").buttonset();

	$("#rotate").button().click(function(event) {
		rotateElements = (rotateElements) ? false : true;
		//redraw();
	});
	$("#format").buttonset();

	$("#usePhi").button().click(function(event) {
		usePhi = (usePhi) ? false : true;
		updateControls();
		//redraw();
	});
	$("#format").buttonset();

	$("#usingAlternateImages").button().click(function(event) {
		usingAlternateImages = (usingAlternateImages) ? false : true;
		updateControls();
		//redraw();
	});
	$("#format").buttonset();

	$("#toggle").button().click(function(event) {
		primaryImage = (primaryImage == img) ? img2 : img;
		//redraw();
	});
	$("#format").buttonset();
});

function updateControls() {
	$("#usePhi").button('option', 'label', (usePhi) ? "Rings of Hierarchy" : "Organic Packing by Phi");
	if (!usePhi) {
		$("#inverse").button('disable');
		$("#scale").button('disable');
		$("#rotate").button('disable');
	} else {
		$("#inverse").button('enable');
		$("#scale").button('enable');
		$("#rotate").button('enable');
	}
		$("#usingAlternateImages").button('option', 'label', (usingAlternateImages) ? "Single" : "Alts");
		drawWords();
}

//usingAlternateImages

$(function() {
	$("#phiSlider").slider({
		value : 5,
		min : .01,
		max : 23,
		step : .01,
		slide : function(event, ui) {
			$("#phi_amount").val("" + ui.value);
			phiValue = ui.value;
			refresh();
		}
	});
	$("#phi_amount").val("" + $("#phiSlider").slider("value"));

	$("#multSlider").slider({
		value : 50,
		min : 10,
		max : 300,
		step : 2,
		slide : function(event, ui) {
			$("#mult_amount").val("" + ui.value);
			multiplier = ui.value;
			radius = multiplier * 10;
			refresh();
		}
	});
	$("#mult_amount").val("" + $("#multSlider").slider("value"));

	$("#rotationSlider").slider({
		value : 0,
		min : 0,
		max : Math.PI * 2,
		step : Math.PI / 100,
		slide : function(event, ui) {
			$("#rotation_amount").val("" + ui.value);
			rotationOffset = ui.value;
			refresh();
		}
	});
	$("#rotation_amount").val("" + $("#rotationSlider").slider("value"));

	// scaleIncrementFactor

	$("#scaleIncrementFactorSlider").slider({
		value : 1.3,
		min : .1,
		max : 3,
		step : .05,
		slide : function(event, ui) {
			$("#scaleIncrementFactor_amount").val("" + ui.value);
			scaleIncrementFactor = ui.value;
			refresh();
		}
	});
	$("#scaleIncrementFactor_amount").val("" + $("#scaleIncrementFactorSlider").slider("value"));

	$("#numSlider").slider({
		value : 100,
		min : 23,
		max : 200,
		step : 1,
		slide : function(event, ui) {
			$("#num_amount").val("" + ui.value);
			num = ui.value;
			refresh();
		}
	});
	$("#num_amount").val("" + $("#numSlider").slider("value"));
	
	var tn = setInterval(function() {
		setUp();
		}, 12000);
});
