export class Mesh {
  //#region Geometry

  // Vertices or positions
  vertices = new Array<number>();

  /** Indices or triangles */
  indices = new Array<number>();
  normals = new Array<number>();
  tangents = new Array<number>();
  colors = new Array<number>();

  //#endregion Geometry

  //#region Buffers

  vertexBuffer = new Array<number>();
  indexBuffer = new Array<number>();
  colorBuffer = new Array<number>();

  //#endregion Buffers

  get vertexCount() { return this.vertices.length; }
}