class CircleWave {
  constructor(position, nbCircles) {
    this.pos = position;

    this.circles = [];
    for (let i = 0; i < nbCircles; ++i) {
      this.circles.push(new Circle(this.pos, 1 * (i * 0.1 + 1)));
    }
  }

  logic() {
    for (let i = this.circles.length - 1; i >= 0; --i) {
      this.circles[i].logic();
      if (this.circles[i].isDead()) {
        this.circles.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    for (let i = this.circles.length - 1; i >= 0; --i) {
      this.circles[i].draw(ctx);
    }
  }

  isDead() {
    return this.circles.length === 0;
  }
}
