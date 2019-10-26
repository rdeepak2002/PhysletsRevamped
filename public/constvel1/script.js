$(function(){
  $("#nav-placeholder").load("/navbar/navbar.html");
});

$(function(){
  $("#nav-placeholder").load("/navbar/navbar.html");
});

var initialTime = 0;

function setup() {
  initialTime = Date.now();

  let canvas = createCanvas(window.innerWidth, window.innerHeight*.7);
  canvas.parent('canvas-parent');
  let info = createDiv('Find the velocity of the object.');
}

function draw() {
  background(230);
}

// var canvas = document.getElementById('canvas1');

// var showXCoordinate = true;
// var ghostObject = true;

// var initialTime = 0;
// var scale = 50;

// var initX = -3*scale;
// var initY = 0*scale;
// var x = initX;
// var y = initY;

// var radius = 0.5*scale;
// var canvasWidth = 15*scale;
// var canvasHeight = 10*scale;
// var maxX = canvasWidth - 1*scale - canvasWidth/2;

// var canvasPos = getPosition(canvas);
// var mouseX = -100;
// var mouseY = -100;

// function init() {
//   canvas.width  = canvasWidth;
//   canvas.height = canvasHeight;
//   canvas.addEventListener("mousemove", setMousePosition, false);
//   initialTime = Date.now();
//   window.requestAnimationFrame(draw);
// }

// function draw() {
//   var ctx = document.getElementById('canvas1').getContext('2d');

//   ctx.globalCompositeOperation = 'destination-over';
//   ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

//   var curTime = Date.now();

//   var dt = (curTime - initialTime)/1000;            // get delta time in seconds

//   // drawing at mouse position
//   ctx.font = "30px Comic Sans MS";
//   ctx.fillStyle = "blue";
//   ctx.textAlign = "center";
//   ctx.fillText("(" + (mouseX/scale-4).toFixed(2) + ", " + (-1*mouseY/scale+8).toFixed(2) + ")", mouseX, mouseY);

//   // drawing circle and possibly its x coordinate
//   if(showXCoordinate == true) {
//     ctx.font = "30px Comic Sans MS";
//     ctx.fillStyle = "blue";
//     ctx.textAlign = "center";
//     var xPosText = (convertCartesianX(x, canvasWidth)/scale-8+0.5).toFixed(2);
//     console.log(xPosText);
//     ctx.fillText(xPosText, convertCartesianX(x-radius/2, canvasWidth), convertCartesianY(y, canvasHeight));
//   }

//   ctx.beginPath();
//   ctx.arc(convertCartesianX(x-radius/2, canvasWidth), convertCartesianY(y, canvasHeight), radius, 0, 2 * Math.PI, false);
//   ctx.fillStyle = 'red';
//   ctx.fill();

//   // drawing grid
//   for(var i = -10; i < 20; i++) {
//     ctx.beginPath();
//     ctx.moveTo(i*1*scale, 0);
//     ctx.lineTo(i*1*scale, canvasHeight);
//     ctx.stroke();
//   }

//   for(var i = -10; i < 10; i++) {
//     ctx.beginPath();
//     ctx.moveTo(0, i*1*scale);
//     ctx.lineTo(canvasWidth, i*1*scale);
//     ctx.stroke();
//   }


//   x = initX + 2*dt*scale; // xf = x0 + vt

//   if(x > maxX) {
//     resetPosition();
//   }

//   window.requestAnimationFrame(draw);
// }

// function resetPosition() {
//   x = initX;
//   y = initY;
//   initialTime = Date.now();
// }

// function convertCartesianX(x, width) {
//   return width/2 + x;
// }

// function convertCartesianY(y, height) {
//   return height/2 + y;
// }

// function setMousePosition(e) {
//   mouseX = e.clientX - canvasPos.x;
//   mouseY = e.clientY - canvasPos.y;
// }

// function getPosition(el) {
//   var xPosition = 0;
//   var yPosition = 0;
 
//   while (el) {
//     xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//     yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
//     el = el.offsetParent;
//   }
//   return {
//     x: xPosition,
//     y: yPosition
//   };
// }    

// init();