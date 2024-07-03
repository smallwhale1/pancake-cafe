import { Batter } from './Batter';
import { Pancake } from './Pancake';
import { Stove } from './Stove';
import { StackPlate } from './StackPlate';
import {
  CHARACTER_X,
  CHARACTER_Y,
  KAI_SRC,
  KAI_WIDTH,
  SERVE_BTN_WIDTH,
  SPATULA_ACTIVE,
  SPATULA_HEIGHT,
  SPATULA_IDLE,
  SPATULA_START_X,
  SPATULA_START_Y,
  SPATULA_WIDTH,
} from './constants';
import { Tool } from './enums';
import Sprite from './Sprite';
import { Plate } from './Plate';
import { Button } from './Button';
import { TextBox } from './TextBox';

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

  // tools

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

    new TextBox({ container, game: this, text: '' });
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
        // this.setTool(Tool.SPATULA);
        // window.addEventListener('pointermove', (e: PointerEvent) => {
        //   spatula.moveX(e.movementX);
        //   spatula.moveY(e.movementY);
        // });
        // spatula.img.src = SPATULA_ACTIVE;
        // spatula.img.style.pointerEvents = 'none';
      },
    });

    spatula.img.classList.add('spatula');

    // setup spatula area

    const spatulaArea = document.createElement('div');
    spatulaArea.style.position = 'absolute';
    spatulaArea.style.left = `${SPATULA_START_X}px`;
    spatulaArea.style.top = `${SPATULA_START_Y}px`;
    spatulaArea.style.width = `${SPATULA_WIDTH}px`;
    spatulaArea.style.height = `${SPATULA_HEIGHT}px`;
    container.appendChild(spatulaArea);

    spatulaArea.addEventListener('pointerdown', (e: PointerEvent) => {
      if (this.tool === Tool.SPATULA) {
        this.setTool(null);
        spatula.img.src = SPATULA_IDLE;
        // set it down
        spatula.setX(SPATULA_START_X);
        spatula.setY(SPATULA_START_Y);
      } else {
        this.setTool(Tool.SPATULA);
        spatula.setX(e.clientX - SPATULA_WIDTH / 2);
        spatula.setY(e.clientY - SPATULA_HEIGHT / 2);

        spatula.img.src = SPATULA_ACTIVE;
        spatula.img.style.pointerEvents = 'none';
      }
    });

    window.addEventListener('pointermove', (e: PointerEvent) => {
      if (this.tool === Tool.SPATULA) {
        spatula.setX(e.clientX - SPATULA_WIDTH / 2);
        spatula.setY(e.clientY - SPATULA_HEIGHT / 2);
      }
    });

    requestAnimationFrame(this.animate);
  };

  public setTool = (tool: Tool | null) => {
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
          game: this,
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

  public getTool = () => {
    return this.tool;
  };
}
