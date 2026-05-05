
var b = [];

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);

  //createCanvas(windowWidth, windowHeight);


  // IMPORTANT: lets mouse events pass through the canvas to the HTML beneath
  canvas.elt.style.pointerEvents = 'none';
  canvas.elt.style.zIndex = '5'; // above p1 text-layer, below nav

  textFont('p22-flw-exhibition');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // the HTML body background shows through
  clear();

  // spotlight overlay
  spotlight(mouseX, mouseY, 300);
}

function spotlight(x, y, size) {
  // Black overlay with a rectangular cutout where the mouse is
  noStroke();
  fill(0); // (if want semi-transparent, change second value e.g. fill(0, 210)

  beginShape();
  // Outer rectangle screen— covers the whole canvas (clockwise)
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);

  // Inner cutout — the "spotlight" hole (counter-clockwise = makes it a hole)
  beginContour();
  vertex(x - size / 2, y - size / 2);
  vertex(x - size / 2, y + size / 2);
  vertex(x + size / 2, y + size / 2);
  vertex(x + size / 2, y - size / 2);
  endContour();

  endShape(CLOSE);

  // "Welcome" on top of the overlay
  fill('#E99D24');        
  noStroke();
  textFont('p22-flw-exhibition');
  textSize(110);
  textAlign(LEFT, TOP);
  text('Welcome', 20, 30);
}
