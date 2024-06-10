import Helper from "./Helper.js";

export default class Ball {
  colors = ["green", "pink", "yellow", "red", "purple"];

  constructor(x, y, mass, width, speed, parent) {
    this.parent = parent;
    this.mass = mass;
    //generate Random size
    this.w = width;
    this.h = this.w;
    //generate random locations
    this.x = x;
    this.y = y;
    // generate random unit vector
    this.vector = {
      dx: Helper.getRandomIntInclusive(-1, 1),
      dy: Helper.getRandomIntInclusive(-1, 1),
    };

    // generate speed
    this.speed = speed;
    // calculate radius
    this.radius = this.w / 2;

    this.cx = this.x + this.radius;
    this.cy = this.y + this.radius;
    // generate random color
    this.color =
      this.colors[Helper.getRandomIntInclusive(0, this.colors.length - 1)];

    // set border radius
    this.createElement();
  }

  // create DOM element
  createElement() {
    this.element = document.createElement("div");
    this.element.style.backgroundColor = this.color;
    this.element.classList.add("circle");
    this.element.style.borderRadius = "50%";
    this.element.style.width = `${this.w}px`;
    this.element.style.height = `${this.h}px`;
    // this.element.style.left = `${this.x}px`;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    // this.element.style.top = `${this.y}px`;
    this.parent.appendChild(this.element);
  }

  // move the ball
  move() {
    this.x = this.x + this.vector.dx * this.speed;
    this.y = this.y + this.vector.dy * this.speed;
    this.cx = this.x + this.radius;
    // console.log({ x: this.x, vectorX: this.vector.dx, speed: this.speed });
    this.cy = this.y + this.radius;
  }

  updateElement() {
    // this.element.style.left = `${this.x}px`;
    // this.element.style.top = `${this.y}px`;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  collisionWithOtherBallDetection(balls) {
    let distanceRequired, distance, distanceSqr, overlap;

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
      if (this === ball) return;

      // calculate the required/minimum distance
      // distanceRequiredSqr = Math.pow(this.radius + ball.radius, 2);
      distanceRequired = this.radius + ball.radius;

      // distanceSqr = Math.pow(cx2 - cx1, 2) + Math.pow(cy2 - cy1, 2);
      distance = Math.hypot(ball.cx - this.cx, ball.cy - this.cy) + 0.0001;
      if (distanceRequired < distance) return; //no collision
      overlap = distanceRequired - distance;
      // console.log("collision done");
      this.x -= (overlap * (ball.cx - this.cx)) / distance;
      this.y -= (overlap * (ball.cy - this.cy)) / distance;
      ball.x += (overlap * (ball.cx - this.cx)) / distance;
      ball.y += (overlap * (ball.cy - this.cy)) / distance;

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
        x: this.cx - ball.cx,
        y: this.cy - ball.cy,
      };

      ball2DifferenceVector = {
        x: ball.cx - this.cx,
        y: ball.cy - this.cy,
      };
      // console.log({ thisCx: this.cx, thisCy: this.cy });
      // console.log({ ballCx: this.cx, ballCy: this.cy });

      //calculate dot product
      dotProduct1 =
        velocity12.x * ball1DifferenceVector.x +
        velocity12.y * ball1DifferenceVector.y;
      dotProduct2 =
        velocity21.x * ball2DifferenceVector.x +
        velocity21.y * ball2DifferenceVector.y;

      // console.log(velocity12);
      // console.log(velocity21);
      // calculate massFactor
      massFactor1 = (2 * ball.mass) / (this.mass + ball.mass);
      massFactor2 = (2 * this.mass) / (this.mass + ball.mass);

      // calculate distacne square
      distanceSqr = Math.pow(distance, 2);
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
      // this.speed = Math.sqrt(
      //   Math.pow(finalVelocity1.x, 2) + Math.pow(finalVelocity1.y, 2)
      // );
      this.speed = Math.hypot(finalVelocity1.x, finalVelocity1.y);
      if (this.speed == 0) {
        this.vector.dx = 0;
        this.vector.dy = 0;
      } else {
        this.vector.dx = finalVelocity1.x / this.speed;
        this.vector.dy = finalVelocity1.y / this.speed;
        if (this.speed > 20) this.speed = 20;
      }

      // ball.speed = Math.sqrt(
      //   Math.pow(finalVelocity2.x, 2) + Math.pow(finalVelocity2.y, 2)
      // );
      ball.speed = Math.hypot(finalVelocity2.x, finalVelocity2.y);
      if (ball.speed == 0) {
        ball.vector.dx = 0;
        ball.vector.dy = 0;
      } else {
        ball.vector.dx = finalVelocity2.x / ball.speed;
        ball.vector.dy = finalVelocity2.y / ball.speed;
        if (ball.speed > 20) ball.speed = 20;
      }
    });
  }

  borderCollisionDetection() {
    if (this.x <= 0 || this.x + this.w >= this.parent.offsetWidth) {
      this.x = this.x <= 0 ? 0 : this.parent.offsetWidth - this.w - 10;
      this.vector.dx = -this.vector.dx;
    }

    if (this.y <= 0 || this.y + this.h >= this.parent.offsetHeight) {
      this.y = this.y <= 0 ? 0 : this.parent.offsetHeight - this.h - 10;
      this.vector.dy = -this.vector.dy;
    }
  }
}
