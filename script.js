// imports
import BoxManager from "./BoxManager.js";
//elements
const box = document.getElementById("box");
let boxManager = new BoxManager(10, box);
boxManager.start();
