import { Component } from 'react';
import { Vector3 } from '../types/vector3';

export class TransformComponent extends Component {
  position = new Vector3();
  rotation = new Vector3();
  scale = new Vector3();
}
