var NMAX = 200, MMAX = 200;
var startx = 0, starty = 0;
var stopx = NMAX - 1, stopy = MMAX - 1;
var map = new Array(NMAX);
var front, end, queuex = new Array(NMAX * MMAX + 1), queuey = new Array(NMAX * MMAX + 1);
//initializez matricea:
//1 = obstacol.

var logMap = function () {
	for (var i = 0; i < NMAX; i++) console.log (map[i]);
}

var choose = function () {
	var x = Math.random ();
	if (x > 0.3) return 0; // better formula will be added
	else return -1;
};

var generate = function() {
	for (var i = 0; i < NMAX; i++) {
		map[i] = new Array (MMAX);
		for (var j = 0; j < MMAX; j++) {
			map[i][j] = choose ();
		}
	}
	map[startx][starty] = 0;
	map[stopx][stopy] = 0;
}


//Queue.push ()
var push = function (x, y) {
	end++;
	queuex[end] = x;
	queuey[end] = y;
}


var inside = function (x, y) {
	if (x < 0) return false;
	if (x >= NMAX) return false;
	if (y < 0) return false;
	if (y >= MMAX) return false;
	return true;
}

var Lee = function () {
	front = 1;
	end = 0;
	push (startx, starty);
	map[startx][starty] = 1;
	var x, y;
	var done = false;
	while (front <= end && !done) {
		x = queuex[front];
		y = queuey[front];
		front++;
		if (inside (x - 1, y) && map[x - 1][y] == 0) {
			push (x - 1, y);
			map[x - 1][y] = map[x][y] + 1;
			//console.log (map[x - 1][y]);
			if (x - 1 == stopx && y == stopy) done = true;
		}
		if (inside (x + 1, y) && map[x + 1][y] == 0) {
			push (x + 1, y);
			map[x + 1][y] = map[x][y] + 1;
			//console.log (map[x + 1][y])
			if (x + 1 == stopx && y == stopy) done = true;
		}
		if (inside (x, y - 1) && map[x][y - 1] == 0) {
			push (x, y - 1);
			map[x][y - 1] = map[x][y] + 1;
			//console.log (map[x][y - 1])
			if (x == stopx && y - 1 == stopy) done = true;
		}
		if (inside (x, y + 1) && map[x][y + 1] == 0) {
			push (x, y + 1);
			map[x][y + 1] = map[x][y] + 1;
			//console.log (map[x][y + 1]);
			if (x == stopx && y + 1 == stopy) done = true;
		}
	}
}

var generateMap = function () {
	var done = false;
	while (!done) {
		generate ();
		Lee ();
		if (map[stopx][stopy] != 0) done = true;
	}
}

generateMap ();
logMap ();