import * as PIXI from "pixi.js";
import { Assets } from "./assets.js"
import { FigureTypes } from "./figureTypes.js";
import { UITextures } from "./uiTextures.js";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import { GameInitializer } from "./GameInitializer.js";
import { AppResizer } from "./AppResizer.js";


export class Application {
    constructor() {
      gsap.registerPlugin(PixiPlugin);
      PixiPlugin.registerPIXI(PIXI);

      const options = {
        width: 970,
        height: 700,
        backgroundColor: 0x1099bb,
        antialias: true,
        resolution: 1,
        autoDensity: true,
        autoResize: true,
        resizeTo: window
      };

      this.renderer = new PIXI.Renderer(options);

      this.stage = new PIXI.Container();
      this.ticker = new PIXI.Ticker();
      this.ticker.add(() => {
        this.render();
      }, PIXI.UPDATE_PRIORITY.LOW);

      this.ticker.start();

      this.runners = {
        init: new PIXI.Runner("init", 0),
        load: new PIXI.Runner("load", 0),
        start: new PIXI.Runner("start", 1)
      };

      this.loader = new PIXI.Loader();

      this.addComponent((this.assets = new Assets(this)));
      this.addComponent((this.uiTextures = new UITextures(this)));
      this.addComponent((this.figureTypes = new FigureTypes(this)));
      this.addComponent((this.gameInitializer = new GameInitializer(this)));
      this.addComponent((this.appResizer = new AppResizer(this)));
    };

    addComponent(comp) {
      for (let key in this.runners) {
        let runner = this.runners[key];
        runner.add(comp);
      }
    }

    get view() {
      return this.renderer.view;
    }
  
    get screen() {
      return this.renderer.screen;
    }
  
    render() {
      this.renderer.render(this.stage);
    }
  
    destroy() {
      this.renderer.destroy();
      this.ticker.destroy();
    }

    test(){
      let type = "WebGL";
      if(!PIXI.utils.isWebGLSupported()){
          type = "canvas";
      }
      PIXI.utils.sayHello(type);
    }
}

if (module.hot) module.hot.accept();