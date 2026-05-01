# How to Connect a p5.js Sketch to a VS Code HTML/CSS Project
## Step-by-Step Reference Guide

---

## THE CONCEPT

When you embed p5.js in an HTML page, the sketch creates a `<canvas>` element.
By making that canvas **transparent** (`clear()` instead of `background()`) and
positioning it **on top** of your HTML content with CSS, the HTML background and
text show through the "hole" in the spotlight overlay.

```
z-index: 10  →  nav bar          (always on top)
z-index: 5   →  p5.js canvas     (spotlight overlay)
z-index: 0   →  #text-layer div  (HTML text)
              →  body background  (CSS background image)
```

---

## STEP 1 — FOLDER STRUCTURE

Your project folder should look like this:

```
Oh_man_this_is_really_it/
├── index.html          ← Page 1 (with p5.js)
├── PageTwo.html
├── PageThree.html
├── PageFour.html
├── PageFive.html
├── style.css           ← shared stylesheet for ALL pages
├── sketch.js           ← your p5.js code (Page 1 only)
└── Assets/
    └── img/
        ├── backgroundP1.jpg
        ├── backgroundP2.jpg
        └── ...
```

**Rule:** `sketch.js` must be in the SAME folder as the `index.html` that loads it.
If you make a sketch for Page 2, put a `sketchP2.js` in the same root folder.

---

## STEP 2 — LOAD p5.js IN YOUR HTML `<head>`

In ANY page that uses p5.js, add these two script tags inside `<head>`:

```html
<!-- Option A: CDN (recommended — no files to manage) -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.12/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.12/lib/addons/p5.sound.min.js"></script>
```

You do NOT need to copy p5.js or p5.sound.min.js into your folder when using the CDN.
Only use local copies if you need to work fully offline.

---

## STEP 3 — LINK YOUR SKETCH FILE

At the very BOTTOM of `<body>`, just before `</body>`, add:

```html
<script src="sketch.js"></script>
```

It must go at the bottom so that the HTML elements (nav, text-layer div) exist in
the DOM before p5.js tries to render on top of them.

---

## STEP 4 — MAKE THE CANVAS TRANSPARENT AND LAYERED

In your `sketch.js`, make these two changes:

**A) Use `clear()` instead of `background()` in `draw()`:**
```javascript
function draw() {
  clear(); // ← transparent canvas; HTML shows through
  spotlight(mouseX, mouseY, 300);
}
```

**B) Tell p5.js not to block mouse events from reaching the HTML:**
```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas.elt.style.pointerEvents = 'none'; // ← mouse clicks pass through
}
```

---

## STEP 5 — LAYER EVERYTHING WITH CSS

In `style.css`, these three rules create the layering:

```css
/* 1. The p5.js canvas sits on top of HTML content */
canvas {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 5;
}

/* 2. Your text/content div sits below the canvas */
#text-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
}

/* 3. The nav bar sits above everything */
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
```

---

## STEP 6 — FORCE THE ADOBE FONT TO LOAD

p5.js can use CSS fonts, but only after the browser has loaded them.
Add this hidden span inside `<body>` on any page that uses the font in p5.js:

```html
<span class="font-preload">.</span>
```

With this CSS:
```css
.font-preload {
  font-family: 'p22-flw-exhibition'; /* ← your Adobe font name */
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
```

---

## STEP 7 — ADDING A NEW p5.js SKETCH TO A NEW PAGE

When you build a sketch in the p5.js web editor and want to bring it into VS Code:

1. In the p5.js editor, copy everything in `sketch.js`
2. In VS Code, create a new file — e.g. `sketchP2.js` — in your root folder
3. Paste your code into it
4. Remove any `background(img)` or `loadImage()` calls if the background is handled by CSS
5. Change `background(...)` in `draw()` to `clear()`
6. Add `canvas.elt.style.pointerEvents = 'none';` in `setup()` if needed
7. In the relevant HTML page, add at the bottom of `<body>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/p5@1.11.12/lib/p5.js"></script>
   <script src="sketchP2.js"></script>
   ```

---

## NAVIGATION LINKS — HOW THEY WORK

All pages share the same `style.css` and link to each other by filename.
Because all HTML files are in the same root folder, links are just filenames:

```html
<a href="index.html">1</a>      ← goes to Page 1
<a href="PageTwo.html">2</a>    ← goes to Page 2
<a href="PageThree.html">3</a>  ← goes to Page 3
```

Each page's nav omits itself (you don't link to the page you're already on):
- index.html nav: 2, 3, 4, 5
- PageTwo.html nav: 1, 3, 4, 5
- PageThree.html nav: 1, 2, 4, 5
- etc.

---

## PREVIEWING IN VS CODE

Use the **Live Server** extension:
1. Install "Live Server" by Ritwick Dey from the VS Code Extensions panel
2. Right-click `index.html` → "Open with Live Server"
3. Your browser opens at `http://127.0.0.1:5500/index.html`
4. Navigation links between pages will work correctly

**Do not** open HTML files by double-clicking them in Finder — that uses
the `file://` protocol which breaks some features. Always use Live Server.

---

## QUICK CHECKLIST FOR EVERY NEW SKETCH

- [ ] `sketch.js` is in the same folder as the HTML page
- [ ] `<script src="p5.js CDN">` is in `<head>`
- [ ] `<script src="sketch.js">` is at the bottom of `<body>`
- [ ] `clear()` used in `draw()` (not `background()`)
- [ ] `canvas.elt.style.pointerEvents = 'none'` in `setup()`
- [ ] `canvas { position: fixed; z-index: 5; }` in CSS
- [ ] Font preload span added if using Adobe fonts in p5.js
- [ ] Nav links on each page are correct filenames
