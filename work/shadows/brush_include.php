	<link rel="stylesheet" href="/projects/stack/css/jquery-ui-1.10.2.custom.css">
	<link rel="stylesheet" href="/projects/stack/css/style.css">
	<script src="/projects/stack/js/jquery-1.9.1.js"></script>
	<script src="/projects/stack/js/jquery-ui-1.10.2.custom.js"></script>
	<script src="/projects/stack/js/jquery.ui.touch-punch.min.js"></script>
	<script src="/projects/stack/shadows/main.js"></script>
	<script src="/projects/stack/shadows/brush.js"></script>

	<canvas id="canvas" width=840 height=680></canvas>
	
	<style>
	#topControlPanel {
		border:none;
	}
	
	</style>


	<div id="topControlPanel">
		<button id="start">Re-Draw</button>
		<button id="print">Print / DL</button>
		<button id="controlsButton">Controls</button>
	</div>

	<div id="bottomControlPanel">

		<div id="column1" class="column">
			<div id="scaleSlider" class="slider"></div>
			<label for="scale_amount">scale:</label>
			<input type="text" id="scale_amount" class="uiAmount"  disabled/>
			
			<div id="scaleRangeSlider" class="slider"></div>
			<label for="scaleRange_amount">scale range:</label>
			<input type="text" id="scaleRange_amount" class="uiAmount"  disabled/>
		</div>

		<div id="column2" class="column">
			<div id="overlayCountSlider" class="slider"></div>
			<label for="overlayCount_amount">Overlay density:</label>
			<input type="text" id="overlayCount_amount" class="uiAmount"  disabled/>
		</div>
		<br clear=all>

	</div>
