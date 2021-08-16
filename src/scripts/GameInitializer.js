import { AppOperator } from "./AppOperator";
import { Bonus } from "./Bonus";
import { Bonuses } from "./Bonuses";
import { BonusSwitchable } from "./BonusSwitchable";
import { FieldPanel } from "./FieldPanel";
import { FieldUseCase } from "./UseCases/FieldUseCase";
import { FinishScreen } from "./FinishScreen";
import { GameUseCase } from "./UseCases/GameUseCase";
import { Progress } from "./Progress";
import { TimerScorePanel } from "./TimerScorePanel";
import { Turns } from "./Turns";

export class GameInitializer {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.appOperator = new AppOperator(this.app)
    this.progress = new Progress(this.app).initialize();
    this.timerScorePanel = new TimerScorePanel(this.app).initialize();
    this.field = new FieldPanel(this.app).initialize();
    this.turns = new Turns(this.app).initialize();
    this.bonuses = new Bonuses(
      this.app,
      new Bonus(this.app, 570, "shuffle"),
      new BonusSwitchable(this.app, 705, "destroy\nx"),
      new BonusSwitchable(this.app, 840, "bomb"),  
    ).initialize();
    
    this.finishScreen = new FinishScreen(this.app).initialize();
    
    this.fieldUseCase = new FieldUseCase(
      this.app.figureTypes,
      this.field
    );

    this.gameUseCase = new GameUseCase(
      this.appOperator,
      this.progress,
      this.timerScorePanel,
      this.turns,
      this.bonuses,
      this.finishScreen,
      this.fieldUseCase
    ).initialize();

    this.finishScreen.setCallback(() => {
      this.appOperator.destroyAll();
      this.start();
    });

    this.bonuses.lineBonus.setBonusTypeScale(3)
    this.bonuses.lineBonus.setBonusTypePosition(65, 50)
    this.bonuses.bombBonus.setBonusTypePosition(85, 90)
  }
}