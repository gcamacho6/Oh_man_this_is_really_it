/*Video Tutorial help: https://youtu.be/HLRtRSuoY8A
---------------------------------------*/

let font;
let wiperImg;

let word = ["o","h","m","a","n","t","h","i","s","i","s","r","e","a","l","l","y","i","t"];
let letters = [];
let num = 25;
let wiper;

// ── Audio ────────────────────────────────────────────────────///
let pageSound;
let soundStarted = false;

function preload() {
  font     = loadFont("fonts/BebasNeue-Regular.ttf");
  wiperImg = loadImage("Assets/img/umbrella1.png");
  pageSound = loadSound("Assets/audio/p4 piano sound.mp3");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '8');
  cnv.elt.style.pointerEvents = 'none';

  angleMode(DEGREES);
  wiper = new Wiper();
  for (let i = 0; i < num; i++) {
    letters[i] = new Letter();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();

  // Start audio//
  if (!soundStarted && pageSound && pageSound.isLoaded()) {
    userStartAudio().then(() => {
      if (!pageSound.isPlaying()) {
        pageSound.setVolume(0.6);
        pageSound.loop();
        soundStarted = true;
      }
    });
  }

  wiper.update();
  wiper.display();

  for (let i = 0; i < num; i++) {
    letters[i].update(wiper.w1, wiper.w2, wiper.speed);
    letters[i].display();
  }
}

function mousePressed() {
  if (!soundStarted && pageSound && pageSound.isLoaded()) {
    userStartAudio().then(() => {
      if (!pageSound.isPlaying()) {
        pageSound.setVolume(0.6);
        pageSound.loop();
        soundStarted = true;
      }
    });
  }
}

// ── WIPER ////////////////////////////////////////////////////////


class Wiper {
  constructor() {
    this.l = 360;
    this.baseYOffset = 36;
    this.w1 = createVector(width / 2, height - this.baseYOffset);
    this.w2 = createVector(0, 0);
    this.angle = 270;
    this.speed = 0;
    this._prevAngle = 0;
  }

  update() {
    this.w1.set(width / 2, height - this.baseYOffset);

    let targetAngle = atan2(mouseY - this.w1.y, mouseX - this.w1.x);

    this._prevAngle = this.angle;
    this.angle = targetAngle;
    this.speed = this.angle - this._prevAngle;

    this.w2.x = this.w1.x + this.l * cos(this.angle);
    this.w2.y = this.w1.y + this.l * sin(this.angle);
  }


/*FIXX THE HALF PIE THINGY, EITHER CHANGE TO DEGREES OR STICK TO PI)*/
  display() {
    if (!wiperImg) return;
    push();
    translate(this.w1.x, this.w1.y);
    rotate(this.angle + 90);        
    imageMode(CENTER);
    tint(255, 210);
    image(wiperImg, 0, -this.l / 2, 130, this.l);
    
    pop();
  }
}

// ── LETTER CLASS //////////////////////////////////
class Letter {
  constructor() {
    this.reset();
    this.hitV = 5;
  }

  reset() {
    this.t    = random(word);
    this.x    = random(width);
    this.y    = random(-100, -10);

    this.bbox = font.textBounds(this.t, this.x, this.y, this.size);
    this.pos  = createVector(this.bbox.x, this.bbox.y);
    this.w    = this.bbox.w;
    this.h    = this.bbox.h;
    this.setBBLocation();

    this.vel    = createVector(0, 2);
    this.angle  = -5;
    this.angleV = 0;
  }

  update(w1, w2, speed) {
    this.pos.add(this.vel);
    this.angle += this.angleV;

    if (this.collide(w1, w2)) {
      if (speed > 0) {
        this.vel    = createVector(this.hitV, 0);
        this.angleV = 0.5;
      } else {
        this.vel    = createVector(-this.hitV, 0);
        this.angleV = -0.5;
      }
    }

    let margin = 300;
    if (this.pos.y > height ||
        this.pos.x > (width + margin) ||
        this.pos.x < (0 - margin)) {
      this.reset();
    }
  }

  display() {
    this.setBBLocation();
    noStroke();
    fill('white');
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    textFont('myriad-std-tilt');
    textSize(20);
    text(this.t, 0, this.h);
    pop();
  }

  setBBLocation() {
    this.pt1 = this.pos;
    this.pt2 = createVector(this.pt1.x + this.w * cos(this.angle),
                             this.pt1.y + this.w * sin(this.angle));
    this.pt3 = createVector(this.pt2.x - this.h * sin(this.angle),
                             this.pt2.y + this.h * cos(this.angle));
    this.pt4 = createVector(this.pt1.x - this.h * sin(this.angle),
                             this.pt1.y + this.h * cos(this.angle));
  }

  collide(w1, w2) {
    let top    = this.lineToLine(w1, w2, this.pt2, this.pt2);
    let right  = this.lineToLine(w1, w2, this.pt2, this.pt3);
    let bottom = this.lineToLine(w1, w2, this.pt3, this.pt4);
    let left   = this.lineToLine(w1, w2, this.pt1, this.pt4);
    return top || right || bottom || left;
  }

  lineToLine(a, b, c, d) {
    let t = ((b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x)) /
            ((d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y));
    let u = ((d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)) /
            ((d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y));
    return (t >= 0 && t <= 1 && u >= 0 && u <= 1);
  }
}
