// sketchP3.js — Page 3
// Animated text outline: lines radiate from each letter point,
// oscillating in angle. Text is drawn on top in a ghostly fill.

let font;
let points = [];
let msg    = "Oh man, this is really it";
let size   = 100;
let r      = 9;
let angle  = 10;
let t      = 0;
let textBounds;

function preload() {
  font = loadFont("fonts/Roboto-Black.ttf");
}

function calculateSize() {
  // Fit text inside the viewport with padding.
  const baseSize = 100;
  const padding = 40;
  const baseBounds = font.textBounds(msg, 0, 0, baseSize);
  const fitByWidth = (windowWidth - padding) / baseBounds.w;
  const fitByHeight = (windowHeight - padding) / baseBounds.h;
  size = max(24, baseSize * min(fitByWidth, fitByHeight) * 0.9);
  textBounds = font.textBounds(msg, 0, 0, size);
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '2');          
  cnv.elt.style.pointerEvents = 'none';

  calculateSize();

  points = font.textToPoints(msg, 0, 0, size, {
    sampleFactor: 0.9,
    simplifyThreshold: 0.0
  });

  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateSize();

  points = font.textToPoints(msg, 0, 0, size, {
    sampleFactor: 0.9,
    simplifyThreshold: 0.0
  });
}

function draw() {
  clear();

  // Oscillating angle drives the line animation
  let x = r * cos(angle);
  let y = r * sin(angle);

  // Centre the text block on screen
  push();
  translate(
    (width - textBounds.w) / 2 - textBounds.x,
    (height - textBounds.h) / 2 - textBounds.y
  );

  // Draw radiating lines from each outline point
  stroke(255);          // white lines
  strokeWeight(0.8);
  for (let i = 0; i < points.length; i++) {
    line(points[i].x, points[i].y,
         points[i].x + x, points[i].y + y);
  }

  // Ghost text overlay
  noStroke();
  textFont('brooklyn-heritage-script');
  textSize(size);
  fill(255, 105, 180, 205);  // brighter trusting pink, higher opacity
  text(msg, x, y);

  pop();

  // Advance oscillation
  let increment = 5 * sin(t);
  t++;
  angle += increment;
}
