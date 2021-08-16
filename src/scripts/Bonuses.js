import { Text } from "pixi.js";

export class Bonuses {
  constructor(app, shuffleBonus, lineBonus, bombBonus) {
    this.app = app;

    this.shuffleBonus = shuffleBonus;
    this.lineBonus = lineBonus;
    this.bombBonus = bombBonus;
  }

  initialize() {
    this.initText();
    return this;
  }

  initText() {
    let bonusesText = new Text(
      "Bonuses", 
      {
        fontFamily: "Marvin", 
        fontSize: 32, 
        fill: 0xffffff,
        align: "center",
        fontWeight: 800
      });
    
    bonusesText.position.set(700, 530)
    this.app.stage.addChild(bonusesText)
  }
}