class BackgroundStar extends Star {
  void draw() {
    float sx = x * width / 10000;
    float sy = y * height / 10000;
    float sr = 0.0001 * r * (2000.0 - z);
    stroke(hue, saturation, brightness);
    strokeWeight(sr);

    noStroke();
    fill(hue, saturation, brightness);
    circle(sx, sy, sr);
  }

  void update() {
  }
}
