import Ball from "./Ball.js";
import Helper from "./Helper.js";

export default class BoxManager {
  balls = [];

  constructor(maxBall, container, maxMass = 5, maxSpeed = 6, baseWidth = 10) {
    this.maxBall = maxBall;
    this.container = container;
    this.maxMass = maxMass;
    this.maxSpeed = maxSpeed;
    this.baseWidth = baseWidth;
    this.generateBalls();
  }

  //get Mass, baseWidth,

  //   generate balls
  generateBalls() {
    let mass, width, speed;
    let x, y;
    for (let i = 0; i < this.maxBall; i++) {
      //generate random mass
      mass = Helper.getRandomIntInclusive(1, this.maxMass);
      // calculate width
      width = this.baseWidth * mass;
      //generate random speed
      speed = Helper.getRandomIntInclusive(0, this.maxSpeed);
      //generate random x and y
      ({ x, y } = this.generateRandomPosition(width));
      console.log(x, y);

      //check with other boxes , if no overlap push

      this.balls.push(new Ball(x, y, mass, width, speed, this.container));
    }
  }

  generateRandomPosition(width) {
    let x, y;
    do {
      x = Helper.getRandomIntInclusive(
        1,
        this.container.offsetWidth - width + 5
      );
      y = Helper.getRandomIntInclusive(
        1,
        this.container.offsetHeight - width + 5
      );
    } while (this.overlapsPosition(x, y, width));
    return { x, y };
  }

  overlapsPosition(x, y, width) {
    let radius = x + width / 2;
    let distanceSqr, requiredDistanceSqr;
    // check with boundary
    if (
      x + width > this.container.offsetWidth - 5 ||
      y + width > this.container.offsetHeight - 5
    )
      return true;

    //check with other balls
    for (let i = 0; i < this.balls.length; i++) {
      distanceSqr =
        Math.pow(this.balls[i].x - x, 2) + Math.pow(this.balls[i].y - y, 2);
      requiredDistanceSqr = Math.pow(radius + this.balls[i].radius, 2);
      if (distanceSqr <= requiredDistanceSqr) {
        return true;
      }
    }
    return false;
  }

  //   start animation
  start = () => {
    this.balls.forEach((ball) => {
      ball.move();
      ball.borderCollisionDetection();
      ball.collisionWithOtherBallDetection(this.balls);
      ball.updateElement();
    });

    requestAnimationFrame(this.start);
  };
}
