import { GameObject } from './game-object';

export class Camera extends GameObject {
  private internClearColor = [0, 0, 0, 1];

  setClearColor(r: number, g: number, b: number, a: number) {
    this.internClearColor = [r, g, b, a];
  }

  get clearColor() {
    return this.internClearColor;
  }
}
