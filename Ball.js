import Helper from "./Helper.js";

export default class Ball {
  #maxSize = 90;
  #maxSpeed = 4;
  colors = ["green", "pink", "yellow", "red", "purple"];
  constructor(parent) {
    this.parent = parent;

    //generate Random size
    this.w = Helper.getRandomIntInclusive(1, this.#maxSize);
    this.h = this.w;
    console.log(parent.offsetWidth);
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
    console.log({ x: this.x, y: this.y });
  }

  updateElement() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  collisionWithOtherBallDetection(balls) {
    let cx2, cy2, distanceRequiredSqr, distanceSqr;
    let cx1 = this.x + this.radius;
    let cy1 = this.y + this.radius;
    balls.forEach((ball) => {
      if (this == ball) return;
      // calculate the center of ball
      cx2 = ball.x + ball.radius;
      cy2 = ball.y + ball.radius;
      // calculate the required distance
      distanceRequiredSqr = Math.pow(this.radius + ball.radius, 2);
      distanceSqr = Math.pow(Math.pow(cx2 - cx1, 2) + Math.pow(cy2 - cy1, 2));
      if(distanceRequiredSqr < distanceSqr) return; //no collision
      
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
