import { mat4 } from 'gl-matrix';
import { RgbaColor } from '../class/rgba-color';
import { degToRad } from '../util/deg-to-rad';
import { Entity, EntityTypeEnum } from './entity';
import { braveEngine } from '../brave-engine';
import { Subscription } from 'rxjs';

export class Camera extends Entity {
  name = 'Camera';
  type = EntityTypeEnum.camera;

  private innerClearColor = new RgbaColor(0, 0, 0, 1);
  private innerFieldOfView = 60;
  private innerZNear = 0.01;
  private innerZFar = 1000;
  private innerProjectionMatrix = mat4.create();
  private innerHasChanges = false;
  private innerMainCamera = false;

  private transformSubscription: Subscription;

  constructor(id?: string) {
    super(id);
    this.listenTransformChanges();
  }

  override onStart() {
    super.onStart();

    // Is necessary cancel all events and listen again
    // because the entity is cloned when scene starts

    // Cancel all events
    this.transformSubscription.unsubscribe();

    // Listen events again
    this.listenTransformChanges();

    // Clone a new projection matrix because the entity was cloned
    this.innerProjectionMatrix = mat4.clone(this.innerProjectionMatrix);

    this.updateAsMainCamera();
  }

  override onDestroy() {
    super.onDestroy();
  }

  markHasChanges() {
    this.innerHasChanges = true;
  }

  markAsUpdated() {
    this.innerHasChanges = false;
  }

  private listenTransformChanges() {
    this.transformSubscription = this.transform.onChange.subscribe(() => this.markHasChanges());
  }

  private updateAsMainCamera() {
    if (this.innerMainCamera) {
      braveEngine.setCamera(this);
    } else if (braveEngine.camera == this) {
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
