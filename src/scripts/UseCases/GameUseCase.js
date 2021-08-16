import { findNeighbours, concat2DArray } from "../utils";
import { finishText } from "../consts";
import { maxScores, scorePerTile, timerTime, turnsCount, shuffleBonusCount, lineBonusCount, bombBonusCount } from "../config";

export class GameUseCase {
  constructor(
    appOperator,
    progress,
    timerScorePanel,
    turns,
    bonuses,
    finishScreen,
    fieldUseCase
    ) {
    this.appOperator = appOperator;
    this.progress = progress;
    this.timerScorePanel = timerScorePanel;
    this.turns = turns;
    this.bonuses = bonuses;
    this.finishScreen = finishScreen;
    this.fieldUseCase = fieldUseCase;

    this.scores = 0;
    this.maxScores = maxScores;
    this.scorePerTile = scorePerTile;
    this.timerTime = timerTime;
    this.turnsCount = turnsCount;
    this.shuffleBonusCount = shuffleBonusCount;
    this.lineBonusCount = lineBonusCount;
    this.bombBonusCount = bombBonusCount;

    this.superBonusCount = 0

    this.currentAction = this.getElementsDefaultTurn
  }


  initialize = () => {
    this.fieldUseCase.setGameUseCase(this);

    this.timerToRemove = this.appOperator.startTimer(
      this.timerTime, 
      this.timerScorePanel.changeTimerInnerText, 
      () => this.finishScreen.renderFinishScreen(finishText.timerEnd)
    );
    
    const bonuses = this.bonuses;

    bonuses.shuffleBonus.setCallback(this.useShuffleField);
    bonuses.shuffleBonus.setCount(this.shuffleBonusCount)
    
    bonuses.lineBonus.setCallback(() => this.bonusCallback(bonuses.lineBonus, this.getElementsForLineBonus));
    bonuses.lineBonus.setCount(this.lineBonusCount)

    bonuses.bombBonus.setCallback(() => this.bonusCallback(bonuses.bombBonus, this.getElementsForBombBonus));
    bonuses.bombBonus.setCount(this.bombBonusCount)

    this.turns.changeTurnsText(`${this.turnsCount}`);
    this.initTiles();

    return this;
  }


  initTiles = () => {
    const fieldUseCase = this.fieldUseCase;

    fieldUseCase.fillTiles()
    fieldUseCase.findMatches();

    if(fieldUseCase.getMatches().length == 0) {
      this.shuffleZeroMatches();
    }
  }

  getElementsDefaultTurn = (gameTile) => {
    return gameTile.alreadyInMatch ? this.fieldUseCase.getMatches()[gameTile.indexOfMatch] : [];
  }

  getElementsForLineBonus = (gameTile) => {
    this.activateBonus(this.bonuses.lineBonus)
    return this.fieldUseCase.mainGrid[gameTile.yCoord];
  }

  getElementsForBombBonus = (gameTile) => {
    this.activateBonus(this.bonuses.bombBonus)
    return [...findNeighbours(this.fieldUseCase.mainGrid, gameTile.yCoord, gameTile.xCoord), gameTile]
  }

  activateBonus(switchableBonus) {
    const count = switchableBonus.getCount() - 1;

    switchableBonus.setCount(count);
    this.currentAction = this.getElementsDefaultTurn;

    if (count == 0) {
      switchableBonus.disableSwitchableBonus();  
    } else {
      switchableBonus.deactivateBonus();  
    }
  }

  bonusCallback = (bonus, action) => {
    if (bonus.active) {
      this.currentAction = this.getElementsDefaultTurn;
      bonus.deactivateBonus();
    } else {
      this.currentAction = action;
      bonus.activateBonus();
    }
  }

  useShuffleField = () => {
    this.fieldUseCase.shuffleField();

    const count = this.bonuses.shuffleBonus.getCount() - 1;

    this.bonuses.shuffleBonus.setCount(count);

    if (count == 0) {
      this.bonuses.shuffleBonus.disableBonus();
    }
  }

  useSuperBonus = () => {
    const match = concat2DArray(this.fieldUseCase.mainGrid)

    this.superBonusCount--;

    this.fieldUseCase.removeMatch(match);
    this.toNextTurn(match.length)
  }

  onTileDown = (event) => {
    const tile = event.target.tile;

    const match = this.currentAction(event.target.tile);

    if (match.length === 0) return; 

    this.fieldUseCase.removeMatch(match);
    
    if(match.length > 9) {
      this.addTile(tile.xCoord, tile.yCoord, true);
      this.superBonusCount++;
    }

    this.toNextTurn(match.length)
  }

  toNextTurn = (prevMatchLength) => {
    const fieldUseCase = this.fieldUseCase;

    this.addScores(prevMatchLength)

    this.checkTurns();

    fieldUseCase.resetTiles();
    fieldUseCase.fillTiles();
    fieldUseCase.findMatches();

    if (this.superBonusCount == 0 && fieldUseCase.getMatches().length == 0) {
      this.shuffleZeroMatches();
    }
  }

  checkTurns = () => {
    this.turnsCount--;

    this.turns.changeTurnsText(`${this.turnsCount}`)

    if (this.turnsCount == 0) {
      this.appOperator.removeTimer(this.timerToRemove);
      this.finishScreen.renderFinishScreen(finishText.noTurns);
    }
  }

  shuffleZeroMatches = () => {
    if (this.bonuses.shuffleBonus.getCount() == 0) {
      this.appOperator.removeTimer(this.timerToRemove);
      this.finishScreen.renderFinishScreen(finishText.noMatches);
      return;
    }

    this.useShuffleField();

    if (this.fieldUseCase.getMatches().length == 0) {
      this.shuffleZeroMatches()
    }
  }

  addScores = (matchLength) => {
    this.scores += matchLength * this.scorePerTile;

    this.timerScorePanel.changeScoreInnerText(`${this.scores}`)

    this.fillProgress();

    if (this.scores >= this.maxScores) {
      this.appOperator.removeTimer(this.timerToRemove);
      this.finishScreen.renderFinishScreen(finishText.win);
    }
  }

  fillProgress = () => {
    const maxWidth = this.progress.getMaxWidth();

    const percent = this.scores / this.maxScores * 100;
    const fill = maxWidth * percent / 100;
    
    if (percent > 100) {
      
      this.progress.changeProgressBarWidth(maxWidth);
    } else {
      this.progress.changeProgressBarWidth(fill)
    }  
  }
}