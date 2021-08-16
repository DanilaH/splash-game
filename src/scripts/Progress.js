import { Sprite, Text } from "pixi.js";

export class Progress {
  constructor(app) {
    this.app = app;
  }

  initialize() {
    this.initPanel();
    this.initProgressText();
    this.initProgressUnderlayer();
    this.initActiveBar();

    this.maxWidth = this.underlayer.width - 15;
    
    return this;
  }

  initPanel() {
    this.progressPanel = new Sprite(this.app.uiTextures.textures.progress)
    this.progressPanel.scale.set(0.6)
    this.progressPanel.position.set(330, 0)

    this.app.stage.addChild(this.progressPanel)
  }

  initProgressText() {
    let progressText = new Text(
      "Progress:", 
      {
        fontFamily: "Marvin", 
        fontSize: 48, 
        fill: 0xffffff,
        align: "center",
        fontWeight: 800
      });

    progressText.position.set(350, 30);
    progressText.anchor.set(0.5);

    this.progressPanel.addChild(progressText);
  }

  initProgressUnderlayer() {
    this.underlayer = new Sprite(this.app.uiTextures.textures.progressUnderlayer)
    this.underlayer.anchor.set(0.5)
    this.underlayer.position.set(this.progressPanel.width/2 + this.progressPanel.width/3, 90)

    this.progressPanel.addChild(this.underlayer);
  }

  initActiveBar() {
    this.activeBar = new Sprite(this.app.uiTextures.textures.progressActive)
    this.underlayer.addChild(this.activeBar);

    this.activeBar.anchor.set(0,0.5)
    this.activeBar.position.x = -this.underlayer.width/2.05;
    this.activeBar.scale.y = 0.55;
    this.activeBar.width = 0;
  }

  changeProgressBarWidth = (width) => this.activeBar.width = width;

  getMaxWidth = () => this.maxWidth;
}