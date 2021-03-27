import { GameObject } from '../class/game-object';

export class Component {
  private gameObject: GameObject;

  constructor(gameObject: GameObject) {
    this.gameObject = gameObject;
  }

  setGameObject(gameObject: GameObject) {
    this.gameObject = gameObject;
  }
}
