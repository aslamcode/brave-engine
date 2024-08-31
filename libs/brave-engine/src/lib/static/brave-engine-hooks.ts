import { Component } from "../component/component";
import { Entity } from "../entity/entity";
import { LifecycleHooks } from "../interface/lifecycle-hooks";

export class BraveEngineHooks implements LifecycleHooks {

  static items = new Set<Entity | Component>();

  static register(item: Entity | Component) {
    this.items.add(item);
  }

  static unregister(item: Entity | Component) {
    this.items.delete(item);
  }

  static onStart() {
    this.items.forEach(elem => elem.onStart());
  }

  static onUpdate() {
    this.items.forEach(elem => elem.onUpdate());
  }

  static onFixedUpdate() {
    this.items.forEach(elem => elem.onFixedUpdate());
  }

  static onDestroy() {
    this.items.forEach(elem => elem.onDestroy());
  }

}