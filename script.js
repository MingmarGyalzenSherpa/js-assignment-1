// imports
import BoxManager from "./BoxManager.js";
//elements
const box = document.getElementById("box");
let boxManager = new BoxManager(20, box);
boxManager.start();
