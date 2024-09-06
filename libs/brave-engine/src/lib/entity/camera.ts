import { mat4 } from 'gl-matrix';
import { RgbaColor } from '../class/rgba-color';
import { degToRad } from '../util/deg-to-rad';
import { Entity } from './entity';

export class Camera extends Entity {
  private innerClearColor = new RgbaColor(0, 0, 0, 1);
  private innerFieldOfView = 60;
  private innerZNear = 0.01;
  private innerZFar = 1000;
  private innerProjectionMatrix = mat4.create();

  hasChanges = false;

  constructor(id?: string) {
    super(id);
    this.listenTransformChanges();
  }

  markHasChanges() {
    this.hasChanges = true;
  }

  markAsUpdated() {
    this.hasChanges = false;
  }

  private listenTransformChanges() {
    this.transform.onChange.subscribe(() => this.markHasChanges());
  }

  //#region Getters

  get clearColor() { return this.innerClearColor; }
  get fieldOfView() { return this.innerFieldOfView; }
  get fieldOfViewInRad() { return degToRad(this.innerFieldOfView); }
  get zNear() { return this.innerZNear; }
  get zFar() { return this.innerZFar; }
  get projectionMatrix() { return this.innerProjectionMatrix; }

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

  //#endregion Setters
}
