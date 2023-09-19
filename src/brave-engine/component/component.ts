import { Entity } from '../entity/entity';
import { LifecycleHooks } from '../interface/lifecycle-hooks';

export class Component implements LifecycleHooks {
  active = true;
  protected gameObject?: Entity;

  constructor(gameObject?: Entity) {
    if (gameObject) {
      this.gameObject = gameObject;
    }
  }

  setGameObject(gameObject: Entity) {
    this.gameObject = gameObject;
  }

  onStart() { }
  onUpdate() { }
  onFixedUpdate() { }
  onDestroy() { }
}
