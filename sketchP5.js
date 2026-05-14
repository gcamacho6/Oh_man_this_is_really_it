let handImg;

function preload() {
  handImg = loadImage("Assets/img/byehand.gif");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '2');        
  cnv.elt.style.pointerEvents = 'none';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/////////////////////////////////////////////////////////////////////////

function draw() {
  clear();

  // HAND byee //
  if (handImg) {
    imageMode(CENTER);
    image(handImg, mouseX, mouseY, 400, 400);
  }
}
