// completed January 9th 2018 4:11 PM

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//optional: add lives, special effects (increase/decrease size, extra lives, bonus points)
//optional: slow motion/ethereal ball (slow down, arrow key controls or smth)

// variables
var stork, fly, lift, gravity, maxVelocity;
var planes, speed, spawnSpeed, minSize, maxSize, planeCount;
var frameid, floor, score, level, levelUp, spawner, state = 0;

var colours = ['#FF4242', '#FFA035', '#CAB7FF', '#ABEA70', '#3FCCFF', '#FF4242'];
var messages = ["You Win!", "Don't touch the boxes!", "Don't touch the walls!", ""];

// initialization
function init() {
	fly = false;
	lift = 10;
	gravity = 0.5;
	maxVelocity = 20;

	planes = [];
	speed = 9;
	spawnSpeed = [1200, 900, 600, 400, 300];

	floor = 72;
	score  = 0;
	level = 1;
	levelUp = [0, 10, 30, 75, 125, 200];

	minSize = 30;
	maxSize = 50;
	planeCount = 0;

	var storkSize = 28;
	stork = new Stork(storkSize);
}

function start() {
	init();
	setSpawn();
	animate();
}

// keypress listener spacebar
addEventListener('keypress', function(e) {
	if (e.keyCode == 32) {
		if (state == 1) {
			state = 2;
			start();
		} else if (state == 3 || state == 4 || state == 5) {
			state = 1;
			init();
			pre();
		} else {
			fly = true;
		}
	}
});

addEventListener('resize', function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

addEventListener('click', function(e) {
	if (state == 0 || state == 3 || state == 4 || state == 5) {
		if (e.x > (innerWidth / 2) - 150 && e.x < (innerWidth / 2) + 150) {
			if (e.y > (innerHeight / 2) + (floor / 2) && e.y < (innerHeight / 2) + (floor / 2) + 100) {
				state = 1;
				init();
				pre();
			}
		}
	}
});

// stork class
function Stork(radius) {
	this.x = innerWidth / 10;
	this.y = (innerHeight / 2) + floor ;
	this.dy = -lift;
	this.radius = radius;

	// update ball variables
	this.tick = function() {

		// if dy greater than max velocity, cap it
		if (Math.abs(this.dy) > maxVelocity) {
			this.dy = (this.dy > 0 ? 1 : -1) * maxVelocity;
		}

		// if space bar pressed, increase dy
		if (fly) {
			this.dy = (this.dy < 0 ? this.dy - lift : -lift);
			fly = false;
		}

		// update variables
		this.dy += gravity;
		this.y += this.dy;

		// if it hits the ceiling or floor, end game
		if (this.y - this.radius < floor || this.y + this.radius > innerHeight) {

			// keep ball within the map
			if (this.y - this.radius < floor) {
				this.y = floor + this.radius;
			} else if (this.y + this.radius > innerHeight) {
				this.y = innerHeight - this.radius;
			}

			this.dy = 0;
			state = 5;
		}
	}

	// draws the ball onto the canvas
	this.render = function() {
		c.beginPath();
		// c.rect(this.x, this.y, this.radius, this.radius);
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.fillStyle = "#2F2F2F";
		c.fill();
	}
}

// airplane class
function Airplane(y, size, colour) {
	this.x = innerWidth + 100;
	this.y = y - minSize;
	this.size = size;
	this.colour = colour;

	// update box variables
	this.tick = function() {
		this.x -= speed;
	}

	// draws the box onto the canvas
	this.render = function() {
		c.beginPath();
		c.rect(this.x, this.y, this.size, this.size);
		c.fillStyle = this.colour;
		c.fill();
	}
}

// CREDIT: STACKOVERFLOW
// return true if the rectangle and circle are colliding
function intersectRectCircle(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

// collision checking
function checkCollision() {
	for (plane of planes) {
		if (plane.x > stork.x + 120) {
			continue;
		} else {
			var circle = {x: stork.x, y: stork.y, r: stork.radius};
			var rect = {x: plane.x, y: plane.y, w: plane.size, h: plane.size};
			if (intersectRectCircle(circle, rect)) {
				state = 4;
			}
		}
	} 
}

// sets a spawner for spawning obstacles
function setSpawn() {
	if (spawner != undefined) {
		clearInterval(spawner);
	}

	// sets interval for spawning
	spawner = setInterval(function() {

		// chooses y location for spawning, random size, and the level colour of the box
		var min = floor + minSize + maxSize;
		var max = innerHeight - minSize - maxSize - min;
		var spawnLocation = (Math.random() * max) + min;
		var planeSize = (Math.random() * maxSize) + minSize;

		// add new plane to list of planes

		if (planeCount < 200) {
			planes.push(new Airplane(spawnLocation, planeSize, colours[level - 1]));
			planeCount += 1;
		}

	}, spawnSpeed[level - 1]);
}

// checks if the user meets conditions for victory or levelup
function checkLevel() {

	// check if score meets level up requirement
	if (score >= levelUp[level]) {
		level += 1;

		// check game end
		if (level > 5) {
			state = 3;
		} else {
			speed += 1;
			setSpawn();
		}
	}
}

// recycles airplanes
function recyclePlanes() {
	for (var i=planes.length-1; i>=0; i--) {
		if (planes[i].x < -100 ) {
			planes.splice(i, 1);
			score += 1;
		}
	}
}

// draws background and ceiling
function renderMap() {
	// background
	c.beginPath();
	c.rect(0, 0, innerWidth, innerHeight);
	c.fillStyle = "#FAFAFA";
	c.fill();

	// score bar
	c.beginPath();
	c.rect(0, 0, innerWidth, floor);
	c.fillStyle = colours[level - 1];
	c.fill();
}

// updates and draws the top bar
function updateScore() {
	var pole = innerWidth / 4;
	var font = '32px Pacifico';
	var colour = "#FAFAFA";

	c.beginPath();
	c.font = font;
	c.fillStyle = colour;
	c.textAlign = 'center';
	c.fillText('Level ' + level, pole, (floor / 2) + 12);

	c.beginPath();
	c.font = font;
	c.fillStyle = colour;
	c.textAlign = 'center';
	c.fillText(score, pole * 2, (floor / 2) + 12);

	c.beginPath();
	c.font = font;
	c.fillStyle = colour;
	c.textAlign = 'center';
	c.fillText('Next Level: ' + levelUp[level], pole * 3, (floor / 2) + 12);
}

// ticks all things in game
function tick() {
	stork.tick();

	for (var plane of planes) {
		plane.tick();
	}

	checkCollision();
	recyclePlanes();
	checkLevel();
}

// renders all things in game
function render() {
	renderMap();
	updateScore();

	stork.render();

	for (var plane of planes) {
		plane.render();
	}
}

function gameEnd() {
	requestAnimationFrame(gameEnd);

	// background
	c.beginPath();
	c.rect(0, 0, innerWidth, innerHeight);
	c.fillStyle = "#FAFAFA";
	c.fill();

	// score bar
	c.beginPath();
	c.rect(0, 0, innerWidth, floor);
	c.fillStyle = colours[level - 1];
	c.fill();

	c.beginPath();
	c.font = '100px Pacifico';
	c.fillStyle = colours[level -1];
	c.textAlign = 'center';
	c.fillText(messages[state - 3], innerWidth / 2, (innerHeight / 2) - (floor / 2));

	c.beginPath();
	c.rect((innerWidth / 2) - 150, (innerHeight / 2) + (floor / 2), 300, 100);
	c.fillStyle = colours[level -1];
	c.fill();

	c.beginPath();
	c.font = (floor / 1.5) + 'px Pacifico';
	c.fillStyle = "#FAFAFA";
	c.textAlign = 'center';
	c.fillText((state == 3 ? 'play again' : 'try again'), innerWidth / 2, (innerHeight / 2) + floor + (floor / 2.5));

	c.beginPath();
	c.font = '48px Pacifico';
	c.fillStyle = colours[level -1];
	c.textAlign = 'center';
	c.fillText("Score: " + score, innerWidth / 2, (innerHeight) - floor);
}

// before game start screen
function pre() {
	requestAnimationFrame(pre);

	//code for pregame screen
	renderMap();
	updateScore();
	stork.render();

	// text
	c.beginPath();
	c.font = '60px Pacifico';
	c.fillStyle = colours[level -1];
	c.textAlign = 'center';
	c.fillText("Press Spacebar to jump", (innerWidth / 3) * 2, innerHeight / 2 + (floor / 2));
}

// main loop
function animate() {
	if (state == 2) {
		requestAnimationFrame(animate);
		console.log(state);
	} else {
		requestAnimationFrame(gameEnd);
		console.log(state);
	}

	tick();
	render();
}

// title screen
function main() {
	requestAnimationFrame(main);
	console.log(state);

	// background
	c.beginPath();
	c.rect(0, 0, innerWidth, innerHeight);
	c.fillStyle = "#FAFAFA";
	c.fill();

	// score bar
	c.beginPath();
	c.rect(0, 0, innerWidth, floor);
	c.fillStyle = colours[level - 1];
	c.fill();

	// title
	c.beginPath();
	c.font = '100px Pacifico';
	c.fillStyle = colours[level -1];
	c.textAlign = 'center';
	c.fillText("Balls & Boxes", innerWidth / 2, (innerHeight / 2) - (floor / 2));

	c.beginPath();
	c.rect((innerWidth / 2) - 150, (innerHeight / 2) + (floor / 2), 300, 100);
	c.fillStyle = colours[level -1];
	c.fill();

	// start button
	c.beginPath();
	c.font = (floor / 1.5) + 'px Pacifico';
	c.fillStyle = "#FAFAFA";
	c.textAlign = 'center';
	c.fillText("start", innerWidth / 2, (innerHeight / 2) + floor + (floor / 2.5));
}

init();
main();