import type Game from './Game';
import type Sprite from './Sprite';
import {
  PLATE_START_X,
  PLATE_START_Y,
  PLATE_WIDTH,
  STACK_PLATE_HEIGHT,
} from './constants';

interface PlateProps {
  container: HTMLDivElement;
  game: Game;
}

export class Plate {
  private game: Game;
  private container: HTMLDivElement;
  private numPancakes: number;

  constructor({ container, game }: PlateProps) {
    this.container = container;
    this.game = game;
    this.addPlate();

    this.numPancakes = 0;
  }

  addPlate = () => {
    const box = document.createElement('div');
    box.className = 'plate';

    box.style.left = `${PLATE_START_X}px`;
    box.style.top = `${PLATE_START_Y}px`;
    box.style.width = `${PLATE_WIDTH}px`;
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
