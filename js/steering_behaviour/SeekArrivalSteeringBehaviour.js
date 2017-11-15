/**
  Seek steering behaviour. The behaviour uses the parent object and the parent
  object must have the properties
    target
    maxForce
    velocity
    maxVelocity
    pos
*/
class SeekArrivalSteeringBehaviour {
  constructor(parent, slowingRadius, stopDistance) {
    this.parent = parent;
    this.slowingRadius = slowingRadius;
    this.stopDistance = stopDistance;
  }

  logic() {
    if (this.parent.target !== undefined) {

      // The desired velocity, a polar vector from the parent to the target
      let desiredVelocityPolar =
        this.parent.target.pos.copy()
        .substract(this.parent.pos)
        .toPolar();

      // Distance to the target
      const distance = desiredVelocityPolar.radius;

      // The default magnitude is the maximum velocity
      let magnitude = this.parent.maxVelocity;

      // If we are inside the slowing radius, we slow down
      if (distance < this.slowingRadius) {
        magnitude *= ((distance - this.stopDistance) / this.slowingRadius);
      }

      // Calculate the scaled, cartesian desired veolcity vector
      const desiredVelocity =
        desiredVelocityPolar
        .magnitude(magnitude)
        .toCartesian();

      // Steering force as polar vector
      const steeringPolar = desiredVelocity.substract(this.parent.velocity).toPolar();
      steeringPolar.magnitude(Math.min(steeringPolar.radius, this.parent.maxForce));

      // Resulting velocity in polar vector
      const velocityPolar =
        this.parent.velocity
        .copy()
        .add(steeringPolar.toCartesian())
        .toPolar();

      // Scale the velocity to the max velocity
      velocityPolar.magnitude(Math.min(velocityPolar.radius, this.parent.maxVelocity));

      // Return the max velocity
      return velocityPolar.toCartesian();
    }

    // Return a 0 vector
    return new CartesianVector(0, 0);
  }
}
