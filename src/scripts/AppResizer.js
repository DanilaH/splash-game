export class AppResizer {
  constructor(app) {
    this.app = app;
    this.ratio  = this.app.view.width / this.app.view.height;
    
  }

  init() {
    this.resize();
    window.onresize = this.resize;
    
  }

  resolutionGreaterThenRatio = () => window.innerWidth / window.innerHeight >= this.ratio;

  resize = () => {
    const condition =  this.resolutionGreaterThenRatio();
    const width = condition ? window.innerHeight * this.ratio : window.innerWidth;
    const height = condition ? window.innerHeight : window.innerWidth / this.ratio;
    this.app.renderer.view.style.width = width + 'px';
    this.app.renderer.view.style.height = height + 'px';
  }
}