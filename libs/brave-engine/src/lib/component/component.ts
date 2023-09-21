import { Entity } from '../entity/entity';

export class Component {
  active = true;
  protected entity?: Entity;

  constructor(entity?: Entity) {
    if (entity) {
      this.entity = entity;
    }
  }

  setEntity(entity: Entity) {
    this.entity = entity;
  }
}
