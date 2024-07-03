import type Game from './Game';
import type Sprite from './Sprite';
import {
  PLATE_START_X,
  PLATE_START_Y,
  PLATE_WIDTH,
  SERVE_BTN_WIDTH,
  SERVE_BTN_X,
  SERVE_BTN_Y,
  STACK_PLATE_HEIGHT,
} from './constants';

interface ButtonProps {
  container: HTMLDivElement;
  game: Game;
  text: string;
  width: number;
  onClick: () => void;
}

export class Button {
  private game: Game;
  private text: string;
  private container: HTMLDivElement;
  private numPancakes: number;

  constructor({ container, game, text, width, onClick }: ButtonProps) {
    this.container = container;
    this.game = game;
    this.text = text;
    this.renderButton(onClick);

    this.numPancakes = 0;
  }

  renderButton = (onClick: () => void) => {
    const btn = document.createElement('button');

    btn.style.left = `${SERVE_BTN_X}px`;
    btn.style.top = `${SERVE_BTN_Y}px`;
    btn.style.width = `${SERVE_BTN_WIDTH}px`;
    btn.innerText = this.text;

    this.container.appendChild(btn);

    btn.onclick = onClick;
  };
}
