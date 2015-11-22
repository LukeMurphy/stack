<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="/projects/stack/css/jquery-ui-1.10.2.custom.css">
<link rel="stylesheet" href="/projects/stack/css/style.css">
<style>
	#topControlPanel {
		border: none;
	}

	@font-face {
		font-family: 'LAM';
		src: url('/projects/stack/fonts/lamshell.ttf');
	}
	@font-face {
		font-family: 'ComicSans';
		src: url('/projects/stack/fonts/comicbd.ttf');
	}

	@font-face {
		font-family: 'Impact';
		src: url('/projects/stack/fonts/impact.ttf');
	}

</style>

<script src="/projects/stack/js/jquery-1.9.1.js"></script>
<script src="/projects/stack/js/jquery-ui-1.10.2.custom.js"></script>
<script src="/projects/stack/js/jquery.ui.touch-punch.min.js"></script>

<script src="/projects/stack/memer/js/meme.js"></script>
<script src="/projects/stack/memer/js/main.js"></script>
<!--

<script src="/projects/stack/spiral/js/stack.js"></script>
-->
<canvas id="canvas" width=1000 height=800></canvas>
<canvas id="canvasBuffer" width=1000 height=800 style="position:absolute;top:-5000px"></canvas>

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
	<input type="text" name="topText" id="topText">
	<input type="text" name="bottomText" id="bottomText">
	<input type="text" name="recursion" id="recursion" value = 2>
	<input type="text" name="hasBorder" id="hasBorder" value = 0>
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
