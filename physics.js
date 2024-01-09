////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  /* STEP 1
  Amend the setupPropeller() function in physics.js to setup a 
  static body of type rectangle at location (150, 480) of size (200, 15)
  */
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, 
    angle: angle        //The initial angle is equal to the global variable angle 
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller - STEP 2
function drawPropeller(){
  push();
  // your code here
    Body.setAngle(propeller, angle);  // set the angle of the propeller equal to the global variable angle
    Body.setAngularVelocity(propeller, angleSpeed); // Set the angular velocity equal to the global variable angleSpeed
    angle += angleSpeed;              // Update the variable angle by angleSpeed
    drawVertices(propeller.vertices); // Draw the propeller using the drawVertices()
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });             
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here - STEP 3
    /**Amend the drawBirds() function to loop over the 
   birds array and draw them using the drawVertices() */
   fill(255, 0, 0)
   for(var i=0; i < birds.length; i++){
     drawVertices(birds[i].vertices);
 
     if(isOffScreen(birds[i])){        // Use the isOffScreen() function to check if the bird has left the screen
       removeFromWorld(engine.world, birds[i]); // Remove it from the physics world using the removeFromWorld() helper function provided and from the array
       birds.splice(i, 1);              // Remember to also decrement your for-loop 
       i--;                            // counter in order not to break your code
     }
   }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here - STEP 4
  var boxWidth = 80;     // size of each box (width and height)
  var boxHeight = 80;    // size of each box (width and height)
  var numRows = 6;       // number of rows in the tower
  var numCols = 3;       // number of columns in the tower
  
  for(var i = 0; i < numRows; i++){         // iterates over rows
    for(var j = 0; j < numCols; j++){       // iterates over colums
      var x = 750 + j * boxWidth;           // position of the box's in x
      var y = 600 - (i + 1) * boxHeight;    // position of the box's in y
      box = Bodies.rectangle(x, y, 80, 80); // Creates a rectangle body
      boxes.push(box);                      // pushes the box into the array
      colors.push(color(random(0, 50), random(150, 200), random(0, 50))); // push the colors into colours array
    }
  }
  World.add(engine.world, boxes);         // adds the array boxes to the world
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here - STEP 5
  /** 
   * loop over the boxes array and draw each 
   * box using the drawVertices() helper function
   */
  for(var i = 0; i < boxes.length; i++){
    fill(colors[i]);              // emember to use the random colors you created inside the colors array. 
    drawVertices(boxes[i].vertices);

    // STEP 8 
    if(isOffScreen(boxes[i])){    // Checks if the box is out of the canvas
      removeFromWorld(engine.world, boxes[i]);  // If yes, remove from the world
      boxes.splice(i, 1);          // Also, remove it from the array
      i--;                        
    }

  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here - STEP 6
/**
 * initialise the global variable slingshotBird as a body of type circle
 */
slingshotBird = Bodies.circle(200, 200, 20, {
    friction: 0,                // Give the circle zero friction 
    restitution: 0.95,          // Restitution of 0.95
  });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);  // Set the mass of the slingshotBird as ten times its original mass

  slingshotConstraint = Constraint.create({   // Initialise also the global variable slingshotConstraint
    pointA: {x: 200, y: 200},
    bodyB: slingshotBird,
    pointB: {x:0, y: 0},
    stiffness: 0.01,                          // Give it a stiffness of 0.01
    damping: 0.0001                           // Damping of 0.0001.
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);         // adds the boxes to the world
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint - STEP 7
function drawSlingshot(){
  push();
  // your code here
  fill(255, 165, 0);
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
  pop();
}

function setupWreckingBall(){
  //your code here - STEP 8
  // Creates the wrecking ball as a circle, with low density and minimal friction to air
  wreckingBall = Bodies.circle(550, 500, 50, {
      density: 0.04,
      frictionAir: 0.001,
    })
  
    // creates a constraint between the ball and the cable holding it
    wreckingBallConstraint = Constraint.create({
      pointA: {x: 500, y: 150},
      bodyB: wreckingBall,
      stiffness: 1,             // Cable does not allow elasticity
    })
  
    World.add(engine.world, [wreckingBall, wreckingBallConstraint]);         // adds the boxes to the world
  }
  ////////////////////////////////////////////////////////////////
  //draws slingshot bird and its constraint
  function drawWreckingBall(){
    push();
      fill(255, 0, 0)
      drawVertices(wreckingBall.vertices)       // Draws the wrecking ball 
      drawConstraint(wreckingBallConstraint)    // Draws the constraint
    pop();
  }

/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
