import { Mesh } from '../../class/mesh';

export function loadIndexBuffer(glContext: WebGL2RenderingContext, data: Mesh) {
  const indexBuffer = glContext.createBuffer();
  glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, indexBuffer);

  glContext.bufferData(
    glContext.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(data.indices),
    glContext.STATIC_DRAW
  );

  return indexBuffer as WebGLBuffer;
}