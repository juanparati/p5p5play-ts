/**
 * Demo implementation for p5.play in Typescript.
 * This includes typehinting in JetBrains IDE
 */
import type P5PlayContext from "./libs/@types/P5PlayContext";

import "./libs/p5-loader";
import "./libs/p5play-loader";

import "./styles.scss";

// Creating the sketch itself
const sketch = (p5: P5PlayContext) => {

  let ball: Sprite;
  let floor: Sprite;

  // The sketch setup method
  p5.setup = () => {

    // Creating and positioning the canvas
    const canvas = p5.createCanvas(600, 500);
    canvas.parent("app");

    p5.world.gravity.y = 10;

    ball = new p5.Sprite(300, 30, 50);
    ball.vel.y = 2;

    floor = new p5.Sprite(300, 400, 80, 5, 'static');
  };


  // The sketch draw method
  p5.draw = () => {
    p5.background(255);

    if (ball.collides(floor)) {
      ball.vel.y = -5;
    }
  };

  p5.mouseClicked = (_e: MouseEvent) => {
    ball.color = p5.color(genRandomColor(), genRandomColor(), genRandomColor())
  }

  const genRandomColor = () : number => {
    return Math.floor(Math.random() * (255 + 1));
  }
};

new window['p5'](sketch);
