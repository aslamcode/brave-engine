import { Entity } from '../entity/entity';

export class Scene {

  private children: Entity[] = [];
  get length() { return this.children.length; }

  constructor(private glContext: WebGL2RenderingContext) {
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
}