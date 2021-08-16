import { Sprite, Text } from "pixi.js";

export class Turns {
  constructor(app) {
    this.app = app;
  }

  initialize() {
    this.initPanel();
    this.initText();
    return this;
  }

  initPanel() {
    this.turnsPanel = new Sprite(this.app.uiTextures.textures.turns)
    this.turnsPanel.scale.set(0.4)
    this.turnsPanel.position.set(200, 15);

    this.app.stage.addChild(this.turnsPanel);
  }

  initText() {
    this.turnsText = new Text(
      `0`, 
      {
        fontFamily: "Marvin", 
        fontSize: 72, 
        fill: 0xffffff,
        align: "center",
        fontWeight: 800
      });

    this.turnsText.position.set(150, 20);
    this.turnsPanel.addChild(this.turnsText);
  }

  changeTurnsText = (text) => this.turnsText.text = `${text}`
}