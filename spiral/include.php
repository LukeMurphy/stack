<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="/projects/stack/css/jquery-ui-1.10.2.custom.css">
<link rel="stylesheet" href="/projects/stack/css/style.css">
<style>
	#topControlPanel {
		border: none;
	}

	@font-face {
		font-family: 'Duchamp';
		src: url('/projects/stack/fonts/duchamp.ttf');
	}
	@font-face {
		font-family: 'Calibrib';
		src: url('/projects/stack/fonts/calibrib.ttf');
	}
	@font-face {
		font-family: 'LAM';
		src: url('/projects/stack/fonts/lamshell.ttf');
	}

</style>

<script src="/projects/stack/js/jquery-1.9.1.js"></script>
<script src="/projects/stack/js/jquery-ui-1.10.2.custom.js"></script>
<script src="/projects/stack/js/jquery.ui.touch-punch.min.js"></script>

<script src="/projects/stack/spiral/js/demons.js"></script>
<script src="/projects/stack/spiral/js/spirals.js"></script>
<script src="/projects/stack/spiral/js/main.js"></script>
<!--

<script src="/projects/stack/spiral/js/stack.js"></script>
-->
<canvas id="canvas" width=740 height=740></canvas>
<canvas id="canvasview" width=740 height=740 style="display:none"></canvas>


<div id="debug"></div>

<div id="topControlPanel">
	<!--

	-->
	<button id="start">
		Redraw
	</button>
	<button id="print">
		Print / DL
	</button>
	<button id="mode">
		Internal / External
	</button>
</div>
<!--
<button id="controlsButton">
Controls
</button>
<div id="bottomControlPanel">

<div id="format">
<button id="inverse">
Inverse
</button>
<button id="scale" >
Scale
</button>
<button id="rotate" >
Rotate
</button>
<button id="usePhi" >
Rings
</button>
<button id="toggle" >
Change Image
</button>
<button id="usingAlternateImages" >
Alt imges
</button>
</div>

<div id="column1" class="column">
<div id="multSlider" class="slider"></div>
<label for="mult_amount">Radius:</label>
<input type="text" id="mult_amount" class="uiAmount"  disabled/>
<br />
<br />

<div id="phiSlider" class="slider"></div>
<label for="phi_amount">Phi Value:</label>
<input type="text" id="phi_amount" class="uiAmount"  disabled/>
<br />
<br />

</div>

<div id="column2" class="column">
<div id="scaleIncrementFactorSlider" class="slider"></div>
<label for="scaleIncrementFactor_amount">Scaling (Rings only):</label>
<input type="text" id="scaleIncrementFactor_amount" class="uiAmount"  disabled/>
<br />
<br />

<div id="numSlider" class="slider"></div>
<label for="num_amount">Elements per ring (rings only):</label>
<input type="text" id="num_amount" class="uiAmount"  disabled/>
<br />
<br />

</div>
<br clear=all>

</div>
-->
