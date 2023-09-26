import { mat4 } from 'gl-matrix';
import { RgbaColor } from '../class/rgba-color';
import { degToRad } from '../util/deg-to-rad';
import { Entity } from './entity';

export class Camera extends Entity {
  clearColor = new RgbaColor(0, 0, 0, 1);
  fieldOfView = 60;
  zNear = 0.01;
  zFar = 100;
  projectionMatrix = mat4.create();

  get fieldOfViewInRad() {
    return degToRad(this.fieldOfView);
  }
}
