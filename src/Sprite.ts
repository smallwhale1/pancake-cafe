interface SpriteProps {
  imgSrc: string;
  posX: number;
  posY: number;
  width: number;
  container: HTMLDivElement;
  onClick: (ev: MouseEvent) => any;
}

export default class Sprite {
  img: HTMLImageElement;
  posX: number;
  posY: number;
  width: number;

  constructor({ imgSrc, posX, posY, width, container, onClick }: SpriteProps) {
    this.img = document.createElement('img');
    this.img.className = 'sprite';

    this.img.src = imgSrc;
    this.img.width = width;
    this.img.style.left = `${posX}px`;
    this.img.style.top = `${posY}px`;

    this.posX = posX;
    this.posY = posY;
    this.width = width;

    this.img.draggable = false;
    this.img.onpointerup = onClick;

    // append to the game container
    container.append(this.img);
  }

  updateImgSrc(newSrc: string) {
    this.img.src = newSrc;
  }

  setX = (x: number) => {
    this.posX = x;
    this.img.style.left = `${this.posX}px`;
  };

  setY = (y: number) => {
    this.posY = y;
    this.img.style.top = `${this.posY}px`;
  };

  moveX(x: number) {
    // update logically
    this.posX += x;
    // update graphically
    this.img.style.left = `${this.posX}px`;
  }

  moveY(y: number) {
    this.posY += y;
    this.img.style.top = `${this.posY}px`;
  }
}
