class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-5000, 5000);
    this.y = random(-5000, 5000);
    this.z = random(0, 2000);
    this.r = random(5, 20);
    this.v = random(1, 15);
    this.hue = random(0, 60);
    this.saturation = random(0, 40);
    this.brightness = 100;
  }

  update() {
    this.z -= this.v;
    if (this.z <= 0) this.reset();
  }

  draw() {
    let sx = 100.0 * (this.x / this.z);
    let sy = 100.0 * (this.y / this.z);
    let sr = 0.0001 * this.r * (2000.0 - this.z);

    let px = 100.0 * (this.x / (this.z + this.v));
    let py = 100.0 * (this.y / (this.z + this.v));

    stroke(this.hue, this.saturation, this.brightness);
    strokeWeight(sr);
    line(sx, sy, px, py);
  }
}

class BackgroundStar extends Star {
  reset() {
    this.noise = new OpenSimplexNoise2D(Date.now());
    this.xoff = 0.5;
    this.yoff = 0.5;

    [this.x, this.y] = this.newPosition();

    this.z = random(0, 2000);
    this.r = random(5, 20);
    this.v = random(1, 15);
    this.hue = random(0, 60);
    this.saturation = random(0, 40);
    this.brightness = 100;
  }

  newPosition() {
    while (true) {
      let r = random(-1, 1);
      let x = random(-5000, 5000);
      let y = random(-5000, 5000);
      let n = this.noise.noise(x * this.xoff, y * this.yoff);

      if (r > n) {
        return [x, y];
      }
    }
  }

  draw() {
    let sx = (this.x * width) / 10000;
    let sy = (this.y * height) / 10000;
    let sr = 0.0001 * this.r * (2000.0 - this.z);

    stroke(this.hue, this.saturation, this.brightness);
    strokeWeight(sr);
    noStroke();
    fill(this.hue, this.saturation, this.brightness);
    circle(sx, sy, sr);
  }

  update() {
    // No need to implement anything here since we don't want background stars to move
  }
}
