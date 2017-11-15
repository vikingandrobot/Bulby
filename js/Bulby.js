/**
  The Bulby class represents Bulby. It manages its behaviour and
  visualisation.
*/
class Bulby {

  /**
    Constructor to create a new Bulby.

    Parameters:
      pos: CartesianVector describing its position
  */
  constructor(pos) {
    // The position of Bulby
    this.pos = pos.copy();

    // The size of Bulby
    this.r = 60;

    // The Face object
    this.face = new Face(this, 20);

    // Glow object
    this.glow = new Glow(this.r, this.r / 4, this.r / 5 * 2);

    this.target = undefined;
  }

  look(target) {
    this.target = target;
    this.face.target = target;
  }

  /**
    Execute bulby logic
  */
  logic() {
    // Look around
    this.face.logic();

    if (this.target !== undefined) {
      if (this.pos.distance(this.target.pos) > this.r + 30) {
        const directionPolar = this.target.pos.copy().substract(this.pos).toPolar();
        directionPolar.magnitude(7);

        this.pos.add(directionPolar.toCartesian());
      }
    }
  }

  /**
    Draw bulby
  */
  draw(ctx) {
    this.glow.draw(ctx, this.pos.x, this.pos.y);

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Draw Bulby's sight
    this.face.draw(ctx);
  }
}
