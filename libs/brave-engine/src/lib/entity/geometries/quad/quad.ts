import { MeshRendererComponent } from '../../../component/mesh-renderer-component';
import { QuadMesh } from './quad-mesh';
import { Entity } from '../../entity';
import { MaterialComponent } from '../../../component/material-component';

export class Quad extends Entity {
  name = 'Quad';

  constructor(id?: string) {
    super(id);

    const meshRenderer = new MeshRendererComponent(this);
    meshRenderer.mesh = new QuadMesh();
    this.addComponent(meshRenderer);

    const material = new MaterialComponent(this);
    this.materials.push(material);
  }
}