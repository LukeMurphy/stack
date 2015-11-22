<link rel="stylesheet" href="/projects/stack/css/jquery-ui-1.10.2.custom.css">
<link rel="stylesheet" href="/projects/stack/css/style.css">

<!--
-->
<script src="/projects/stack/js/jquery-1.9.1.js"></script>
<script src="/projects/stack/js/jquery-ui-1.10.2.custom.js"></script>
<script src="/projects/stack/js/jquery.ui.touch-punch.min.js"></script>
<script src="/projects/stack/seaweed/main.js"></script>
<script src="/projects/stack/seaweed/generate-b.js"></script>
<style>
	#topControlPanel {
		border: none;
	}

	#dialog-modal {
		background-color: #ffffff;
	}

</style>

<canvas id="canvas" width=800 height=680></canvas>

<div id="debug"></div>

<div id="topControlPanel">

	<button id="reverse">
		Invert
	</button>

	<button id="animate">
		Stop
	</button>

	<button id="start">
		Re-Draw
	</button>

	<button id="print">
		Print / DL
	</button>

	<button id="controlsButton">
		Controls
	</button>

</div>

<div id="bottomControlPanel">

	<div id="column1" class="column">


		<div style="float:left;width:130px">
		<div id="mutationPossibilitySlider" class="slider" style="width:120px"></div>
		<label for="mutationPossibility_amount">Mutation poss.:</label>
		<input type="text" id="mutationPossibility_amount" class="uiAmount"  disabled/>
		</div>
		
		<div style="float:left;width:130px">
		<div id="generationsSlider" class="slider" style="width:120px"></div>
		<label for="generations_amount">Generations</label>
		<input type="text" id="generations_amount" class="uiAmount"  disabled/>
		</div>
		<br />
		<br />
		<button id="machine">
			Mollusc
		</button>

		<button id="blend">
			Blend
		</button>
		

		<br />
		<br />
	</div>

	<div id="column2" class="column">

		<div id="scaleSlider" class="slider"></div>
		<label for="scale_amount">Distance:</label>
		<input type="text" id="scale_amount" class="uiAmount"  disabled/>

		<div id="angleSlider" class="slider"></div>
		<label for="angle_amount">Spread:</label>
		<input type="text" id="angle_amount" class="uiAmount"  disabled/>

		<br />
		<br />

	</div>
	<br clear=all>

</div>
