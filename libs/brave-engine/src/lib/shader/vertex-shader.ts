import { Shader } from '../class/shader';

export const vertexShader = new Shader();

vertexShader.vertexSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying lowp vec4 vColor;
void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vColor = aVertexColor;
}
`;

vertexShader.fragmentSource = `
varying lowp vec4 vColor;
void main(void) {
  gl_FragColor = vColor;
}
`;


// attribute vec3 aVertexPosition;
// attribute vec4 aVertexColor;
// uniform mat4 uModelViewMatrix;
// uniform mat4 uProjectionMatrix;
// varying lowp vec4 vColor;
// void main(void) {
//   gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1);
//   vColor = aVertexColor;
// }