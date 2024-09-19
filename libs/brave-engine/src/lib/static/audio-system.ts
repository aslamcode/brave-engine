import { TransformComponent } from '../component/transform-component';

export class AudioSystem {
  static context = new AudioContext();

  static initialize() {
    // Configure listener world directions
    this.listener.upX.value = 0;
    this.listener.upY.value = 1;
    this.listener.upZ.value = 0;
  }

  static setListenerOrientation(transform: TransformComponent) {
    const { x, y, z } = transform.position;
    this.listener.positionX.value = x;
    this.listener.positionY.value = y;
    this.listener.positionZ.value = z;

    // Set rotation using projection vector
    const backward = transform.backward;
    this.listener.forwardX.value = backward.x;
    this.listener.forwardY.value = 0;
    this.listener.forwardZ.value = backward.z;
  }

  static get listener() {
    return this.context.listener;
  }
}