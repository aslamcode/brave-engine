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

  start() {
    if (braveEngine.mode != BraveEngineModeEnum.compiled) {
      this.id = Registry.register(this, this.id);
    }
  }

  destroy() {
    this.onDestroy();
  }

  setActive(value: boolean) {
    this.innerActive = value;
  }

  onStart() { }
  onUpdate() { }
  onRenderUpdate() { }
  onFixedUpdate() { }
  onDestroy() { }

  //#region Getters

  get activeInHierarchy() {
    if (!this.active) {
      return false;
    }

    if (this.entity && this.entity.parent) {
      return this.entity.parent.activeInHierarchy;
    }

    return true;
  }

  //#endregion Getters
}
