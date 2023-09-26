import { Component } from './component';
import { Vector3 } from '../class/vector3';
import { Subscription } from 'rxjs';
import { Entity } from '../entity/entity';

export class TransformComponent extends Component {
  private innerPosition = new Vector3();
  private innerRotation = new Vector3();
  private innerScale = new Vector3(1, 1, 1);

  private innerLocalPosition = new Vector3();
  private innerLocalRotation = new Vector3();
  private innerLocalScale = new Vector3(1, 1, 1);

  // Subscriptions

  private positionSubscription: Subscription;
  private rotationSubscription: Subscription;
  private scaleSubscription: Subscription;
  private localPositionSubscription: Subscription;
  private localRotationSubscription: Subscription;
  private localScaleSubscription: Subscription;

  private isUpdating = false;

  constructor(entity?: Entity) {
    super(entity);
    this.listenPositionChanges();
    this.listenRotationChanges();
    this.listenScaleChanges();
    this.listenLocalPositionChanges();
    this.listenLocalRotationChanges();
    this.listenLocalScaleChanges();
  }

  updateAll() {
    this.updatePositionFromLocalPosition();
    this.updateRotationFromLocalRotation();
    this.updateScaleFromLocalScale();
  }

  private listenPositionChanges() {
    this.positionSubscription = this.innerPosition.onChange.subscribe(this.updateLocalPositionFromPosition.bind(this));
    this.updateLocalPositionFromPosition();
  }

  protected updateLocalPositionFromPosition() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.addTwoVectors(this.localPosition, this.position, this.entity.parent?.transform.position);
    this.entity.children.forEach(elem => elem.transform.updatePositionFromLocalPosition());
    this.isUpdating = false;
  }

  private listenRotationChanges() {
    this.rotationSubscription = this.innerRotation.onChange.subscribe(this.updateLocalRotationFromRotation.bind(this));
    this.updateLocalRotationFromRotation();
  }

  protected updateLocalRotationFromRotation() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.addTwoVectors(this.localRotation, this.rotation, this.entity.parent?.transform.rotation);
    this.entity.children.forEach(elem => elem.transform.updateRotationFromLocalRotation());
    this.isUpdating = false;
  }

  private listenScaleChanges() {
    this.scaleSubscription = this.innerScale.onChange.subscribe(this.updateLocalScaleFromScale.bind(this));
    this.updateLocalScaleFromScale();
  }

  protected updateLocalScaleFromScale() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.multiplyTwoVectors(this.localScale, this.scale, this.entity.parent?.transform.scale);
    this.entity.children.forEach(elem => elem.transform.updateScaleFromLocalScale());
    this.isUpdating = false;
  }

  private listenLocalPositionChanges() {
    this.localPositionSubscription = this.localPosition.onChange.subscribe(this.updatePositionFromLocalPosition.bind(this));
    this.updatePositionFromLocalPosition();
  }

  protected updatePositionFromLocalPosition() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.addTwoVectors(this.position, this.localPosition, this.entity.parent?.transform.position);
    this.entity.children.forEach(elem => elem.transform.updatePositionFromLocalPosition());
    this.isUpdating = false;
  }

  private listenLocalRotationChanges() {
    this.localRotationSubscription = this.localRotation.onChange.subscribe(this.updateRotationFromLocalRotation.bind(this));
    this.updateRotationFromLocalRotation();
  }

  protected updateRotationFromLocalRotation() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.addTwoVectors(this.rotation, this.localRotation, this.entity.parent?.transform.rotation);
    this.entity.children.forEach(elem => elem.transform.updateRotationFromLocalRotation());
    this.isUpdating = false;
  }

  private listenLocalScaleChanges() {
    this.localScaleSubscription = this.localScale.onChange.subscribe(this.updateScaleFromLocalScale.bind(this));
    this.updateScaleFromLocalScale();
  }

  protected updateScaleFromLocalScale() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.multiplyTwoVectors(this.scale, this.localScale, this.entity.parent?.transform.scale);
    this.entity.children.forEach(elem => elem.transform.updateScaleFromLocalScale());
    this.isUpdating = false;
  }

  //#region Getters

  get position() { return this.innerPosition; }
  get rotation() { return this.innerRotation; }
  get scale() { return this.innerScale; }

  get localPosition() { return this.innerLocalPosition; }
  get localRotation() { return this.innerLocalRotation; }
  get localScale() { return this.innerLocalScale; }

  //#endregion Getters

  //#region Setters

  set position(value: Vector3) {
    this.positionSubscription.unsubscribe();
    this.innerPosition = value;
    this.listenPositionChanges();
  }

  set rotation(value: Vector3) {
    this.rotationSubscription.unsubscribe();
    this.innerRotation = value;
    this.listenRotationChanges();
  }

  set scale(value: Vector3) {
    this.scaleSubscription.unsubscribe();
    this.innerScale = value;
    this.listenScaleChanges();
  }

  set localPosition(value: Vector3) {
    this.localPositionSubscription.unsubscribe();
    this.innerLocalPosition = value;
    this.listenLocalPositionChanges();
  }

  set localRotation(value: Vector3) {
    this.localRotationSubscription.unsubscribe();
    this.innerLocalRotation = value;
    this.listenLocalRotationChanges();
  }

  set localScale(value: Vector3) {
    this.localScaleSubscription.unsubscribe();
    this.innerLocalScale = value;
    this.listenLocalScaleChanges();
  }

  //#endregion Setters

  private addTwoVectors(vectorResult: Vector3, vectorA: Vector3, vectorB?: Vector3) {
    if (vectorB) {
      const { x, y, z } = vectorA;
      const bX = vectorB.x;
      const bY = vectorB.y;
      const bZ = vectorB.z;

      vectorResult.x = x + bX;
      vectorResult.y = y + bY;
      vectorResult.z = z + bZ;
    } else {
      vectorResult.x = vectorA.x;
      vectorResult.y = vectorA.y;
      vectorResult.z = vectorA.z;
    }
  }

  private multiplyTwoVectors(vectorResult: Vector3, vectorA: Vector3, vectorB?: Vector3) {
    if (vectorB) {
      const { x, y, z } = vectorA;
      const bX = vectorB.x;
      const bY = vectorB.y;
      const bZ = vectorB.z;

      vectorResult.x = x * bX;
      vectorResult.y = y * bY;
      vectorResult.z = z * bZ;
    } else {
      vectorResult.x = vectorA.x;
      vectorResult.y = vectorA.y;
      vectorResult.z = vectorA.z;
    }
  }
}
