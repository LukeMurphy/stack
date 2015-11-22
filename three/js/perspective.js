var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, SEPARATION = 200, AMOUNTX = 10, AMOUNTY = 10, camera, scene, renderer;
var geometry = new THREE.Geometry();
var particleArray = new Array();
var materialArray = new Array();
init();
animate();

function init() {

	var container, separation = 100, amountX = 50, amountY = 50, particles, particle;

	container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 100000);
	camera.position.z = 800;
	camera.position.y = -500;
	//camera.setViewOffset( 500, 500, 200, 0, 500, 500 )

	scene = new THREE.Scene();

	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// particles

	var PI2 = Math.PI * 2;
	img = new Image();
	img.src = "" + "ambassador.png";

	for (var i = 0; i < 1200; i++) {

		var material = new THREE.ParticleCanvasMaterial({

			color : randomColor(),
			program : function(context) {

				var imgDimx = 220;
				var imgDimy = 200;
				/*
				 */
				context.scale(-.1, -.1);
				context.drawImage(img, 0, 0, imgDimx, imgDimy, -imgDimx / 2, -imgDimy / 2, imgDimx, imgDimy);
				context.scale(-10, -10);

				context.fillStyle = randomColor();
				context.beginPath();
				context.arc(0, 0, 1, 0, PI2, true);
				context.closePath();
				context.fill();

			}
		});
		materialArray.push(material);
	}

	/**************************/

	var radius = 1200;
	var rings = 24;
	var segmentArc = 100;
	var arc = 1 * Math.PI / rings;
	var d = 2 * radius / rings;
	var count = 0;
	for (var ring = 0; ring < rings; ring++) {

		/*
		 var r = Math.sin(arc * ring) * radius;
		 var dis = (ring < rings /2) ? d * ring : d * (ring  - rings/2);
		 dis  = radius - ring*d;
		 //dis = rings/2 - ring;
		 r = Math.sqrt(radius * radius - dis*dis)
		 //var yDis = Math.sin(arc * ring - Math.PI / 2) * radius;
		 yDis = radius - radius - dis;
		 //yDis = Math.sin(arc * ring) * radius;
		 */
		var angle = arc * ring;
		var r = Math.sin(angle) * radius;
		var yDis = Math.cos(angle) * radius;

		var unitsPerRing = Math.round(Math.PI * 2 * r / segmentArc);
		var rads = 2 * Math.PI / unitsPerRing;
		var speed = (Math.random() > .5) ? 1 : -1;
		speed *= Math.PI / 500 * Math.random();

		document.getElementById("debug").innerHTML += yDis + "<br>";

		for (var i = 0; i < unitsPerRing; i++) {

			var xPos = r * Math.cos(rads * i);
			var yPos = yDis;
			var zPos = r * Math.sin(rads * i);

			particle = new THREE.Particle(materialArray[count]);
			particle.position.x = xPos;
			particle.position.y = yPos;
			particle.position.z = zPos;
			particle.position.normalize();
			particle.position.multiplyScalar(Math.random() * 10 + 450);
			particle.scale.x = particle.scale.y = 9;
			scene.add(particle);
			particleArray.push({
				particle : particle,
				angle : rads * i,
				r : r,
				yVal : yPos,
				speed : speed
			});
			geometry.vertices.push(particle.position);
			particle.material.color.setRGB(Math.random() * 1, Math.random() * 1, Math.random() * 1);
			count++
		}
	}

	// lines

	var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
		color : 0xffffff,
		opacity : 0.5
	}));
	scene.add(line);

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onWindowResize, false);

	var t = setInterval(function() {
		moveELements()
	}, 33);

}

function randomColor() {

	var str = "" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",";
	return "rgba(" + str + ",.5)";

}

function moveELements() {
	var elementCount = particleArray.length;
	for (var i = 0; i < elementCount; i++) {
		var particle = particleArray[i].particle;
		particleArray[i].angle += particleArray[i].speed;
		particle.position.x = particleArray[i].r * Math.cos(particleArray[i].angle);
		particle.position.z = particleArray[i].r * Math.sin(particleArray[i].angle);
		particle.position.y = particleArray[i].yVal;
	}

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart(event) {

	if (event.touches.length > 1) {

		event.preventDefault();

		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;

	}

}

function onDocumentTouchMove(event) {

	if (event.touches.length == 1) {

		event.preventDefault();

		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;

	}

}

function animate() {

	requestAnimationFrame(animate);

	render();

}

function render() {
	camera.position.x += (3 * mouseX - camera.position.x ) * .15;
	camera.position.y += (3 * -mouseY + 200 - camera.position.y ) * .15;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}
