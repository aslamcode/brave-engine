import { Component } from '../components/component';
import { TransformComponent } from '../components/transform-component';

export class GameObject {
  transform: TransformComponent;
  components = new Array<Component>();
  childs = new Array<GameObject>();

  constructor() {
    this.transform = new TransformComponent(this);
  }
}
