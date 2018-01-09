var canvas = document.querySelector('canvas');

//declare some canvas stuff
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var balls = [];
// var ballColours = ['#A7A5C6', '#D1D2D6', '#6D8A96', '#993955', '#C19AB7'];
var ballColours = ['#B8B8FF', '#A393FF', '#A0C7FF', '#D7B8F3', '#A8D6EA'];

var gravity = 0.05;
var bounciness = -18;
var minRadius = 24;
var maxBallSize = 50;
var maxBalls = 30;
var floor = 48;
var terminalVelocity = 70;

//mouse stuff
var mousedownID = -1;
var mouseX = 0;
var mouseY = 0;
var powerX = 0;
var powerY = 0;

//deals resizing screen
window.addEventListener('resize', function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

//captures variables from mouse movements
window.addEventListener('mousemove', function(e) {
	powerX = e.x - mouseX;
	powerY = e.y - mouseY;

	mouseX = e.x;
	mouseY = e.y;
});

//enlarges ball when mouse down
window.addEventListener('mousedown', function(e) {
	if (mousedownID == -1) {
		mousedownID = setInterval(function() {
			if (minRadius < maxBallSize) {
				minRadius += 2;
			}

		}, 20);
	}
});

//on mouseup, make a ball
var newColour = ballColours[Math.floor(Math.random() * 5)];
window.addEventListener('mouseup', function(e) {
	balls.push(new Ball(e.x, e.y, minRadius, newColour));
	minRadius = 20;
	clearInterval(mousedownID);
	newColour = ballColours[Math.floor(Math.random() * 5)];
	mousedownID = -1;
});

//shows the balls being created
function mouseBall() {
	if (mousedownID != -1) {
		c.beginPath();
		c.arc(mouseX, mouseY, minRadius, Math.PI *2, false);
		c.fillStyle = newColour;
		c.fill();
		// c.strokeStyle = '#2F2F2F';
		// c.stroke();
	}
}

//ball class
function Ball(x, y, radius, colour) {
	this.x = x;
	this.y = y;
	this.dx = powerX * 1.2;
	this.dy = powerY * 1.2;
	this.radius = radius;
	this.colour = colour;

	//updates all variables
	this.tick = function() {

		//if ball hits floor, reverse the velocity and weigh it down
		if (this.y + this.radius >= innerHeight - floor) {
			this.dy = 1.2 * (this.dy * (bounciness / radius));
		} 

		//wall checking
		if (this.y + radius > innerHeight - floor) {
			this.y = innerHeight - floor - radius;
		}

		//if ball hits either left or right wall, reverse velocity
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = 1.2 * (this.dx * (bounciness / radius));

			if (this.x + this.radius > innerWidth) {
				this.x = innerWidth - radius;
			} else if (this.x - this.radius < 0) {
				this.x = radius;
			}
		}

		//update all the variables
		this.dy += (gravity * radius);
		this.dx += ((this.dx > 0) ? -1 : 1) * (3.2 / this.radius);

		this.x += this.dx;
		this.y += this.dy;
	}

	//draws onto the canvas
	this.render = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI *2, false);
		c.fillStyle = this.colour;
		c.fill();
		// c.strokeStyle = '#3D5467'
		// c.stroke();
	}
}

//limits balls
function purgeBalls() {
	if (balls.length > maxBalls) {
		balls.splice(0, balls.length - maxBalls);
	}
}

function animate() {
	requestAnimationFrame(animate);

	c.beginPath();
	c.rect(0, 0, innerWidth, innerHeight - floor);
	c.fillStyle = '#D6E5E3';
	c.fill();

	//text
	c.font = "72px Roboto";
	c.fillStyle = '#5b76a0';
	c.textAlign = 'center';
	c.fillText("C L I C K  T O  M A K E  B A L L S", innerWidth / 2, (innerHeight - floor) / 3);

	//for every ball, tick and render
	for (var ball of balls) {
		ball.tick();
		ball.render();
	}

	mouseBall();
	purgeBalls();

	c.beginPath();
	c.rect(0, innerHeight - floor, innerWidth, innerHeight);
	c.fillStyle = '#D1D2D6';
	c.fill();
}

//start
animate();