$(function(){
	$("#nav-placeholder").load("/navbar/navbar.html");
});

// inital time variable
let initialTime = 0;
let curTime = 0;
let dt = 0;

// scale of all objects
let xWidth = 10;
let yWidth = 18;
let objScale = window.innerHeight/yWidth;

// canvas width and height
let canvasWidth = xWidth*objScale;
let canvasHeight = yWidth*objScale;

// initial circle variables
let xInit = 3*objScale;
let yInit = 15*objScale;
let radiusInit = 0.5*objScale;

let yVelocityInit = 15;

// displayVariables
let pauseAnim = false;
let showX = true;
let showGhosts = false;

// circle object
let circle = {};

// hammer image
let img;

// html elements
let playButton, skipBackwardButton, skipForwardButton, resetButton, showXButton, showGhostsButton, info, answer;

function preload() {
	img = loadImage('../images/hammer.png');
}

function setup() {
	initialTime = Date.now();
	curTime = Date.now();

	circle = {x: xInit, y: yInit, radius: radiusInit, xVelocity: 0, yVelocity: yVelocityInit, xOffset: -6, yOffset: 3};

	let canvas = createCanvas(canvasWidth, canvasHeight)
		.parent('canvas-parent');

	skipBackwardButton = createButton(createIcon('media-step-backward'))
		.parent('button-bar')
		.class('icon-button action-button')
		.mousePressed(skipBack);

	playButton = createButton(createIcon('media-pause'))
		.parent('button-bar')
		.class("icon-button action-button")
		.mousePressed(togglePause);

	skipForwardButton = createButton(createIcon('media-step-forward'))
		.parent('button-bar')
		.class('icon-button action-button')
		.mousePressed(skipForward);

	resetButton = createButton(createIcon('reload'))
		.parent('button-bar')
		.class('icon-button action-button')
		.mousePressed(resetCircleObject);

	showXButton = createButton('Hide X')
		.parent('button-bar')
		.class("toggleButton")
		.mousePressed(toggleShowX);

	showGhostsButton = createButton('Show Ghosts')
		.parent('button-bar')
		.class("toggleButton")
		.mousePressed(toggleGhosts);

	info = createDiv('What is the initial velocity of the ball?')
		.parent('content');

	answer = createDiv(`
			Enter Answer: <input class="form-control answerInput" id="answer"/> m/s [up]
			<button class="toggleButton answerSubmitBtn" onClick="checkAnswer()">Submit</button>
		`)
		.class("answerText")
		.parent('content');


	info.class("info");

	frameRate(60);
}

function checkAnswer() {
	let answerValue = select('#answer').value();
	let answerNumber = 15;

	if(parseInt(answerValue) === answerNumber) {
		$('#modal-title').html("Correct!");
		$('#modal-body').html("15 m/s [up] is the correct answer. Acceleration due to gravity (-9.81 m/s²) causes this velocity to change over time.");
	}
	else {
		$('#modal-title').html("Incorrect!");
		$('#modal-body').html("Try using the 'show ghosts' button to determine where the object is after every 1 second. Also analyze the maximum height reached by the hammer (gravity is the only force causing acceleration).");
	}

	$('#answerModal').modal('toggle');
}

function skipBack() {
	let skipTime = 0.1;
	if(pauseAnim)
	{
		dt -= skipTime;
		circle.x = xPositionAtTime(xInit, circle.xVelocity, dt);
		if(circle.x < xPositionAtTime(xInit, circle.xVelocity, 0)) {
			resetCircleObject();
		}

		circle.y = yPositionAtTime(yInit, yVelocityInit*objScale, dt);
		if(circle.y > yPositionAtTime(yInit, yVelocityInit*objScale, 0)) {
			resetCircleObject();
		}
	}
	else
		initialTime += skipTime*1000;
}

function skipForward() {
	let skipTime = 0.1;
	if(pauseAnim) {
		dt += skipTime;

		circle.y = yPositionAtTime(yInit, yVelocityInit*objScale, dt);
	}
	else
		initialTime -= skipTime*1000;
}

function toggleGhosts() {
	showGhosts = !showGhosts;

	if(showGhosts) {
		showGhostsButton.html('Hide Ghosts');
	}
	else {
		showGhostsButton.html('Show Ghosts');
	}
}

function togglePause() {
	pauseAnim = !pauseAnim;

	if(pauseAnim) {
		playButton.html(createIcon('media-play'));
	}
	else {
		playButton.html(createIcon('media-pause'));
	}
}

function toggleShowX() {
	showX = !showX;

	if(showX) {
		showXButton.html('Hide X');
	}
	else {
		showXButton.html('Show X');
	}
}

function draw() {
	clear();

	curTime = Date.now();

	if(pauseAnim) {
		initialTime = curTime - dt*1000;
	}
	else {
		dt = (curTime-initialTime)/1000;
		circle.x = xPositionAtTime(xInit, circle.xVelocity, dt);
		circle.y = yPositionAtTime(yInit, yVelocityInit*objScale, dt);
	}

	drawGridLines(5, 15);
	drawCircleObject();

	if(showGhosts) {
		drawGhosts();
	}

	drawPositionAtMouse();
	drawTime();
}


function drawTime() {
	stroke(51);
	strokeWeight(1);
	textSize(32);
	fill(150, 20, 150);
	text("Time: " + dt.toFixed(2) + " seconds", 20, 40);
}

function drawGhosts() {
	strokeWeight(0);
	fill(255, 100, 100, 70);

	for(var i = 0; i < 12; i++) {
		//let ghostY = yPositionAtTime(yInit, yVelocityInit*objScale, i);
		let ghostY = yPositionAtTime(yInit, yVelocityInit*objScale, i);

		if(circle.y < ghostY)
			ellipse(circle.x, ghostY, circle.radius, circle.radius);
	}
}

function drawPositionAtMouse() {
	let x = (1+circle.xOffset+(mouseX/objScale)).toFixed(2);			// to make start x at -3
	let y = (12+circle.yOffset+-1*(mouseY/objScale)).toFixed(2);		// to make start y at 0 and yscale flipped

	if(mouseX != 0 && mouseY !=0) {
		stroke(51);
		strokeWeight(1);
		textSize(32);
		fill(100, 100, 255);
		text("(" + x + ", " + y + ")", mouseX, mouseY);
	}
}

function xPositionAtTime(x0, xVelocity, dt) {
	return x0+xVelocity*dt;
}

function yPositionAtTime(y0, yVelInit, dt) {
	return yInit - yVelInit*dt + 9.8*0.5*Math.pow(dt, 2)*objScale;
}

function drawGridLines(originX, originY) {
	for(let i = 0; i <= canvasWidth; i+=objScale) {
		if(Math.round(i) === Math.round(originX*objScale)) {
			strokeWeight(6);
			stroke(51);
		}
		else {
			strokeWeight(1);
			stroke(51);
		}
		line(i, 0, i, canvasHeight);
	}

	for(let i = 0; i < canvasHeight; i+=objScale) {
		if(Math.round(i) === Math.round(originY*objScale)) {
			strokeWeight(6);
			stroke(51);
		}
		else {
			strokeWeight(1);
			stroke(51);
		}
		line(0, i, canvasWidth, i);
	}
}

function drawCircleObject() {
	stroke(51);
	strokeWeight(1);

	if(circle.x > canvasWidth) {	// reset position if at max width of screen
		resetCircleObject();
	}

	if(circle.y > yInit) {	// reset position if at max width of screen
		resetCircleObject();
	}

	if(showX) {
		textSize(32);
		let x = (1+circle.xOffset+(circle.x/objScale)).toFixed(2);			// to make start x at -3
		let y = (12+circle.yOffset+-1*(circle.y/objScale)).toFixed(2);		// to make start y at 0 and yscale flipped
		fill(0, 0, 0);
		text("(" + x + ", " + y + ")", circle.x-circle.radius*1.6, circle.y-circle.radius);
	}

	fill(255, 100, 100);
	//ellipse(circle.x, circle.y, circle.radius, circle.radius);
	image(img, circle.x-circle.radius, circle.y-circle.radius, circle.radius*2, circle.radius*2);
}

function resetCircleObject() {
	circle.x = xInit;
	circle.y = yInit;
	initialTime = Date.now();
	curTime = Date.now();
	dt = 0;
}

function getTruePosition(position) {
	return position*objScale;
}