$(function() {
	$("#start,#print,#controlsButton").button().click(function(event) {
		event.preventDefault();
		if (this.id == "start")
			redraw();
		if (this.id == "print")
			dl();
		if (this.id == "controlsButton") {
			$("#bottomControlPanel").fadeToggle(100);
		}
	});

	$("#generationsSlider").slider({
		value : 7,
		min : 3,
		max : 12,
		step : 1,
		slide : function(event, ui) {
			$("#generations_amount").val("" + ui.value);
			generationLimit = ui.value;
		}
	});
	$("#generations_amount").val("" + $("#generationsSlider").slider("value"));

	$("#scaleSlider").slider({
		value : 200,
		min : 20,
		max : 400,
		step : 5,
		slide : function(event, ui) {
			$("#scale_amount").val("" + ui.value);
			branchLength = ui.value;
		}
	});
	$("#scale_amount").val("" + $("#scaleSlider").slider("value"));

	$("#angleSlider").slider({
		value : 90,
		min : 5,
		max : 270,
		step : 5,
		slide : function(event, ui) {
			$("#angle_amount").val("" + ui.value);
			angle = ui.value;
		}
	});
	$("#angle_amount").val("" + $("#angleSlider").slider("value"));

	$("#mutationPossibilitySlider").slider({
		value : 1,
		min : 0,
		max : 10,
		step : 1,
		slide : function(event, ui) {
			$("#mutationPossibility_amount").val("" + ui.value);
			mutationPossibility = ui.value;
		}
	});
	$("#mutationPossibility_amount").val("" + $("#mutationPossibilitySlider").slider("value"));
});

$(function() {
	$("#machine").button().click(function(event) {
		override = true;
		overrideSet = (overrideSet != 0) ? 0 : 1;

		if (overrideSet == 0) {
			$("#machine").button('option', 'label', 'Mollusc ');
		} else {
			$("#machine").button('option', 'label', 'Machine');
		}
		//redraw();
	});

	$("#animate").button().click(function(event) {
		animate = (animate) ? false : true;
		if (!animate) {
			clearInterval(animateTimer);
			$("#animate").button('option', 'label', 'Animate');
		} else {
			$("#animate").button('option', 'label', ' Stop  ');
			redraw();
		}
	});

	$("#reverse").button().click(function(event) {
		reversal = (reversal) ? false : true;
		$("#reverse").button('option', 'label', (reversal) ? 'Grow' : 'Invert');
		redraw();
	});

	$("#blend").button().click(function(event) {
		blendSets = (blendSets) ? false : true;
		$("#blend").button('option', 'label', (blendSets) ? 'Single' : 'Blend');
		redraw();
	});

	var wd = $(window).width() * .89;
	$('#post').css("width", wd);
	$('#entry').css("width", wd);
	$('#topControlPanel').css("width", wd);
	$('#bottomControlPanel').css("width", wd);
	$('#canvas').attr("width", wd);
	var ht = $(window).height() - 220;
	if (ht < 600)
		ht = 600;
	$('#canvas').attr("height", ht);
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
