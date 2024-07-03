import type Game from './Game';
import type { Pancake } from './Pancake';
import type Sprite from './Sprite';
import {
  PANCAKE_STACK_OFFSET,
  PANCAKE_WIDTH,
  STACK_PLATE_HEIGHT,
  STACK_PLATE_START_X,
  STACK_PLATE_START_Y,
  STACK_PLATE_WIDTH,
} from './constants';

interface StackPlateProps {
  container: HTMLDivElement;
  game: Game;
}

export class StackPlate {
  private game: Game;
  private container: HTMLDivElement;

  private pancakes: Pancake[];

  constructor({ container, game }: StackPlateProps) {
    this.pancakes = [];
    this.container = container;
    this.game = game;
    this.addStackPlate();
  }

  addStackPlate = () => {
    const box = document.createElement('div');
    box.className = 'table';

    box.style.left = `${STACK_PLATE_START_X}px`;
    box.style.top = `${STACK_PLATE_START_Y}px`;
    box.style.width = `${STACK_PLATE_WIDTH}px`;
    box.style.height = `${STACK_PLATE_HEIGHT}px`;

    this.container.appendChild(box);

    box.onpointerup = () => {};
  };

  get getNumPancakes() {
    return this.pancakes.length;
  }

  addPancake = (pancake: Pancake) => {
    this.pancakes.push(pancake);
    this.repositionPancakes();
  };

  removePancake = (pancake: Pancake) => {
    const filtered = this.pancakes.filter((pc) => pc !== pancake);
    this.pancakes = filtered;
    this.repositionPancakes();
  };

  repositionPancakes = () => {
    this.pancakes.forEach((pancake, i) => {
      pancake.sprite.setX(
        STACK_PLATE_START_X + STACK_PLATE_WIDTH / 2 - PANCAKE_WIDTH / 2,
      );
      // fix stacking order
      pancake.sprite.setY(STACK_PLATE_START_Y - 10 - i * PANCAKE_STACK_OFFSET);
      // fix stacking order
      pancake.sprite.img.style.zIndex = `${i}`;
    });
  };
}
