import { Component } from './component';
import { Shader } from '../class/shader';
import { vertexShader } from '../shader/vertex-shader';
import { createShaderProgram } from '../util/shader/create-shader-program';
import { Entity } from '../entity/entity';

export class MaterialComponent extends Component {
  shader: Shader;
  cullingFace = false;
  cullingMode = MaterialCullingModeEnum.back;

  constructor(entity: Entity, id?: string) {
    super(entity, id);
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
        projectionMatrix: glContext.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: glContext.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      };

      this.shader.program = shaderProgram;
      this.shader.attribLocations = attribLocations;
      this.shader.uniformLocations = uniformLocations;

      this.shader.isLoaded = true;
    }
  }
}

export enum MaterialCullingModeEnum {
  back = 1029,
  front = 1028,
  frontAndBack = 1032,
}
