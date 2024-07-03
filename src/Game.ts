import { Batter } from './Batter';
import { Pancake } from './Pancake';
import { Stove } from './Stove';
import { StackPlate } from './StackPlate';
import {
  BACKGROUND_COLOR,
  CHARACTER_X,
  CHARACTER_Y,
  KAI_SRC,
  KAI_WIDTH,
  SERVE_BTN_WIDTH,
  SPATULA_ACTIVE,
  SPATULA_IDLE,
  SPATULA_START_X,
  SPATULA_START_Y,
  SPATULA_WIDTH,
} from './constants';
import { Tool } from './enums';
import Sprite from './Sprite';
import { Plate } from './Plate';
import { Button } from './Button';

const container = document.getElementById('game-container') as HTMLDivElement;
container.style.width = '1000px';
container.style.height = '400px';

console.log(container);

export default class Game {
  private pancakes: Pancake[];
  private tool: Tool | null;
  private _lastTime = 0;
  private _currIndex = 0;
  private stackPlate!: StackPlate;
  //   private spatula: Spatula;

  constructor() {
    this.pancakes = [];
    this.tool = null;
    this.renderKitchen();
  }

  private renderCafe = () => {
    // clear container
    container.innerHTML = '';

    new Sprite({
      imgSrc: KAI_SRC,
      posX: CHARACTER_X,
      posY: CHARACTER_Y,
      width: KAI_WIDTH,
      container,
      onClick: () => {},
    });
  };

  private renderKitchen = () => {
    // static assets
    new Batter({ container, game: this });
    new Stove({ container, game: this });
    this.stackPlate = new StackPlate({ container, game: this });
    new Plate({ container, game: this });
    new Button({
      container,
      game: this,
      text: 'Serve',
      width: SERVE_BTN_WIDTH,
      onClick: () => {
        this.renderCafe();
      },
    });

    // spatula
    const spatula = new Sprite({
      imgSrc: SPATULA_IDLE,
      posX: SPATULA_START_X,
      posY: SPATULA_START_Y,
      width: SPATULA_WIDTH,
      container: container,
      onClick: () => {
        this.setTool(Tool.SPATULA);
        window.addEventListener('pointermove', (e: PointerEvent) => {
          spatula.moveX(e.movementX);
          spatula.moveY(e.movementY);
        });
        spatula.img.src = SPATULA_ACTIVE;
        spatula.img.style.pointerEvents = 'none';
      },
    });

    spatula.img.classList.add('spatula');

    requestAnimationFrame(this.animate);
  };

  public setTool = (tool: Tool) => {
    this.tool = tool;
    console.log('setting tool');
  };

  public addPancake = () => {
    if (this._currIndex < 6) {
      this.pancakes.push(
        new Pancake({
          container,
          index: this._currIndex,
          stackPlate: this.stackPlate,
        }),
      );
      this._currIndex++;
    }
  };

  private animate = (time: number) => {
    const timeElapsed = time - this._lastTime;
    this._lastTime = time;

    this.pancakes.forEach((pancake) => {
      pancake.updateCookTime(timeElapsed);
    });
    requestAnimationFrame(this.animate);
  };
}
