var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, SEPARATION = 200, AMOUNTX = 10, AMOUNTY = 10, camera, scene, renderer;
var geometry = new THREE.Geometry();
var particleArray = new Array();
var ringArray = new Array();
var materialArray = new Array();
var container, separation = 100, amountX = 50, amountY = 50, particles, particle;
var fov = 100;
var freeze = true;

window.onload = function() {
	init();
	animate();
};

function init() {

	container = document.createElement('imageContainer');
	pContainer = document.getElementById('partcontainer');
	document.body.appendChild(container);
	container.id = "imageContainer";

	camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 100000);
	camera.position.z = 1100;
	camera.position.y = -20;

	// rotate the whole shere on the z axix if angled viewing
	camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), 6 / 180 * Math.PI);
	//camera.up = new THREE.Vector3(0, 0, 1);

	//camera.setViewOffset( 500, 500, 200, 0, 500, 500 )

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	pContainer.appendChild(renderer.domElement);

	texture = THREE.ImageUtils.loadTexture('/projects/stack/three/textures/animatedDove.gif', {}, function() {
		renderer.render(scene);
	});

	// particles

	var PI2 = Math.PI * 2;
	var material = new THREE.MeshLambertMaterial({
		color : 0xffffff,
		map : THREE.ImageUtils.loadTexture('/projects/stack/three/textures/test2.jpg')
	});
	var blendings = ["NoBlending", "NormalBlending", "AdditiveBlending", "SubtractiveBlending", "MultiplyBlending", "AdditiveAlphaBlending"];
	material.blending = THREE[blendings[2]];

	var pointLight = new THREE.PointLight(0x0000ff);
	pointLight.position.x = 0;
	pointLight.position.y = 900;
	pointLight.position.z = 0;
	scene.add(pointLight);

	var pointLight = new THREE.PointLight(0xFfff00);
	pointLight.position.x = 400;
	pointLight.position.y = 0;
	pointLight.position.z = 0;
	scene.add(pointLight);

	var pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.x = 0;
	pointLight.position.y = 0;
	pointLight.position.z = 900;
	scene.add(pointLight);

	var lx, ly, lz;
	lx = 0;
	ly = -900;
	lz = 0;

	var pointLight = new THREE.PointLight(0xff0000);
	pointLight.position.x = lx;
	pointLight.position.y = ly;
	pointLight.position.z = lz;
	scene.add(pointLight);
	/**************************/

	var radius = 900;
	var rings = 14;
	var segmentArc = 150;
	var arc = 1 * Math.PI / rings;
	var d = 2 * radius / rings;
	var count = 0;
	var sphereRadius = 60, sphereSegments = 16, sphereRings = 16;

	var sphere = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereRings), material);
	sphere.position.set(lx, ly, lz);
	sphere.overdraw = true;
	scene.add(sphere);

	for (var ring = 0; ring < rings; ring++) {

		var angle = arc * ring;
		var r = Math.sin(angle) * radius;
		var yDis = Math.cos(angle) * radius;

		var unitsPerRing = Math.round(Math.PI * 2 * r / segmentArc);
		var rads = 2 * Math.PI / unitsPerRing;
		var speed = (Math.random() > .5) ? 1 : -1;
		speed *= Math.PI / 500 * Math.random();

		//document.getElementById("debug").innerHTML += yDis + "<br>";

		ringArray[ring] = new Array();
		for (var i = 0; i < unitsPerRing; i++) {

			var xPos = r * Math.cos(rads * i);
			var yPos = yDis;
			var zPos = r * Math.sin(rads * i);
			// set up the sphere vars
			var sphere = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereRings), material);
			sphere.position.set(xPos, yPos, zPos);
			sphere.overdraw = true;
			scene.add(sphere);

			particleArray.push({
				particle : sphere,
				angle : rads * i,
				rxAngle : rads * i,
				ryAngle : rads * i,
				rzAngle : rads * i,
				rxAngleSpeed : Math.PI * Math.random() / 100,
				ryAngleSpeed : (Math.random() > .5 ? -1 : 1) * Math.PI * Math.random() / 100,
				rzAngleSpeed : Math.PI * Math.random() / 100,
				rxAngleRotate : (Math.random() > .5) ? false : true,
				ryAngleRotate : (Math.random() > .5) ? false : true,
				rzAngleRotate : (Math.random() > .5) ? false : true,
				r : r,
				yVal : yPos,
				speed : speed
			});

			ringArray[ring].push(particleArray[particleArray.length - 1]);

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
	document.addEventListener('mousewheel', onDocumentMouseWheel, false);
	document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keypress', onkeydown, false);

	/*
	 */
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

		var xAxis = new THREE.Vector3(1, 0, 0);
		particleArray[i].rxAngle += particleArray[i].rxAngleSpeed;
		particleArray[i].ryAngle += particleArray[i].ryAngleSpeed;
		particleArray[i].rzAngle += particleArray[i].rzAngleSpeed;
		if (particleArray[i].rxAngleRotate)
			particle.rotation.x = particleArray[i].rxAngle;
		if (particleArray[i].ryAngleRotate)
			particle.rotation.y = particleArray[i].ryAngle;
		if (particleArray[i].rzAngleRotate)
			particle.rotation.z = particleArray[i].rzAngle;
	}

	// change the ring speed once in a while
	for (var ring = 0; ring < ringArray.length; ring++) {
		if (Math.random() > .999) {
			var speed = (Math.random() > .5) ? 1 : -1;
			speed *= Math.PI / 500 * Math.random();
			for (var i = 0; i < ringArray[ring].length; i++) {
				ringArray[ring][i].speed = speed;
			}
		}
	}

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight - 300);

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

function onkeydown(event) {
	var charCode = event.which;
	var charStr = String.fromCharCode(charCode);
	if (charStr == "+") {
		camera.position.z -= 100;
		render();
	}
	if (charStr == "-") {
		camera.position.z += 100;
		render();
	}

}

function onDocumentMouseWheel(event) {

	// WebKit
	if (event.wheelDeltaY) {
		fov -= event.wheelDeltaY * 0.05;
		//camera.position.z -= event.wheelDeltaY * 2;
		// Opera / Explorer 9
	} else if (event.wheelDelta) {
		fov -= event.wheelDelta * 0.05;
		//camera.position.z -= event.wheelDelta * 2;
		// Firefox
	} else if (event.detail) {
		fov += event.detail * 1.0;
		//camera.position.z += event.detail * 1.0;
	}

	camera.fov = fov;
	camera.updateProjectionMatrix();

	//camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
	render();
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	if (!freeze) {

		camera.position.x += (5 * mouseX - camera.position.x ) * .5;
		camera.position.y += (5 * -mouseY - camera.position.y ) * .5;
		camera.lookAt(scene.position);
	}
	renderer.render(scene, camera);

}
