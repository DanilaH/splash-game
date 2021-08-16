export class AppOperator {
  constructor(app) {
    this.app = app;
  }

  startTimer(timeInSeconds, changeTextCallBack, onEndCallback) {
    const ticker = this.app.ticker;
    let seconds = timeInSeconds;

    const timer = function() {
      seconds -= ticker.elapsedMS / 1000

      let val = Math.floor(seconds);

      if (val <= 0) {
        ticker.remove(timer);
        changeTextCallBack(`${0}`);
        onEndCallback()
      }

      changeTextCallBack(`${Math.floor(seconds)}`);
    }

    ticker.add(timer);

    return timer;
  }

  removeTimer = (timerToRemove) => this.app.ticker.remove(timerToRemove);

  removeElement = (element) => this.app.stage.removeChild(element);

  destroyAll = () => {
    while(this.app.stage.children[0]) { 
      this.app.stage.removeChild(this.app.stage.children[0]);
    }
  } 

  addElement = (element) => this.app.stage.addChild(element);
}