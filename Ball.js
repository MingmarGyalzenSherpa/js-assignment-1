export default class Ball {
  constructor(
    x,
    y,
    dx,
    dy,
    w = 50,
    h = 50,
    speed = 3,
    color = "green",
    parent
  ) {
    this.x = x;
    this.y = y;
    this.velocity = {
      dx,
      dy,
    };
    this.w = w;
    this.h = h;
    this.radius = this.w / 2;
    this.color = color;
    this.parent = parent;
    this.borderRadius = "50%";
    this.createElement();
  }

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

  move() {
    this.x = this.x + this.dx * this.speed;
    this.y = this.y + this.dy * this.speed;
  }

  borderCollisionDetection() {}
}
