import { MeshRendererComponent } from '../../../component/mesh-renderer-component';
import { PyramidMesh } from './pyramid-mesh';
import { Entity } from '../../entity';
import { MaterialComponent } from '../../../component/material-component';

export class Pyramid extends Entity {
  name = 'Pyramid';

  constructor(id?: string) {
    super(id);

    const meshRenderer = new MeshRendererComponent(this);
    meshRenderer.mesh = new PyramidMesh();
    this.addComponent(meshRenderer);

    const material = new MaterialComponent(this);
    this.materials.push(material);
  }
}