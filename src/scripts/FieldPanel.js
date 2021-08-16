import { Sprite } from "pixi.js";

export class FieldPanel {
  constructor(app) {
    this.app = app;
  }

  initialize() {
    this.initField();

    return this;
  }

  initField() {
    this.field = new Sprite(this.app.uiTextures.textures.gameField)
    this.field.scale.set(0.6, 0.6);
    this.field.position.set(25, 125)
    this.field.sortableChildren = true;

    this.app.stage.addChild(this.field);
  }

  addChild = (child) => this.field.addChild(child);
  
  update = () => this.field.updateTransform();
}