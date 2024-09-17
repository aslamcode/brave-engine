import { Mesh } from '../../../class/mesh';

export class SphereMesh extends Mesh {
  constructor() {
    super();

    // Fill vertices
    this.vertices = [
      1.0, 1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, 1.0, 1.0,
      1.0, -1.0, 1.0,
      -1.0, 1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0, 1.0, 1.0,
      -1.0, -1.0, 1.0
    ];

    // Fill indices
    this.indices = [
      4,
      2,
      0,
      4,
      2,
      0,
      2,
      7,
      3,
      6,
      5,
      7,
      1,
      7,
      5,
      0,
      3,
      1,
      4,
      1,
      5,
      4,
      6,
      2,
      2,
      6,
      7,
      6,
      4,
      5,
      1,
      3,
      7,
      0,
      2,
      3,
      4,
      0,
      1
    ];

    // Fill colors
    const faceColors = [
      [1, 1, 1, 1.0],
      [1, 1, 1, 1.0],
      [1, 1, 1, 1.0],
      [1, 1, 1, 1.0],
      [1, 1, 1, 1.0],
      [1, 1, 1, 1.0],
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