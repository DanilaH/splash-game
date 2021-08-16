import { Sprite, Text } from "pixi.js";

export class TimerScorePanel {
    constructor(app) {
      this.app = app;
    }

    initialize() {
      this.initPanel();
      this.initTimerText();
      this.initScoreText();
      this.initTimerInner();
      this.initScoreTextInner();

      return this;
    }

    initPanel() {
      this.panel = new Sprite(this.app.uiTextures.textures.panelScore)
      this.panel.scale.set(0.35)
      this.panel.position.set(560, 125)
      this.app.stage.addChild(this.panel)
    }

    initTimerText() {
      let timeText = new Text(
        "Time:", 
        {
          fontFamily: "Marvin", 
          fontSize: 32, 
          fill: 0xffffff,
          align: "center",
          fontWeight: 800
        });
      

      timeText.anchor.set(0.5)
      timeText.scale.set(4);
      timeText.x = 550;
      timeText.y = 75;

      this.panel.addChild(timeText);
    }

    initScoreText() {
      let score = new Text(
        "Score:", 
        {
          fontFamily: "Marvin", 
          fontSize: 32, 
          fill: 0xffffff,
          align: "center",
          fontWeight: 800
        })
        
      score.anchor.set(0.5);
      score.scale.set(4);
      score.x = 550;
      score.y = 850;

      this.panel.addChild(score);
    }

    initTimerInner() {
      this.timerText = new Text(
        "0", 
        {
          fontFamily: "Marvin", 
          fontSize: 72, 
          fill: 0xffffff,
          align: "center",
          fontWeight: 800
        });

      this.timerText.anchor.set(0.5)
      this.timerText.scale.set(4);
      this.timerText.x = 550;
      this.timerText.y = 460;

      this.panel.addChild(this.timerText);
    }

    changeTimerInnerText = (text) => this.timerText.text = `${text}`;

    initScoreTextInner() {
      this.scoreText = new Text(
        "0", 
        {
          fontFamily: "Marvin", 
          fontSize: 32, 
          fill: 0xffffff,
          align: "center",
          fontWeight: 800
        })

      this.scoreText.anchor.set(0.5);
      this.scoreText.scale.set(4);
      this.scoreText.x = 550;
      this.scoreText.y = 970;

      this.panel.addChild(this.scoreText);
    }
    
    changeScoreInnerText = (text) => this.scoreText.text = `${text}`;
}