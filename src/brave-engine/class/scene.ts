import { GameObject } from '../game-object/game-object';

export class Scene {

  private children: GameObject[] = [];
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
          return { done: true } as { value: GameObject, done: boolean };
        }
      },
    };
  }

  at(index: number) {
    return this.children[index];
  }

  add(data: GameObject) {
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

  remove(data: GameObject) {
    const index = this.children.findIndex(elem => elem == data);
    if (index != -1) {
      this.children.splice(index, 1);
    }
  }

  removeAt(index: number) {
    this.children.splice(index, 1);
  }
}