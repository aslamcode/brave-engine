import { Component } from './component';
import { Shader } from '../class/shader';
import { vertexShader } from '../shader/vertex-shader';
import { createShaderProgram } from '../util/shader/create-shader-program';
import { GameObject } from '../game-object/game-object';

export class MaterialComponent extends Component {
  shader: Shader;

  constructor(gameObject: GameObject) {
    super(gameObject);
    this.shader = vertexShader;
  }

  loadShader(glContext: WebGL2RenderingContext) {
    if (!this.shader.isLoaded) {
      const shaderProgram = createShaderProgram(glContext, this.shader.vertexSource, this.shader.fragmentSource)!;

      const attribLocations = {
        vertexPosition: glContext.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: glContext.getAttribLocation(shaderProgram, 'aVertexColor'),
      };

      const uniformLocations = {
        projectionMatrix: glContext.getUniformLocation(
          shaderProgram,
          'uProjectionMatrix'
        ),
        modelViewMatrix: glContext.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      };

      this.shader.program = shaderProgram;
      this.shader.attribLocations = attribLocations;
      this.shader.uniformLocations = uniformLocations;

      this.shader.isLoaded = true;
    }
  }
}
