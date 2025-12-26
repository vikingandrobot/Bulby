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
      new CartesianVector(this.c.width / 2, this.c.height / 2),
      60
    );
    this.bulbies = [];
    for (let i = 0; i < 5; ++i) {
      this.bulbies.push(
        new Bulby(
          new CartesianVector(this.c.width / (i + 1), this.c.height / (i + 1)),
          60 - 2 * i
        )
      );
    }

    // The interval id
    this.gameHeart = undefined;

    // Object to keep track of the last mouse moved position
    this.mouse = undefined;

    // List of CirceWave objects
    this.circleWaves = [];

    // Register events
    this.c.addEventListener("mousemove", (e) => {
      this.mouse = { pos: new CartesianVector(e.clientX, e.clientY) };
    });

    this.c.addEventListener("mousedown", (e) => {
      this.circleWaves.push(
        new CircleWave(new CartesianVector(e.clientX, e.clientY), 10)
      );
    });
  }

  /**
    Start the game
  */
  start() {
    this.gameHeart = setInterval(() => {
      this.core();
    }, 1000 / 50);
  }

  /**
    Game core.
  */
  core() {
    this.logic();
    this.draw();
  }

  /**
    Game logic. Calls every appropriate method of maneged objects.
  */
  logic() {
    // If there is circle waves, make Bulby look at the oldest
    if (this.circleWaves.length > 0) {
      this.bulby.look(this.circleWaves[0]);
    } else {
      this.bulby.look(this.mouse);
    }

    for (let i = this.bulbies.length - 1; i >= 1; --i) {
      this.bulbies[i].look(this.bulbies[i - 1]);
    }
    this.bulbies[0].look(this.bulby);

    // Call logic of each of the circle waves
    for (let i = this.circleWaves.length - 1; i >= 0; --i) {
      this.circleWaves[i].logic();
      if (this.circleWaves[i].isDead()) {
        this.circleWaves.splice(i, 1);
      }
    }

    // Bulby's logic
    this.bulby.logic();

    for (let i = 0; i < this.bulbies.length; ++i) {
      this.bulbies[i].logic();
    }
  }

  /**
    Draw the game. Calls the appropriate method of each managed objects.
  */
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

    for (let i = 0; i < this.bulbies.length; ++i) {
      this.bulbies[i].draw(this.ctx);
    }
  }

  /**
    Resize the canvas
  */
  resizeCanvas() {
    this.c.width = $(window).outerWidth();
    this.c.height = $(window).outerHeight();
  }
}
