import Ball from "./Ball.js";
import Helper from "./Helper.js";

export default class BoxManager {
  balls = [];

  constructor(maxBall, container, maxMass = 3, maxSpeed = 6, baseWidth = 20) {
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
      width = (this.baseWidth * mass) / 2;
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
      x = Helper.getRandomIntInclusive(1, this.containerWidth - width - 5);
      y = Helper.getRandomIntInclusive(1, this.containerHeight - width - 5);
    } while (this.overlapsPosition(x, y, width));
    return { x, y };
  }

  overlapsPosition(x, y, width) {
    let radius = width / 2;
    let distance, requiredDistance;
    // check with boundary
    if (
      x + width > this.containerWidth - 5 ||
      y + width > this.containerHeight - 5
    )
      return true;

    //check with other balls
    for (let i = 0; i < this.balls.length; i++) {
      console.log(x + ", " + y);
      console.log(this.balls[i].x + " , " + this.balls[i].y);
      distance = Math.hypot(
        this.balls[i].x + this.balls[i].radius - x - width / 2,
        this.balls[i].y + this.balls[i].radius - y - width / 2
      );
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
