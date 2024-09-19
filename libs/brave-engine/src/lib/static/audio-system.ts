import { TransformComponent } from '../component/transform-component';

export class AudioSystem {
  static context = new AudioContext();

  static setListenerOrientation(transform: TransformComponent) {
    const { x, y, z } = transform.position;
    this.listener.positionX.setTargetAtTime(x, this.context.currentTime, 0.03);
    this.listener.positionY.setTargetAtTime(y, this.context.currentTime, 0.03);
    this.listener.positionZ.setTargetAtTime(z, this.context.currentTime, 0.03);

    // Set rotation using projection vector
    const backward = transform.backward;
    this.listener.forwardX.setTargetAtTime(backward.x, this.context.currentTime, 0.03);
    this.listener.forwardY.value = 0;
    this.listener.forwardZ.setTargetAtTime(backward.z, this.context.currentTime, 0.03);
  }

  static get listener() {
    return this.context.listener;
  }
}

// Configure listener world directions
AudioSystem.listener.upX.value = 0;
AudioSystem.listener.upY.value = 1;
AudioSystem.listener.upZ.value = 0;