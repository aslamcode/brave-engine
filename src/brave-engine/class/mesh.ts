export class Mesh {
  // Geometry
  vertices = new Array<number>(); // Or positions
  indices = new Array<number>(); // Or triangles
  normals = new Array<number>();
  tangents = new Array<number>();
  colors = new Array<number>();

  // Buffers
  vertexBuffer = new Array<number>();
  indexBuffer = new Array<number>();
  colorBuffer = new Array<number>();

  get vertexCount() { return this.vertices.length; }
}