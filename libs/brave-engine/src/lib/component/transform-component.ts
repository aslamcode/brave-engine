import { Component } from './component';
import { Vector3 } from '../class/vector3';

export class TransformComponent extends Component {
  position = new Vector3();
  rotation = new Vector3();
  scale = new Vector3(1, 1, 1);

  localPosition = new Vector3();
  localRotation = new Vector3();
  localScale = new Vector3(1, 1, 1);
}