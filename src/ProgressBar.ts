import type Game from './Game';
import type { Pancake } from './Pancake';
import type Sprite from './Sprite';
import {
  COOK_TIME,
  PANCAKE_WIDTH,
  PROGRESS_BAR_HEIGHT,
  STOVE_HEIGHT,
  STOVE_START_X,
  STOVE_START_Y,
  STOVE_WIDTH,
} from './constants';
import { Tool } from './enums';

interface ProgressBarProps {
  container: HTMLDivElement;
  pancake: Pancake;
  x: number;
  y: number;
}

export class ProgressBar {
  private container: HTMLDivElement;
  private pancake: Pancake;
  private x: number;
  private y: number;

  private time: number;
  public timeLimit: number;

  private bar: HTMLDivElement = document.createElement('div');

  constructor({ container, pancake, x, y }: ProgressBarProps) {
    this.container = container;
    this.pancake = pancake;
    this.x = x;
    this.y = y;

    this.time = 0;
    this.timeLimit = COOK_TIME;

    this.addBar();
  }

  public addTime = (time: number) => {
    this.time += time;
    this.updateBar();
  };

  public resetTime = () => {
    this.time = 0;
    this.updateBar();
  };

  public hideBar = () => {
    this.bar.style.display = 'none';
  };

  private addBar = () => {
    this.bar.className = 'bar';
    this.bar.style.left = `${this.x}px`;
    this.bar.style.top = `${this.y}px`;
    this.bar.style.width = `0px`;
    this.bar.style.height = `${PROGRESS_BAR_HEIGHT}px`;

    this.container.appendChild(this.bar);
  };

  private updateBar = () => {
    this.bar.style.width = `${
      Math.min(this.time / this.timeLimit, 1) * PANCAKE_WIDTH
    }px`;
  };
}
