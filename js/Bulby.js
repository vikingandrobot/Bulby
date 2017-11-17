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
    this.r = 50;

    this.velocity = new CartesianVector(0, 0);

    this.maxVelocity = 10;

    this.maxForce = 1;

    this.steeringBehaviour = new SeekArrivalSteeringBehaviour(this, this.r * 6, this.r * 2);

    // The Face object
    this.face = new Face(this, this.r / 3);

    // Glow object
    this.glow = new Glow(this.r, this.r / 6, this.r / 7 * 2);

    this.target = undefined;

    this.lightParticles = [];
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

    // Get the steering from Bulby's steering behaviour
    const steering = this.steeringBehaviour.logic();

    // Calculate the resulting velocity as a polar vector
    const velocityPolar =
      this.velocity
      .copy()
      .add(steering)
      .toPolar();

    // Scale the velocity to the max velocity
    velocityPolar.magnitude(Math.min(velocityPolar.radius, this.maxVelocity));

    // Update the velocity and position
    this.velocity = velocityPolar.toCartesian();
    this.pos.add(this.velocity);

    // Apply logic for each of Bulby's particles
    for (let i = this.lightParticles.length - 1; i >= 0; --i) {
      this.lightParticles[i].logic();
      if (this.lightParticles[i].intensity <= 0) {
        this.lightParticles.splice(i, 1);
      }
    }

    // Create a new light particle at random times (quite often actually)
    if (Math.random() < 0.9999) {
      this.lightParticles.push(new LightParticle(
        new PolarVector(
          Math.random() * 2 * Math.PI, Math.random() * this.r * 1.3
        ).toCartesian().add(this.pos),
        1,
        new CartesianVector(0, -1)
      ));
    }
  }

  /**
    Draw bulby.
  */
  draw(ctx) {
    // Draw Bulby's glow
    this.glow.draw(ctx, this.pos.x, this.pos.y);

    // Draw Bulby's body
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Draw Bulby's sight
    this.face.draw(ctx);

    // Draw Bulby's particles
    for (let i = this.lightParticles.length - 1; i >= 0; --i) {
      this.lightParticles[i].draw(ctx);
    }
  }
}
