var doLoop = true;
var nextProject = "../drawing/index.html";
window.addEventListener("keydown", toggleLoopTimer, true);

function toggleLoopTimer(e) {
	if (e.keyCode == 32) {
		window.location = (nextProject);
	} else {
		doLoop = (doLoop) ? false : true;
	}
}