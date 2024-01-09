// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle = 0;
var angleSpeed = 0;
var canvas;

// wrecking Ball object and constraint variables
var wreckingBall, wreckingBallConstraint;

// CountDown variables
var seconds = 60;

////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();

  countDown();                // Calls countDown function

  setupWreckingBall();        // Calls Wrecking Ball setup function

  drawWreckingBall();         // calls Wrecking Ball draw function
}
////////////////////////////////////////////////////////////
function draw() {
  background(0);

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();

  drawWreckingBall()

  // If boxes remaining
  if(screen == 1){
    gameOver();   // Calls gameOver function
  }

  // If no boxes remaining
  if(screen == 2){
    youWon();     // Calls youWon function
  }

  // Displays Boxes left and Time remaining
  fill(255)
  textSize(15);
  text('Boxes left: ' + boxes.length, 50, 50)
  text('Time remaing: ' + seconds, 200, 50);
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here - STEP 2
    angleSpeed += 0.01        // Left arrow is pressed, the angle speed is incremented by 0.01.
    // angleSpeed += 0.1         // the grading instructions request to use 0.01, however the speed is not enought to project the balls. Please uncomment to test. 
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
    angleSpeed -= 0.01         // Right arrow is pressed, the angle speed is decremented by 0.01.
    // angleSpeed -= 0.1         // the grading instructions request to use 0.01, however the speed is not enought to project the balls. Please uncomment to test.
  } 
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}

//////////////////////////////////////////////////
// Countdown function
function countDown(){
  const timer = setInterval(() => {
    seconds--;
      // if no more seconds left and still remaing boxes we call screen 1 (Game over)
      if (seconds === 0 && boxes.length > 0) {
        clearInterval(timer); 
        screen = 1;
        return;
      } 
      // if no more seconds left we call screen 2 (You won)
      if (boxes.length === 0){
        clearInterval(timer); 
        screen = 2;
        return
      }
  }, 1000);
}


///////////////////////////////////////////////////
// Game over function
function gameOver() {
		background(150)
		textAlign(CENTER);
    // Displays game over message with number of boxes remaining.
		text('GAME OVER', width / 2, height / 2)
  	text('There were still ' + boxes.length + ' left', width / 2, height / 2 + 20)
		text('refresh to play again', width / 2, height / 2 + 40);
}

// You won function
function youWon() {
  background(64, 130, 109)
  stroke(2);
  textAlign(CENTER);
  // Displays win message seconds remaining
  text('You won', width / 2, height / 2)
  text('You destroyed all the boxes with ' + seconds + ' seconds to spare.', width / 2, height / 2 + 20)
  text('Refresh to play again', width / 2, height / 2 + 40);
}
