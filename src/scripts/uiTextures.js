export class UITextures {
  constructor(app) {
    this.app = app;
  }

  load() {
    const resources = this.app.loader.resources;

    this.textures = {
      panelScore: resources["ui"].spritesheet.textures["panel-score"],
      gameField: resources["ui"].spritesheet.textures["game-field"],
      bonus: resources["ui"].spritesheet.textures["bonus"],
      pause: resources["ui"].spritesheet.textures["pause"],
      turns: resources["turns"].texture,
      progress: resources["progress"].texture,
      progressActive: resources["progress-active"].texture,
      progressUnderlayer: resources["progress-underlayer"].texture
    }
  }
}