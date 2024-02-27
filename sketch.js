let NUM_STARS = 1000;
let stars = [];
let backgroundStars = [];

function setup() {
  w = min(windowWidth, 1920);
  h = min(windowHeight, 1024);
  createCanvas(windowWidth, windowHeight);
  smooth();
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100);

  nebula = new Nebula();

  for (let i = 0; i < NUM_STARS; i++) {
    stars[i] = new Star();
    backgroundStars[i] = new BackgroundStar();
    backgroundStars[i].v = 0;
  }
}

function draw() {
  translate(0, 0);
  background(0);
  nebula.draw();

  translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].draw();
  }

  for (let i = 0; i < backgroundStars.length; i++) {
    backgroundStars[i].draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
