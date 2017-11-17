/**
  The LightParticle class is a basic particle class that allows
  to create light particles and give them an initial speed vector.

  The light particles will move following that speed vector and slowly
  fade away loosing a random amount of light intensity per frame
*/
class LightParticle {

  /**
    Constructor of LightParticle.

    Parameters:
      position: the initial position, CartesianVector
      radius: the radius of the particle
      initialSpeed: the initialSpeed of the particle, CartesianVector
  */
  constructor(position, radius, initialSpeed) {
    // The light intensity of the particle [0, 1]
    this.intensity = 1;

    // The intensity the particle looses per frame
    this.intensityLoss = Math.random() * 0.05 + 0.005;

    // The velocity of the particle as a CartesianVector
    this.velocity = initialSpeed;

    // The position of the particle as a CartesianVector
    this.pos = position;

    // The radius of the particle
    this.radius = radius;
  }

  /**
    Apply the logic of the light particle.
  */
  logic() {
    // Loose intensity
    this.intensity = Math.max(this.intensity - this.intensityLoss, 0);

    // Apply velocity
    this.pos.add(this.velocity);
  }

  /**
    Draw the LightParticle
  */
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.intensity})`;
    if (this.radius <= 1) {
      ctx.fillRect(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    } else {
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
    ctx.closePath();
  }

}
