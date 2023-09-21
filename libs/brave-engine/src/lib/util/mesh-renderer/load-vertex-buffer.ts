import { Mesh } from '../../class/mesh';

export function loadVertexBuffer(glContext: WebGL2RenderingContext, data: Mesh) {
  const vertexBuffer = glContext.createBuffer();

  // Select the vertexBuffer as the one to apply buffer
  // operations to from here out.
  glContext.bindBuffer(glContext.ARRAY_BUFFER, vertexBuffer);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(data.vertices), glContext.STATIC_DRAW);

  return vertexBuffer as WebGLBuffer;
}