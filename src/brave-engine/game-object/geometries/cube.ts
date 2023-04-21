import { MeshRendererComponent } from '../../component/mesh-renderer-component';
import { CubeMesh } from '../../mesh/cube';
import { GameObject } from '../game-object';

export class Cube extends GameObject {
    constructor() {
        super();

        const meshRenderer = new MeshRendererComponent(this);
        meshRenderer.mesh = new CubeMesh();
        this.meshRenderer = meshRenderer;
    }
}