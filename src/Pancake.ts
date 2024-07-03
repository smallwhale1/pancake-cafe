import { ProgressBar } from './ProgressBar';
import Sprite from './Sprite';
import type { StackPlate } from './StackPlate';
import {
  BUTTER_SRC,
  BUTTER_WIDTH,
  BUTTER_X_OFFSET,
  BUTTER_Y_OFFSET,
  COOKED_PANCAKE_SRC,
  COOK_TIME,
  HALF_COOKED_PANCAKE_SRC,
  OVER_COOK_TIME,
  PADDING,
  PANCAKE_HEIGHT,
  PANCAKE_STACK_OFFSET,
  PANCAKE_START_X,
  PANCAKE_START_Y,
  PANCAKE_WIDTH,
  PLATE_START_X,
  PLATE_START_Y,
  PLATE_WIDTH,
  STACK_PLATE_HEIGHT,
  STACK_PLATE_START_X,
  STACK_PLATE_START_Y,
  STACK_PLATE_WIDTH,
  TOASTY_PANCAKE_SRC,
  UNCOOKED_PANCAKE_SRC,
} from './constants';
import { CookType, PancakeState, Topping } from './enums';

interface PancakeProps {
  container: HTMLDivElement;
  index: number;
  stackPlate: StackPlate;
}

export class Pancake {
  private cookTime: number;
  private cookType: CookType;
  private flipped: boolean;
  private sprite: Sprite;
  private topping: Topping | undefined;
  private container: HTMLDivElement;
  private progressBar: ProgressBar;
  private index: number;
  private pancakeState: PancakeState;
  private stackPlate: StackPlate;

  private _pointerDown = false;
  private _startX;
  private _startY;

  constructor({ container, index, stackPlate }: PancakeProps) {
    this.container = container;
    this.stackPlate = stackPlate;
    this.index = index;
    this._startX = PANCAKE_START_X + (index % 3) * (PANCAKE_WIDTH + PADDING);
    this._startY =
      PANCAKE_START_Y + Math.floor(index / 3) * (PANCAKE_HEIGHT + PADDING);
    this.sprite = new Sprite({
      imgSrc: UNCOOKED_PANCAKE_SRC,
      posX: this._startX,
      posY: this._startY,
      width: PANCAKE_WIDTH,
      container: this.container,
      onClick: () => {},
    });

    this.setUpPointerEvents();
    // Create a progress bar
    this.progressBar = new ProgressBar({
      container,
      x: this._startX,
      y: this._startY - 10,
      pancake: this,
    });

    this.topping = undefined;
    this.cookTime = 0;
    this.cookType = CookType.UNCOOKED;
    this.flipped = false;
    this.pancakeState = PancakeState.STOVE;

    // set timer to update cook time
  }

  handlePointerMove = (e: PointerEvent) => {
    if (this._pointerDown) {
      this.sprite.moveX(e.movementX);
      this.sprite.moveY(e.movementY);
    }
  };

  setUpPointerEvents = () => {
    // need to encapsulate this inside of the sprite
    this.sprite.img.onpointerdown = () => {
      if (
        this.cookType === CookType.COOKED ||
        this.cookType === CookType.TOASTY
      ) {
        this._pointerDown = true;
        window.addEventListener('pointermove', this.handlePointerMove);
      }
    };
    this.sprite.img.onpointerup = () => {
      if (this.pancakeState === PancakeState.STOVE) {
        this.flipPancake();
      } else if (this.pancakeState === PancakeState.PLATING) {
        this.addTopping();
      }
    };

    // register pointerup handler
    window.addEventListener('pointerup', (e: PointerEvent) => {
      if (!this._pointerDown) return;

      window.removeEventListener('pointermove', this.handlePointerMove);

      // stack plate bounds
      const stackPlateBounds = {
        minX: STACK_PLATE_START_X,
        maxX: STACK_PLATE_START_X + STACK_PLATE_WIDTH,
        minY: STACK_PLATE_START_Y,
        maxY: STACK_PLATE_START_Y + STACK_PLATE_HEIGHT,
      };

      const plateBounds = {
        minX: PLATE_START_X,
        maxX: PLATE_START_X + PLATE_WIDTH,
        minY: PLATE_START_Y,
        maxY: PLATE_START_Y + STACK_PLATE_HEIGHT,
      };

      if (
        e.clientX >= stackPlateBounds.minX &&
        e.clientX <= stackPlateBounds.maxX
        // &&
        // e.clientY >= bounds.minY &&
        // e.clientY <= bounds.maxY
      ) {
        console.log('on stacking plate');
        // stop animation
        this.sprite.img.classList.remove('wobble');
        this.progressBar.hideBar();
        // move to stack plate
        this.sprite.setX(
          STACK_PLATE_START_X + STACK_PLATE_WIDTH / 2 - PANCAKE_WIDTH / 2,
        );
        // fix stacking order
        this.sprite.setY(
          STACK_PLATE_START_Y -
            10 -
            this.stackPlate.getNumPancakes * PANCAKE_STACK_OFFSET,
        );
        this.pancakeState = PancakeState.STACKING;
        this.stackPlate.addPancake();
        // check plating
      } else if (
        e.clientX >= plateBounds.minX &&
        e.clientX <= plateBounds.maxX
      ) {
        console.log('on plating');
        // stop animation
        this.sprite.img.classList.remove('wobble');
        this.progressBar.hideBar();
        // move to stack plate
        this.sprite.setX(PLATE_START_X + PLATE_WIDTH / 2 - PANCAKE_WIDTH / 2);
        // fix stacking order
        this.sprite.setY(PLATE_START_Y - 10);
        this.pancakeState = PancakeState.PLATING;
        this.stackPlate.addPancake();
      } else {
        this.restorePosition();
      }
      this._pointerDown = false;
    });
  };

  restorePosition = () => {
    this.sprite.setX(this._startX);
    this.sprite.setY(this._startY);
  };

  updateCookTime = (updateTime: number) => {
    if (this.pancakeState !== PancakeState.STOVE) return;
    // would be nice to hook up reactions so that when cookType changes,
    // the relevant ui updates (image sources)
    this.cookTime += updateTime;
    this.progressBar.addTime(updateTime);
    if (this.cookType === CookType.UNCOOKED && this.cookTime >= COOK_TIME) {
      this.cookType = CookType.HALF;
      this.sprite.updateImgSrc(HALF_COOKED_PANCAKE_SRC);
      // add bounce
      this.sprite.img.classList.add('bounce');
      // update image source
    } else if (
      this.cookType === CookType.COOKED &&
      this.cookTime >= OVER_COOK_TIME
    ) {
      this.cookType = CookType.TOASTY;
      this.sprite.updateImgSrc(TOASTY_PANCAKE_SRC);
      // this.sprite.img.classList.add('wobble');
    }
  };

  flipPancake() {
    if (this.cookType == CookType.HALF) {
      this.flipped = true;
      this.sprite.img.classList.remove('bounce');

      // update sprite image with cooked pancake
      this.cookType = CookType.COOKED;
      this.sprite.updateImgSrc(COOKED_PANCAKE_SRC);
      this.cookTime = 0;
      this.progressBar.resetTime();
      this.progressBar.timeLimit = OVER_COOK_TIME;
    } else {
      console.log('Not ready to be flipped!');
    }
  }

  addTopping() {
    // testing topping
    new Sprite({
      imgSrc: BUTTER_SRC,
      posX: this.sprite.posX + BUTTER_X_OFFSET,
      posY: this.sprite.posY + BUTTER_Y_OFFSET,
      width: BUTTER_WIDTH,
      container: this.container,
      onClick: () => {},
    });
  }
}
