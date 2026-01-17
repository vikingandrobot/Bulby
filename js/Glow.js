/**
  The glow class represents a glowing effects. It is a pure UI object that
  increases or decreases a glowing light full circle of color each time
  the draw method is called..
*/
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

    // The current size of the glowin effect
    this.glow = this.min;

    // The direction of the glow. 1: away from the center, -1: to the center
    this.direction = 1;
  }

  /**
    Draw the glowing effect. Each time this method is called, full circles
    will be drawn to the given context, using a decreasing opacity creating
    a glowing effect.

    Parameters:
      ctx: the canvas context to draw on
      x: the x position to draw the glow (center)
      y: the y position to draw the glow (center)
  */
  draw(ctx, x, y) {

    // Keep the glowing size inside the specified min and max bounds
    if (this.glow < this.min) {
      this.glow = this.min;
      this.direction *= -1;
    } else if (this.glow > this.max) {
      this.glow = this.max;
      this.direction *= -1;
    }

    // Increment / decrement the glow
    this.glow += this.direction * 0.4;

    // Calculate the opacity step value to draw a gradient glow
    let opacity = 1 / (this.max - this.min);

    // Draw all circles to create the glowing effect
    for (let i = this.r; i < this.glow; ++i) {
      ctx.beginPath();
      ctx.arc(x, y, i, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(50, 250, 250, ${opacity})`;
      ctx.fill();
      ctx.closePath();
    }
  }
}
