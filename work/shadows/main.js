	$(function() {
		$("#start,#print,#controlsButton").button().click(function(event) {
			event.preventDefault();
			if(this.id == "start") redraw();
			if(this.id == "print") dl();
			if(this.id == "controlsButton") {
				 $("#bottomControlPanel").fadeToggle(100);
			}
		});

		$("#scaleRangeSlider").slider({
			value : .5,
			min : .1,
			max : 3,
			step : .1,
			slide : function(event, ui) {
				$("#scaleRange_amount").val("" + ui.value);
				scaleRange = ui.value;
			}
		});
		$("#scaleRange_amount").val("" + $("#scaleRangeSlider").slider("value"));
	
		$("#scaleSlider").slider({
			value : .5,
			min : .1,
			max : 3,
			step : .1,
			slide : function(event, ui) {
				$("#scale_amount").val("" + ui.value);
				scaleMinimum = ui.value;
			}
		});
		$("#scale_amount").val("" + $("#scaleSlider").slider("value"));

		$("#overlayCountSlider").slider({
			value : 300,
			min : 100,
			max : 1000,
			step : 20,
			slide : function(event, ui) {
				$("#overlayCount_amount").val("" + ui.value);
				overlayCount = ui.value;
			}
		});
		$("#overlayCount_amount").val("" + $("#overlayCountSlider").slider("value"));
	
		$("#radiusSlider").slider({
			value : 160,
			min : 10,
			max : 800,
			step : 10,
			slide : function(event, ui) {
				$("#radius_amount").val("" + ui.value);
				baseRadius = ui.value;
			}
		});
		$("#radius_amount").val("" + $("#radiusSlider").slider("value"));
		
		var wd =  $(window).width() * .89;
		$('#post').css("width", wd);
		$('#entry').css("width",wd);
		$('#topControlPanel').css("width",wd);
		$('#bottomControlPanel').css("width",wd);
		$('#canvas').attr("width", wd);
		var ht = $(window).height() - 270;
		$('#canvas').attr("height", ht);
	});
