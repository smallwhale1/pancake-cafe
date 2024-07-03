import type Game from './Game';
import type Sprite from './Sprite';
import {
  BATTER_HEIGHT,
  BATTER_START_X,
  BATTER_START_Y,
  BATTER_WIDTH,
  STOVE_HEIGHT,
  STOVE_START_X,
  STOVE_START_Y,
  STOVE_WIDTH,
} from './constants';
import { Tool } from './enums';

interface StoveProps {
  container: HTMLDivElement;
  game: Game;
}

export class Stove {
  private game: Game;
  private container: HTMLDivElement;

  constructor({ container, game }: StoveProps) {
    this.container = container;
    this.game = game;
    this.addStove();
  }

  addStove = () => {
    const box = document.createElement('div');
    box.className = 'stove';

    box.style.left = `${STOVE_START_X}px`;
    box.style.top = `${STOVE_START_Y}px`;
    box.style.width = `${STOVE_WIDTH}px`;
    box.style.height = `${STOVE_HEIGHT}px`;

    this.container.appendChild(box);
  };
}
