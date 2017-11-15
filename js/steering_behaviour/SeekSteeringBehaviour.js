/**
  Seek steering behaviour. The behaviour uses the parent object and the parent
  object must have the properties
    target
    maxForce
    velocity
    maxVelocity
    pos
*/
class SeekSteeringBehaviour {
  constructor(parent) {
    this.parent = parent;
  }

  logic() {
    if (this.parent.target !== undefined) {

      const desiredVelocity =
        this.parent.target.pos.copy()
        .substract(this.parent.pos)
        .toPolar()
        .magnitude(this.parent.maxVelocity)
        .toCartesian();

      const steeringPolar = desiredVelocity.substract(this.parent.velocity).toPolar();
      steeringPolar.magnitude(Math.min(steeringPolar.radius, this.parent.maxForce));

      const velocityPolar =
        this.parent.velocity
        .copy()
        .add(steeringPolar.toCartesian())
        .toPolar();

      velocityPolar.magnitude(Math.min(velocityPolar.radius, this.parent.maxVelocity));
      return velocityPolar.toCartesian();
    }
  }
}
