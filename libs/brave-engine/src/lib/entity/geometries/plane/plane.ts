import { MeshRendererComponent } from '../../../component/mesh-renderer-component';
import { Entity } from '../../entity';
import { MaterialComponent } from '../../../component/material-component';
import { PlaneMesh } from './plane-mesh';

export class Plane extends Entity {
  name = 'Plane';

  constructor(id?: string) {
    super(id);

    const meshRenderer = new MeshRendererComponent(this);
    meshRenderer.mesh = new PlaneMesh();
    this.addComponent(meshRenderer);

    const material = new MaterialComponent(this);
    this.materials.push(material);
  }
}