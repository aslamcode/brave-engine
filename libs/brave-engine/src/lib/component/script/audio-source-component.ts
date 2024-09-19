import { Subscription } from 'rxjs';
import { ScriptComponent } from './script-component';
import { AudioSystem } from '../../static/audio-system';
import { Entity } from '../../entity/entity';

export class AudioSourceComponent extends ScriptComponent {

  protected transformSubscription: Subscription;
  protected hasChanges = false;

  private audioElement: HTMLAudioElement;
  private track: MediaElementAudioSourceNode;
  private panner: PannerNode;

  loop = false;
  autoPlay = true;

  constructor(entity: Entity, id?: string) {
    super(entity, id);

    this.audioElement = document.createElement('audio');
    this.audioElement.src = '/assets/audio/outfoxing.mp3';
    this.audioElement.loop = true;
    this.audioElement.playbackRate = 1;
    this.track = AudioSystem.context.createMediaElementSource(this.audioElement);

    // volume
    const gainNode = AudioSystem.context.createGain();
    gainNode.gain.value = 1;

    // panning 2d
    // const pannerOptions = { pan: 0 };
    // const panner = new StereoPannerNode(this.context, pannerOptions);

    // Panner 3d
    const panningModel: PanningModelType = 'HRTF';
    const distanceModel: DistanceModelType = 'linear';
    const maxDistance = 30;
    const refDistance = 1;
    const rolloffFactor = 10;

    const coneInnerAngle = 60;
    const coneOuterAngle = 90;
    const coneOuterGain = 0.3;

    this.panner = new PannerNode(AudioSystem.context, {
      panningModel,
      distanceModel,
      refDistance,
      maxDistance,
      rolloffFactor,
      coneInnerAngle,
      coneOuterAngle,
      coneOuterGain
    });

    // connect our graph
    this.track.connect(gainNode).connect(this.panner).connect(AudioSystem.context.destination);

    this.updateOrientation();
  }

  onStart() {
    this.listenTransformChanges();
    this.updateOrientation();

    if (this.autoPlay) {
      this.play();
    }
  }

  onUpdate() {
    if (this.hasChanges) {
      this.hasChanges = false;
      this.updateOrientation();
    }
  }

  onDestroy() {
    this.transformSubscription?.unsubscribe();
    this.stop();
  }

  protected updateOrientation() {
    const transform = this.entity.transform;
    const position = this.entity.transform.position;

    this.panner.positionX.value = position.x;
    this.panner.positionY.value = position.y;
    this.panner.positionZ.value = position.z;

    // Set rotation using projection vector
    const projection = transform.forward;
    this.panner.orientationX.value = projection.x;
    this.panner.orientationY.value = 0;
    this.panner.orientationZ.value = projection.z;
  }

  protected listenTransformChanges() {
    this.transformSubscription?.unsubscribe();
    this.transformSubscription = this.entity.transform.onChange.subscribe(() => {
      this.hasChanges = true;
    });
  }

  //#region Controls

  play() {
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }

  stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  //#endregion Controls
}