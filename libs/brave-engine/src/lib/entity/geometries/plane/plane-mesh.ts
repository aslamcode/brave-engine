import { Mesh } from '../../../class/mesh';

export class PlaneMesh extends Mesh {
  constructor() {
    super();

    // Fill vertices
    this.vertices = [
      -5, 0, -5, -5, 0, 5, 5, 0, 5, 5, 0, -5,
    ];

    // Fill indices
    this.indices = [
      0,
      1,
      2,
      0,
      2,
      3,
    ];

    // Fill colors
    const faceColors = [
      [0.95, 0.95, 0.95, 1.0]
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