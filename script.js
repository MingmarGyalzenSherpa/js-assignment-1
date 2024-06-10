// imports
import BoxManager from "./BoxManager.js";
import Helper from "./Helper.js";
//elements
const box = document.getElementById("box");
const maxBalls = 500;
const balls = Helper.getRandomIntInclusive(1, maxBalls);
let boxManager = new BoxManager(maxBalls, box);
boxManager.start();
