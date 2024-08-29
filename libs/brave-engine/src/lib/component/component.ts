import { braveEngine } from '../brave-engine';
import { Entity } from '../entity/entity';
import { BraveEngineModeEnum } from '../enum/brave-engine-mode-enum';
import { LifecycleHooks } from '../interface/lifecycle-hooks';
import { Registry } from '../static/registry';

export class Component implements LifecycleHooks {
  id: string;

  private innerActive = true;
  get active() {
    return this.innerActive;
  }

  protected entity: Entity;

  constructor(entity: Entity, id?: string) {
    this.id = Registry.register(this, id);

    if (entity) {
      this.entity = entity;
    }
  }

  private start() {
    if (braveEngine.mode != BraveEngineModeEnum.compiled) {
      this.id = Registry.register(this, this.id);
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
