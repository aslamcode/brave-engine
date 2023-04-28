export class Mesh {
  // Vertices or positions
  vertices = new Array<number>();

  /** Indices or triangles */
  indices = new Array<number>();
  normals = new Array<number>();
  tangents = new Array<number>();
  colors = new Array<number>();

  get vertexCount() { return this.vertices.length / 2; }
}