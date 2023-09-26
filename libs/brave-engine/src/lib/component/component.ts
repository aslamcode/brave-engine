import { Entity } from '../entity/entity';
import { LifecycleHooks } from '../interface/lifecycle-hooks';

export class Component implements LifecycleHooks {
  private innerActive = true;
  get active() {
    return this.innerActive;
  }

  protected entity: Entity;

  constructor(entity: Entity) {
    if (entity) {
      this.entity = entity;
    }
  }

  setActive(value: boolean) {
    this.innerActive = value;
  }

  onStart() { }
  onUpdate() { }
  onFixedUpdate() { }
  onDestroy() { }
}
