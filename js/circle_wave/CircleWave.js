/**
  A CircleWave object is a groupe of Circle objects that origin from the same
  point and slowly fades away. The CircleWave is "dead" when all circles are
  "dead".
*/
class CircleWave {

  /**
    Constructor.

    Paramters:
      position: CartesianVector
      nbCircles: number of Circle objects of the wave
  */
  constructor(position, nbCircles) {
    this.pos = position;

    this.circles = [];
    for (let i = 0; i < nbCircles; ++i) {
      this.circles.push(new Circle(this.pos, 1 * (i * 0.1 + 1)));
    }
  }

  /**
    Applies the logic of all circles. It also removes the dead circles from
    the wave.
  */
  logic() {
    for (let i = this.circles.length - 1; i >= 0; --i) {
      this.circles[i].logic();
      if (this.circles[i].isDead()) {
        this.circles.splice(i, 1);
      }
    }
  }

  /**
    Draws all circles.
  */
  draw(ctx) {
    for (let i = this.circles.length - 1; i >= 0; --i) {
      this.circles[i].draw(ctx);
    }
  }

  /**
    Whether the wave is dead or not.

    return: true if the wave is dead
  */
  isDead() {
    return this.circles.length === 0;
  }
}
