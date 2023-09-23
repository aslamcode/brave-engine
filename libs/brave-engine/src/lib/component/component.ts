import { Entity } from '../entity/entity';
import { LifecycleHooks } from '../interface/lifecycle-hooks';

export class Component implements LifecycleHooks {
  active = true;
  protected entity: Entity;

  constructor(entity?: Entity) {
    if (entity) {
      this.entity = entity;
    }
  }

  setEntity(entity: Entity) {
    this.entity = entity;
  }

  onStart() { }
  onUpdate() { }
  onFixedUpdate() { }
  onDestroy() { }
}
