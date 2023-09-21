import { loadShader } from './load-shader';

export function createShaderProgram(
  glContext: WebGL2RenderingContext,
  vsSource: string,
  fsSource: string
) {
  const vertexShader = loadShader(glContext, glContext.VERTEX_SHADER, vsSource)!;
  const fragmentShader = loadShader(
    glContext,
    glContext.FRAGMENT_SHADER,
    fsSource
  )!;

  // Create the shader program
  const shaderProgram = glContext.createProgram()!;
  glContext.attachShader(shaderProgram, vertexShader);
  glContext.attachShader(shaderProgram, fragmentShader);
  glContext.linkProgram(shaderProgram);

  // If creating the shader program failed
  if (!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)) {
    console.warn(
      'Unable to create the shader program: ' +
        glContext.getProgramInfoLog(shaderProgram)
    );
    return null;
  }

  return shaderProgram;
}
