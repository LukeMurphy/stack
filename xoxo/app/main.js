var ctx1, canvasRef1, canvas1;
var ctx2, canvasRef2, canvas2;
var buffer, bufferCanvas;

var container, stats, info,textnode;

var camera, scene, renderer;
var group;
var groupArray = new Array();

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var texture1, texture2;
var planeMultiplier = 1.6;



//////////////////////
window.onload = init;
//window.onload = user_init;

function init() {

    if(!updateTextures){
        document.getElementById("canvasHolder").style.height = "auto";
        document.getElementById("canvasHolder").style.visibility = "visible";
        //document.getElementById("canvas").width = 1700;
        //document.getElementById("canvas").height = 1200;
    }

    canvas1 = document.getElementById('canvas');
    ctx1 = canvas.getContext("2d");
    canvas2 = document.getElementById('canvas2');
    ctx2 = canvas2.getContext("2d");
    bufferCanvas = document.getElementById('buffer');
    buffer = bufferCanvas.getContext("2d");

    w = canvas1.width;
    h = canvas1.height;


    gameColumns = Math.floor(w / gameWidth);
    gameRows = Math.floor(h / gameWidth / 2);
    gameCountLimit = gameColumns * gameRows;

    ctx1.fillStyle = "rgba(255,255,255,.1)";
    ctx2.fillStyle = "rgba(255,255,255,.1)";
    //ctx.fillRect(0, 0, w, h);
    ctx1.save();
    ctx2.save();

    document.addEventListener('keydown', onDocumentKeyDown, false);
    

    if(updateTextures) {
        init3D();

        // For the 3D scene
        animate();

        // Set the mouse controls
        setControls();
    }

    //***********************//
    //initialize XOs
    initXOS(texture1);

    //***********************//
    // USERS
    //user_init();
}

// Setup 3D
function init3D() {

    container = document.createElement('div');

    info = document.createElement('div');

    document.body.appendChild(container);
    document.body.appendChild(info);
    textnode = document.createTextNode("notes"); 
    container.appendChild(info);
    info.appendChild(textnode);

    info.style.backgroundColor = "blue";
    info.style.color = "white";
    info.style.width = "auto";
    info.style.height = "20px";
    textnode.nodeValue = "Foo";

    //document.getElementById("canvasHolder").appendChild(container);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 6200);
    // Lower z brings camera closer to center ....
    camera.position.set(0, 0, 2500);
    camera.position.set(700, -700, 1900);

    camera.rotateX = 37 /180*Math.PI;
    camera.rotateY = 15 /180*Math.PI;
    camera.rotateZ = -11 /180*Math.PI;

    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x808080));

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    var planeXRotation = 0;

    for (var i = 0; i < 2; i++) {
        var group = new THREE.Group();
        group.position.x = 1400;
        group.position.y = 1900;
        group.position.z = 1200;
        // Rotates the plane to start
        group.rotateX(-planeXRotation / 180 * Math.PI);
        group.rotateY(20/ 180 * Math.PI);
        scene.add(group);
        groupArray.push(group);
    }

    // Put the second plane in opposite rotation
    //groupArray[1].rotateX(60 / 180 * Math.PI);
    //groupArray[0].position.z = 900;
    groupArray[0].position.y = -800;
    //////////////////////////////////////////

    texture1 = createCanvasTexture(canvas1);
    var material1 = createCanvasMaterial(texture1, true);
    createPlane(material1, groupArray[0]);
    //groupArray[0].rotateX(-90 / 180 * Math.PI);

    texture2 = createCanvasTexture(canvas1);
    var material2 = createCanvasMaterial(texture2, true);
    //createSphere(material2, groupArray[1])

    //createNURB(texture2, material2, groupArray[1], true);

    //////////////////////////
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

}

// Texture uses the drawing canvas

function createCanvasTexture(canvasRef) {
    var texture = new THREE.Texture(canvasRef);
    texture.needsUpdate = true;

    var map = texture;
    //map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.wrapS = map.wrapT = THREE.ClampToEdgeWrapping;
    map.minFilter = THREE.NearestFilter;
    map.anisotropy = 16;
    return texture;
}

// Material is made from texture

function createCanvasMaterial(texture, trnsp) {
    var material1 = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    material1.transparent = trnsp;
    return material1;
}

function createSphere(material, group) {
    // Sphere test
    // SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    var geometry = new THREE.SphereGeometry(canvas2.width / 1.2,4, 4, Math.PI * 0, Math.PI * 2);
    var sphereMesh = new THREE.Mesh(geometry, material);
    group.add(sphereMesh);
}

// Apply canvas material to planes

function createPlane(material, group) {
    //////////////////////////////////////////
    // PLANE //
    var pg = new THREE.PlaneBufferGeometry(canvas.width * planeMultiplier, canvas.height * planeMultiplier );
    mesh1 = new THREE.Mesh(pg, material);
    mesh1.position.set(0, 0, 0);
    //scene.add(mesh1);
    group.add(mesh1);
}

function createNURB(texture, material, group, trnsp) {
    //////////////////////////////////////////
    // NURBS surface

    var nsControlPoints = [
        [new THREE.Vector4(-200, -300, 100, 2), new THREE.Vector4(-200, -100, -200, 1), new THREE.Vector4(-200, 100, 250, 1), new THREE.Vector4(-200, 200, -100, 1)],
        [new THREE.Vector4(100, -300, 0, 1), new THREE.Vector4(0, -100, -100, 5), new THREE.Vector4(0, 100, 150, 5), new THREE.Vector4(0, 200, 100, 1)],
        [new THREE.Vector4(200, -200, -100, 1), new THREE.Vector4(200, -100, 200, 1), new THREE.Vector4(200, 100, -250, 1), new THREE.Vector4(200, 200, 100, 1)]
    ];
    var degree1 = 2;
    var degree2 = 3;
    var knots1 = [0, 0, 0, 1, 1, 1];
    var knots2 = [0, 0, 0, 0, 1, 1, 1, 1];
    var nurbsSurface = new THREE.NURBSSurface(degree1, degree2, knots1, knots2, nsControlPoints);

    var map; // = THREE.ImageUtils.loadTexture('textures/s2.png');
    map = texture;

    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };

    var geometry = new THREE.ParametricGeometry(getSurfacePoint, 20, 20);
    var material = new THREE.MeshLambertMaterial({
        map: map,
        side: THREE.DoubleSide,
        transparent: trnsp
    });
    var object = new THREE.Mesh(geometry, material);
    object.position.set(-2, 10, 0);
    object.scale.multiplyScalar(14);
    group.add(object);
}

function traceLines() {
    // trace line
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = .8;

    prevX = prevY = 0;
    currX = canvas.width;
    currY = canvas.height;

    //ctx.shadowColor = 'blue';
    //ctx.shadowBlur = 3;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.moveTo(prevX, currY);
    ctx.lineTo(currX, prevY);
    ctx.stroke();
}

function setControls() {

    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //
    window.addEventListener('resize', onWindowResize, false);
    //
}

function startDrawingTimer() {
    tmr = setInterval(function() {
        draw();
    }, 3);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentKeyDown(event) {
    console.log(event.keyCode);
    // 40 down
    // 38 up
    // 39 right
    // 37 left

    if (event.keyCode == 40) {
        //camera.position.y +=100;
    }

    // s is pressed
    if (event.keyCode == 83) {
        dl();
    }
    
    // w is pressed a
    if (event.keyCode == 87) {
        //this.location.reload();
        reDrawCanvas();
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    //group.rotation.y += (targetRotation - group.rotation.y ) * 0.05;
    renderer.render(scene, camera);
    var nodeValue = " (x,y,z) ";
    nodeValue += Math.round(camera.position.x) + "," + Math.round(camera.position.y)  + "," + Math.round(camera.position.z);
    nodeValue += " rotation (x,y,z) ";
    nodeValue += Math.round(camera.rotation.x * 180 / Math.PI);
    nodeValue += ",";
    nodeValue += Math.round(camera.rotation.y * 180 / Math.PI);    
    nodeValue += ",";
    nodeValue += Math.round(camera.rotation.z * 180 / Math.PI);
    textnode.nodeValue = nodeValue ;
}

function dl() {
    if(updateTextures) {
        imgDl = renderer.domElement.toDataURL();
    } else {
        imgDl = canvas1.toDataURL("image/jpg");
    }
    
    window.open(imgDl, "image.png");
}