$(function(){
  $("#nav-placeholder").load("/navbar/navbar.html");
});

// inital time variable
var initialTime = 0;
var curTime = 0;
var dt = 0;

// scale of all objects
var xWidth = 15;
var yWidth = 6;
var objScale = window.innerWidth/xWidth;

// canvas width and height
var canvasWidth = xWidth*objScale;
var canvasHeight = yWidth*objScale;

// initial circle variables
var xInit = 3*objScale;
var yInit = 3*objScale;
var radiusInit = 0.5*objScale;

// displayVariables
var pauseAnim = false;
var showX = true;
var showGhosts = false;

// circle object
var circle = {};

// html elements
var playButton;
var skipBackwardButton;
var skipForwardButton;
var resetButton;
var showXButton;
var showGhostsButton;
var info;

function setup() {
  initialTime = Date.now();
  curTime = Date.now();

  circle = {x: xInit, y: yInit, radius: radiusInit};

  let canvas = createCanvas(canvasWidth, canvasHeight);

  canvas.parent('canvas-parent');

  skipBackwardButton = createButton(createIcon('media-step-backward'));
  skipBackwardButton.mousePressed(skipBack);
  skipBackwardButton.class('icon-button action-button')

  playButton = createButton(createIcon('media-pause'));
  playButton.mousePressed(togglePause);
  playButton.class("icon-button action-button");

  skipForwardButton = createButton(createIcon('media-step-forward'));
  skipForwardButton.mousePressed(skipForward);
  skipForwardButton.class('icon-button action-button');

  resetButton = createButton(createIcon('reload'));
  resetButton.mousePressed(resetCircleObject);
  resetButton.class('icon-button action-button');

  showXButton = createButton('Hide X');
  showXButton.mousePressed(toggleShowX);
  showXButton.class("toggleButton");

  showGhostsButton = createButton('Show Ghosts');
  showGhostsButton.mousePressed(toggleGhosts);
  showGhostsButton.class("toggleButton");

  info = createDiv('What is the velocity of the ball?');

	answer = createDiv(`
		Enter Answer: <input class="form-control answerInput" id="answer"/> m/s [right]
		<button class="toggleButton answerSubmitBtn" onClick="checkAnswer()">Submit</button>
	`);

	answer.class("answerText");

  info.class("info");

  frameRate(60);
}

function checkAnswer() {
  let answerValue = select('#answer').value();
  let answer = 2;

  if(parseFloat(answerValue) == answer) {
		$('#modal-title').html("Correct!");
		$('#modal-body').html("2 m/s is the correct answer. Every 1 second the object moves 2 meters to the right direction.");
  }
	else {
		$('#modal-title').html("Incorrect!");
		$('#modal-body').html("Try using the 'show ghosts' button to determine where the object is after every 1 second.");
	}

	$('#answerModal').modal('toggle');
}

function skipBack() {
	let skipTime = 0.1;
	if(pauseAnim)
	{
		dt -= skipTime;
		circle.x = xPositionAtTime(xInit, 2*objScale, dt);
		if(circle.x < xPositionAtTime(xInit, 2*objScale, 0)) {
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
 		circle.x = xPositionAtTime(xInit, 2*objScale, dt);
		if(circle.x > xPositionAtTime(xInit, 2*objScale, 6.0)) {
			circle.x = xPositionAtTime(xInit, 2*objScale, 6.0);
			dt = 6.0;
		}
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
	  circle.x = xPositionAtTime(xInit, 2*objScale, dt);
  }

  drawGridLines(6, 3);
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

	for(var i = 0; i < 8; i++) {
		let ghostX = xPositionAtTime(xInit, 2*objScale, i);

		if(ghostX < circle.x) {
	  	ellipse(ghostX, circle.y, circle.radius, circle.radius);
		}
	}
}

function drawPositionAtMouse() {
	stroke(51);
	strokeWeight(1);
	textSize(32);
	let x = (-6+(mouseX/objScale)).toFixed(2);			// to make start x at -3
	let y = (3+-1*(mouseY/objScale)).toFixed(2);		// to make start y at 0 and yscale flipped
	if(mouseX != 0 && mouseY !=0) {
		fill(100, 100, 255);
		text("(" + x + ", " + y + ")", mouseX, mouseY);
	}	
}

function xPositionAtTime(x0, velocity, dt) {
	return x0+velocity*dt;
}

function drawGridLines(originX, originY) {
  for(var i = 0; i < canvasWidth; i+=objScale) {
  	if(Math.round(i) == Math.round(originX*objScale)) {
  		strokeWeight(6);
			stroke(51);
  	}
  	else {
  		strokeWeight(1);
			stroke(51);
  	}
	  line(i, 0, i, canvasHeight);
  }

  for(var i = 0; i < canvasHeight; i+=objScale) {
  	if(Math.round(i) == Math.round(originY*objScale)) {
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

  if(showX) {
  		textSize(32);
			let x = (-6+(circle.x/objScale)).toFixed(2);			// to make start x at -3
			let y = (3+-1*(circle.y/objScale)).toFixed(2);		// to make start y at 0 and yscale flipped
			fill(0, 0, 0);
			text("(" + x + ", " + y + ")", circle.x-circle.radius*1.6, circle.y-circle.radius);
  }

	fill(255, 100, 100);
  ellipse(circle.x, circle.y, circle.radius, circle.radius);
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