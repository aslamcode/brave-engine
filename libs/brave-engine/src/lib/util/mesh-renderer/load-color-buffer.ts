import { Mesh } from '../../class/mesh';

export function loadColorBuffer(glContext: WebGL2RenderingContext, data: Mesh) {
  const colorBuffer = glContext.createBuffer();
  glContext.bindBuffer(glContext.ARRAY_BUFFER, colorBuffer);
  glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(data.colors), glContext.STATIC_DRAW);

  return colorBuffer as WebGLBuffer;
}