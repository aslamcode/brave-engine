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

    console.warn('Remove listen position changes from constructor when mode is compiled. Maybe create a onEditor hook can resolve this problem');
    // this.listenPositionChanges();
    // this.listenRotationChanges();
    // this.listenScaleChanges();

    this.listenLocalPositionChanges();
    this.listenLocalRotationChanges();
    this.listenLocalScaleChanges();
  }

  onStart() {
    // this.listenPositionChanges();
    // this.listenRotationChanges();
    // this.listenScaleChanges();
    this.listenLocalPositionChanges();
    this.listenLocalRotationChanges();
    this.listenLocalScaleChanges();
  }

  updateAll() {
    // this.updatePositionFromLocalPosition();
    // this.updateRotationFromLocalRotation();
    // this.updateScaleFromLocalScale();

    this.updateTransform();
  }

  updateTransform() {
    const dest = this.localMatrix;
    mat4.identity(dest);
    mat4.translate(dest, dest, [this.localPosition.x, this.localPosition.y, this.localPosition.z]);

    mat4.rotate(
      dest, // destination matrix
      dest, // matrix to rotate
      degToRad(this.localRotation.x), // amount to rotate in radians
      [1, 0, 0]
    ); // axis to rotate around (X)

    // Set rotation Y to draw the element
    mat4.rotate(
      dest, // destination matrix
      dest, // matrix to rotate
      degToRad(this.localRotation.y), // amount to rotate in radians
      [0, 1, 0]
    ); // axis to rotate around (Y)

    // Set rotation Z to draw the element
    mat4.rotate(
      dest, // destination matrix
      dest, // matrix to rotate
      degToRad(this.localRotation.z), // amount to rotate in radians
      [0, 0, 1]
    ); // axis to rotate around (Z)

    // Set scale to draw the element
    mat4.scale(
      dest, // destination matrix
      dest, // matrix to scale
      [this.localScale.x, this.localScale.y, this.localScale.z]
    );

    let parentPosition: Vector3;
    let parentRotation: Vector3;
    let parentScale: Vector3;
    let parentWorldMatrix: mat4;

    if (this.entity.parent) {
      parentPosition = this.entity.parent.transform.position;
      parentRotation = this.entity.parent.transform.rotation;
      parentScale = this.entity.parent.transform.scale;
      parentWorldMatrix = this.entity.parent.transform.worldMatrix;
    } else {
      parentPosition = new Vector3();
      parentRotation = new Vector3();
      parentScale = new Vector3();
      parentWorldMatrix = mat4.create();
    }

    if (parentWorldMatrix) {
      // a matrix was passed in so do the math
      mat4.multiply(this.worldMatrix, parentWorldMatrix, this.localMatrix);
    } else {
      // no matrix was passed in so just copy local to world
      mat4.copy(this.localMatrix, this.worldMatrix);
    }

    this.entity.children.forEach(elem => elem.transform.updateTransform());

    // // now process all the children
    // var worldMatrix = this.worldMatrix;
    // this.children.forEach(function (child) {
    //   child.updateWorldMatrix(worldMatrix);
    // });

    // const finalPosition = new Vector3();

    // this.addTwoVectors(finalPosition, parentPosition, this.localPosition);

    // mat4.translate(
    //   this.modelViewMatrix, // destination matrix
    //   parentModelViewMatrix, // matrix to translate
    //   [finalPosition.x, finalPosition.y, finalPosition.z]
    // );

    // mat4.rotate(
    //   this.modelViewMatrix, // destination matrix
    //   parentModelViewMatrix, // matrix to translate
    //   degToRad(parentRotation.x + this.localRotation.x),
    //   [1, 0, 0]
    // );

    // mat4.rotateY(
    //   this.modelViewMatrix, // destination matrix
    //   parentModelViewMatrix, // matrix to translate
    //   degToRad(parentRotation.y + this.localRotation.y)
    // );

    // mat4.rotateZ(
    //   this.modelViewMatrix, // destination matrix
    //   parentModelViewMatrix, // matrix to translate
    //   degToRad(parentRotation.z + this.localRotation.z)
    // );

    // // Primeiro passo
    // // Multiplicar a posicao local do filho pela escala do pai
    // const localPosition = new Vector3();
    // this.multiplyTwoVectors(localPosition, this.innerLocalPosition, parentScale);

    // // Segundo passo
    // // Posicao global do filho sera igual position global do pai + position local do filho + a translacao resultante da rotacao do pai
    // const globalPosition = new Vector3();
    // this.addTwoVectors(globalPosition, parentPosition, localPosition);

    // const distanceFromParent = Math.hypot(localPosition.x, localPosition.y, localPosition.z);
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
    // this.updateTransform();
    // this.entity.children.forEach(elem => elem.transform.updateTransform());
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
    // this.updateTransform();
    // this.entity.children.forEach(elem => elem.transform.updateTransform());
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
    // this.updateTransform();
    // this.entity.children.forEach(elem => elem.transform.updateTransform());
    this.isUpdating = false;
  }

  private listenLocalPositionChanges() {
    this.localPositionSubscription = this.localPosition.onChange.subscribe(this.updatePositionFromLocalPosition.bind(this));
  }

  protected updatePositionFromLocalPosition() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.updateTransform();
    this.isUpdating = false;
  }

  private listenLocalRotationChanges() {
    this.localRotationSubscription = this.localRotation.onChange.subscribe(this.updateRotationFromLocalRotation.bind(this));
  }

  protected updateRotationFromLocalRotation() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.updateTransform();
    this.isUpdating = false;
  }

  private listenLocalScaleChanges() {
    this.localScaleSubscription = this.localScale.onChange.subscribe(this.updateScaleFromLocalScale.bind(this));
  }

  protected updateScaleFromLocalScale() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.updateTransform();
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

  private distanceBetweenTwoVectors(vectorA: Vector3, vectorB: Vector3) {
    const x = vectorA.x - vectorB.x;
    const y = vectorA.y - vectorB.y;
    const z = vectorA.z - vectorB.z;
    return Math.hypot(x, y, z);
  }

}
