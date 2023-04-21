import { GameObject } from '../game-object/game-object';

export class Component {
  active = true;
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
