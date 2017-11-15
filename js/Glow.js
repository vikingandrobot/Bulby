class Glow {

  /**
    Constructor to create a Glow.

    Parameters:
      r: the radius from which to start the Glow
      min: the lower bound of the glow. The resulting min radius of the glow
        will be r + min
      max: the upper bound of the glow. The resulting max radius of the glow
        will be r + max
  */
  constructor(r, min, max) {
    this.r = r;
    this.min = r + min;
    this.max = r + max;
    this.glow = this.min;
    this.direction = 1;
  }

  draw(ctx, x, y) {
    if (this.glow < this.min) {
      this.glow = this.min;
      this.direction *= -1;
    } else if (this.glow > this.max) {
      this.glow = this.max;
      this.direction *= -1;
    }
    this.glow += this.direction * 0.5;


    let opacity = 1 / (this.max - this.min);
    for (let i = this.r; i < this.glow; ++i) {
      ctx.beginPath();
      ctx.arc(x, y, i, 0, Math.PI * 2, false);
      ctx.fillStyle = "rgba(255, 255, 255, " +
        opacity +
        ")";
      ctx.fill();
      ctx.closePath();
    }
  }
}
