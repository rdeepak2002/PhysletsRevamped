$(function(){
  $("#nav-placeholder").load("/navbar/navbar.html");
});

// inital time variable
var initialTime = 0;
var curTime = 0;

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
var showX = true;

// circle object
var circle = {};

function setup() {
  initialTime = Date.now();
  curTime = Date.now();

  circle = {x: xInit, y: yInit, radius: radiusInit};

  let canvas = createCanvas(canvasWidth, canvasHeight);

  canvas.parent('canvas-parent');
  let info = createDiv('Find the velocity of the object. Answer: 2 m/s');
  info.class("info");
}

function draw() {
  background(230);

  curTime = Date.now();

  var dt = (curTime-initialTime)/1000;
  circle.x = xPositionAtTime(xInit, 2*objScale, dt);

  drawPositionAtMouse();
  drawGridLines(6, 3);
	drawCircleObject();
}

function drawPositionAtMouse() {
	stroke(51);
	strokeWeight(1);
	textSize(32);
	let x = (-6+(mouseX/objScale)).toFixed(2);			// to make start x at -3
	let y = (3+-1*(mouseY/objScale)).toFixed(2);		// to make start y at 0 and yscale flipped
	if(mouseX != 0 && mouseY !=0) {
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
}

function getTruePosition(position) {
	return position*objScale;
}