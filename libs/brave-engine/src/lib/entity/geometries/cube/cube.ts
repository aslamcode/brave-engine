import { MeshRendererComponent } from '../../../component/mesh-renderer-component';
import { CubeMesh } from './cube-mesh';
import { Entity } from '../../entity';
import { MaterialComponent } from '../../../component/material-component';

export class Cube extends Entity {
  name = 'Cube';

  constructor(id?: string) {
    super(id);

    const meshRenderer = new MeshRendererComponent(this);
    meshRenderer.mesh = new CubeMesh();
    this.addComponent(meshRenderer);

    const material = new MaterialComponent(this);
    this.materials.push(material);
  }
}