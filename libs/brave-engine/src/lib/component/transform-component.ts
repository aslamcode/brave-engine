import { Component } from './component';
import { Vector3 } from '../class/vector3';
import { Subscription } from 'rxjs';
import { Entity } from '../entity/entity';
import { mat4 } from 'gl-matrix';
import { degToRad } from '../util/deg-to-rad';

export class TransformComponent extends Component {

  localMatrix = mat4.create();
  worldMatrix = mat4.create();

  private innerPosition = new Vector3();
  private innerRotation = new Vector3();
  private innerScale = new Vector3(1, 1, 1);

  // Subscriptions
  private positionSubscription: Subscription;
  private rotationSubscription: Subscription;
  private scaleSubscription: Subscription;

  constructor(entity?: Entity, id?: string) {
    super(entity, id);
    this.listenPositionChanges();
    this.listenRotationChanges();
    this.listenScaleChanges();
  }

  onStart() {
    // Is necessary cancel all events and listen again
    // because the entity is cloned when scene starts

    // Cancel all events
    this.positionSubscription.unsubscribe();
    this.rotationSubscription.unsubscribe();
    this.scaleSubscription.unsubscribe();

    // Listen events again
    this.listenPositionChanges();
    this.listenRotationChanges();
    this.listenScaleChanges();
  }

  updateTransform() {
    mat4.identity(this.localMatrix); // Clear the local matrix

    // Translate matrix
    mat4.translate(
      this.localMatrix, // destination matrix
      this.localMatrix, // matrix to translate
      [this.position.x, this.position.y, this.position.z]
    );

    // Set rotation X
    mat4.rotate(
      this.localMatrix, // destination matrix
      this.localMatrix, // matrix to rotate
      degToRad(this.rotation.x), // amount to rotate in radians
      [1, 0, 0]
    );

    // Set rotation Y
    mat4.rotate(
      this.localMatrix, // destination matrix
      this.localMatrix, // matrix to rotate
      degToRad(this.rotation.y), // amount to rotate in radians
      [0, 1, 0]
    );

    // Set rotation Z
    mat4.rotate(
      this.localMatrix, // destination matrix
      this.localMatrix, // matrix to rotate
      degToRad(this.rotation.z), // amount to rotate in radians
      [0, 0, 1]
    );

    // Set scale
    mat4.scale(
      this.localMatrix, // destination matrix
      this.localMatrix, // matrix to scale
      [this.scale.x, this.scale.y, this.scale.z]
    );

    // Calculate transform based in parent transform
    const parentWorldMatrix = this.entity.parent ? this.entity.parent.transform.worldMatrix : mat4.create();
    if (parentWorldMatrix) {
      // Multiply parent world matrix by local matrix
      mat4.multiply(this.worldMatrix, parentWorldMatrix, this.localMatrix);
    } else {
      // If don't has parent just copy local matrix to world matrix
      mat4.copy(this.worldMatrix, this.localMatrix);
    }

    // Update all children transforms
    this.entity.children.forEach(elem => elem.transform.updateTransform());
  }

  private listenPositionChanges() {
    this.positionSubscription = this.position.onChange.subscribe(this.updateTransform.bind(this));
  }

  private listenRotationChanges() {
    this.rotationSubscription = this.rotation.onChange.subscribe(this.updateTransform.bind(this));
  }

  private listenScaleChanges() {
    this.scaleSubscription = this.scale.onChange.subscribe(this.updateTransform.bind(this));
  }

  //#region Getters

  get position() { return this.innerPosition; }
  get rotation() { return this.innerRotation; }
  get scale() { return this.innerScale; }

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

  //#endregion Setters
}
