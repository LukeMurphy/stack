<style>
body {
padding:0px;
background-color:black;
margin:0 auto;
overflow:hidden;
cursor: none;
}

.canvas {
cursor: none;
}
</style>

<!-- div id="debug"></div -->
<script src="/projects/stack/three/js/manager.js"></script>
<script src="/projects/stack/three/js/three.min.js"></script>
<script src="/projects/stack/three/js/shaders/CopyShader.js"></script>
<script src="/projects/stack/three/js/shaders/DotScreenShader.js"></script>
<script src="/projects/stack/three/js/shaders/RGBShiftShader.js"></script>

<script src="/projects/stack/three/js/postprocessing/EffectComposer.js"></script>
<script src="/projects/stack/three/js/postprocessing/RenderPass.js"></script>
<script src="/projects/stack/three/js/postprocessing/MaskPass.js"></script>
<script src="/projects/stack/three/js/postprocessing/ShaderPass.js"></script>
<script src="/projects/stack/three/js/perspective-webgl.js"></script>

<script type="text/javascript">
	function goFullscreen(id) {
		// Get the element that we want to take into fullscreen mode
		var element = document.getElementById(id);
		if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		}
	}
</script>

<!--
<button onclick="freeze=(freeze)?false:true; return false">
un/freeze
</button>
<button onclick="goFullscreen('imageContainer'); return false">FULLSCREEN</button>
-->
<div id="partcontainer">
	<canvas id="canvas" width="1" height="1"></canvas>
</div>
