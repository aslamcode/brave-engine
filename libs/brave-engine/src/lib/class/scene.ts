import { BraveEngine } from '../brave-engine';
import { Entity } from '../entity/entity';
import { BraveEngineModeEnum } from '../enum/brave-engine-mode-enum';
import { clone } from '../util/clone';
import { Shader } from './shader';

export class Scene {
  public name = 'New scene';

  private baseChildren: Entity[] = [];
  private clonedChildren: Entity[] = [];
  private paused = false;

  get length() { return this.children.length; }

  constructor(
    private braveEngine: BraveEngine,
    private glContext: WebGL2RenderingContext
  ) {
    this.braveEngine.modeSubject.subscribe(() => {
      switch (this.braveEngine.mode) {
        case BraveEngineModeEnum.editor:
          return this.clearClone();

        case BraveEngineModeEnum.running:
          if (this.paused) {
            this.paused = false;
            return;
          }

          return this.cloneAndStart();

        case BraveEngineModeEnum.compiled:
          if (this.paused) {
            this.paused = false;
            return;
          }

          return this.start();

        case BraveEngineModeEnum.paused:
          return this.paused = true;

        case BraveEngineModeEnum.compiledPaused:
          return this.paused = true;
      }
    });
  }

  start() {
    this.children.forEach(elem => this.startEntityRecursively(elem));
  }

  destroy() {
    this.children.forEach(elem => elem.destroy());
  }

  // Permits iterate scene on for using for of
  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.children.length) {
          return { value: this.children[index++], done: false };
        } else {
          return { done: true } as { value: Entity, done: boolean };
        }
      },
    };
  }

  at(index: number) {
    return this.children[index];
  }

  add(entity: Entity) {
    if (!entity.scene) {
      this.setSceneRecursively(entity);

      this.loadEntityRecursively(entity);

      if (this.braveEngine.mode === BraveEngineModeEnum.compiled || this.braveEngine.mode === BraveEngineModeEnum.running) {
        this.startEntityRecursively(entity);
      }
    }

    if (!entity.parent && !this.has(entity)) {
      this.children.push(entity);
    }
  }

  remove(entity: Entity) {
    const index = this.children.findIndex(elem => elem == entity);
    if (index != -1) {
      this.children.splice(index, 1);
    }
  }

  removeAt(index: number) {
    this.children.splice(index, 1);
  }

  findIndex(entity: Entity) {
    return this.children.findIndex(elem => elem == entity);
  }

  has(entity: Entity) {
    const index = this.children.findIndex(elem => elem == entity);
    if (index != -1) {
      return true;
    }

    return false;
  }

  private cloneAndStart() {
    this.clonedChildren = this.baseChildren.map(entity => {
      const cloned = clone(entity, WebGLBuffer, Shader, Scene);
      return cloned;
    });

    this.start();
  }

  private clearClone() {
    this.clonedChildren.forEach(elem => elem.destroy());
    this.clonedChildren = [];
  }

  private setSceneRecursively(entity: Entity) {
    entity.scene = this;
    entity.children.forEach(elem => this.setSceneRecursively(elem));
  }

  private loadEntityRecursively(entity: Entity) {
    entity['load'](this.glContext);
    entity.children.forEach(elem => this.loadEntityRecursively(elem));
  }

  private startEntityRecursively(entity: Entity) {
    entity['start']();
    entity.onStart();
    entity.children.forEach(elem => this.startEntityRecursively(elem));
  }

  get children() {
    switch (this.braveEngine.mode) {
      case BraveEngineModeEnum.editor:
        return this.baseChildren;

      case BraveEngineModeEnum.running:
        return this.clonedChildren;

      case BraveEngineModeEnum.paused:
        return this.clonedChildren;

      case BraveEngineModeEnum.compiled:
        return this.baseChildren;

      case BraveEngineModeEnum.compiledPaused:
        return this.baseChildren;

      default:
        return this.baseChildren;
    }
  }
}