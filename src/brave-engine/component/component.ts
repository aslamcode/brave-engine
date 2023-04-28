import { GameObject } from '../game-object/game-object';
import { LifecycleHooks } from '../interface/lifecycle-hooks';

export class Component implements LifecycleHooks {
  active = true;
  protected gameObject?: GameObject;

  constructor(gameObject?: GameObject) {
    if (gameObject) {
      this.gameObject = gameObject;
    }
  }

  setGameObject(gameObject: GameObject) {
    this.gameObject = gameObject;
  }

  onStart() { }
  onUpdate() { }
  onFixedUpdate() { }
  onDestroy() { }
}
