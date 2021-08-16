import { Bonus } from "./Bonus";
import gsap from "gsap/gsap-core";
import { Linear } from "gsap/all";

export class BonusSwitchable extends Bonus {
  activateBonus = () => {
    this.active = true;
    this.activeTween = gsap.to(
      this.bonusElement, 
      { 
        pixi: {
          alpha: 0.8
        }, 
        ease: Linear.easeOut,
        repeat: -1,
        duration: 0.4,
      } 
    )
  }

  stopActivity = () => {
    this.activeTween.pause();
  }

  deactivateBonus = () => {
    this.stopActivity();
    this.active = false;

    gsap.to(
      this.bonusElement, 
      { 
        pixi: {
          alpha: 1
        }
      } 
    )
  }

  disableSwitchableBonus() {
    this.disableBonus();
    this.stopActivity();
  }
}