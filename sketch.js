
var b = [];
let pageSound;
let soundStarted = false;

function preload() {
  pageSound = loadSound("Assets/audio/trumptets p1.aiff");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);

  //createCanvas(windowWidth, windowHeight);


  canvas.elt.style.pointerEvents = 'none';
  canvas.elt.style.zIndex = '5'; 

  textFont('p22-flw-exhibition');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();

  startSoundOnce();

  // spotlight overlay////
  spotlight(mouseX, mouseY, 300);
}

function startSoundOnce() {
  if (!soundStarted && pageSound && pageSound.isLoaded()) {
    userStartAudio().then(() => {
      if (!soundStarted && !pageSound.isPlaying()) {
        pageSound.setVolume(0.6);
        pageSound.play();
        soundStarted = true;
      }
    });
  }
}

function mousePressed() {
  startSoundOnce();
}

function touchStarted() {
  startSoundOnce();
  return false;
}

function spotlight(x, y, size) {
  // cutout//
  noStroke();
  fill(0); // (semi-transparent, change second value fill(0, 210)///

  beginShape();
  // Outer rectangle screen— covers the whole canvas (clockwise)//
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);

  // Inner cutout — the "spotlight" hole (counter-clockwise = makes it a hole)//
  beginContour();
  vertex(x - size / 2, y - size / 2);
  vertex(x - size / 2, y + size / 2);
  vertex(x + size / 2, y + size / 2);
  vertex(x + size / 2, y - size / 2);
  endContour();

  endShape(CLOSE);

  // "Welcome" //
  fill('#E99D24');        
  noStroke();
  textFont('p22-flw-exhibition');
  textSize(110);
  textAlign(LEFT, TOP);
  text('Welcome', 20, 30);
}
