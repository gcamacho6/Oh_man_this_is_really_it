// sketchP5.js — Page 5
// Exact code from uploaded sketch.js — nothing changed except:
// image path updated from "byehand.gif" to "Assets/img/byehand.gif"
// and canvas positioned as fixed overlay (same pattern as all other pages).

let handImg;

function preload() {
  handImg = loadImage("Assets/img/byehand.gif");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '2');        // above HTML text (z-index 3 in CSS), below nav (10)
  cnv.elt.style.pointerEvents = 'none';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();

  // SUN THINGY //
  if (handImg) {
    imageMode(CENTER);
    image(handImg, mouseX, mouseY, 400, 400);
  }
}
