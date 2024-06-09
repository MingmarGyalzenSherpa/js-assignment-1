import Ball from "./Ball.js";

export default class BoxManager {
  balls = [];
  constructor(maxBall, container) {
    this.maxBall = maxBall;
    this.container = container;
    this.generateBalls();
  }

  //   generate balls
  generateBalls() {
    for (let i = 0; i < this.maxBall; i++) {
      this.balls.push(new Ball(this.container));
    }
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
