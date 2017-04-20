function makeRandom(c, lim) {
	var count, r, a;
	a = new Array();
	count = 0;
	a[0] = Math.ceil(Math.random() * lim);
	var match = true;
	while (c < lim) {
		count++;
		if (count > 300) {
			console.log("over");
			break;
		}
		r = Math.ceil(Math.random() * lim);
		for (var x = 0; x < a.length; x++) {
			if (r == a[x]) {
				match = true;
				break;
			} else {
				match = false;
			}
		}
		if (match == false) {
			a.push(r);
			c++;
		}
	}
	return a;
}
