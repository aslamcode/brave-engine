import { mat4 } from 'gl-matrix';
import { RgbaColor } from '../class/rgba-color';
import { degToRad } from '../util/deg-to-rad';
import { Entity } from './entity';
import { braveEngine } from '../brave-engine';

export class Camera extends Entity {
  private innerClearColor = new RgbaColor(0, 0, 0, 1);
  private innerFieldOfView = 60;
  private innerZNear = 0.01;
  private innerZFar = 1000;
  private innerProjectionMatrix = mat4.create();
  private innerHasChanges = false;
  private innerMainCamera = false;

  constructor(id?: string) {
    super(id);
    this.listenTransformChanges();
  }

  onStart() {
    this.updateAsMainCamera();
  }

  markHasChanges() {
    this.innerHasChanges = true;
  }

  markAsUpdated() {
    this.innerHasChanges = false;
  }

  private listenTransformChanges() {
    this.transform.onChange.subscribe(() => this.markHasChanges());
  }

  private updateAsMainCamera() {
    if (this.innerMainCamera) {
      braveEngine.setCamera(this);
    } else if (braveEngine.camera === this) {
      braveEngine.setCamera(null);
    }
  }

  //#region Getters

  get clearColor() { return this.innerClearColor; }
  get fieldOfView() { return this.innerFieldOfView; }
  get fieldOfViewInRad() { return degToRad(this.innerFieldOfView); }
  get zNear() { return this.innerZNear; }
  get zFar() { return this.innerZFar; }
  get projectionMatrix() { return this.innerProjectionMatrix; }
  get hasChanges() { return this.innerHasChanges; }
  get mainCamera() { return this.innerMainCamera; }

  //#endregion Getters

  //#region Setters

  set clearColor(value: RgbaColor) {
    this.innerClearColor = value;
    this.markHasChanges();
  }

  set fieldOfView(value: number) {
    this.innerFieldOfView = value;
    this.markHasChanges();
  }

  set zNear(value: number) {
    this.innerZNear = value;
    this.markHasChanges();
  }

  set zFar(value: number) {
    this.innerZFar = value;
    this.markHasChanges();
  }

  set mainCamera(value: boolean) {
    this.innerMainCamera = value;
    this.updateAsMainCamera();
  }

  //#endregion Setters
}
