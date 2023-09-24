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

  add(entity: Entity) {
    entity.onLoad(this.glContext);

    if (this.braveEngine.mode === BraveEngineModeEnum.running) {
      this.startEntityRecursively(entity);
    }


    this.children.push(entity);
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

  private clone() {
    this.clonedChildren = this.baseChildren.map(entity => {
      const cloned = entity.clone();
      this.startEntityRecursively(cloned);
      return cloned;
    });
  }

  private clearClone() {
    this.clonedChildren = [];
  }

  private startEntityRecursively(entity: Entity) {
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

      default:
        return this.baseChildren;
    }
  }
}