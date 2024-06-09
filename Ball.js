import Helper from "./Helper.js";

export default class Ball {
  #maxSize = 90;
  #maxSpeed = 4;
  colors = ["green", "pink", "yellow", "red", "purple"];
  constructor(parent) {
    this.parent = parent;
    this.mass = 2;
    //generate Random size
    this.w = Helper.getRandomIntInclusive(1, this.#maxSize);
    this.h = this.w;
    //generate random locations
    this.x = Helper.getRandomIntInclusive(0, parent.offsetWidth - (this.w + 5));
    this.y = Helper.getRandomIntInclusive(
      0,
      parent.offsetHeight - (this.h + 5)
    );
    // generate random unit vector
    this.vector = {
      dx: Helper.getRandomIntInclusive(-1, 1),
      dy: Helper.getRandomIntInclusive(-1, 1),
    };

    // generate speed
    this.speed = Helper.getRandomIntInclusive(0, this.#maxSpeed);
    // calculate radius
    this.radius = this.w / 2;
    // generate random color
    this.color =
      this.colors[Helper.getRandomIntInclusive(0, this.colors.length - 1)];

    // set border radius
    this.borderRadius = "50%";
    this.createElement();
  }

  // create DOM element
  createElement() {
    this.element = document.createElement("div");
    this.element.style.backgroundColor = this.color;
    this.element.classList.add("circle");
    this.element.style.borderRadius = this.borderRadius;
    this.element.style.width = `${this.w}px`;
    this.element.style.height = `${this.h}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.parent.appendChild(this.element);
  }

  // move the ball
  move() {
    this.x = this.x + this.vector.dx * this.speed;
    this.y = this.y + this.vector.dy * this.speed;
  }

  updateElement() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  collisionWithOtherBallDetection(balls) {
    let cx2, cy2, distanceRequiredSqr, distanceSqr;
    let cx1 = this.x + this.radius;
    let cy1 = this.y + this.radius;
    //calculate velocity of ball 1
    let velocity1 = {
      x: this.vector.dx * this.speed,
      y: this.vector.dy * this.speed,
    };
    let velocity2,
      velocity12,
      velocity21,
      ball1DifferenceVector,
      ball2DifferenceVector,
      dotProduct1,
      dotProduct2,
      massFactor1,
      massFactor2,
      finalVelocity1,
      finalVelocity2;
    balls.forEach((ball) => {
      if (this == ball) return;
      // calculate the center of ball
      cx2 = ball.x + ball.radius;
      cy2 = ball.y + ball.radius;
      // calculate the required/minimum distance
      distanceRequiredSqr = Math.pow(this.radius + ball.radius, 2);

      distanceSqr = Math.pow(cx2 - cx1, 2) + Math.pow(cy2 - cy1, 2);

      if (distanceRequiredSqr < distanceSqr) return; //no collision

      //calculate velocity of ball 2
      velocity2 = {
        x: ball.vector.dx * ball.speed,
        y: ball.vector.dy * ball.speed,
      };
      //calculate relative velocity v12
      velocity12 = {
        x: velocity1.x - velocity2.x,
        y: velocity1.y - velocity2.y,
      };
      //calculate relative velocity v21
      velocity21 = {
        x: velocity2.x - velocity1.x,
        y: velocity2.y - velocity1.y,
      };

      //calculate ball1 difference vector
      ball1DifferenceVector = {
        x: cx1 - cx2,
        y: cy1 - cy2,
      };

      ball2DifferenceVector = {
        x: cx2 - cx1,
        y: cy2 - cy1,
      };

      //calculate dot product
      dotProduct1 =
        velocity12.x * ball1DifferenceVector.x +
        velocity12.y * ball1DifferenceVector.y;
      dotProduct2 =
        velocity21.x * ball2DifferenceVector.x +
        velocity21.y * ball2DifferenceVector.y;

      // calculate massFactor
      massFactor1 = (2 * ball.mass) / (this.mass + ball.mass);
      massFactor2 = (2 * this.mass) / (this.mass + ball.mass);

      // calculate final velocity
      finalVelocity1 = {
        x:
          velocity1.x -
          ((massFactor1 * dotProduct1) / distanceSqr) * ball1DifferenceVector.x,
        y:
          velocity1.y -
          ((massFactor1 * dotProduct1) / distanceSqr) * ball1DifferenceVector.y,
      };

      finalVelocity2 = {
        x:
          velocity2.x -
          ((massFactor2 * dotProduct2) / distanceSqr) * ball2DifferenceVector.x,
        y:
          velocity2.y -
          ((massFactor2 * dotProduct2) / distanceSqr) * ball2DifferenceVector.y,
      };

      // update the speed and vector
      this.speed = Math.sqrt(
        Math.pow(finalVelocity1.x, 2) + Math.pow(finalVelocity1.y, 2)
      );
      this.vector.dx = finalVelocity1.x / this.speed;
      this.vector.dy = finalVelocity1.y / this.speed;

      ball.speed = Math.sqrt(
        Math.pow(finalVelocity2.x, 2) + Math.pow(finalVelocity2.y, 2)
      );
      ball.vector.dx = finalVelocity2.x / ball.speed;
      ball.vector.dy = finalVelocity2.y / ball.speed;
    });
  }

  borderCollisionDetection() {
    if (this.x <= 0 || this.x + this.w >= this.parent.offsetWidth) {
      this.vector.dx = -this.vector.dx;
    }

    if (this.y <= 0 || this.y + this.h >= this.parent.offsetHeight) {
      this.vector.dy = -this.vector.dy;
    }
  }
}