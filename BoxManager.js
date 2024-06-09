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
    this.containerWidth = this.container.offsetWidth;
    this.containerHeight = this.container.offsetHeight;
    this.generateBalls();
    setInterval(() => console.log(this.balls), 2000);
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
    let distance, requiredDistance;
    // check with boundary
    if (
      x + width > this.containerWidth - 5 ||
      y + width > this.containerHeight - 5
    )
      return true;

    //check with other balls
    for (let i = 0; i < this.balls.length; i++) {
      distance = Math.hypot(this.balls[i].x - x, this.balls[i].y - y);
      requiredDistance = radius + this.balls[i].radius;
      if (distance <= requiredDistance) {
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
