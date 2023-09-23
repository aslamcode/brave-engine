import { BraveEngine } from '../brave-engine';
import { Entity } from '../entity/entity';
import { BraveEngineModeEnum } from '../enum/brave-engine-mode-enum';

export class Scene {
  private baseChildren: Entity[] = [];
  private clonedChildren: Entity[] = [];

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
          return this.clone();
      }
    });
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

  add(data: Entity) {
    // Load materials shaders
    data.materials.forEach(elem => {
      elem.loadShader(this.glContext);
    });

    // Load mesh renderer buffers if exists mesh renderer
    if (data.meshRenderer) {
      data.meshRenderer.loadBuffers(this.glContext);
    }

    if (this.braveEngine.mode === BraveEngineModeEnum.running) {
      data.onStart();
    }

    this.children.push(data);
  }

  remove(data: Entity) {
    const index = this.children.findIndex(elem => elem == data);
    if (index != -1) {
      this.children.splice(index, 1);
    }
  }

  removeAt(index: number) {
    this.children.splice(index, 1);
  }

  private clone() {
    this.clonedChildren = this.baseChildren.map(entity => {
      const cloned = entity.clone();
      cloned.onStart();
      return cloned;
    });
  }

  private clearClone() {
    this.clonedChildren = [];
  }

  get children() {
    switch (this.braveEngine.mode) {
      case BraveEngineModeEnum.editor:
        return this.baseChildren;

      case BraveEngineModeEnum.running:
        return this.clonedChildren;

      case BraveEngineModeEnum.paused:
        return this.clonedChildren;

      default:
        return this.baseChildren;
    }
  }
}