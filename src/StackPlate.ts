import type Game from './Game';
import type Sprite from './Sprite';
import {
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
  private numPancakes: number;

  constructor({ container, game }: StackPlateProps) {
    this.container = container;
    this.game = game;
    this.addStackPlate();

    this.numPancakes = 0;
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
    return this.numPancakes;
  }

  addPancake = () => {
    this.numPancakes++;
  };

  removePancake = () => {
    this.numPancakes--;
  };
}
