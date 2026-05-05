// sketchP2.js — All three Page 2 sketches combined into one file
// Layer order inside draw() — painted bottom to top:
//   1. BACK:   radial dot pattern — enlarged to fill page, continuously spinning
//   2. MIDDLE: colored text follows mouse — large, covers the page
//   3. TOP:    shaking text appears on keypress

// ── TOP /////////////
let showText = false;

// ── MIDDLE //////////
let myWord = "Oh man, this is it";
let myColors = ["#4101F7", "#CFF765", "#9DF0E2", "#F339A7", "#FE4732", "#1A1514"];
let fonts = [
  'backspacer-ot-square',
  'battery-park',
  'new-order',
  'darker-grotesque-semibold',
  'backspacer-ot-round'
];

// - ADDED MIDDLE FOR STAMPS -//
let randomTextStamps = [];
let maxRandomStamps = 0;

// ── BACK  ///////
let minR = 2;
let maxR = 600;       
let ptsPerRing = 120; //more points
let numRings = 120;   //more rings
let freqFactor = 0.03;
let ampFactor = 0.2;
let img;
let colorStart, colorEnd;
let repeatX = 2;
let repeatY = 3;
let spinAngle = 0;  

// //////////////////////////////////////////////////////////////

function preload() {
  img = loadImage("Assets/img/word_p2.png");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '2');
  cnv.elt.style.pointerEvents = 'none';

  rectMode(CENTER);
  colorStart = color('#BB0002');  
  colorEnd   = color('#E99D24');  
  maxR = max(windowWidth, windowHeight) * 0.55;
  frameRate(9);
  resetRandomTextFill();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maxR = max(windowWidth, windowHeight) * 0.55;

  //- ADDED MIDDLE FOR WORD STAMPS -//
  resetRandomTextFill();
}

///////////////////////////////////////////////////////////////////

function draw() {
  clear();

  // ── 1. BACK///
  push();
  noStroke();
  translate(width / 2, height / 2);

  spinAngle += 0.003; //speed
  rotate(spinAngle);

  for (let i = 0; i < numRings; i++) {
    let r = minR + ((maxR - minR) / numRings) * i;

    for (let j = 0; j < ptsPerRing; j++) {
      let angle = TWO_PI / ptsPerRing * j;
      let distortedAngle = angle + ampFactor * sin(freqFactor * r + frameCount * 0.07);

      let sampleX = (angle * repeatX) % TWO_PI;
      let refX    = map(sampleX, 0, TWO_PI, 0, img.width);
      let sampleY = ((r - minR) / (maxR - minR) * repeatY) % 1.0;
      let refY    = map(sampleY, 0, 1, 0, img.height);

      let c         = img.get(refX, refY);
      let shapeSize = map(red(c), 0, 255, 0, 5);

      let x     = -r * cos(distortedAngle);
      let y     =  r * sin(distortedAngle);
      let xCart = x + width / 2;
      let amt   = map(xCart, 0, width, 0, 1);

    //COLORRRR//
      let col = lerpColor(colorStart, colorEnd, amt);
      col.setAlpha(160); //opacity(0=transparent, 255=opaque)
      fill(col);
      rect(x, y, shapeSize);
    }
  }
  pop();

  // ── 2. MIDDLE────────///
  push();

  fill(random(myColors));
  textFont(random(fonts));
  textAlign(CENTER, CENTER);
  textSize(width * 0.12);
  text(myWord, mouseX, mouseY);
  pop();

  // ── MIDDLE: random words//////////////////////////////////////──
  if (frameCount % 4 === 0) {
    addRandomTextStamps(1);
  }
  drawRandomTextFill();

  // ── 3. TOP: shaking text with keybpard──────────────────/////
  if (showText) {
    push();
    textFont('ltr-beowolf-r23');
    fill('white');
    textSize(200);
    textAlign(CENTER, CENTER);

    let shakeAmount = 8;
    let x = width  / 3 + random(-shakeAmount, shakeAmount);
    let y = height / 2 + random(-shakeAmount, shakeAmount);

    text("Oh man",            x, y / 2);
    text("this is really it", x, y);

    pop();
  }
}

// /////////////////////////////////////////////////////////

// TOP: show/hide shaking text on keypress
function keyPressed()  { showText = true;  }
function keyReleased() { showText = false; }

// MIDDLE: toggle word on mouse click
function mousePressed() {
  if (myWord === "oh man") {
    myWord = "this is it";
  } else {
    myWord = "oh man";
  }
  resetRandomTextFill();
}



/////////////////////////ADDED STAMPS THINGY /////////
function resetRandomTextFill() {
  randomTextStamps = [];

  //SIZING// (use constants = fixed value)
  const approxTextSize = width * 0.12;
  const approxStampArea = max(1, approxTextSize * approxTextSize * 0.65);
  maxRandomStamps = constrain(ceil((width * height) / approxStampArea), 40, 220);
}

function addRandomTextStamps(countPerFrame) {
  if (randomTextStamps.length >= maxRandomStamps) return;

  const s = width * 0.12;
  for (let i = 0; i < countPerFrame; i++) {
    if (randomTextStamps.length >= maxRandomStamps) break;

    randomTextStamps.push({
      x: random(0, width),
      y: random(0, height),
      color: random(myColors),
      font: random(fonts),
      size: random(s * 0.75, s * 1.05),
      word: myWord
    });
  }
}


function drawRandomTextFill() {
  push();
  textAlign(CENTER, CENTER);
  for (let stamp of randomTextStamps) {
    fill(stamp.color);
    textFont(stamp.font);
    textSize(stamp.size);
    text(stamp.word, stamp.x, stamp.y);
  }
  pop();
}
