import gsap from "gsap/gsap-core";
import { Sprite, Text } from "pixi.js";

export class Bonus {
  constructor(app, XPosition, bonusTypeText) {
    this.app = app;
    this.active = false;

    this.initBonus(XPosition, bonusTypeText);
    this.initBonusCountText();
    this.initBonusTypeText(bonusTypeText);
  }

  initBonus(XPosition) {
    this.bonusElement = new Sprite(this.app.uiTextures.textures.bonus);

    this.bonusElement.position.set(XPosition, 575);
    this.bonusElement.scale.set(0.25);
    this.bonusElement.interactive = true;

    this.app.stage.addChild(this.bonusElement)
  }

  initBonusCountText() {
    this.bonusCountText = new Text(
      "0", 
      {
        fontFamily: "Marvin", 
        fontSize: 32, 
        fill: 0xffffff,
        align: "center",
        fontWeight: 800
      });

    this.bonusElement.addChild(this.bonusCountText)

    this.bonusCountText.scale.set(3.4)
    this.bonusCountText.position.set(150, 255)
  }

  initBonusTypeText(bonusTypeText) {
    this.bonusType = new Text(
      `${bonusTypeText}`, 
      {
        fontFamily: "Marvin", 
        fontSize: 32, 
        fill: 0xffffff,
        align: "center",
        fontWeight: 800
      });

    this.bonusType.scale.set(3.4)
    this.bonusType.position.set(65, 90)

    this.bonusElement.addChild(this.bonusType)
  }

  setBonusTypeScale = (scale) => this.bonusType.scale.set(scale);
  setBonusTypePosition = (x, y) => this.bonusType.position.set(x, y);

  setCallback = (callback) => this.bonusElement.on("pointerdown", callback);
  setCount = (count) => {
    this.count = count;
    this.bonusCountText.text = `${count}`;
  }
  getCount = () => this.count;

  disableBonus = () => {
    this.active = false;
    this.bonusElement.interactive = false;

    gsap.to(
      this.bonusElement, 
      { 
        pixi: {
          alpha: 0.3
        }, 
        duration: 0.4,
      } 
    )
  }
}