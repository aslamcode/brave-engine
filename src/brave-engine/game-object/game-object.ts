import { Component } from '../component/component';
import { MaterialComponent } from '../component/material-component';
import { MeshRendererComponent } from '../component/mesh-renderer-component';
import { TransformComponent } from '../component/transform-component';
import { LifecycleHooks } from '../interface/lifecycle-hooks';

export class GameObject implements LifecycleHooks {
  transform: TransformComponent;
  active = true;

  protected parent?: GameObject;
  children = new Array<GameObject>();

  components = new Array<Component>();

  // Mesh renderer and materials shortcut
  meshRenderer?: MeshRendererComponent;
  materials = new Array<MaterialComponent>();

  constructor() {
    this.transform = new TransformComponent(this);
  }

  // Lifecycle hooks
  onStart() { }
  onUpdate() { }
  onFixedUpdate() { }
  onDestroy() { }
  // Lifecycle hooks

  destroy() { }

  setActive(active: boolean) {
    this.active = active;
  }

  protected setParent(parent?: GameObject) {
    this.parent = parent;
  }

  addComponent(component: Component) {
    component.setGameObject(this);

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

  addChild(child: GameObject, index?: number) {
    child.setParent(this);

    if (index != undefined) {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
  }

  removeChild(child: GameObject) {
    child.setParent(undefined);

    const index = this.children.findIndex(elem => elem === child);
    if (index != -1) {
      this.children.splice(index, 1);
    }
  }
}
