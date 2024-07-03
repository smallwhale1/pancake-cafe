import type Game from './Game';
import { SERVE_BTN_WIDTH, SERVE_BTN_X, SERVE_BTN_Y } from './constants';

interface TextBoxProps {
  container: HTMLDivElement;
  game: Game;
  text: string;
  width: number;
}

export class TextBox {
  private game: Game;
  private text: string;
  private container: HTMLDivElement;
  private numPancakes: number;

  constructor({ container, game, text, width }: TextBoxProps) {
    this.container = container;
    this.game = game;
    this.text = text;
    this.renderTextBox();

    this.numPancakes = 0;
  }

  renderTextBox = () => {};
}
