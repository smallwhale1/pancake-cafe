import Sprite from './Sprite';
import {
  PANCAKE_OFFSET,
  PANCAKE_WIDTH,
  UNCOOKED_PANCAKE_SRC,
} from './constants';
import { CookType } from './enums';
import type { Topping } from './interfaces';

interface PancakeProps {
  container: HTMLDivElement;
}

class Pancake {
  cookTime: number;
  cookType: CookType;
  flipped: boolean;
  sprite: Sprite;
  topping: Topping | undefined;

  constructor({ container }: PancakeProps) {
    this.sprite = new Sprite(
      UNCOOKED_PANCAKE_SRC,
      PANCAKE_OFFSET,
      PANCAKE_OFFSET,
      PANCAKE_WIDTH,
      container,
      () => {},
    );

    // Create a progress bar as well

    this.topping = undefined;
    this.cookTime = 0;
    this.cookType = CookType.UNCOOKED;
    this.flipped = false;

    // set timer to update cook time
  }

  updateCookTime(updateTime: number) {
    // would be nice to hook up reactions so that when cookType changes,
    // the relevant ui updates (image sources)
    this.cookTime += updateTime;
    if (this.cookType === CookType.UNCOOKED && this.cookTime >= 3000) {
      this.cookType = CookType.COOKED;
      this.sprite.updateImgSrc();
      // update image source
    } else if (this.cookType === CookType.COOKED && this.cookTime >= 10000) {
      this.cookType = CookType.TOASTY;
      this.sprite.updateImgSrc();
    }
  }

  flipPancake() {
    this.flipped = true;

    // update sprite image with cooked pancake
    this.sprite.updateImgSrc();
  }

  addTopping() {}
}
