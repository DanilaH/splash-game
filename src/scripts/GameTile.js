import * as PIXI from "pixi.js"; 
import {
  tileXCorrection, 
  tileYCorrection
} from "./consts"

import gsap from "gsap";

export class GameTile {
    constructor(x, y, figureType, onClick) {
      this.type = figureType.type;
      
      this.indexOfMatch = -1;
      this.alreadyInMatch = false;

      this.initSprite(x, figureType.texture, onClick)
      this.setCoords(x,y);
    }

    initSprite(x, texture, onClick) {
      this.sprite = new PIXI.Sprite(texture);
      this.sprite.scale.set(0.56);
      this.sprite.anchor.set(0.5, 0.5);
      this.sprite.position.set(tileXCorrection + (x * this.sprite.width), this.sprite.width/2);
      this.sprite.interactive = true;
      this.sprite.click = onClick;
      this.sprite.tile = this;
    }

    setCoords(x,y) {
      this.xCoord = x;
      this.yCoord = y;
    }

    setZIndex(index) {
      this.zIndex = index; 
      this.sprite.zIndex = index;
    }

    turnOffTile(completeCallback) {
      this.sprite.interactive = false;

      gsap.to(
        this.sprite, 
        { 
          pixi: {
            alpha: 0
          }, 
          duration: 0.23,
          onComplete: () => completeCallback
        } 
      )
    }

    toYCoord() {
      this.sprite.position.y = (this.sprite.width * this.yCoord) + tileYCorrection
    }

    toYCoordAnimation() {
      gsap.to(
        this.sprite, 
        {
          pixi: {
            positionY: (this.sprite.width * this.yCoord) + tileYCorrection
          }, 
          duration: 0.23
        }
      );
    }

    toXYCoordsAnimation() {
      gsap.to(
        this.sprite, 
        {
          pixi: {
            positionY: (this.sprite.width * this.yCoord) + tileYCorrection,
            positionX: (this.xCoord * this.sprite.width) + tileXCorrection 
          }, 
          duration: 0.23
        }
      );
    }
}