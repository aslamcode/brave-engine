import { mat4 } from 'gl-matrix';
import { RgbaColor } from '../class/rgba-color';
import { degToRad } from '../util/deg-to-rad';
import { GameObject } from './game-object';

export class Camera extends GameObject {
  clearColor = new RgbaColor(0, 0, 0, 1);
  fieldOfView = 60;
  zNear = 0.1;
  zFar = 100;
  projectionMatrix = mat4.create();

  get fieldOfViewInRad() {
    return degToRad(this.fieldOfView);
  }
}
