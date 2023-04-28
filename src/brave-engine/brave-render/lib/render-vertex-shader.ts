
import { mat4 } from 'gl-matrix';
import { Shader } from '../../class/shader';
import { GameObject } from '../../game-object/game-object';
import { degToRad } from '../../util/deg-to-rad';
import { Camera } from '../../game-object/camera';

export function renderVertexShader(glContext: WebGL2RenderingContext, camera: Camera, gameObject: GameObject) {
  const cameraProjectionMatrix = camera.projectionMatrix;

  // Set position camera render
  mat4.translate(
    cameraProjectionMatrix, // destination matrix
    cameraProjectionMatrix, // matrix to translate
    [camera.transform.position.x, camera.transform.position.y, camera.transform.position.z]
  );

  // // Set rotation X to camera
  // mat4.rotate(
  //   cameraProjectionMatrix, // destination matrix
  //   cameraProjectionMatrix, // matrix to rotate
  //   degToRad(camera.transform.rotation.x), // amount to rotate in radians
  //   [1, 0, 0]
  // ); // axis to rotate around (X)

  // // Set rotation Y to camera
  // mat4.rotate(
  //   cameraProjectionMatrix, // destination matrix
  //   cameraProjectionMatrix, // matrix to rotate
  //   degToRad(camera.transform.rotation.y), // amount to rotate in radians
  //   [0, 1, 0]
  // ); // axis to rotate around (Y)

  // // Set rotation Z to camera
  // mat4.rotate(
  //   cameraProjectionMatrix, // destination matrix
  //   cameraProjectionMatrix, // matrix to rotate
  //   degToRad(camera.transform.rotation.z), // amount to rotate in radians
  //   [0, 0, 1]
  // ); // axis to rotate around (Z)



  // Bellow config model view to draw the element

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Set position to draw the element
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [gameObject.transform.position.x, gameObject.transform.position.y, gameObject.transform.position.z]
  );

  // Set rotation X to draw the element
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    degToRad(gameObject.transform.rotation.x), // amount to rotate in radians
    [1, 0, 0]
  ); // axis to rotate around (X)

  // Set rotation Y to draw the element
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    degToRad(gameObject.transform.rotation.y), // amount to rotate in radians
    [0, 1, 0]
  ); // axis to rotate around (Y)

  // Set rotation Z to draw the element
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    degToRad(gameObject.transform.rotation.z), // amount to rotate in radians
    [0, 0, 1]
  ); // axis to rotate around (Z)

  // Set scale to draw the element
  mat4.scale(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to scale
    [gameObject.transform.scale.x, gameObject.transform.scale.y, gameObject.transform.scale.z]
  ); 

  // Render using the first material by now
  const material = gameObject.materials[0];
  const shader = material.shader;

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(glContext, gameObject.meshRenderer!.vertexBuffer, shader);

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  setColorAttribute(glContext, gameObject.meshRenderer!.colorBuffer, shader);

  // Tell WebGL which indices to use to index the vertices
  glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, gameObject.meshRenderer!.indexBuffer);

  // Tell WebGL to use our program when drawing
  glContext.useProgram(material.shader.program);

  // Set the shader uniforms
  glContext.uniformMatrix4fv(
    shader.uniformLocations.projectionMatrix,
    false,
    cameraProjectionMatrix
  );
  glContext.uniformMatrix4fv(
    shader.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    const vertexCount = 36;
    const type = glContext.UNSIGNED_SHORT;
    const offset = 0;
    glContext.drawElements(glContext.TRIANGLES, vertexCount, type, offset);
  }
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(glContext: WebGL2RenderingContext, vertexBuffer: WebGLBuffer, shader: Shader) {
  const numComponents = 3;
  const type = glContext.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  glContext.bindBuffer(glContext.ARRAY_BUFFER, vertexBuffer);
  glContext.vertexAttribPointer(
    shader.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  glContext.enableVertexAttribArray(shader.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(glContext: WebGL2RenderingContext, colorBuffer: WebGLBuffer, shader: Shader) {
  const numComponents = 4;
  const type = glContext.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  glContext.bindBuffer(glContext.ARRAY_BUFFER, colorBuffer);
  glContext.vertexAttribPointer(
    shader.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  glContext.enableVertexAttribArray(shader.attribLocations.vertexColor);
}