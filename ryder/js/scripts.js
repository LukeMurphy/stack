var path = "/projects/stack/ryder"
var img = "/img/race_track_scale.jpg"
var thumb = "/img/race_track.jpg"
var container, imgObj
var fullImg = new Image()

/**
 * the calculated distance in pixels based on screen width and resolution of screen
 */
var distanceInPixels = 0;

/**
 * Pixels per inch  - from configuration
 */
var ppi = 72 ;

/**
 * set in config: The actual physical width of the screen
 */
var screenWidthInches = 20.34;

/**
 * total running time in milli seconds for the piece to travel
 */
var duration = 131200;

/**
 * One mile in inches
 */
var distanceInInches = 63360;

/**
 * Number of markers  (furlongs)
 */
var markerNumber = 8;

/**
 * set in config  - width of display in pixels
 */
var movieWidth = 1600;

/**
 * set in config  - height of display
 */
var movieHeight = 1200;
		
/**
 * Smooths the output of the banding
 */
var useBlur 	= true;

/**
 * Modifies the color of the banding
 */
var useColor = false;

/**
 * Used in title disply
 */
var titleViewTime = 8000;

/**
 * Delay before piece is restarted
 */
var pauseBeforeRestartTime = 4000;

/**
 * If set, calculate width and height based on 4:3
*/
var useDiagonal = 0;

/**
 * The text displayed
 */
var titleText = "The Longest Painting of Death \n<hr /><br />" + 
				"The Race Track (Death on a Pale Horse c.1896) " + 
				"by Albert Pinkham Ryder\n<br />" + 
				"27 3/4\" x 35 1/8\", stretched across " + 
				"1 mile of pixels and traversed in 2 minutes, 11.2 seconds, \n" + 
				"the average speed of Secretariat.<br /><br />";

/**
 * Fullscreen
 */

var startPosition;
var startTime;
var currentTime;

var durationInSeconds = 131200
var duration;
var distanceInches = 63360
var distanceTraveled = 0
var stepSize = 20;
var timer;
var windowWidth = 800
var speed
var delay = 10 // milliseconds
var container, titleContainer;

function setTitle() {
	var titleDiv = document.createElement('div');
	titleContainer = document.getElementById("titleContainer");
	titleContainer.appendChild(titleDiv);
	titleDiv.style.textColor = "#ffffff";
	titleDiv.innerHTML = titleText;

	var imgThumb = new Image();
	imgThumb.src = path + thumb;
	titleContainer.appendChild(imgThumb);

	showTitle();
}

function showTitle() {
	imgObj.style.visibility = "hidden";
	titleContainer.style.visibility = "visible";
	var t = setTimeout(start, titleViewTime)
}

function init() {
	fullImg.src = path + img;
	fullImg.id = "ptg"
	fullImg.onload = setUp;
}

function setUp() {
	var metaTag=document.createElement('meta');
	metaTag.name = "viewport"
	metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
	document.getElementsByTagName('head')[0].appendChild(metaTag);
	viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	
	container = document.getElementById("mainContainer");
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
	container.style.width = windowWidth+"px";
	container.style.height = windowHeight+"px";
	fullImg.height = windowHeight

	// i.e. "in general" 1px = 1/96th of an inch
	ppi = 96
	distanceInPixels = (distanceInches * ppi) 

	fullImg.width = distanceInPixels
	container.appendChild(fullImg);
	imgObj = document.getElementById("ptg");
	imgObj.style.position= 'relative'; 
	imgObj.style.left = "0px";
	//imgObj.style.top = "-2400px";


	//console.log(window.matchMedia("(min-width:" + windowWidth + "px)"))

	/* Debug */
	//durationInSeconds = 8;
	//duration = durationInSeconds * 1000;
  
  	// speed will be the number of pixels traveled for every
  	// delay period: so if the delay is 10ms, then there are 100 
  	// steps to take  per second to make the total travel
  	// speed of the distanceInPixels / duration 
  	
	speed = distanceInPixels  / (duration / delay)

	// The problem is that the faster the timing, the more
	// the screen has to redraw which slows the cpu down
	// so need a way to "catch up" every second to where the 
	// the viewer should be....

	//console.log(speed);

	setTitle();
}

function start() {
	titleContainer.style.visibility = "hidden";
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
	container.style.width = windowWidth+"px";
	container.style.height = windowHeight+"px";
	fullImg.height = windowHeight
	imgObj.style.visibility = "visible";
	var realDate = new Date();
	startTime = realDate.getTime();
	doTimer();
}

function travel() {
	imgObj.style.left = distanceTraveled + "px"

	// This doesn't work in a practical way
	// distanceTraveled -= speed

	// Better to use Where should we be?
	var realDate = new Date();
	realTime = realDate.getTime();
	delta = (realTime - startTime);
	shouldBeAt = delta / delay * speed
	distanceTraveled = -shouldBeAt

	if (-distanceTraveled < distanceInPixels - windowWidth ) {
		doTimer();
	} else {
		clearTimeout(timer);
		var realDate = new Date();
		realTime = realDate.getTime();
		console.log((realTime - startTime)/1000);
		var t = setTimeout(showTitle, pauseBeforeRestartTime)
	}
}

function doTimer() {
	timer = setTimeout(travel,delay);
}


window.onload = init