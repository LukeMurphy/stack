		<style>
			body {
				padding: 0px;
				background-color: black;
				margin: 0 auto;
				overflow: hidden;
			}
		</style>
		<script src="/projects/stack/blue/js/stack.js"></script>
		<script src="/projects/stack/blue/js/demons.js"></script>

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

			@font-face {
				font-family: 'arcadeclassicregular';
				src: url('/projects/stack/fonts/arcadeclassic-webfont.ttf');
				font-weight: normal;
				font-style: normal;
			}

		</style>
		<style>
			body {
				background-color: blue;
				cursor: none;
				margin: 14px;
			}

			#console {
				border: 2px Solid white;
				margin:  auto 0px;
				height: 100%;
				width: 100%;
				min-height: 800px;
				box-shadow: 4px 4px 0px #000;
				background-color: blue;
			}
			#textLayer {
				color: white;
				font-family: arcadeclassicregular, sans-serif;
				font-size: 62px;
				image-rendering: pixelated;
				text-shadow: 3px 3px 0px #000;
				margin: 0;
				text-align: right;
				width: 95%;
			}

			/* Smartphones (portrait and landscape) ----------- */
			@media only screen 
			and (min-device-width : 320px) 
			and (max-device-width : 480px) {
			/* Styles */
				#textLayer {
					font-size: 32px;
					width: 90%;
				}

			}

		</style>

		<!--
		<canvas id="canvasoverlay" width=800 height=640 style="display:none"></canvas>
		<canvas id="canvas" width=800 height=640 style="display:none"></canvas>
		-->
		<div id="console">
			<div id="textLayer">
				PAIN
			</div>
		</div>
