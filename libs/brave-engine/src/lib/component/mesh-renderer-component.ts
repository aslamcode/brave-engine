import { Mesh } from '../class/mesh';
import { loadVertexBuffer } from '../util/mesh-renderer/load-vertex-buffer';
import { loadIndexBuffer } from '../util/mesh-renderer/load-index-buffer';
import { loadColorBuffer } from '../util/mesh-renderer/load-color-buffer';
import { Component } from './component';

export class MeshRendererComponent extends Component {
  private glContext?: WebGL2RenderingContext;
  mesh!: Mesh;

  vertexBuffer!: WebGLBuffer;
  indexBuffer!: WebGLBuffer;
  colorBuffer!: WebGLBuffer;

  isBuffersLoaded = false;

  loadBuffers(glContext: WebGL2RenderingContext) {
    if (!this.isBuffersLoaded) {
      this.glContext = glContext;
      this.vertexBuffer = loadVertexBuffer(glContext, this.mesh);
      this.indexBuffer = loadIndexBuffer(glContext, this.mesh);
      this.colorBuffer = loadColorBuffer(glContext, this.mesh);

      this.isBuffersLoaded = true;
    }
  }
}