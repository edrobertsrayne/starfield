"use strict";
var OpenSimplexNoise2D;

(function() {
  var constants_1 = {
    NORM_2D: 1.0 / 47.0,
    SQUISH_2D: (Math.sqrt(2 + 1) - 1) / 2,
    STRETCH_2D: (1 / Math.sqrt(2 + 1) - 1) / 2,
    base2D: [[1, 1, 0, 1, 0, 1, 0, 0, 0], [1, 1, 0, 1, 0, 1, 2, 1, 1]],
    gradients2D: [5, 2, 2, 5, -5, 2, -2, 5, 5, -2, 2, -5, -5, -2, -2, -5],
    lookupPairs2D: [
      0,
      1,
      1,
      0,
      4,
      1,
      17,
      0,
      20,
      2,
      21,
      2,
      22,
      5,
      23,
      5,
      26,
      4,
      39,
      3,
      42,
      4,
      43,
      3
    ],
    p2D: [
      0,
      0,
      1,
      -1,
      0,
      0,
      -1,
      1,
      0,
      2,
      1,
      1,
      1,
      2,
      2,
      0,
      1,
      2,
      0,
      2,
      1,
      0,
      0,
      0
    ],
  };

  var Contribution2 = /** @class */ (function() {
    function Contribution2(multiplier, xsb, ysb) {
      this.dx = -xsb - multiplier * constants_1.SQUISH_2D;
      this.dy = -ysb - multiplier * constants_1.SQUISH_2D;
      this.xsb = xsb;
      this.ysb = ysb;
    }
    return Contribution2;
  })();
  function shuffleSeed(seed) {
    var newSeed = new Uint32Array(1);
    newSeed[0] = seed[0] * 1664525 + 1013904223;
    return newSeed;
  }
  OpenSimplexNoise2D = /** @class */ (function() {
    function OpenSimplexNoise(clientSeed) {
      this.initialize();
      this.perm = new Uint8Array(256);
      this.perm2D = new Uint8Array(256);
      var source = new Uint8Array(256);
      for (var i = 0; i < 256; i++) source[i] = i;
      var seed = new Uint32Array(1);
      seed[0] = clientSeed;
      seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
      for (var i = 255; i >= 0; i--) {
        seed = shuffleSeed(seed);
        var r = new Uint32Array(1);
        r[0] = (seed[0] + 31) % (i + 1);
        if (r[0] < 0) r[0] += i + 1;
        this.perm[i] = source[r[0]];
        this.perm2D[i] = this.perm[i] & 0x0e;
        source[r[0]] = source[i];
      }
    }
    OpenSimplexNoise.prototype.array2D = function(width, height) {
      var output = new Array(width);
      for (var x = 0; x < width; x++) {
        output[x] = new Array(height);
        for (var y = 0; y < height; y++) {
          output[x][y] = this.noise2D(x, y);
        }
      }
      return output;
    };
    OpenSimplexNoise.prototype.noise = function(x, y) {
      var stretchOffset = (x + y) * constants_1.STRETCH_2D;
      var xs = x + stretchOffset;
      var ys = y + stretchOffset;
      var xsb = Math.floor(xs);
      var ysb = Math.floor(ys);
      var squishOffset = (xsb + ysb) * constants_1.SQUISH_2D;
      var dx0 = x - (xsb + squishOffset);
      var dy0 = y - (ysb + squishOffset);
      var xins = xs - xsb;
      var yins = ys - ysb;
      var inSum = xins + yins;
      var hash =
        (xins - yins + 1) |
        (inSum << 1) |
        ((inSum + yins) << 2) |
        ((inSum + xins) << 4);
      var value = 0;
      for (var c = this.lookup2D[hash]; c !== undefined; c = c.next) {
        var dx = dx0 + c.dx;
        var dy = dy0 + c.dy;
        var attn = 2 - dx * dx - dy * dy;
        if (attn > 0) {
          var px = xsb + c.xsb;
          var py = ysb + c.ysb;
          var indexPartA = this.perm[px & 0xff];
          var index = this.perm2D[(indexPartA + py) & 0xff];
          var valuePart =
            constants_1.gradients2D[index] * dx +
            constants_1.gradients2D[index + 1] * dy;
          value += attn * attn * attn * attn * valuePart;
        }
      }
      return value * constants_1.NORM_2D;
    };
    OpenSimplexNoise.prototype.initialize = function() {
      var contributions2D = [];
      for (var i = 0; i < constants_1.p2D.length; i += 4) {
        var baseSet = constants_1.base2D[constants_1.p2D[i]];
        var previous = null;
        var current = null;
        for (var k = 0; k < baseSet.length; k += 3) {
          current = new Contribution2(
            baseSet[k],
            baseSet[k + 1],
            baseSet[k + 2]
          );
          if (previous === null) contributions2D[i / 4] = current;
          else previous.next = current;
          previous = current;
        }
        current.next = new Contribution2(
          constants_1.p2D[i + 1],
          constants_1.p2D[i + 2],
          constants_1.p2D[i + 3]
        );
      }
      this.lookup2D = [];
      for (var i = 0; i < constants_1.lookupPairs2D.length; i += 2) {
        this.lookup2D[constants_1.lookupPairs2D[i]] =
          contributions2D[constants_1.lookupPairs2D[i + 1]];
      }
      
    };
    return OpenSimplexNoise;
  })();
})();