class Circle {
  static get MAX_R() {
    return 100;
  }

  constructor(position, growRate) {
    this.pos = position;
    this.r = 1;
    this.growRate = growRate;
    this.opacity = 1;
    this.opacityRate = 1 / (Circle.MAX_R / this.growRate);
  }

  logic() {
    this.r += this.growRate;
    this.opacity -= this.opacityRate;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    ctx.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
    ctx.stroke();
    ctx.closePath();
  }

  isDead() {
    return this.r > Circle.MAX_R;
  }
}
