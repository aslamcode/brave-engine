export function loadShader(
  glContext: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = glContext.createShader(type)!;

  // Send the source to the shader object
  glContext.shaderSource(shader, source);

  // Compile the shader program
  glContext.compileShader(shader);

  // See if it compiled successfully
  if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
    console.warn(
      'An error occurred compiling the shaders: ' +
        glContext.getShaderInfoLog(shader)
    );
    glContext.deleteShader(shader);
    return null;
  }

  return shader;
}
