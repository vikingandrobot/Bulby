/**
  Class that represent a circle. The circle is expands in size over time and
  slowly fades away.

  The circle is considered as "dead" when it has reaches a size bigger than
  MAX_R (to be changed late maybe)
*/
class Circle {

  // Max radius static constant
  static get MAX_R() {
    return 100;
  }

  /**
    Constructor.

    Parameters:
      position: CartesianVector
      growRate: How much does the circle expand each frame [px]
  */
  constructor(position, growRate) {
    this.pos = position;
    this.r = 1;
    this.growRate = growRate;
    this.opacity = 1;
    this.opacityRate = 1 / (Circle.MAX_R / this.growRate);
  }

  /**
    Expands the circle and fade a little bit.
  */
  logic() {
    this.r += this.growRate;
    this.opacity -= this.opacityRate;
  }

  /**
    Draws the circle
  */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    ctx.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
    ctx.stroke();
    ctx.closePath();
  }

  /**
    Whether the circle is dead or not.

    return: true if the circle as reached MAX_R
  */
  isDead() {
    return this.r > Circle.MAX_R;
  }
}
