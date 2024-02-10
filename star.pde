class Star {
  float x;
  float y;
  float z;
  float r;
  float v;

  float hue;
  float brightness;
  float saturation;

  Star() {
    reset();
  }

  void reset() {
    x = random(-5000, 5000);
    y = random(-5000, 5000);
    z = random(0, 2000);
    r = random(5, 20);
    v = random(5, 15);
    hue = random(0, 60);
    saturation = random(0, 30);
    brightness = 100;
  }

  void update() {
    z -= v;
    if (z <= 0) reset();
  }

  void draw() {
    float sx = 100.0 * (x / z);
    float sy = 100.0 * (y / z);
    float sr = 0.0001 * r * (2000.0 - z);

    float px = 100.0 * (x / (z+v));
    float py = 100.0 * (y / (z+v));

    stroke(hue, saturation, brightness);
    strokeWeight(sr);
    line(sx, sy, px, py);

    if (v==0) {
      noStroke();
      fill(hue, saturation, brightness);
      circle(sx, sy, sr);
    }
  }
}
