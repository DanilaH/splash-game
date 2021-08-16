import * as PIXI from "pixi.js";

export class FinishScreen {
  constructor(app) {
    this.app = app;
  }

  initialize = () => this;

  renderFinishScreen(text) {
    this.initPanel()
    this.initText(text);
    this.initSubText();
  }

  initPanel() {
    let view = this.app.view
    this.panel = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.panel.width = view.width;
    this.panel.height = view.height;
    this.panel.alpha = 0.5;
    this.panel.interactive = true;
    this.panel.on('pointerdown', this.callback)
    this.panel.tint = 0x262a33;

    this.app.stage.addChild(this.panel);
  }

  initText(text) {
    let view = this.app.view

    this.resultText = new PIXI.Text(
      `${text}`, 
      {
        fontFamily: "Marvin", 
        fontSize: 96, 
        fill: 0xffffff,
        align: "center",
        fontWeight: 800
      });
    
    this.resultText.anchor.set(0.5)
    this.resultText.position.set(view.width/2, view.height/2);
    
    this.app.stage.addChild(this.resultText)
  }

  initSubText() {
    let view = this.app.view

    this.resultText = new PIXI.Text(
      "(click on screen to restart)", 
      {
        fontFamily: "Marvin", 
        fontSize: 32, 
        fill: 0xffffff,
        align: "center",
        fontWeight: 800
      });
    
    this.resultText.anchor.set(0.5)
    this.resultText.position.set(view.width/2, view.height/2 + 96);
    
    this.app.stage.addChild(this.resultText)
  }

  setCallback = (callback) => {
    this.callback = callback;
  } 
}