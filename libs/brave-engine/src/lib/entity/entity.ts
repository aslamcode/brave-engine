import { braveEngine } from '../brave-engine';
import { Scene } from '../class/scene';
import { Shader } from '../class/shader';
import { Component } from '../component/component';
import { MaterialComponent } from '../component/material-component';
import { MeshRendererComponent } from '../component/mesh-renderer-component';
import { TransformComponent } from '../component/transform-component';
import { BraveEngineModeEnum } from '../enum/brave-engine-mode-enum';
import { LifecycleHooks } from '../interface/lifecycle-hooks';
import { Registry } from '../static/registry';
import { clone } from '../util/clone';

export class Entity implements LifecycleHooks {
  id: string;
  scene?: Scene;

  name = 'Entity';

  private innerActive = true;
  get active() { return this.innerActive; }

  private innerTransform: TransformComponent;
  get transform() { return this.innerTransform; }

  parent?: Entity;
  children = new Array<Entity>();

  components = new Array<Component>();

  // Mesh renderer and materials shortcut
  meshRenderer?: MeshRendererComponent;
  materials = new Array<MaterialComponent>();

  constructor(id?: string) {
    this.id = Registry.register(id);
    this.innerTransform = new TransformComponent(this);
    this.addComponent(this.innerTransform);
  }

  start() {
    if (braveEngine.mode != BraveEngineModeEnum.compiled) {
      this.id = Registry.register(this, this.id);
    }
  }

  load(glContext: WebGL2RenderingContext) {
    // Load materials shaders
    this.materials.forEach(elem => {
      elem.loadShader(glContext);
    });

    // Load mesh renderer buffers if exists mesh renderer
    if (this.meshRenderer) {
      this.meshRenderer.loadBuffers(glContext);
    }
  }

  destroy() {
    if (this.scene) {
      this.scene.remove(this);
    }

    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.children.forEach(elem => elem.destroy());

    this.components.forEach(elem => elem.destroy());

    this.onDestroy();
  }

  // #region Lifecycle hooks

  onStart() {
    this.components.forEach(elem => {
      elem['start']();
      if (elem.active) {
        elem.onStart();
      }
    });
  }

  onUpdate() {
    this.components.forEach(elem => {
      if (elem.active) {
        elem.onUpdate();
      }
    });
  }

  onFixedUpdate() {
    this.components.forEach(elem => {
      if (elem.active) {
        elem.onFixedUpdate();
      }
    });
  }

  onDestroy() {

  }

  // #endregion Lifecycle hooks

  setActive(value: boolean) {
    this.innerActive = value;
  }

  setParent(parent?: Entity) {
    if (parent == this) {
      return;
    }

    if (this.parent) {
      this.parent.removeChild(this);
    }

    if (parent) {
      parent.addChild(this);

      if (this.scene) {
        const index = this.scene.findIndex(this);
        if (index != -1) {
          this.scene.removeAt(index);
        }
      }
    } else {
      this.scene.add(this);
    }

    this.transform.updateTransform();
  }

  protected setParentForAddRemoveChild(parent?: Entity) {
    this.parent = parent;

    if (this.scene) {
      const index = this.scene.findIndex(this);
      if (index != -1) {
        this.scene.removeAt(index);
      }
    }

    this.transform.updateTransform();
  }

  addComponent(component: Component) {
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
    if (child == this) {
      return;
    }

    child.setParentForAddRemoveChild(this);

    if (this.scene && !child.scene) {
      this.scene.add(child);
    }

    if (index != undefined) {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
  }

  removeChild(child: Entity) {
    if (child == this) {
      return;
    }

    child.setParentForAddRemoveChild(undefined);

    const index = this.children.findIndex(elem => elem === child);
    if (index != -1) {
      this.children.splice(index, 1);
    }
  }

  clone() {
    return clone(this, WebGLBuffer, Shader);
  }
}
