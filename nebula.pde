class Nebula {
  OpenSimplexNoise noise;
  int[] buffer;
  PImage img;
  PImage red;

  float xoff = 0.001;
  float yoff = 0.001;


  Nebula() {
    noise = new OpenSimplexNoise();
    buffer = new int[width * height];
    img = createImage(width, height, RGB);
    red = createImage(width, height, RGB);

    img.loadPixels();
    red.loadPixels();
    for (int x = 0; x < width; x++) {
      for (int y = 0; y < height; y++) {
        float n = (float)noise.eval(x * xoff, y * yoff);
        float b = map(n, -1, 1, 0, 20);
        img.pixels[y * width + x] = color(220, 50, b);
        n = (float)noise.eval(x*xoff, y * yoff, 1000);
        b = map(n, -1, 1, 0, 20);
        red.pixels[y * width + x] = color(5, 40, b);
      }
    }
    red.updatePixels();
    img.updatePixels();
    img.blend(red,0,0,width,height,0,0,width,height,LIGHTEST);
  }

  void draw() {
    image(img, 0, 0);
  }
}
