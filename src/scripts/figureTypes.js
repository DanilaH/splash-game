import { getRandomInt } from "./utils";

export class FigureTypes {
  constructor(app) {
    this.app = app;
  }

  load() {
    const shapes = this.app.loader.resources["gems"].spritesheet;
    this.figuresTypes = [
      {
        texture: shapes.textures["blue-gem"],
        type: "blue",
      },
      {
        texture: shapes.textures["red-gem"],
        type: "red",
      }, 
      {
        texture: shapes.textures["purple-gem"],
        type: "purlpe",
      },
      {
        texture: shapes.textures["green-gem"],
        type: "green",
      }, 
      {
        texture: shapes.textures["yellow-gem"],
        type: "yellow",
      },
    ]

    this.bonusType = {
        texture: shapes.textures["black-gem"],
        type: "black",
    }

    this.app.runners.start.run();
  }

  getRandomFigureType = () => this.figuresTypes[getRandomInt(0, this.figuresTypes.length)];
}
