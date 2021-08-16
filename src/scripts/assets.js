export class Assets {
  constructor(app) {
    this.app = app;
  }

  init() {
    debugger
    const loadOptions = { crossOrigin: true };
    const loader = this.app.loader;
    loader.baseUrl = "assets/";

    loader.add("gems", "gems.json", loadOptions)
          .add("ui", "ui.json", loadOptions)
          .add("progress", "progress.png")
          .add("turns", "turns.png")
          .add("progress-underlayer", "progress-underlayer.png")
          .add("progress-active", "progress-active.png")
          .load( () => this.app.runners.load.run());
  }
}