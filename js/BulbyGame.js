/**
  The BulbyGame class manages the Bulby Game and all the elements and actions
  needed to interact with the Bulby.
*/
class BulbyGame {
  constructor(canvasID) {

    // Get canvas
    this.c = document.getElementById(canvasID);
    this.ctx = this.c.getContext("2d");

    // Create bulby
    this.bulby = new Bulby(
      new CartesianVector(this.c.width/2, this.c.height/2)
    );

    // The interval id
    this.gameHeart = undefined;

    this.mouse = undefined;

    // Register events
    this.c.addEventListener("mousemove", (e) => {
      this.mouse = {pos: new CartesianVector(e.clientX, e.clientY)};
    });
  }

  start() {
    this.gameHeart = setInterval(() => {
      this.core();
    }, 1000/50);
  }

  core() {
    this.logic();
    this.draw();
  }

  logic() {

    this.bulby.look(this.mouse);

    this.bulby.logic();

  }

  draw() {
    // Resize the canvas
    this.resizeCanvas();

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    // Draw Bulby
    this.bulby.draw(this.ctx);
  }

  /**
    Resize the canvas
  */
  resizeCanvas() {
    this.c.width = $(window).outerWidth();
    this.c.height = $(window).outerHeight();
  }
}
