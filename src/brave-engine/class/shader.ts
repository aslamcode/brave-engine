export class Shader {
  // Sources
  vertexSource!: string;
  fragmentSource!: string;

  // Instantiated shader data
  program!: WebGLProgram | null;
  attribLocations!: {
    vertexPosition: number;
    vertexColor: number;
  };
  uniformLocations!: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
  };

  isLoaded = false;
}