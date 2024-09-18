import { Vector3 } from '../class/vector3';

export class AudioSystem {
  static context = new AudioContext();

  static initialize() {
    const audioElement: HTMLAudioElement = document.querySelector('#audioClip');
    const track = this.context.createMediaElementSource(audioElement);

    // Configure listener world directions
    this.listener.forwardX.value = 0;
    this.listener.forwardY.value = 0;
    this.listener.forwardZ.value = -1;
    this.listener.upX.value = 0;
    this.listener.upY.value = 1;
    this.listener.upZ.value = 0;

    // volume
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.3;

    // panning 2d
    // const pannerOptions = { pan: 0 };
    // const panner = new StereoPannerNode(this.context, pannerOptions);

    // Panner 3d
    const panningModel = 'HRTF';
    const distanceModel = 'linear';
    const maxDistance = 10000;
    const refDistance = 1;
    const rollOff = 10;

    const innerCone = 60;
    const outerCone = 90;
    const outerGain = 0.3;

    const positionX = 0;
    const positionY = 0;
    const positionZ = 0;

    const orientationX = 0.0;
    const orientationY = 0.0;
    const orientationZ = -1.0;

    const panner = new PannerNode(this.context, {
      panningModel,
      distanceModel,
      positionX,
      positionY,
      positionZ,
      orientationX,
      orientationY,
      orientationZ,
      refDistance,
      maxDistance,
      rolloffFactor: rollOff,
      coneInnerAngle: innerCone,
      coneOuterAngle: outerCone,
      coneOuterGain: outerGain,
    });

    // connect our graph
    track.connect(gainNode).connect(panner).connect(this.context.destination);

    audioElement.play();
  }

  static setListenerPosition(position: Vector3) {
    const { x, y, z } = position;
    this.listener.positionX.value = x;
    this.listener.positionY.value = y;
    this.listener.positionZ.value = z;
  }

  static get listener() {
    return this.context.listener;
  }
}