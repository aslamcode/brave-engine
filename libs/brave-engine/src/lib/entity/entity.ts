import { Component } from '../component/component';
import { MaterialComponent } from '../component/material-component';
import { MeshRendererComponent } from '../component/mesh-renderer-component';
import { TransformComponent } from '../component/transform-component';
import { LifecycleHooks } from '../interface/lifecycle-hooks';

export class Entity implements LifecycleHooks {
  transform: TransformComponent;
  active = true;

  protected parent?: Entity;
  children = new Array<Entity>();

  components = new Array<Component>();

  // Mesh renderer and materials shortcut
  meshRenderer?: MeshRendererComponent;
  materials = new Array<MaterialComponent>();

  constructor() {
    this.transform = new TransformComponent(this);
  }

  // Lifecycle hooks

  onStart() {
    this.components.forEach(elem => elem.onStart());
  }

  onUpdate() {
    this.components.forEach(elem => elem.onUpdate());
  }

  onFixedUpdate() {
    this.components.forEach(elem => elem.onFixedUpdate());
  }

  onDestroy() {
    this.components.forEach(elem => elem.onDestroy());
  }

  // Lifecycle hooks

  setActive(active: boolean) {
    this.active = active;
  }

  protected setParent(parent?: Entity) {
    this.parent = parent;
  }

  addComponent(component: Component) {
    component.setEntity(this);

    if (component instanceof MeshRendererComponent) {
      this.meshRenderer = component;
    } else if (component instanceof MaterialComponent) {
      this.materials.push(component);
    }

    this.components.push(component);
  }

  removeComponent(component: Component) {
    const index = this.components.findIndex(elem => elem === component);

    if (index != -1) {
      if (component instanceof MeshRendererComponent) {
        this.meshRenderer = undefined;
      } else if (component instanceof MaterialComponent) {
        const materialIndex = this.materials.findIndex(elem => elem === component);

        if (materialIndex != -1) {
          this.materials.splice(materialIndex, 1);
        }
      }

      this.components.splice(index, 1);
    }
  }

  addChild(child: Entity, index?: number) {
    child.setParent(this);

    if (index != undefined) {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
  }

  removeChild(child: Entity) {
    child.setParent(undefined);

    const index = this.children.findIndex(elem => elem === child);
    if (index != -1) {
      this.children.splice(index, 1);
    }
  }
}
