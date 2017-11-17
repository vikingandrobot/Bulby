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

    this.circleWaves = [];

    // Register events
    this.c.addEventListener('mousemove', (e) => {
      this.mouse = {pos: new CartesianVector(e.clientX, e.clientY)};
    });

    this.c.addEventListener('mousedown', (e) => {
      this.circleWaves.push(
        new CircleWave(new CartesianVector(e.clientX, e.clientY), 10)
      );
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

    if (this.circleWaves.length > 0) {
      this.bulby.look(this.circleWaves[0]);
    } else {
      this.bulby.look(this.mouse);
    }

    for (let i = this.circleWaves.length - 1; i >= 0; --i) {
      this.circleWaves[i].logic();
      if (this.circleWaves[i].isDead()) {
        this.circleWaves.splice(i, 1);
      }
    }

    this.bulby.logic();

  }

  draw() {
    // Resize the canvas
    this.resizeCanvas();

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    // Draw some circle waves
    for (let i = this.circleWaves.length - 1; i >= 0; --i) {
      this.circleWaves[i].draw(this.ctx);
    }

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
