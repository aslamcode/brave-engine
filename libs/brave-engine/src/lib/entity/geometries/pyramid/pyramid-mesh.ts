import { Mesh } from '../../../class/mesh';

export class PyramidMesh extends Mesh {
  constructor() {
    super();

    // Fill vertices
    this.vertices = [
      -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, // Base

      -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0, 0, 0, 0, 0.5, 0, // Face one

      -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0, 0, 0, 0, 0.5, 0, // Face two

      0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0, 0, 0, 0, 0.5, 0, // Face three

      -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0, 0, 0, 0, 0.5, 0, // Face fourth
    ];

    // Fill indices
    this.indices = [
      2, 1, 0,
      3, 2, 0,

      4, 5, 7,
      4, 5, 7,

      8, 9, 11,
      8, 9, 11,

      12, 13, 15,
      12, 13, 15,

      16, 19, 17,
      16, 19, 17,
    ];

    // Fill colors
    const faceColors = [
      [1.0, 1.0, 1.0, 1.0], // Front face: white
      [1.0, 0.0, 0.0, 1.0], // Back face: red
      [0.0, 1.0, 0.0, 1.0], // Top face: green
      [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
      [1.0, 1.0, 0.0, 1.0], // Right face: yellow
    ];

    // Convert the array of colors into a table for all the vertices.
    let colors: number[] = [];
    for (let i = 0; i < faceColors.length; ++i) {
      const c = faceColors[i];
      // Repeat each color four times for the four vertices of the face
      colors = colors.concat(c, c, c, c);
    }

    this.colors = colors;
  }
}