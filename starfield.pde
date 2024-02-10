int NUM_STARS = 1000;

Nebula nebula;
Star[] stars = new Star[NUM_STARS];
Star[] backgroundStars = new Star[NUM_STARS];

void setup() {
  size(1920, 1080);
  fullScreen();
  smooth();
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100);

  nebula = new Nebula();


  for (int i = 0; i < stars.length; i++) {
    stars[i] = new Star();
    backgroundStars[i] = new Star();
    backgroundStars[i].v = 0;
  }
}

void draw() {
  background(0);
  nebula.draw();

  translate(width / 2, height /2);
  for (Star s : stars) {
    s.update();
    s.draw();
  }
  
  for (Star s : backgroundStars) {
    s.draw();
  }
}
