// imports
import BoxManager from "./BoxManager.js";
import Helper from "./Helper.js";
//elements
const box = document.getElementById("box");
const maxBalls = 100;
const balls = Helper.getRandomIntInclusive(1, maxBalls);
let boxManager = new BoxManager(balls, box);
boxManager.start();
