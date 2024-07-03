import type Game from './Game';
import type Sprite from './Sprite';
import {
  BATTER_HEIGHT,
  BATTER_START_X,
  BATTER_START_Y,
  BATTER_WIDTH,
} from './constants';
import { Tool } from './enums';

interface BatterProps {
  container: HTMLDivElement;
  game: Game;
}

export class Batter {
  private game: Game;
  private container: HTMLDivElement;

  constructor({ container, game }: BatterProps) {
    this.container = container;
    this.game = game;
    this.addBox();
  }

  private addBox = () => {
    const box = document.createElement('div');
    box.className = 'batter';

    box.style.left = `${BATTER_START_X}px`;
    box.style.top = `${BATTER_START_Y}px`;
    box.style.width = `${BATTER_WIDTH}px`;
    box.style.height = `${BATTER_HEIGHT}px`;

    box.onclick = () => {
      this.game.setTool(Tool.BATTER);
      //   temporary
      this.game.addPancake();
    };
    this.container.appendChild(box);
  };
}
