/**
  The Face class represents Bulby's face. It manages what bulby is currently
  looking at and the calculation to display it's face.
*/
class Face {

  /**
    Constructor for a new Face.

    Parameters:
      origin: CartesianVector of the origin of the face
      range: the max distance of the eyes from the origin
  */
  constructor(origin, range) {
    // The origin from which to calculate the direction
    this.origin = origin;

    // The range of the face
    this.range = range;

    // The target to follow
    this.target = undefined;

    // The direction of the face, calculated from the origin
    this.direction = new CartesianVector(0, 0);
  }

  /**
    Execute the face logic, which is to determine the direction in
    which to look, from the origin to the targer, in the given range.
  */
  logic() {
    if (this.target !== undefined) {

      // vector to target from origin polar
      const polarTarget =
        this.target.pos
        .copy()
        .substract(this.origin.pos)
        .toPolar();

      // Distance between origin and target
      const distance = polarTarget.radius;

      // Wanted direction in cartesian
      const wantedDirection =
        polarTarget
        .magnitude(this.scaleProperty(distance, 0, this.range * 2, 0, this.range))
        .toCartesian();

      // Direction vector from current direction to wanted direction in polar
      const deltaDirectionPolar = wantedDirection.substract(this.direction).toPolar();
      // Cap it to max 5 length
      deltaDirectionPolar.magnitude(Math.min(deltaDirectionPolar.radius, 5));

      // Add the delta direction vector to the current direction
      this.direction.add(deltaDirectionPolar.toCartesian())
    }
  }

  /**
    Draw the eyes.
  */
  draw(ctx) {
    const posX = this.origin.pos.x + this.direction.x;
    const posY = this.origin.pos.y + this.direction.y;

    // Draw the eyes
    this.drawEye(ctx, posX - 15, posY);
    this.drawEye(ctx, posX + 15, posY);

    // Draw the mouth
    ctx.beginPath();
    ctx.ellipse(posX, posY + 25, 7, 3, 0, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }

  /**
    Draw an eye at the given x, y position
  */
  drawEye(ctx, posX, posY) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.ellipse(
      posX,
      posY,
      5,
      15,
      0,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.closePath();
  }

  /**
    Scale a property inside a given real range to a target range.

    If the real range is of width 0, it returns the mean of targetA and targetB.
  */
  scaleProperty(val, realA, realB, targetA, targetB) {

    if (val > realB) {
      return targetB;
    }
    if (val < realA) {
      return targetA;
    }

    const realDistance = realB - realA;
    const targetDistance = targetB - targetA;
    const valDiff = val - realA;

    if (realDistance === 0) {
      return (targetB + targetA) / 2
    }

    return targetA + valDiff * (targetDistance / realDistance);
  }
}
