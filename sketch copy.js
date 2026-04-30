//let bg;
var b = [];

//window//

//function preload() {
 // bg = loadImage("backgroundP1.jpg");
//}

function setup() {
  createCanvas(windowWidth, windowHeight);


  textFont("p22-flw-exhibition");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//

function draw() {
  //background(bg);

  clear(); 

  //spot light//
  spotlight(mouseX, mouseY, 300);

  for (i = 0; i < b.length; i++) {
    b[i].move();
    b[i].bounce();
    b[i].display();
  }
}

function spotlight(x, y, size) {
  noStroke();
  fill(0);
  beginShape();
  // Outer rectangle (clockwise)
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);

  // Inner cutout (counter-clockwise)
  beginContour();
  vertex(x - size / 2, y - size / 2);
  vertex(x - size / 2, y + size / 2); // ← swapped
  vertex(x + size / 2, y + size / 2);
  vertex(x + size / 2, y - size / 2); // ← swapped
  endContour();
  endShape(CLOSE);

  //"Welcome" text at the top//
  fill('#E99D24');
  noStroke();
  textFont("p22-flw-exhibition"); 
  textSize(110);
  textAlign(LEFT, TOP);
  text("Welcome", 20, 30);
}
