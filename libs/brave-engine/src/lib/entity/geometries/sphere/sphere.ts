import { MeshRendererComponent } from '../../../component/mesh-renderer-component';
import { Entity } from '../../entity';
import { MaterialComponent } from '../../../component/material-component';
import { SphereMesh } from './sphere-mesh';

export class Sphere extends Entity {
  name = 'Sphere';

  constructor(id?: string) {
    super(id);

    const meshRenderer = new MeshRendererComponent(this);
    meshRenderer.mesh = new SphereMesh();
    this.addComponent(meshRenderer);

    const material = new MaterialComponent(this);
    this.materials.push(material);
  }
}