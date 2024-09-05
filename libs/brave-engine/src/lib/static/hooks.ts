import { Component } from "../component/component";
import { Entity } from "../entity/entity";
import { LifecycleHooks } from "../interface/lifecycle-hooks";

export class Hooks implements LifecycleHooks {

  static items = new Set<Entity | Component>();

  static register(item: Entity | Component) {
    this.items.add(item);
  }

  static unregister(item: Entity | Component) {
    this.items.delete(item);
  }

  static onStart() {
    this.items.forEach(elem => {
      if (elem.active) {
        elem.onStart();
      }
    });
  }

  static onUpdate() {
    this.items.forEach(elem => {
      if (elem.active) {
        elem.onUpdate();
      }
    });
  }

  static onRenderUpdate() {
    this.items.forEach(elem => {
      if (elem.active) {
        elem.onRenderUpdate();
      }
    });
  }

  static onFixedUpdate() {
    this.items.forEach(elem => {
      if (elem.active) {
        elem.onFixedUpdate();
      }
    });
  }

  static onDestroy() {
    this.items.forEach(elem => {
      if (elem.active) {
        elem.onDestroy();
      }
    });
  }

}