var initialTime = 0;
var scale = 100;

var initX = -3*scale;
var initY = 0*scale;
var x = initX;
var y = initY;

var radius = 1*scale;
var canvasWidth = 15*scale;
var canvasHeight = 10*scale;
var maxX = canvasWidth - 1*scale - canvasWidth/2;

function init() {
  initialTime = Date.now();
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('canvas1').getContext('2d');
  var canvas = document.getElementById('canvas1');
  canvas.width  = canvasWidth;
  canvas.height = canvasHeight;

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  var curTime = Date.now();

  var dt = (curTime - initialTime)/1000;            // get delta time in seconds

  // drawing part
  ctx.beginPath();
  ctx.arc(convertCartesianX(x, canvasWidth), convertCartesianY(y, canvasHeight), radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'red';
  ctx.fill();

  x = initX + 2*dt*scale; // xf = x0 + vt

  if(x > maxX) {
    resetPosition();
  }

  window.requestAnimationFrame(draw);
}

function resetPosition() {
  x = initX;
  y = initY;
  initialTime = Date.now();
}

function convertCartesianX(x, width) {
  return width/2 + x;
}

function convertCartesianY(y, height) {
  console.log(height/2 + y)
  return height/2 + y;
}

init();