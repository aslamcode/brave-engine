import { GameObject } from '../game-object/game-object';

export class Component {
  protected gameObject!: GameObject;

  constructor(gameObject?: GameObject) {
    if (gameObject) {
      this.gameObject = gameObject;
    }
  }

  setGameObject(gameObject: GameObject) {
    this.gameObject = gameObject;
  }
}
